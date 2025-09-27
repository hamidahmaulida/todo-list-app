// src/app/api/todos/shared/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getAuth } from "@clerk/nextjs/server";
import { TodoWithExtras } from "@/types/task";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: NextRequest) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      console.log("No userId from auth");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("=== SHARED TODOS ENDPOINT ===");
    console.log("User ID:", userId);

    // Check shared_notes table first
    const { data: debugShared, error: debugError } = await supabase
      .from("shared_notes")
      .select("*")
      .eq("shared_to", userId);
    
    console.log("Raw shared_notes query result:");
    console.log("Data:", debugShared);
    console.log("Error:", debugError);
    
    if (debugError) {
      console.error("Database error in debug query:", debugError);
      return NextResponse.json({ error: debugError.message }, { status: 500 });
    }
    
    if (!debugShared || debugShared.length === 0) {
      console.log("No shared records found - returning empty array");
      return NextResponse.json([]);
    }

    console.log(`Found ${debugShared.length} shared records, fetching todos...`);

    // Get shared todos with join
    const { data: sharedData, error: sharedError } = await supabase
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
          created_at,
          updated_at,
          is_public
        )
      `)
      .eq("status", "accepted")
      .eq("shared_to", userId);
      

    console.log("Joined query result:");
    console.log("Data:", sharedData);
    console.log("Error:", sharedError);

    if (sharedError) {
      console.error("Error in joined query:", sharedError);
      return NextResponse.json({ error: sharedError.message }, { status: 500 });
    }

    if (!sharedData || sharedData.length === 0) {
      console.log("No joined data found");
      return NextResponse.json([]);
    }

    // Process each shared todo
    const sharedTodos: TodoWithExtras[] = [];
    
    for (const share of sharedData) {
      console.log("Processing share:", share.shared_id);
      
      const todo = Array.isArray(share.todos) ? share.todos[0] : share.todos;
      if (!todo) {
        console.log("No todo found for share:", share.shared_id);
        continue;
      }

      console.log("Found todo:", todo.todo_id, todo.title);

      // Get tags for this todo
      const { data: todoTags, error: tagsError } = await supabase
        .from("todo_tags")
        .select(`
          tags!inner (
            tag_name
          )
        `)
        .eq("todo_id", todo.todo_id);

      if (tagsError) {
        console.log("Error fetching tags for", todo.todo_id, ":", tagsError);
      }

      const tagList = todoTags?.map((t: any) => t.tags?.tag_name).filter(Boolean) || [];
      console.log("Tags for todo", todo.todo_id, ":", tagList);

      const sharedTodo: TodoWithExtras = {
        ...todo,
        tags: tagList,
        is_shared: true,
        shared: true,
        shared_permission: share.permission,
        shared_id: share.shared_id,
        shared_with: []
      };

      sharedTodos.push(sharedTodo);
    }

    console.log(`Returning ${sharedTodos.length} shared todos`);
    return NextResponse.json(sharedTodos);

  } catch (err: any) {
    console.error("[API SHARED GET] Unexpected error:", err);
    return NextResponse.json({ 
      error: "Server error", 
      details: err.message 
    }, { status: 500 });
  }
}