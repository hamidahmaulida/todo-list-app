"use server";

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getAuth } from "@clerk/nextjs/server";
import { v4 as uuidv4 } from "uuid";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    // ===== CEK AUTH =====
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ===== AMBIL BODY =====
    const body = await req.json();
    const { todo_id, shared_email, access_type, permission } = body;

    // ===== VALIDASI INPUT =====
    if (!todo_id) {
      return NextResponse.json({ error: "todo_id is required" }, { status: 400 });
    }

    if (access_type === "private" && !shared_email) {
      return NextResponse.json(
        { error: "shared_email is required for private access" },
        { status: 400 }
      );
    }

    if (shared_email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(shared_email)) {
        return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
      }
    }

    // ===== CEK TODO MILIK USER =====
    const { data: todoData, error: todoError } = await supabase
      .from("todos")
      .select("*")
      .eq("todo_id", todo_id)
      .eq("user_id", userId)
      .single();

    if (todoError || !todoData) {
      return NextResponse.json(
        { error: "Todo not found or access denied" },
        { status: 404 }
      );
    }

    // ===== CEK SHARE SUDAH ADA =====
    const { data: existingShare } = await supabase
      .from("shared_notes")
      .select("*")
      .eq("todo_id", todo_id)
      .eq("owner_id", userId)
      .maybeSingle();

    const validPermissions = ["view", "edit", "comment"];
    const finalPermission = validPermissions.includes(permission) ? permission : "view";
    const finalAccessType = access_type === "public" ? "public" : "private";

    // ===== CEK USER TUJUAN =====
    let shared_to: string | null = null;
    if (finalAccessType === "private" && shared_email) {
      const { data: userData } = await supabase
        .from("users")
        .select("user_id")
        .eq("email", shared_email)
        .maybeSingle();
      shared_to = userData?.user_id || null;
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    let shareResult;
    let isNewShare = false;

    // ===== UPDATE SHARE =====
    if (existingShare) {
      const updateData: any = {
        access_type: finalAccessType,
        permission: finalPermission,
      };

      if (finalAccessType === "private") {
        updateData.shared_to = shared_to;
        updateData.shared_email = shared_email;
        updateData.status = "pending";

        if (
          existingShare.access_type === "public" ||
          (existingShare.access_type === "private" &&
            existingShare.shared_email !== shared_email)
        ) {
          updateData.invitation_token = uuidv4();
        }
      } else {
        updateData.shared_to = null;
        updateData.shared_email = null;
        updateData.invitation_token = null;
        updateData.status = "accepted";
      }

      const { data: updatedShare, error: updateError } = await supabase
        .from("shared_notes")
        .update(updateData)
        .eq("shared_id", existingShare.shared_id)
        .select()
        .single();

      if (updateError) {
        console.error("[ERROR] Update failed:", updateError);
        return NextResponse.json({ error: updateError.message }, { status: 500 });
      }

      shareResult = updatedShare;
    } else {
      // ===== CREATE SHARE BARU =====
      const shared_id = uuidv4();
      const invitation_token = uuidv4();
      isNewShare = true;

      const insertData: any = {
        shared_id,
        todo_id,
        owner_id: userId,
        access_type: finalAccessType,
        permission: finalPermission,
        invitation_token,
        status: finalAccessType === "private" ? "pending" : "accepted",
      };

      if (finalAccessType === "private") {
        insertData.shared_to = shared_to;
        insertData.shared_email = shared_email;
      }

      const { data: newShare, error: insertError } = await supabase
        .from("shared_notes")
        .insert(insertData)
        .select()
        .single();

      if (insertError) {
        console.error("[ERROR] Insert failed:", insertError);
        return NextResponse.json({ error: insertError.message }, { status: 500 });
      }

      shareResult = newShare;
    }

    // ===== GENERATE SHARE URL =====
    const share_url =
      shareResult.access_type === "private" && shareResult.invitation_token
        ? `${baseUrl}/shared/${shareResult.shared_id}?token=${shareResult.invitation_token}`
        : `${baseUrl}/shared/${shareResult.shared_id}`;

    // ===== BUAT NOTIFIKASI =====
    let notifCreated = false;
    if (isNewShare && shareResult.access_type === "private" && shareResult.shared_to) {
      try {
        const { data: ownerData } = await supabase
          .from("users")
          .select("full_name, email")
          .eq("user_id", userId)
          .single();

        const notificationData = {
          notification_id: uuidv4(),
          user_id: shareResult.shared_to,
          type: "task_shared",
          title: "Task Shared With You",
          message: `${
            ownerData?.full_name || ownerData?.email || "Someone"
          } shared "${todoData.title || "a task"}" with you`,
          data: {
            shared_id: shareResult.shared_id,
            todo_id,
            owner_id: userId,
            permission: shareResult.permission,
            share_url,
            status: "pending" // IMPORTANT: Include status here
          },
          is_read: false,
        };

        const { error: notifError } = await supabase
          .from("notifications")
          .insert(notificationData);

        if (notifError) console.error("[ERROR] Failed to create notification:", notifError);
        else notifCreated = true;
      } catch (notifError) {
        console.error("[ERROR] Notification creation failed:", notifError);
      }
    }

    // ===== RETURN RESPONSE =====
    return NextResponse.json({
      success: true,
      shared_id: shareResult.shared_id,
      share_url,
      access_type: shareResult.access_type,
      permission: shareResult.permission,
      shared_email: shareResult.access_type === "private" ? shareResult.shared_email : null,
      shared_to: shareResult.shared_to,
      status: shareResult.status,
      is_updated: !!existingShare,
      notifCreated,
    });
  } catch (err: any) {
    console.error("[ERROR] POST /api/shared failed:", err);
    return NextResponse.json(
      { error: err.message || "Unknown error" },
      { status: 500 }
    );
  }
}