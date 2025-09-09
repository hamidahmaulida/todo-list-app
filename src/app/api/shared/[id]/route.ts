import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import jwt from "jsonwebtoken";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function getUserIdFromToken(token: string) {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    return payload.userId;
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
}

/**
 * GET shared note by ID
 * - kalau public → bisa diakses tanpa login
 * - kalau invited → wajib login dan cocok user_id
 */
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const { data, error } = await supabase
      .from("shared_notes")
      .select(`
        shared_id,
        access_type,
        permission,
        shared_to,
        todos (
          todo_id,
          title,
          content,
          created_at,
          updated_at,
          users (user_id, email)
        )
      `)
      .eq("shared_id", id)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Public → langsung boleh
    if (data.access_type === "public") {
      return NextResponse.json(data);
    }

    // Invited → wajib login
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user_id = getUserIdFromToken(token);
    if (!user_id) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

    // pastikan user cocok
    if (data.shared_to !== user_id) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    return NextResponse.json(data);

  } catch (err) {
    console.error("GET /shared error:", err);
    return NextResponse.json({ error: "Failed to fetch shared note" }, { status: 500 });
  }
}
