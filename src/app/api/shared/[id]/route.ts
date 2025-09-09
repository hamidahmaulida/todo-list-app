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

// ✅ GET: get one shared note by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const { data, error } = await supabase
      .from("shared_notes")
      .select(`
        shared_id,
        access_type,
        permission,
        shared_to,
        todos (
          todo_id,
          title,
          content,
          created_at,
          updated_at,
          users (user_id, email)
        )
      `)
      .eq("shared_id", id)
      .single();

    if (error || !data) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // Public → langsung boleh
    if (data.access_type === "public") return NextResponse.json(data);

    // Invited → wajib login
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user_id = getUserIdFromToken(token);
    if (!user_id) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

    if (data.shared_to !== user_id) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("GET /shared/[id] error:", err);
    return NextResponse.json({ error: "Failed to fetch shared note" }, { status: 500 });
  }
}

// ✅ PUT: update share (misalnya ubah ke invited)
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const owner_id = getUserIdFromToken(token);
    if (!owner_id) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

    const body = await req.json();
    const { access_type, permission, shared_to } = body;

    const { data, error } = await supabase
      .from("shared_notes")
      .update({ access_type, permission, shared_to })
      .eq("shared_id", id)
      .eq("owner_id", owner_id)
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json(data);
  } catch (err) {
    console.error("PUT /shared/[id] error:", err);
    return NextResponse.json({ error: "Failed to update shared note" }, { status: 500 });
  }
}

// ✅ DELETE: unshare note
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const owner_id = getUserIdFromToken(token);
    if (!owner_id) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

    const { error } = await supabase
      .from("shared_notes")
      .delete()
      .eq("shared_id", id)
      .eq("owner_id", owner_id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ message: "Successfully unshared", id });
  } catch (err) {
    console.error("DELETE /shared/[id] error:", err);
    return NextResponse.json({ error: "Failed to unshare note" }, { status: 500 });
  }
}
