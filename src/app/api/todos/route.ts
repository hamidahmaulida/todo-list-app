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
export async function GET(req: NextRequest) {
  try {
    console.log("GET /api/todos - Start");
    
    const { userId } = await auth();
    console.log("User ID:", userId);
    
    if (!userId) {
      console.log("Unauthorized - no userId");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("Fetching todos from database...");

    const { data, error } = await supabase
      .from("todos")
      .select(`
        *,
        todo_tags (
          tag_id,
          todo_id,
          tags:tags (
            tag_name
          )
        )
      `)
      .eq("user_id", userId)
      .is("deleted_at", null)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Database error:", error);
      throw error;
    }

    console.log(`Found ${data?.length || 0} todos`);

    const todos: TodoWithExtras[] = (data || []).map((todo) => ({
      ...todo,
      tags: (todo.todo_tags as TodoTag[] | undefined)
        ?.map(tt => tt.tags?.tag_name)
        .filter(Boolean) || [],
      todo_tags: undefined
    }));

    console.log("GET /api/todos - Success");
    return NextResponse.json(todos);
    
  } catch (err: any) {
    console.error("GET /todos error:", err);
    return NextResponse.json({ 
      error: err?.message || "Internal server error",
      details: err?.details || ""
    }, { status: 500 });
  }
}

