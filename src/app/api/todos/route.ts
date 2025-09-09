import { NextRequest, NextResponse } from "next/server"; 
import { createClient } from "@supabase/supabase-js";
import jwt from "jsonwebtoken";
import { TodoWithExtras, SharedNote } from "@/types/task";

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

// Supabase row type
interface SupabaseTodoRow {
  todo_id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  todo_tags?: { tags: { tag_name: string } }[];
  shared_notes?: { shared_id: string; owner_id: string; shared_to: string | null; permission: "read" | "edit" }[];
}

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const userId = getUserIdFromToken(token);
    if (!userId) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

    const { data: todos, error } = await supabase
      .from("todos")
      .select(`
        *,
        todo_tags (
          tags(tag_name)
        ),
        shared_notes (
          shared_id, owner_id, shared_to, permission
        )
      `)
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    // Map ke TodoWithExtras
    const todosWithExtras: TodoWithExtras[] = (todos as SupabaseTodoRow[]).map((t) => {
      // Map shared_notes ke tipe SharedNote
      const mappedSharedNotes: SharedNote[] | undefined = t.shared_notes?.map((s) => ({
        shared_id: s.shared_id,
        todo_id: t.todo_id,        // tambahkan todo_id
        owner_id: s.owner_id,
        shared_to: s.shared_to,
        permission: s.permission,
        access_type: "invited",    // default, bisa sesuaikan logic
      }));

      return {
        ...t,
        tags: t.todo_tags?.map((tt) => tt.tags.tag_name) || [],
        shared: (t.shared_notes?.length ?? 0) > 0,
        shared_notes: mappedSharedNotes,
      };
    });

    return NextResponse.json(todosWithExtras);
  } catch (err) {
    console.error("GET /todos error:", err);
    return NextResponse.json({ error: "Failed to fetch todos" }, { status: 500 });
  }
}
