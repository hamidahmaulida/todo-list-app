import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import jwt from "jsonwebtoken";
import { SharedNote, TodoWithExtras } from "@/types/task";

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

// ==================== GET ====================
export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const userId = getUserIdFromToken(token);
    if (!userId) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

    const { data, error } = await supabase
      .from("shared_notes")
      .select(`
        *,
        todos (
          todo_id, title, content, created_at, updated_at, user_id,
          todo_tags (
            tags(tag_name)
          )
        )
      `)
      .eq("shared_id", id)
      .single();

    if (error || !data) return NextResponse.json({ error: error?.message || "Not found" }, { status: 404 });

    const sharedNote: SharedNote = {
      shared_id: data.shared_id,
      todo_id: data.todo_id,
      owner_id: data.owner_id,
      shared_to: data.shared_to,
      permission: data.permission,
      access_type: "invited", // default
    };

    return NextResponse.json({ shared: sharedNote, task: data.todos });
  } catch (err) {
    console.error("GET /shared/[id] error:", err);
    return NextResponse.json({ error: "Failed to fetch shared note" }, { status: 500 });
  }
}

// ==================== PUT ====================
export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const userId = getUserIdFromToken(token);
    if (!userId) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

    const body = await req.json();

    const { error } = await supabase
      .from("shared_notes")
      .update({
        shared_to: body.shared_to,
        permission: body.permission,
      })
      .eq("shared_id", id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("PUT /shared/[id] error:", err);
    return NextResponse.json({ error: "Failed to update shared note" }, { status: 500 });
  }
}

// ==================== DELETE ====================
export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const userId = getUserIdFromToken(token);
    if (!userId) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

    const { error } = await supabase.from("shared_notes").delete().eq("shared_id", id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /shared/[id] error:", err);
    return NextResponse.json({ error: "Failed to delete shared note" }, { status: 500 });
  }
}
