import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import jwt from "jsonwebtoken";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Ambil user_id dari token
function getUserIdFromToken(token: string): string | null {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { user_id: string };
    return payload.user_id;
  } catch {
    return null;
  }
}

// ------------------- GET -------------------
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✅ await
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

    if (sharedError || !sharedNote)
      return NextResponse.json({ error: "Shared note not found" }, { status: 404 });

    const { data: todo, error: todoError } = await supabase
      .from("todos")
      .select("todo_id, title, content, created_at, updated_at, user_id")
      .eq("todo_id", sharedNote.todo_id)
      .single();

    if (todoError || !todo)
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });

    const { data: owner, error: ownerError } = await supabase
      .from("users")
      .select("user_id, email")
      .eq("user_id", sharedNote.owner_id)
      .single();

    if (ownerError || !owner)
      return NextResponse.json({ error: "Owner not found" }, { status: 404 });

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
        user: owner,
      },
    };

    if (sharedNote.access_type === "public") return NextResponse.json(responseData);

    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user_id = getUserIdFromToken(token);
    if (!user_id) return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    if (sharedNote.shared_to !== user_id)
      return NextResponse.json({ error: "Access denied" }, { status: 403 });

    return NextResponse.json(responseData);
  } catch (err) {
    console.error("GET /shared/[id] error:", err);
    return NextResponse.json({ error: "Failed to fetch shared note" }, { status: 500 });
  }
}

// ------------------- PUT -------------------
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

    if (error || !data)
      return NextResponse.json({ error: error?.message || "Failed to update" }, { status: 400 });

    return NextResponse.json(data);
  } catch (err) {
    console.error("PUT /shared/[id] error:", err);
    return NextResponse.json({ error: "Failed to update shared note" }, { status: 500 });
  }
}

// ------------------- DELETE -------------------
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

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ message: "Successfully unshared", shared_id: id });
  } catch (err) {
    console.error("DELETE /shared/[id] error:", err);
    return NextResponse.json({ error: "Failed to delete shared note" }, { status: 500 });
  }
}
