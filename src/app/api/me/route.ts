import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Helper konversi UTC ke WIB
function toWIB(date?: Date | null) {
  if (!date) return null;
  return date.toLocaleString("id-ID", { timeZone: "Asia/Jakarta" });
}

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth(); // Pastikan user sudah auth
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const clerkUser = await currentUser();
    if (!clerkUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let user = await prisma.users.findUnique({
      where: { user_id: userId },
      select: {
        user_id: true,
        email: true,
        full_name: true,
        avatar_url: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!user) {
      // Jika user belum ada di DB, create
      user = await prisma.users.create({
        data: {
          user_id: userId,
          email: clerkUser.primaryEmailAddress?.emailAddress || "",
          full_name: clerkUser.fullName,
          avatar_url: clerkUser.imageUrl,
        },
        select: {
          user_id: true,
          email: true,
          full_name: true,
          avatar_url: true,
          created_at: true,
          updated_at: true,
        },
      });
    } else {
      // Update user info dari Clerk jika ada perubahan
      user = await prisma.users.update({
        where: { user_id: userId },
        data: {
          email: clerkUser.primaryEmailAddress?.emailAddress || user.email,
          full_name: clerkUser.fullName || user.full_name,
          avatar_url: clerkUser.imageUrl || user.avatar_url,
        },
        select: {
          user_id: true,
          email: true,
          full_name: true,
          avatar_url: true,
          created_at: true,
          updated_at: true,
        },
      });
    }

    // Kirim response dengan timestamp sudah dikonversi ke WIB
    return NextResponse.json({
      user: {
        ...user,
        created_at: toWIB(user.created_at),
        updated_at: toWIB(user.updated_at),
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        emailVerified:
          clerkUser.primaryEmailAddress?.verification?.status === "verified",
      },
    });
  } catch (error) {
    console.error("Me API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
