// src/app/api/shared/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import jwt from "jsonwebtoken";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function getUserIdFromToken(token: string) {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    return payload.userId;
  } catch {
    return null;
  }
}

/**
 * GET shared note by ID
 * - public → bisa tanpa login
 * - invited → wajib login dan cocok user_id
 */
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    // Step 1: Get shared note data
    const { data: sharedNote, error: sharedError } = await supabase
      .from("shared_notes")
      .select(`
        shared_id,
        todo_id,
        owner_id,
        access_type,
        permission,
        shared_to,
        created_at
      `)
      .eq("shared_id", id)
      .single();

    if (sharedError || !sharedNote) {
      console.error("Shared note not found:", sharedError);
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Step 2: Get todo data
    const { data: todo, error: todoError } = await supabase
      .from("todos")
      .select(`
        todo_id,
        title,
        content,
        created_at,
        updated_at,
        user_id
      `)
      .eq("todo_id", sharedNote.todo_id)
      .single();

    if (todoError || !todo) {
      console.error("Todo not found:", todoError);
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    // Step 3: Get owner data
    const { data: owner, error: ownerError } = await supabase
      .from("users")
      .select("user_id, email")
      .eq("user_id", sharedNote.owner_id)
      .single();

    if (ownerError || !owner) {
      console.error("Owner not found:", ownerError);
      return NextResponse.json({ error: "Owner not found" }, { status: 404 });
    }

    // Prepare response data
    const responseData = {
      shared_id: sharedNote.shared_id,
      access_type: sharedNote.access_type,
      permission: sharedNote.permission,
      task: {
        todo_id: todo.todo_id,
        title: todo.title,
        content: todo.content,
        created_at: todo.created_at,
        updated_at: todo.updated_at,
        user: owner
      }
    };

    // Check access permissions
    if (sharedNote.access_type === "public") {
      return NextResponse.json(responseData);
    }

    // For invited access, check authentication
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user_id = getUserIdFromToken(token);
    if (!user_id) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    if (sharedNote.shared_to !== user_id) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    return NextResponse.json(responseData);

  } catch (err) {
    console.error("GET /shared/[id] error:", err);
    return NextResponse.json({ error: "Failed to fetch shared note" }, { status: 500 });
  }
}

/**
 * PUT update shared note
 */
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user_id = getUserIdFromToken(token);
    if (!user_id) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

    const body = await req.json();
    const { access_type, permission, shared_to } = body;

    const { data, error } = await supabase
      .from("shared_notes")
      .update({ access_type, permission, shared_to })
      .eq("shared_id", id)
      .eq("owner_id", user_id)
      .select()
      .single();

    if (error || !data) {
      return NextResponse.json({ error: error?.message || "Failed to update" }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("PUT /shared error:", err);
    return NextResponse.json({ error: "Failed to update shared note" }, { status: 500 });
  }
}

/**
 * DELETE shared note
 */
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user_id = getUserIdFromToken(token);
    if (!user_id) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

    const { error } = await supabase
      .from("shared_notes")
      .delete()
      .eq("shared_id", id)
      .eq("owner_id", user_id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Successfully unshared", shared_id: id });
  } catch (err) {
    console.error("DELETE /shared error:", err);
    return NextResponse.json({ error: "Failed to delete shared note" }, { status: 500 });
  }
}