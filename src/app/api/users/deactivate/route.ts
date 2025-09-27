// src/app/api/users/deactivate/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import jwt from "jsonwebtoken";

// Supabase client pakai SERVICE_ROLE biar bisa update user
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function PUT(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "No token" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Verify JWT
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
      email: string;
    };

    // Update users.deleted_at = now()
    const { error } = await supabase
      .from("users")
      .update({ deleted_at: new Date().toISOString() })
      .eq("user_id", payload.userId);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Failed to deactivate account" }, { status: 500 });
    }

    return NextResponse.json({ message: "Account deactivated successfully" });
  } catch (err) {
    console.error("Deactivate API error:", err);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
