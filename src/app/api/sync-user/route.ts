// src/app/api/sync-user/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!
);

export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch (e) {
    console.error("[SYNC-USER] Invalid JSON body:", e);
    return NextResponse.json({ success: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const { userId, email, fullName, avatarUrl } = body;

  if (!userId || !email) {
    console.warn("[SYNC-USER] Missing userId or email:", { userId, email });
    return NextResponse.json({ success: false, error: "userId and email are required" }, { status: 400 });
  }

  console.log("[SYNC-USER] Incoming request:", { userId, email, fullName, avatarUrl });

  try {
    // 1️Cek dulu apakah user_id sudah ada
    const { data: existingUser, error: selectError } = await supabase
      .from("users")
      .select("*")
      .eq("user_id", userId)
      .limit(1)
      .single();

    if (selectError && selectError.code !== "PGRST116") { // single tidak menemukan row
      console.error("[SYNC-USER] Error checking existing user:", selectError);
      return NextResponse.json({ success: false, error: "Failed to check existing user", detail: selectError.message }, { status: 500 });
    }

    if (existingUser) {
      console.log("[SYNC-USER] User exists, updating:", existingUser.user_id);
    } else {
      console.log("[SYNC-USER] User does not exist, will create new one");
    }

    // Upsert user
    const { data, error: upsertError } = await supabase
      .from("users")
      .upsert({
        user_id: userId,
        email,
        full_name: fullName ?? "",
        avatar_url: avatarUrl ?? null,
        updated_at: new Date().toISOString(),
      })
      .select();

    if (upsertError) {
      console.error("[SYNC-USER] Supabase upsert error:", upsertError);
      return NextResponse.json({ success: false, error: "Failed to upsert user", detail: upsertError.message }, { status: 500 });
    }

    console.log("[SYNC-USER] Upsert successful:", data);

    // Return debug info
    return NextResponse.json({
      success: true,
      user: data,
      debug: {
        incomingUserId: userId,
        existsBeforeUpsert: !!existingUser,
      },
      serverTime: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error("[SYNC-USER] Unexpected error:", err);
    return NextResponse.json({ success: false, error: "Unexpected error", detail: err?.message || String(err) }, { status: 500 });
  }
}
