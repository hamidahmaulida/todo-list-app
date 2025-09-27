// src/app/api/shared/check/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getAuth } from "@clerk/nextjs/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req);
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { todo_id } = body;

    if (!todo_id) {
      return NextResponse.json({ error: "todo_id is required" }, { status: 400 });
    }

    // Get all shares for this todo owned by current user
    const { data: shares, error } = await supabase
      .from("shared_notes")
      .select("*")
      .eq("todo_id", todo_id)
      .eq("owner_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching shares:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Generate share URLs for each share
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const formattedShares = shares?.map(share => ({
      shared_id: share.shared_id,
      access_type: share.access_type,
      permission: share.permission,
      shared_email: share.shared_email,
      shared_to: share.shared_to,
      share_url: share.access_type === "private" && share.invitation_token
        ? `${baseUrl}/shared/${share.shared_id}?token=${share.invitation_token}`
        : `${baseUrl}/shared/${share.shared_id}`,
      created_at: share.created_at,
      status: share.status || "pending"
    })) || [];

    return NextResponse.json(formattedShares);

  } catch (err: any) {
    console.error("[ERROR] POST /api/shared/check failed:", err);
    return NextResponse.json({ error: err.message || "Unknown error" }, { status: 500 });
  }
}