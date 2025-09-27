// src/app/api/notifications/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    if (!id) return NextResponse.json({ error: "Notification ID is required" }, { status: 400 });

    const { data, error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("notification_id", id)
      .eq("user_id", userId)
      .select()
      .single();

    if (error || !data) {
      return NextResponse.json({ error: error?.message || "Failed to mark as read" }, { status: 500 });
    }

    return NextResponse.json({ message: "Notification marked as read", notification: data });
  } catch (err) {
    console.error("PATCH /notifications/:id error:", err);
    return NextResponse.json({ error: "Failed to mark notification as read" }, { status: 500 });
  }
}