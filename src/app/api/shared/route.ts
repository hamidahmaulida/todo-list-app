// src/app/api/shared/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { todo_id, access_type = "public", permission = "read" } = await req.json();

    if (!todo_id) return NextResponse.json({ error: "Missing todo_id" }, { status: 400 });

    // Ambil owner_id dari todo
    const { data: todo, error: todoError } = await supabase
      .from("todos")
      .select("user_id")
      .eq("todo_id", todo_id)
      .single();

    if (todoError || !todo) return NextResponse.json({ error: "Todo not found" }, { status: 404 });

    const owner_id = todo.user_id;

    // cek dulu apakah share sudah ada
    const { data: existing } = await supabase
      .from("shared_notes")
      .select("shared_id")
      .eq("todo_id", todo_id)
      .eq("owner_id", owner_id)
      .single();

    if (existing) {
      return NextResponse.json({
        shared_id: existing.shared_id,
        share_url: `${req.nextUrl.origin}/shared/${existing.shared_id}`,
      });
    }

    // insert baru kalau belum ada
    const { data, error } = await supabase
      .from("shared_notes")
      .insert([{ todo_id, owner_id, access_type, permission }])
      .select()
      .single();

    if (error || !data) return NextResponse.json({ error: error?.message || "Failed to create share" }, { status: 500 });

    return NextResponse.json({
      shared_id: data.shared_id,
      share_url: `${req.nextUrl.origin}/shared/${data.shared_id}`,
    }, { status: 201 });

  } catch (err) {
    console.error("POST /shared error:", err);
    return NextResponse.json({ error: "Failed to create shared note" }, { status: 500 });
  }
}
