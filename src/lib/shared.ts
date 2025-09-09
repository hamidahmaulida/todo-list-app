import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export interface User {
  email: string;
}

export interface Task {
  todo_id: string;
  title: string | null;
  content: string | null;
  created_at: string;
  updated_at: string;
  user: User | null;
}

export interface SharedTask {
  shared_id: string;
  permission: "read" | "edit";
  created_at: string;
  task: Task;
}

// tipe khusus untuk hasil query Supabase
interface SupabaseTaskRow {
  todo_id: string;
  title: string | null;
  content: string | null;
  created_at: string;
  updated_at: string;
  users: { email: string } | null;
}

interface SupabaseSharedRow {
  shared_id: string;
  permission: "read" | "edit";
  created_at: string;
  todos: SupabaseTaskRow;
}

export async function getSharedTask(sharedId: string): Promise<SharedTask | null> {
  try {
    const { data, error } = await supabase
      .from("shared_notes")
      .select(`
        shared_id,
        permission,
        created_at,
        todos (
          todo_id,
          title,
          content,
          created_at,
          updated_at,
          users (email)
        )
      `)
      .eq("shared_id", sharedId)
      .single<SupabaseSharedRow>();

    if (error) {
      console.error("Error fetching shared task:", error);
      return null;
    }

    if (!data?.todos) return null;

    const taskRow: SupabaseTaskRow = data.todos;

    return {
      shared_id: data.shared_id,
      permission: data.permission,
      created_at: data.created_at,
      task: {
        todo_id: taskRow.todo_id,
        title: taskRow.title,
        content: taskRow.content,
        created_at: taskRow.created_at,
        updated_at: taskRow.updated_at,
        user: taskRow.users ? { email: taskRow.users.email } : null,
      },
    };
  } catch (err) {
    console.error("Failed to fetch shared task:", err);
    return null;
  }
}
