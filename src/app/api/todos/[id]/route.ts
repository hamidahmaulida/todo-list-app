import { NextRequest, NextResponse } from "next/server";
import { createClient, PostgrestSingleResponse } from "@supabase/supabase-js";
import jwt from "jsonwebtoken";
import { Todo, Tag, TodoWithExtras } from "@/types/task";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function getUserIdFromToken(token: string): string | null {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    return payload.userId;
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
}

// ==================== PUT ====================
export async function PUT(req: NextRequest) {
  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user_id = getUserIdFromToken(token);
    if (!user_id) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

    const body = await req.json();
    const todoId = req.url.split("/").pop();
    if (!todoId) return NextResponse.json({ error: "Invalid todo ID" }, { status: 400 });

    // Ambil todo existing
    const { data: existing, error: fetchError }: PostgrestSingleResponse<Todo> = await supabase
      .from("todos")
      .select("*")
      .eq("todo_id", todoId)
      .single();

    if (fetchError || !existing) return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    if (existing.user_id !== user_id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    // Update todo
    const { error: updateError } = await supabase
      .from("todos")
      .update({
        title: body.title ?? existing.title,
        content: body.content ?? existing.content,
        updated_at: new Date().toISOString(),
      })
      .eq("todo_id", todoId);

    if (updateError) return NextResponse.json({ error: updateError.message }, { status: 500 });

    // Handle tags
    if (Array.isArray(body.tags) && body.tags.length) {
      // Ambil tags user - FIXED: Remove generic type
      const { data: existingTagsData } = await supabase.from("tags").select("*").eq("user_id", user_id);
      const existingTags = existingTagsData as Tag[] || [];

      // Insert tag baru
      for (const tagName of body.tags as string[]) {
        if (!existingTags.find(t => t.tag_name === tagName)) {
          await supabase.from("tags").insert([{ user_id, tag_name: tagName }]);
        }
      }

      // Hapus relasi lama
      await supabase.from("todo_tags").delete().eq("todo_id", todoId);

      // Ambil semua tags terbaru - FIXED: Remove generic type
      const { data: allTagsData } = await supabase.from("tags").select("*").eq("user_id", user_id);
      const allTags = allTagsData as Tag[] || [];

      const todoTagsToInsert = (body.tags as string[])
        .map(tagName => {
          const tag = allTags.find(t => t.tag_name === tagName);
          return tag ? { todo_id: todoId, tag_id: tag.tag_id } : null;
        })
        .filter((x): x is { todo_id: string; tag_id: string } => x !== null);

      if (todoTagsToInsert.length) {
        await supabase.from("todo_tags").insert(todoTagsToInsert);
      }
    }

    // Ambil todo lengkap beserta tags & shared_notes
    const { data: todoWithExtrasData }: PostgrestSingleResponse<TodoWithExtras> = await supabase
      .from("todos")
      .select(`
        *,
        todo_tags (
          tags(tag_id, tag_name)
        ),
        shared_notes (
          shared_id, owner_id, shared_to, permission
        )
      `)
      .eq("todo_id", todoId)
      .single();

    if (!todoWithExtrasData) return NextResponse.json({ error: "Todo not found after update" }, { status: 404 });

    const todoResponse: TodoWithExtras = {
      ...todoWithExtrasData,
      tags: todoWithExtrasData.todo_tags?.map(t => t.tags.tag_name) || [],
      shared: (todoWithExtrasData.shared_notes?.length ?? 0) > 0,
    };

    return NextResponse.json(todoResponse);
  } catch (err) {
    console.error("PUT /todos/[id] error:", err);
    return NextResponse.json({ error: "Failed to update todo" }, { status: 500 });
  }
}

// ==================== DELETE ====================
export async function DELETE(req: NextRequest) {
  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user_id = getUserIdFromToken(token);
    if (!user_id) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

    const todoId = req.url.split("/").pop();
    if (!todoId) return NextResponse.json({ error: "Invalid todo ID" }, { status: 400 });

    // FIXED: Remove generic type
    const { data: existing } = await supabase.from("todos").select("*").eq("todo_id", todoId).single();

    if (!existing) return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    if ((existing as Todo).user_id !== user_id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    await supabase.from("todo_tags").delete().eq("todo_id", todoId);
    // FIXED: Remove generic type
    const { error } = await supabase.from("todos").delete().eq("todo_id", todoId);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /todos/[id] error:", err);
    return NextResponse.json({ error: "Failed to delete todo" }, { status: 500 });
  }
}