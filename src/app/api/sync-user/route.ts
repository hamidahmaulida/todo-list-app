import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

function getSupabase(): SupabaseClient | any {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE;

  if (!supabaseUrl || !supabaseKey) {
    console.error("[SYNC-USER] Missing Supabase env variables!", {
      NEXT_PUBLIC_SUPABASE_URL: supabaseUrl,
      SUPABASE_SERVICE_ROLE: supabaseKey,
    });

    // Dummy client supaya build tetap aman
    return {
      from: () => ({
        upsert: async () => ({ data: null, error: { message: "Supabase key missing" } }),
      }),
    } as any;
  }

  return createClient(supabaseUrl, supabaseKey);
}

export async function POST(req: Request) {
  const supabase = getSupabase(); // client siap dipakai

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

  try {
    const { data, error } = await supabase
      .from("users")
      .upsert({
        user_id: userId,
        email,
        full_name: fullName ?? "",
        avatar_url: avatarUrl ?? null,
        updated_at: new Date().toISOString(),
      })
      .select();

    if (error) {
      console.error("[SYNC-USER] Supabase upsert error:", error);
      return NextResponse.json({ success: false, error: "Failed to upsert user", detail: error.message }, { status: 500 });
    }

    console.log("[SYNC-USER] Upsert successful:", data);

    return NextResponse.json({
      success: true,
      user: data,
      serverTime: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error("[SYNC-USER] Unexpected error:", err);
    return NextResponse.json({ success: false, error: "Unexpected error", detail: err?.message || String(err) }, { status: 500 });
  }
}
