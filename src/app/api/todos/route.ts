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

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const userId = getUserIdFromToken(token);
    if (!userId) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

    const body = await req.json();
    const { title = "", content = "", tags = [] } = body;

    // Validasi: minimal satu field harus ada (title, content, atau tags)
    const hasTitle = title.trim();
    const hasContent = content.trim();
    const hasTags = tags && tags.length > 0;

    if (!hasTitle && !hasContent && !hasTags) {
      return NextResponse.json({ error: "Please fill at least one field: title, content, or tag" }, { status: 400 });
    }

    // Insert todo (title boleh kosong string)
    const { data, error } = await supabase
      .from("todos")
      .insert([{ 
        title: title || "", // title boleh string kosong
        content: content || "", 
        user_id: userId 
      }])
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    // Handle tags jika ada
    if (hasTags) {
      // Insert tags yang belum ada
      for (const tagName of tags) {
        if (tagName.trim()) {
          // Insert tag jika belum ada (ignore conflict)
          await supabase
            .from("tags")
            .upsert({ tag_name: tagName.trim() }, { onConflict: "tag_name" });

          // Link tag ke todo
          const { data: tagData } = await supabase
            .from("tags")
            .select("tag_id")
            .eq("tag_name", tagName.trim())
            .single();

          if (tagData) {
            await supabase
              .from("todo_tags")
              .insert({ todo_id: data.todo_id, tag_id: tagData.tag_id });
          }
        }
      }
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("POST /todos error:", err);
    return NextResponse.json({ error: "Failed to create todo" }, { status: 500 });
  }
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