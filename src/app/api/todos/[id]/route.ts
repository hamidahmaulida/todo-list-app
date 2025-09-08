import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import jwt from "jsonwebtoken";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function getUserIdFromToken(token: string) {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    return payload.userId;
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
}

// ================= UPDATE TODO =================
export async function PUT(req: NextRequest) {
  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user_id = getUserIdFromToken(token);
    if (!user_id) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

    const body = await req.json();

    const url = new URL(req.url);
    const segments = url.pathname.split("/");
    const todoId = segments[segments.length - 1];

    const { data: existing, error: fetchError } = await supabase
      .from("todos")
      .select("*")
      .eq("todo_id", todoId)
      .single();

    if (fetchError || !existing) return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    if (existing.user_id !== user_id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    // Update todo
    const { data: updated, error: updateError } = await supabase
      .from("todos")
      .update({
        title: body.title ?? existing.title,
        content: body.content ?? existing.content,
        updated_at: new Date().toISOString(),
      })
      .eq("todo_id", todoId)
      .select()
      .single();

    if (updateError) return NextResponse.json({ error: updateError.message }, { status: 500 });

    // Handle tags
    if (body.tags?.length) {
      const { data: existingTags } = await supabase
        .from("tags")
        .select("*")
        .eq("user_id", user_id);

      for (const tagName of body.tags) {
        if (!existingTags?.find(t => t.tag_name === tagName)) {
          await supabase.from("tags").insert({ user_id, tag_name: tagName });
        }
      }

      await supabase.from("todo_tags").delete().eq("todo_id", todoId);

      const { data: allTags } = await supabase
        .from("tags")
        .select("*")
        .eq("user_id", user_id);

      for (const tagName of body.tags) {
        const tag = allTags?.find(t => t.tag_name === tagName);
        if (tag) {
          await supabase.from("todo_tags").insert({ todo_id: todoId, tag_id: tag.tag_id });
        }
      }
    }

    const { data: todo } = await supabase
      .from("todos")
      .select(`
        *,
        todo_tags (
          tags(tag_id, tag_name)
        )
      `)
      .eq("todo_id", todoId)
      .single();

    todo.tags = todo.todo_tags?.map((t: any) => t.tags.tag_name) || [];

    return NextResponse.json(todo);
  } catch (err) {
    console.error("PUT /todos/[id] error:", err);
    return NextResponse.json({ error: "Failed to update todo" }, { status: 500 });
  }
}

// ================= DELETE TODO =================
export async function DELETE(req: NextRequest) {
  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user_id = getUserIdFromToken(token);
    if (!user_id) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

    const url = new URL(req.url);
    const segments = url.pathname.split("/");
    const todoId = segments[segments.length - 1];

    const { data: existing } = await supabase
      .from("todos")
      .select("*")
      .eq("todo_id", todoId)
      .single();

    if (!existing) return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    if (existing.user_id !== user_id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    // hapus relasi todo_tags dulu
    await supabase.from("todo_tags").delete().eq("todo_id", todoId);

    // hapus todo
    const { error } = await supabase.from("todos").delete().eq("todo_id", todoId);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /todos/[id] error:", err);
    return NextResponse.json({ error: "Failed to delete todo" }, { status: 500 });
  }
}
