// app/api/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcrypt";

// Gunakan SERVICE_ROLE_KEY untuk server-side (bypass RLS)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,   // URL masih bisa public
  process.env.SUPABASE_SERVICE_ROLE_KEY!   // server-only key
);

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Validasi input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Cek apakah email sudah ada
    const { data: existingUser, error: fetchError } = await supabase
      .from("users")
      .select("user_id")
      .eq("email", email)
      .maybeSingle(); // lebih aman daripada .single()

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user baru
    const { data, error: insertError } = await supabase
      .from("users")
      .insert([{ email, password_hash: hashedPassword }])
      .select();

    if (insertError || !data || data.length === 0) {
      console.error("Supabase insert error:", insertError);
      return NextResponse.json(
        { error: "Failed to create user" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "User created successfully",
      userId: data[0].user_id,
    });
  } catch (err) {
    console.error("Register error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
