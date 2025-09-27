// src/app/api/todos/[id]/restore/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { auth } from "@clerk/nextjs/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Ambil user dari Clerk
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const todoId = params.id;
    if (!todoId) return NextResponse.json({ error: "Invalid todo ID" }, { status: 400 });

    // Restore todo di Supabase
    const { data, error } = await supabase
      .from("todos")
      .update({ deleted_at: null })
      .eq("todo_id", todoId)
      .eq("user_id", userId)
      .select();

    if (error) {
      console.error("Supabase error restoring todo:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: "Todo not found", status: 404 });
    }

    return NextResponse.json({ success: true, restored: data[0] });
  } catch (err) {
    console.error("POST /todos/[id]/restore error:", err);
    return NextResponse.json({ error: "Failed to restore todo" }, { status: 500 });
  }
}
