// src/app/api/todos/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient, PostgrestSingleResponse } from "@supabase/supabase-js";
import jwt from "jsonwebtoken";
import { Todo, Tag, TodoWithExtras, SharedNote } from "@/types/task";

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

// ==================== GET ====================
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: todoId } = await params;
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const userId = getUserIdFromToken(token);
    if (!userId) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

    const { data: todoWithExtrasData, error }: PostgrestSingleResponse<TodoWithExtras> =
      await supabase
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

    if (error || !todoWithExtrasData)
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });

    // Mapping tags dan shared_notes
    const todoResponse: TodoWithExtras = {
      ...todoWithExtrasData,
      tags: todoWithExtrasData.todo_tags?.map(t => t.tags?.tag_name).filter((tn): tn is string => !!tn) || [],
      shared: (todoWithExtrasData.shared_notes?.length ?? 0) > 0,
      shared_notes: todoWithExtrasData.shared_notes?.map(sn => ({
        ...sn,
        todo_id: todoWithExtrasData.todo_id,
        access_type: "invited" as const, // atau logic lain sesuai kebutuhan
      })) || [],
    };

    return NextResponse.json(todoResponse);
  } catch (err) {
    console.error("GET /todos/[id] error:", err);
    return NextResponse.json({ error: "Failed to fetch todo" }, { status: 500 });
  }
}

// ==================== PUT ====================
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: todoId } = await params;
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user_id = getUserIdFromToken(token);
    if (!user_id) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

    const body = await req.json();

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
      // Ambil semua tags user
      const { data: allTagsData } = await supabase.from("tags").select("*").eq("user_id", user_id);
      const allTags: Tag[] = allTagsData || [];

      // Insert tag baru jika belum ada
      for (const tagName of body.tags as string[]) {
        if (!allTags.find(t => t.tag_name === tagName)) {
          await supabase.from("tags").insert([{ user_id, tag_name: tagName }]);
        }
      }

      // Hapus relasi lama
      await supabase.from("todo_tags").delete().eq("todo_id", todoId);

      // Ambil semua tags terbaru
      const { data: updatedTagsData } = await supabase.from("tags").select("*").eq("user_id", user_id);
      const updatedTags: Tag[] = updatedTagsData || [];

      const todoTagsToInsert = (body.tags as string[])
        .map(tagName => {
          const tag = updatedTags.find(t => t.tag_name === tagName);
          return tag ? { todo_id: todoId, tag_id: tag.tag_id } : null;
        })
        .filter((x): x is { todo_id: string; tag_id: string } => x !== null);

      if (todoTagsToInsert.length) {
        await supabase.from("todo_tags").insert(todoTagsToInsert);
      }
    }

    // Ambil todo lengkap
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
      tags: todoWithExtrasData.todo_tags?.map(t => t.tags?.tag_name).filter((tn): tn is string => !!tn) || [],
      shared: (todoWithExtrasData.shared_notes?.length ?? 0) > 0,
      shared_notes: todoWithExtrasData.shared_notes?.map(sn => ({
        ...sn,
        todo_id: todoWithExtrasData.todo_id,
        access_type: "invited" as const,
      })) || [],
    };

    return NextResponse.json(todoResponse);
  } catch (err) {
    console.error("PUT /todos/[id] error:", err);
    return NextResponse.json({ error: "Failed to update todo" }, { status: 500 });
  }
}

// ==================== DELETE ====================
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: todoId } = await params;
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user_id = getUserIdFromToken(token);
    if (!user_id) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

    const { data: existing } = await supabase.from("todos").select("*").eq("todo_id", todoId).single();
    if (!existing) return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    if ((existing as Todo).user_id !== user_id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    await supabase.from("todo_tags").delete().eq("todo_id", todoId);
    const { error } = await supabase.from("todos").delete().eq("todo_id", todoId);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /todos/[id] error:", err);
    return NextResponse.json({ error: "Failed to delete todo" }, { status: 500 });
  }
}
