// src/app/api/shared/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { SharedTask, Task, TodoWithExtras, SupabaseUser } from "@/types/task";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id: sharedId } = params;

    // Ambil shared note by id
    const { data: sharedData, error } = await supabase
      .from("shared_notes")
      .select(`
        shared_id,
        permission,
        access_type,
        created_at,
        todos:todos(
          todo_id,
          title,
          content,
          created_at,
          updated_at,
          user_id,
          users:user_id(email, user_id)
        )
      `)
      .eq("shared_id", sharedId)
      .single();

    if (error || !sharedData) {
      return NextResponse.json({ error: "Shared note not found" }, { status: 404 });
    }

    // Mapping ke tipe SharedTask
    const task: Task = {
      todo_id: sharedData.todos.todo_id,
      title: sharedData.todos.title,
      content: sharedData.todos.content,
      created_at: sharedData.todos.created_at,
      updated_at: sharedData.todos.updated_at,
      user: sharedData.todos.users
        ? {
            user_id: sharedData.todos.users.user_id,
            email: sharedData.todos.users.email,
          }
        : null,
    };

    const sharedTask: SharedTask = {
      shared_id: sharedData.shared_id,
      permission: sharedData.permission,
      access_type: sharedData.access_type,
      created_at: sharedData.created_at,
      task,
    };

    return NextResponse.json(sharedTask);
  } catch (err) {
    console.error("GET /shared/[id] error:", err);
    return NextResponse.json({ error: "Failed to fetch shared note" }, { status: 500 });
  }
}
