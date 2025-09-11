// src/app/api/shared/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { todo_id, access_type = "public", permission = "read", shared_to } = await req.json();

    if (!todo_id) return NextResponse.json({ error: "Missing todo_id" }, { status: 400 });

    // Ambil owner_id dari todo
    const { data: todo, error: todoError } = await supabase
      .from("todos")
      .select("user_id")
      .eq("todo_id", todo_id)
      .single();

    if (todoError || !todo) return NextResponse.json({ error: "Todo not found" }, { status: 404 });

    const owner_id = todo.user_id;

    // Cek dulu apakah share sudah ada
    const { data: existing } = await supabase
      .from("shared_notes")
      .select("shared_id, access_type, permission, shared_to")
      .eq("todo_id", todo_id)
      .eq("owner_id", owner_id)
      .single();

    if (existing) {
      // Return existing share dengan informasi lengkap
      return NextResponse.json({
        shared_id: existing.shared_id,
        share_url: `${req.nextUrl.origin}/shared/${existing.shared_id}`,
        access_type: existing.access_type,
        permission: existing.permission,
        shared_to: existing.shared_to,
      });
    }

    // Validasi shared_to untuk invited access
    if (access_type === "invited" && shared_to) {
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(shared_to)) {
        return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
      }
    }

    // Insert baru kalau belum ada
    const insertData: {
      todo_id: string;
      owner_id: string;
      access_type: string;
      permission: string;
      shared_to?: string;
    } = { 
      todo_id, 
      owner_id, 
      access_type, 
      permission 
    };

    // Add shared_to only if provided and access_type is invited
    if (access_type === "invited" && shared_to) {
      insertData.shared_to = shared_to;
    }

    const { data, error } = await supabase
      .from("shared_notes")
      .insert([insertData])
      .select()
      .single();

    if (error || !data) {
      console.error("Failed to create share:", error);
      return NextResponse.json({ 
        error: error?.message || "Failed to create share" 
      }, { status: 500 });
    }

    return NextResponse.json({
      shared_id: data.shared_id,
      share_url: `${req.nextUrl.origin}/shared/${data.shared_id}`,
      access_type: data.access_type,
      permission: data.permission,
      shared_to: data.shared_to,
    }, { status: 201 });

  } catch (err) {
    console.error("POST /shared error:", err);
    return NextResponse.json({ error: "Failed to create shared note" }, { status: 500 });
  }
}