// src/app/api/todos/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { TodoWithExtras } from "@/types/task";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// =======================
// Helper: pastikan user ada di Supabase
// =======================
async function ensureUserExists(userId: string) {
  try {
    const { data: existing } = await supabase
      .from("users")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (existing) return;

    // Ambil user langsung dari Clerk - FIXED: await clerkClient()
    const client = await clerkClient();
    const user = await client.users.getUser(userId);

    await supabase.from("users").insert({
      user_id: user.id,
      email: user.emailAddresses[0]?.emailAddress || `${userId}@temp.com`,
      full_name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() || "New User",
      avatar_url: user.imageUrl ?? null,
      created_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error ensuring user exists:", error);
    // Continue anyway, user might exist but query failed
  }
}

// =======================
// DELETE TODO
// =======================
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log("DELETE /api/todos/[id] - Start, ID:", params.id);
    
    const { userId } = await auth();
    console.log("User ID:", userId);
    
    if (!userId) {
      console.log("Unauthorized - no userId");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await ensureUserExists(userId);

    const todoId = params.id;
    if (!todoId) {
      console.log("Missing todo ID");
      return NextResponse.json({ error: "Invalid todo ID" }, { status: 400 });
    }

    console.log("Checking todo ownership...");
    
    const { data: existing, error } = await supabase
      .from("todos")
      .select("user_id")
      .eq("todo_id", todoId)
      .maybeSingle();

    if (error) {
      console.error("Error checking todo:", error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
    
    if (!existing) {
      console.log("Todo not found");
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }
    
    if (existing.user_id !== userId) {
      console.log("Access denied - not owner");
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    console.log("Soft deleting todo...");
    
    const { error: delErr } = await supabase
      .from("todos")
      .update({ 
        deleted_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq("todo_id", todoId);

    if (delErr) {
      console.error("Error deleting todo:", delErr);
      return NextResponse.json({ error: "Failed to delete todo" }, { status: 500 });
    }

    console.log("Todo deleted successfully");
    return NextResponse.json({ message: "Todo moved to trash", todo_id: todoId });
    
  } catch (err) {
    console.error("DELETE /todos/[id] error:", err);
    return NextResponse.json({ 
      error: "Internal server error",
      details: err instanceof Error ? err.message : "Unknown error"
    }, { status: 500 });
  }
}

// =======================
// PUT / UPDATE TODO
// =======================
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log("PUT /api/todos/[id] - Start, ID:", params.id);
    
    const { userId } = await auth();
    console.log("User ID:", userId);
    
    if (!userId) {
      console.log("Unauthorized - no userId");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await ensureUserExists(userId);

    const todoId = params.id;
    if (!todoId) {
      console.log("Missing todo ID");
      return NextResponse.json({ error: "Invalid todo ID" }, { status: 400 });
    }

    const body = await req.json();
    console.log("Request body:", body);

    const {
      title,
      content,
      tags,
      completed,
      due_date,
      priority,
      is_public,
      shared_with
    } = body;

    console.log("Fetching existing todo...");
    
    // ambil todo
    const { data: existing, error: fetchErr } = await supabase
      .from("todos")
      .select("*")
      .eq("todo_id", todoId)
      .maybeSingle();

    if (fetchErr) {
      console.error("Error fetching todo:", fetchErr);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
    
    if (!existing) {
      console.log("Todo not found");
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }
    
    if (existing.user_id !== userId) {
      console.log("Access denied - not owner");
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    console.log("Updating todo...");

    // update todo
    const { error: updErr } = await supabase
      .from("todos")
      .update({
        title: title !== undefined ? title : existing.title,
        content: content !== undefined ? content : existing.content,
        completed: completed !== undefined ? completed : existing.completed,
        due_date: due_date !== undefined ? due_date : existing.due_date,
        priority: priority !== undefined ? priority : existing.priority,
        is_public: is_public !== undefined ? is_public : existing.is_public,
        updated_at: new Date().toISOString(),
      })
      .eq("todo_id", todoId);

    if (updErr) {
      console.error("Error updating todo:", updErr);
      return NextResponse.json({ error: "Failed to update todo" }, { status: 500 });
    }

    console.log("Todo updated successfully");

    // handle tags
    if (Array.isArray(tags)) {
      console.log("Processing tags...");
      
      // Clear existing tags
      await supabase.from("todo_tags").delete().eq("todo_id", todoId);

      for (const tagName of tags) {
        const trimmed = tagName.trim();
        if (!trimmed) continue;

        try {
          console.log(`Processing tag: ${trimmed}`);
          
          // Check if tag exists
          const { data: existingTag } = await supabase
            .from("tags")
            .select("*")
            .eq("tag_name", trimmed)
            .eq("user_id", userId)
            .maybeSingle();

          let tagId: string;
          
          if (existingTag) {
            tagId = existingTag.tag_id;
          } else {
            // Create new tag
            const { data: newTag, error: tagError } = await supabase
              .from("tags")
              .insert({ user_id: userId, tag_name: trimmed })
              .select("*")
              .single();
              
            if (tagError || !newTag) {
              console.error(`Error creating tag ${trimmed}:`, tagError);
              continue;
            }
            
            tagId = newTag.tag_id;
          }

          // Link tag to todo
          const { error: linkError } = await supabase
            .from("todo_tags")
            .insert({ todo_id: todoId, tag_id: tagId });
            
          if (linkError) {
            console.error(`Error linking tag ${trimmed}:`, linkError);
          }
          
        } catch (tagError) {
          console.error(`Error processing tag ${trimmed}:`, tagError);
        }
      }
    }

    console.log("Fetching updated todo with relations...");

    // ambil todo lengkap
    const { data: todoWithExtrasData, error: fetchFinalError } = await supabase
      .from("todos")
      .select(`
        *,
        todo_tags(
          tags(tag_id, tag_name)
        ),
        shared_notes(shared_id, owner_id, shared_to, permission, access_type, status)
      `)
      .eq("todo_id", todoId)
      .maybeSingle();

    if (fetchFinalError) {
      console.error("Error fetching final todo:", fetchFinalError);
      return NextResponse.json({ error: "Failed to fetch updated todo" }, { status: 500 });
    }

    const todoResponse: TodoWithExtras = {
      ...todoWithExtrasData,
      tags: todoWithExtrasData?.todo_tags?.map((t: any) => t.tags?.tag_name).filter(Boolean) || [],
      shared: (todoWithExtrasData?.shared_notes?.length ?? 0) > 0,
    };

    console.log("PUT /api/todos/[id] - Success");
    return NextResponse.json(todoResponse);
    
  } catch (err) {
    console.error("PUT /todos/[id] error:", err);
    return NextResponse.json({ 
      error: "Internal server error",
      details: err instanceof Error ? err.message : "Unknown error"
    }, { status: 500 });
  }
}