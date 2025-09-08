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
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
}

// GET shared notes
export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user_id = getUserIdFromToken(token);
    if (!user_id) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

    // ambil semua notes yang dishare ke user
    const { data, error } = await supabase
      .from("shared_notes")
      .select(`
        shared_id,
        permission,
        todos (
          todo_id,
          title,
          content,
          created_at,
          updated_at,
          users (user_id, email)
        ),
        shared_to_user (user_id, email)
      `)
      .eq("shared_to", user_id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json(data);
  } catch (err) {
    console.error("GET /shared error:", err);
    return NextResponse.json({ error: "Failed to fetch shared notes" }, { status: 500 });
  }
}

// POST share note
export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const owner_id = getUserIdFromToken(token);
    if (!owner_id) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

    const body = await req.json();
    const { todo_id, shared_to } = body;

    if (!todo_id || !shared_to) return NextResponse.json({ error: "Missing todo_id or shared_to" }, { status: 400 });

    // pastikan todo milik owner
    const { data: todo, error: fetchError } = await supabase
      .from("todos")
      .select("*")
      .eq("todo_id", todo_id)
      .single();

    if (fetchError || !todo) return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    if (todo.user_id !== owner_id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    // insert shared_notes
    const { data, error } = await supabase
      .from("shared_notes")
      .insert([{ todo_id, owner_id, shared_to }])
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    console.error("POST /shared error:", err);
    return NextResponse.json({ error: "Failed to share note" }, { status: 500 });
  }
}
