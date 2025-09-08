import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import jwt from "jsonwebtoken";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function getUserIdFromToken(token: string) {
  try {
    const secret = process.env.JWT_SECRET!;
    const payload = jwt.verify(token, secret) as { userId: string };
    return payload.userId;
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
}

// GET all todos by user + shared info
export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user_id = getUserIdFromToken(token);
    if (!user_id) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

    const { data: todos, error } = await supabase
      .from("todos")
      .select(`
        *,
        todo_tags (
          tags(tag_id, tag_name)
        ),
        shared_notes (
          shared_to
        )
      `)
      .eq("user_id", user_id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const todosWithExtras = todos.map((t: any) => ({
      ...t,
      tags: t.todo_tags?.map((tt: any) => tt.tags.tag_name) || [],
      shared: (t.shared_notes?.length || 0) > 0, // properti virtual shared
    }));

    return NextResponse.json(todosWithExtras);
  } catch (err) {
    console.error("GET /todos error:", err);
    return NextResponse.json({ error: "Failed to fetch todos" }, { status: 500 });
  }
}

// CREATE todo + tags
export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user_id = getUserIdFromToken(token);
    if (!user_id) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

    const body = await req.json();
    const tags = body.tags || [];

    // Insert todo (biarin Supabase isi created_at & updated_at otomatis)
    const { data: newTodo, error: todoError } = await supabase
      .from("todos")
      .insert([
        {
          title: body.title ?? null,
          content: body.content ?? null,
          user_id,
        },
      ])
      .select()
      .single();

    if (todoError) {
      console.error("Supabase error:", todoError);
      return NextResponse.json({ error: todoError.message }, { status: 500 });
    }

    // Insert tags (bulk)
    if (tags.length > 0) {
      const { data: existingTags } = await supabase
        .from("tags")
        .select("*")
        .eq("user_id", user_id);

      const newTags = tags.filter(
        (tagName: string) => !existingTags?.some((t) => t.tag_name === tagName)
      );

      if (newTags.length > 0) {
        await supabase.from("tags").insert(
          newTags.map((tagName: string) => ({ user_id, tag_name: tagName }))
        );
      }

      const { data: allTags } = await supabase
        .from("tags")
        .select("*")
        .eq("user_id", user_id);

      const todoTags = tags
        .map((tagName: string) => {
          const tag = allTags?.find((t) => t.tag_name === tagName);
          return tag ? { todo_id: newTodo.todo_id, tag_id: tag.tag_id } : null;
        })
        .filter(Boolean);

      if (todoTags.length > 0) {
        await supabase.from("todo_tags").insert(todoTags);
      }
    }

    return NextResponse.json({ ...newTodo, tags, shared: false }, { status: 201 });
  } catch (err) {
    console.error("POST /todos error:", err);
    return NextResponse.json({ error: "Failed to create todo" }, { status: 500 });
  }
}
