import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getAuth } from "@clerk/nextjs/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function PATCH(req: NextRequest) {
  try {
    const { userId } = getAuth(req);
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { shared_id } = body;
    if (!shared_id) return NextResponse.json({ error: "shared_id is required" }, { status: 400 });

    console.log(`[ACCEPT] Processing accept for shared_id: ${shared_id}, user: ${userId}`);

    // Update shared_notes status
    const { data: shareData, error: shareError } = await supabase
      .from("shared_notes")
      .update({ 
        status: "accepted", 
        accepted_at: new Date().toISOString() 
      })
      .eq("shared_id", shared_id)
      .eq("shared_to", userId)
      .select()
      .single();

    if (shareError || !shareData) {
      console.error("[ERROR] Failed to accept invite:", shareError);
      return NextResponse.json({ 
        error: shareError?.message || "Failed to accept invite",
        success: false 
      }, { status: 500 });
    }

    console.log(`[ACCEPT] Successfully updated shared_notes:`, shareData);

    // Update all related notifications
    const { data: existingNotifications, error: fetchError } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", userId)
      .eq("type", "task_shared");

    if (!fetchError && existingNotifications?.length > 0) {
      console.log(`[ACCEPT] Found ${existingNotifications.length} notifications to check`);
      
      for (const notification of existingNotifications) {
        // Check if this notification is for the shared_id we're accepting
        if (notification.data?.shared_id === shared_id) {
          const updatedData = {
            ...notification.data,
            status: "accepted"
          };
          
          console.log(`[ACCEPT] Updating notification ${notification.notification_id}`);
          
          const { error: updateError } = await supabase
            .from("notifications")
            .update({ 
              data: updatedData,
              is_read: true
            })
            .eq("notification_id", notification.notification_id);

          if (updateError) {
            console.error("[ERROR] Failed to update notification:", updateError);
          } else {
            console.log(`[ACCEPT] Successfully updated notification ${notification.notification_id}`);
          }
        }
      }
    } else if (fetchError) {
      console.error("[ERROR] Failed to fetch notifications:", fetchError);
    }

    return NextResponse.json({ 
      success: true, 
      shared_note: shareData,
      message: "Invite accepted successfully"
    });
  } catch (err: any) {
    console.error("[ERROR] Accept invite failed:", err);
    return NextResponse.json({ 
      error: err.message || "Unknown error",
      success: false 
    }, { status: 500 });
  }
}