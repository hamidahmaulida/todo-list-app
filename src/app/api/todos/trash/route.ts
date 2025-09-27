// src/app/api/todos/trash/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { auth } from "@clerk/nextjs/server";
import { TodoWithExtras, SharedNote } from "@/types/task";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { data: trashedTodos, error } = await supabase
      .from("todos")
      .select(`
        *,
        todo_tags (tags(tag_name)),
        shared_notes (shared_id, owner_id, shared_to, permission)
      `)
      .eq("user_id", userId)
      .not("deleted_at", "is", null)
      .order("deleted_at", { ascending: false });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    const todosWithExtras: TodoWithExtras[] = (trashedTodos || []).map((t: any) => {
      const mappedSharedNotes: SharedNote[] | undefined =
        Array.isArray(t.shared_notes)
          ? t.shared_notes.map((s: any) => ({ ...s, todo_id: t.todo_id, access_type: "private" }))
          : undefined;

      return {
        ...t,
        tags: Array.isArray(t.todo_tags) ? t.todo_tags.map((tt: any) => tt.tags.tag_name) : [],
        shared: (mappedSharedNotes?.length ?? 0) > 0,
        shared_notes: mappedSharedNotes,
      };
    });

    return NextResponse.json({ todos: todosWithExtras });
  } catch (err) {
    console.error("GET /todos/trash error:", err);
    return NextResponse.json({ error: "Failed to fetch trashed todos" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { data, error } = await supabase
      .from("todos")
      .update({ deleted_at: null })
      .eq("user_id", userId)
      .not("deleted_at", "is", null)
      .select();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ success: true, count: Array.isArray(data) ? data.length : 0 });
  } catch (err) {
    console.error("PUT /todos/trash error:", err);
    return NextResponse.json({ error: "Failed to restore trashed todos" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const url = new URL(req.url);
    const todoId = url.searchParams.get("todo_id");

    if (todoId) {
      // Hapus satu todo di trash
      const { error } = await supabase
        .from("todos")
        .delete()
        .eq("user_id", userId)
        .eq("todo_id", todoId)
        .not("deleted_at", "is", null);

      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({ success: true, deleted: 1 });
    } else {
      // Hapus semua todos di trash
      const { data: toDelete, error: fetchError } = await supabase
        .from("todos")
        .select("*", { count: "exact" })
        .eq("user_id", userId)
        .not("deleted_at", "is", null);

      if (fetchError) return NextResponse.json({ error: fetchError.message }, { status: 500 });

      const { error: deleteError } = await supabase
        .from("todos")
        .delete()
        .eq("user_id", userId)
        .not("deleted_at", "is", null);

      if (deleteError) return NextResponse.json({ error: deleteError.message }, { status: 500 });

      return NextResponse.json({ success: true, count: toDelete?.length || 0 });
    }
  } catch (err) {
    console.error("DELETE /todos/trash error:", err);
    return NextResponse.json({ error: "Failed to delete trashed todos" }, { status: 500 });
  }
}
