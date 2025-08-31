import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import jwt from "jsonwebtoken";

// Pakai SERVICE_ROLE_KEY untuk bypass RLS
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader)
      return NextResponse.json({ error: "No token" }, { status: 401 });

    const token = authHeader.split(" ")[1];
    if (!token)
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });

    // Verifikasi JWT
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
      email: string;
    };

    // Ambil data user dari Supabase
    const { data: user, error } = await supabase
      .from("users")
      .select("email")
      .eq("user_id", payload.userId) // sesuaikan dengan kolom Supabase
      .single();

    if (error || !user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json(user);
  } catch (err) {
    console.error("Me API error:", err);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
