import { createClient } from "@supabase/supabase-js";
import {
  SupabaseSharedRow,
  SupabaseTaskRow,
  SharedTask,
} from "@/types/task";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

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
      .single<SupabaseSharedRow>(); // pakai tipe, bukan any

    if (error || !data?.todos) return null;

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
        user: taskRow.users,
      },
    };
  } catch (err) {
    console.error("Failed to fetch shared task:", err);
    return null;
  }
}
