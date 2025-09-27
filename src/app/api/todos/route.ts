// src/app/api/todos/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// =========================
// Tipe data
// =========================
interface TodoTag {
  tag_id: string;
  todo_id: string;
  tags: {
    tag_name: string;
  } | null;
}

interface TodoWithExtras {
  todo_id: string;
  user_id: string;
  title: string;
  content: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  todo_tags?: TodoTag[];
  tags?: string[];
}

// =========================
// GET /api/todos
// =========================
export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("todos")
      .select(
        `
        *,
        todo_tags (
          tag_id,
          todo_id,
          tags:tags (
            tag_name
          )
        )
      `
      )
      .eq("user_id", userId)
      .is("deleted_at", null)
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    const todos: TodoWithExtras[] = (data || []).map((todo) => ({
      ...todo,
      tags:
        (todo.todo_tags as TodoTag[] | undefined)
          ?.map((tt) => tt.tags?.tag_name)
          .filter(Boolean) || [],
      todo_tags: undefined,
    }));

    return NextResponse.json(todos);
  } catch (err: any) {
    return NextResponse.json(
      {
        error: err?.message || "Internal server error",
        details: err?.details || "",
      },
      { status: 500 }
    );
  }
}

// =========================
// POST /api/todos
// =========================
export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title = "", content = "", tags = [] } = body;

    if (!title.trim() && !content.trim() && (!tags || tags.length === 0)) {
      return NextResponse.json(
        { error: "Please fill at least one field" },
        { status: 400 }
      );
    }

    const { data: todo, error: todoError } = await supabase
      .from("todos")
      .insert([
        {
          title: title.trim(),
          content: content.trim(),
          user_id: userId,
          completed: false,
        },
      ])
      .select()
      .single();

    if (todoError) {
      throw todoError;
    }

    if (!todo) {
      throw new Error("Failed to create todo");
    }

    if (tags && tags.length > 0) {
      for (const tagName of tags.map((t: string) => t.trim()).filter(Boolean)) {
        try {
          const { data, error: tagSelectError } = await supabase
            .from("tags")
            .select("*")
            .eq("tag_name", tagName)
            .eq("user_id", userId)
            .maybeSingle();

          if (tagSelectError) {
            continue;
          }

          let existingTag = data;

          if (!existingTag) {
            const { data: newTag, error: tagInsertError } = await supabase
              .from("tags")
              .insert([{ tag_name: tagName, user_id: userId }])
              .select()
              .single();

            if (!tagInsertError) {
              existingTag = newTag;
            }
          }

          if (existingTag) {
            await supabase.from("todo_tags").insert([
              {
                todo_id: todo.todo_id,
                tag_id: existingTag.tag_id,
              },
            ]);
          }
        } catch {
          // ignore tag errors
        }
      }
    }

    return NextResponse.json(todo, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      {
        error: err?.message || "Internal server error",
        details: err?.details || "",
      },
      { status: 500 }
    );
  }
}

// =========================
// PUT /api/todos (for updates without ID in URL)
// =========================
export async function PUT(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { todo_id, title, content, tags, completed, due_date, priority } =
      body;

    if (!todo_id) {
      return NextResponse.json(
        { error: "todo_id is required" },
        { status: 400 }
      );
    }

    const { data: existing, error: fetchError } = await supabase
      .from("todos")
      .select("*")
      .eq("todo_id", todo_id)
      .eq("user_id", userId)
      .maybeSingle();

    if (fetchError) {
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    if (!existing) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    const { error: updateError } = await supabase
      .from("todos")
      .update({
        title: title !== undefined ? title.trim() : existing.title,
        content: content !== undefined ? content.trim() : existing.content,
        completed: completed !== undefined ? completed : existing.completed,
        due_date: due_date !== undefined ? due_date : existing.due_date,
        priority: priority !== undefined ? priority : existing.priority,
        updated_at: new Date().toISOString(),
      })
      .eq("todo_id", todo_id);

    if (updateError) {
      return NextResponse.json(
        { error: "Failed to update todo" },
        { status: 500 }
      );
    }

    if (Array.isArray(tags)) {
      await supabase.from("todo_tags").delete().eq("todo_id", todo_id);

      for (const tagName of tags.map((t: string) => t.trim()).filter(Boolean)) {
        try {
          let { data: existingTag, error: tagSelectError } = await supabase
            .from("tags")
            .select("*")
            .eq("tag_name", tagName)
            .eq("user_id", userId)
            .maybeSingle();

          if (tagSelectError) {
            continue;
          }

          if (!existingTag) {
            const { data: newTag, error: tagInsertError } = await supabase
              .from("tags")
              .insert([{ tag_name: tagName, user_id: userId }])
              .select()
              .single();

            if (tagInsertError) {
              continue;
            }

            existingTag = newTag;
          }

          if (existingTag) {
            await supabase.from("todo_tags").insert([
              {
                todo_id,
                tag_id: existingTag.tag_id,
              },
            ]);
          }
        } catch {
          // ignore tag errors
        }
      }
    }

    const { data: updatedTodo, error: finalFetchError } = await supabase
      .from("todos")
      .select(
        `
        *,
        todo_tags (
          tag_id,
          todo_id,
          tags:tags (
            tag_name
          )
        )
      `
      )
      .eq("todo_id", todo_id)
      .single();

    if (finalFetchError) {
      return NextResponse.json(
        { error: "Failed to fetch updated todo" },
        { status: 500 }
      );
    }

    const todoResponse: TodoWithExtras = {
      ...updatedTodo,
      tags:
        (updatedTodo.todo_tags as TodoTag[] | undefined)
          ?.map((tt) => tt.tags?.tag_name)
          .filter(Boolean) || [],
      todo_tags: undefined,
    };

    return NextResponse.json(todoResponse);
  } catch (err: any) {
    return NextResponse.json(
      {
        error: err?.message || "Internal server error",
        details: err?.details || "",
      },
      { status: 500 }
    );
  }
}