// =========================
// POST /api/todos
// =========================
export async function POST(req: NextRequest) {
  try {
    console.log("POST /api/todos - Start");
    
    const { userId } = await auth();
    console.log("User ID:", userId);
    
    if (!userId) {
      console.log("Unauthorized - no userId");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    console.log("Request body:", body);
    
    const { title = "", content = "", tags = [] } = body;

    if (!title.trim() && !content.trim() && (!tags || tags.length === 0)) {
      console.log("Validation failed - all fields empty");
      return NextResponse.json({ error: "Please fill at least one field" }, { status: 400 });
    }

    console.log("Creating todo...");

    // 1. Insert todo
    const { data: todo, error: todoError } = await supabase
      .from("todos")
      .insert([{ 
        title: title.trim(), 
        content: content.trim(), 
        user_id: userId, 
        completed: false 
      }])
      .select()
      .single();

    if (todoError) {
      console.error("Error creating todo:", todoError);
      throw todoError;
    }
    
    if (!todo) {
      console.log("No todo returned after insert");
      throw new Error("Failed to create todo");
    }

    console.log("Todo created:", todo.todo_id);

    // 2. Process tags
    if (tags && tags.length > 0) {
      console.log(`Processing ${tags.length} tags...`);
      
      for (const tagName of tags.map((t: string) => t.trim()).filter(Boolean)) {
        try {
          console.log(`Processing tag: ${tagName}`);
          
          // Check existing tag
          let { data: existingTag, error: tagSelectError } = await supabase
            .from("tags")
            .select("*")
            .eq("tag_name", tagName)
            .eq("user_id", userId)
            .maybeSingle();

          if (tagSelectError) {
            console.error(`Error checking tag ${tagName}:`, tagSelectError);
            continue;
          }

          if (!existingTag) {
            console.log(`Creating new tag: ${tagName}`);
            const { data: newTag, error: tagInsertError } = await supabase
              .from("tags")
              .insert([{ tag_name: tagName, user_id: userId }])
              .select()
              .single();
              
            if (tagInsertError) {
              console.error(`Error creating tag ${tagName}:`, tagInsertError);
              continue;
            }
            
            existingTag = newTag;
          }

          if (existingTag) {
            // Insert relation todo_tags
            const { error: linkError } = await supabase
              .from("todo_tags")
              .insert([{ 
                todo_id: todo.todo_id, 
                tag_id: existingTag.tag_id 
              }]);
              
            if (linkError) {
              console.error(`Error linking tag ${tagName}:`, linkError);
            } else {
              console.log(`Tag ${tagName} linked successfully`);
            }
          }
        } catch (tagError) {
          console.error(`Error processing tag ${tagName}:`, tagError);
        }
      }
    }

    console.log("POST /api/todos - Success");
    return NextResponse.json(todo, { status: 201 });
    
  } catch (err: any) {
    console.error("POST /todos error:", err);
    return NextResponse.json({ 
      error: err?.message || "Internal server error",
      details: err?.details || ""
    }, { status: 500 });
  }
}

// =========================
// PUT /api/todos (for updates without ID in URL)
// =========================
export async function PUT(req: NextRequest) {
  try {
    console.log("PUT /api/todos - Start");
    
    const { userId } = await auth();
    console.log("User ID:", userId);
    
    if (!userId) {
      console.log("Unauthorized - no userId");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    console.log("Request body:", body);
    
    const { todo_id, title, content, tags, completed, due_date, priority } = body;

    if (!todo_id) {
      console.log("Missing todo_id");
      return NextResponse.json({ error: "todo_id is required" }, { status: 400 });
    }

    console.log("Checking todo ownership...");

    // Check if todo exists and belongs to user
    const { data: existing, error: fetchError } = await supabase
      .from("todos")
      .select("*")
      .eq("todo_id", todo_id)
      .eq("user_id", userId)
      .maybeSingle();

    if (fetchError) {
      console.error("Error checking todo:", fetchError);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    if (!existing) {
      console.log("Todo not found or access denied");
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    console.log("Updating todo...");

    // Update todo
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
      console.error("Error updating todo:", updateError);
      return NextResponse.json({ error: "Failed to update todo" }, { status: 500 });
    }

    console.log("Todo updated successfully");

    // Handle tags if provided
    if (Array.isArray(tags)) {
      console.log("Processing tags...");
      
      // Clear existing tags
      await supabase.from("todo_tags").delete().eq("todo_id", todo_id);

      for (const tagName of tags.map((t: string) => t.trim()).filter(Boolean)) {
        try {
          console.log(`Processing tag: ${tagName}`);
          
          // Check existing tag
          let { data: existingTag, error: tagSelectError } = await supabase
            .from("tags")
            .select("*")
            .eq("tag_name", tagName)
            .eq("user_id", userId)
            .maybeSingle();

          if (tagSelectError) {
            console.error(`Error checking tag ${tagName}:`, tagSelectError);
            continue;
          }

          if (!existingTag) {
            console.log(`Creating new tag: ${tagName}`);
            const { data: newTag, error: tagInsertError } = await supabase
              .from("tags")
              .insert([{ tag_name: tagName, user_id: userId }])
              .select()
              .single();
              
            if (tagInsertError) {
              console.error(`Error creating tag ${tagName}:`, tagInsertError);
              continue;
            }
            
            existingTag = newTag;
          }

          if (existingTag) {
            // Insert relation todo_tags
            const { error: linkError } = await supabase
              .from("todo_tags")
              .insert([{ 
                todo_id: todo_id, 
                tag_id: existingTag.tag_id 
              }]);
              
            if (linkError) {
              console.error(`Error linking tag ${tagName}:`, linkError);
            } else {
              console.log(`Tag ${tagName} linked successfully`);
            }
          }
        } catch (tagError) {
          console.error(`Error processing tag ${tagName}:`, tagError);
        }
      }
    }

    // Fetch updated todo with tags
    console.log("Fetching updated todo...");
    
    const { data: updatedTodo, error: finalFetchError } = await supabase
      .from("todos")
      .select(`
        *,
        todo_tags (
          tag_id,
          todo_id,
          tags:tags (
            tag_name
          )
        )
      `)
      .eq("todo_id", todo_id)
      .single();

    if (finalFetchError) {
      console.error("Error fetching updated todo:", finalFetchError);
      return NextResponse.json({ error: "Failed to fetch updated todo" }, { status: 500 });
    }

    const todoResponse: TodoWithExtras = {
      ...updatedTodo,
      tags: (updatedTodo.todo_tags as TodoTag[] | undefined)
        ?.map(tt => tt.tags?.tag_name)
        .filter(Boolean) || [],
      todo_tags: undefined
    };

    console.log("PUT /api/todos - Success");
    return NextResponse.json(todoResponse);
    
  } catch (err: any) {
    console.error("PUT /todos error:", err);
    return NextResponse.json({ 
      error: err?.message || "Internal server error",
      details: err?.details || ""
    }, { status: 500 });
  }
}