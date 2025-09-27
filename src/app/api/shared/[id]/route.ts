import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { auth } from "@clerk/nextjs/server"; 
import { v4 as uuidv4 } from "uuid";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ------------------- GET -------------------
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) return NextResponse.json({ error: "Missing shared ID" }, { status: 400 });

    const { data: sharedNote, error: sharedError } = await supabase
      .from("shared_notes")
      .select("*")
      .eq("shared_id", id)
      .maybeSingle();

    if (sharedError) return NextResponse.json({ error: sharedError.message }, { status: 500 });
    if (!sharedNote) return NextResponse.json({ error: "Shared note not found" }, { status: 404 });

    // Jika private, cek token
    if (sharedNote.access_type === "private") {
      const token = req.nextUrl.searchParams.get("token");
      if (!token || token !== sharedNote.invitation_token) {
        return NextResponse.json({ error: "Unauthorized access to private share" }, { status: 401 });
      }
    }

    const { data: todo } = await supabase
      .from("todos")
      .select("todo_id, title, content, created_at, updated_at, user_id")
      .eq("todo_id", sharedNote.todo_id)
      .maybeSingle();

    const { data: owner } = await supabase
      .from("users")
      .select("user_id, email, full_name")
      .eq("user_id", sharedNote.owner_id)
      .maybeSingle();

    return NextResponse.json({
      ...sharedNote,
      task: todo ? {
        ...todo,
        user: owner || null,
      } : null,
    });
  } catch (err) {
    console.error("GET /shared/[id] error:", err);
    return NextResponse.json({ error: "Failed to fetch shared note" }, { status: 500 });
  }
}

// ------------------- PUT -------------------
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) return NextResponse.json({ error: "Missing shared ID" }, { status: 400 });

    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { action, access_type, permission, shared_email } = body;

    const { data: sharedNote } = await supabase
      .from("shared_notes")
      .select("*")
      .eq("shared_id", id)
      .maybeSingle();

    if (!sharedNote) return NextResponse.json({ error: "Shared note not found" }, { status: 404 });

    const updateData: any = {};
    let needNotification = false;

    // Accept / Reject
    if (action === "accept") {
      if (sharedNote.shared_to !== userId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      updateData.status = "accepted";
      updateData.accepted_at = new Date().toISOString();
      needNotification = true;
    } else if (action === "reject") {
      if (sharedNote.shared_to !== userId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      updateData.status = "rejected";
      updateData.accepted_at = null;
      needNotification = true;
    } else {
      // Owner update
      if (sharedNote.owner_id !== userId) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }

      if (access_type && !["public", "private"].includes(access_type))
        return NextResponse.json({ error: "Invalid access_type" }, { status: 400 });
      if (permission && !["view", "edit", "comment"].includes(permission))
        return NextResponse.json({ error: "Invalid permission" }, { status: 400 });

      if (access_type) updateData.access_type = access_type;
      if (permission) updateData.permission = permission;

      if (access_type === "public") {
        updateData.shared_email = null;
        updateData.shared_to = null;
        updateData.invitation_token = null;
      } else if (access_type === "private" && shared_email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(shared_email)) return NextResponse.json({ error: "Invalid email" }, { status: 400 });

        const { data: user } = await supabase
          .from("users")
          .select("user_id")
          .eq("email", shared_email)
          .maybeSingle();

        updateData.shared_email = shared_email;
        updateData.shared_to = user?.user_id || null;
        updateData.invitation_token = uuidv4(); // regenerate token kalau email ganti
      }
    }

    const { data, error } = await supabase
      .from("shared_notes")
      .update(updateData)
      .eq("shared_id", id)
      .select()
      .maybeSingle();

    if (error) return NextResponse.json({ error: error.message || "Update failed" }, { status: 500 });

    // ===== Notifikasi =====
    if (needNotification) {
      try {
        const { data: actor } = await supabase
          .from("users")
          .select("full_name, email")
          .eq("user_id", userId)
          .maybeSingle();

        const notifTarget = action === "accept" || action === "reject"
          ? sharedNote.owner_id
          : sharedNote.shared_to;

        if (notifTarget) {
          await supabase.from("notifications").insert({
            notification_id: uuidv4(),
            user_id: notifTarget,
            type: "task_share_update",
            title: "Task Share Updated",
            message: `${
              actor?.full_name || actor?.email || "Someone"
            } ${action === "accept" ? "accepted" : "rejected"} a shared task`,
            data: {
              shared_id: data?.shared_id,
              todo_id: data?.todo_id,
              owner_id: sharedNote.owner_id,
              status: data?.status,
              permission: data?.permission,
            },
            is_read: false,
          });
        }
      } catch (notifError) {
        console.error("[ERROR] Notification failed:", notifError);
      }
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("PUT /shared/[id] error:", err);
    return NextResponse.json({ error: "Failed to update shared note" }, { status: 500 });
  }
}

// ------------------- DELETE -------------------
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) return NextResponse.json({ error: "Missing shared ID" }, { status: 400 });

    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { data, error } = await supabase
      .from("shared_notes")
      .delete()
      .eq("shared_id", id)
      .eq("owner_id", userId)
      .select()
      .maybeSingle();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    if (!data) return NextResponse.json({ error: "Shared note not found or permission denied" }, { status: 404 });

    return NextResponse.json({ message: "Successfully unshared", shared_id: id });
  } catch (err) {
    console.error("DELETE /shared/[id] error:", err);
    return NextResponse.json({ error: "Failed to delete shared note" }, { status: 500 });
  }
}