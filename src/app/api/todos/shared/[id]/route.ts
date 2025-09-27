import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getAuth } from "@clerk/nextjs/server";
import { TodoWithExtras } from "@/types/task";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = getAuth(req);
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id: sharedId } = await params;
    const body = await req.json();
    const { title, content, priority, tags, completed, due_date, is_public } = body;

    // Ambil shared_notes & todo
    const { data: shareData, error: fetchError } = await supabase
      .from("shared_notes")
      .select(`
        shared_id,
        permission,
        todos!inner (
          todo_id,
          user_id,
          title,
          content,
          priority,
          completed,
          due_date,
          is_public,
          shared_with
        )
      `)
      .eq("shared_id", sharedId)
      .eq("shared_to", userId)
      .single();

    if (fetchError) return NextResponse.json({ error: fetchError.message }, { status: 500 });
    if (!shareData) return NextResponse.json({ error: "Shared task not found" }, { status: 404 });

    // Cek permission edit
    if (shareData.permission !== "edit") {
      return NextResponse.json({ error: "You don't have permission to edit this task" }, { status: 403 });
    }

    const todo = Array.isArray(shareData.todos) ? shareData.todos[0] : shareData.todos;
    if (!todo) return NextResponse.json({ error: "Todo not found" }, { status: 404 });

    // Update todo
    const { data: updatedTodo, error: updateError } = await supabase
      .from("todos")
      .update({
        title,
        content,
        priority,
        completed,
        due_date,
        is_public,
      })
      .eq("todo_id", todo.todo_id)
      .select()
      .single();

    if (updateError) return NextResponse.json({ error: updateError.message }, { status: 500 });

    // Merge tags
    if (Array.isArray(tags)) {
      // Ambil tags lama
      const { data: existingTags } = await supabase
        .from("todo_tags")
        .select("tags(tag_name)")
        .eq("todo_id", todo.todo_id);

      const oldTagList = existingTags?.map((t: any) => t.tags?.tag_name).filter(Boolean) || [];
      const mergedTags = Array.from(new Set([...oldTagList, ...tags]));

      // Hapus semua tag lama
      await supabase.from("todo_tags").delete().eq("todo_id", todo.todo_id);

      // Insert tags yang sudah merge
      for (const tagName of mergedTags) {
        await supabase.from("todo_tags").insert({ todo_id: todo.todo_id, tag_name: tagName });
      }
    }

    // Ambil tags terbaru
    const { data: todoTags } = await supabase
      .from("todo_tags")
      .select("tags(tag_name)")
      .eq("todo_id", todo.todo_id);

    const tagList = todoTags?.map((t: any) => t.tags?.tag_name).filter(Boolean) || [];

    const result: TodoWithExtras = {
      ...updatedTodo,
      tags: tagList,
      is_shared: true,
      shared: true,
      shared_permission: shareData.permission,
      shared_id: shareData.shared_id,
      shared_with: todo.shared_with || [],
    };

    return NextResponse.json(result);

  } catch (err: any) {
    console.error("[API SHARED PUT] Unexpected error:", err);
    return NextResponse.json({ error: err.message || "Unknown error" }, { status: 500 });
  }
}