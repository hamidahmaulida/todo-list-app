// app/api/shared/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { todo_id, access_type = "public", permission = "read" } = body;

    if (!todo_id) {
      return NextResponse.json({ error: "Missing todo_id" }, { status: 400 });
    }

    // Owner bisa diambil dari todo langsung, nggak perlu login
    const { data: todo, error: todoError } = await supabase
      .from("todos")
      .select("todo_id, user_id")
      .eq("todo_id", todo_id)
      .single();

    if (todoError || !todo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    // Insert shared note (public)
    const { data, error } = await supabase
      .from("shared_notes")
      .insert([{ todo_id, owner_id: todo.user_id, access_type, permission }])
      .select()
      .single();

    if (error || !data) {
      return NextResponse.json({ error: error?.message || "Failed to create share" }, { status: 500 });
    }

    return NextResponse.json({ shared_id: data.shared_id, share_url: `${req.nextUrl.origin}/shared/${data.shared_id}` }, { status: 201 });
  } catch (err) {
    console.error("POST /shared error:", err);
    return NextResponse.json({ error: "Failed to create shared note" }, { status: 500 });
  }
}
