import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import jwt from "jsonwebtoken";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function getUserIdFromToken(token: string) {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { user_id: string };
    return payload.user_id;
  } catch {
    return null;
  }
}

// POST /api/shared
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { todo_id, permission = "read", access_type = "public", shared_to = null } = body;

    if (!todo_id) return NextResponse.json({ error: "Missing todo_id" }, { status: 400 });

    // Ambil token, tapi public share bisa tanpa login
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    let owner_id: string | null = null;
    if (access_type === "invited") {
      if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      owner_id = getUserIdFromToken(token);
      if (!owner_id) return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Kalau public tapi ada token, bisa juga pakai owner_id
    if (!owner_id && token) owner_id = getUserIdFromToken(token);

    if (!owner_id) return NextResponse.json({ error: "Owner required" }, { status: 401 });

    // Cek todo milik owner
    const { data: todo, error: fetchError } = await supabase
      .from("todos")
      .select("todo_id")
      .eq("todo_id", todo_id)
      .eq("user_id", owner_id)
      .single();

    if (fetchError || !todo) return NextResponse.json({ error: "Todo not found or access denied" }, { status: 404 });

    // Insert shared note
    const { data, error } = await supabase
      .from("shared_notes")
      .insert([{ todo_id, owner_id, permission, access_type, shared_to }])
      .select()
      .single();

    if (error || !data) return NextResponse.json({ error: error?.message || "Failed to create share" }, { status: 500 });

    const share_url = `${req.nextUrl.origin}/shared/${data.shared_id}`;
    return NextResponse.json({ ...data, share_url }, { status: 201 });
  } catch (err) {
    console.error("POST /shared error:", err);
    return NextResponse.json({ error: "Failed to create shared note" }, { status: 500 });
  }
}
