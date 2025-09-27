// src/app/api/sync-user/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  let reqBody;
  try {
    reqBody = await req.json();
  } catch (e) {
    console.error("Invalid JSON body:", e);
    return NextResponse.json({ success: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const { userId, email, fullName, avatarUrl } = reqBody;

  if (!userId || !email) {
    console.warn("Missing userId or email:", { userId, email });
    return NextResponse.json({ success: false, error: "userId and email are required" }, { status: 400 });
  }

  console.log("=== SYNC USER API CALLED ===", { userId, email, fullName, avatarUrl });

  // Test database connection dengan retry
  let connectionRetries = 3;
  while (connectionRetries > 0) {
    try {
      await prisma.$queryRaw`SELECT 1`;
      console.log("Database connection successful");
      break;
    } catch (connError: any) {
      connectionRetries--;
      console.error(`Database connection attempt failed (${3 - connectionRetries}/3):`, connError);
      
      if (connectionRetries === 0) {
        return NextResponse.json({ 
          success: false, 
          error: "Cannot connect to database", 
          detail: String(connError),
          suggestion: "Check DATABASE_URL and network connectivity"
        }, { status: 500 });
      }
      
      // Wait 1 second before retry
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  try {
    const user = await prisma.users.upsert({
      where: { user_id: userId },
      update: { 
        email, 
        full_name: fullName ?? "", 
        avatar_url: avatarUrl ?? null, 
        updated_at: new Date() 
      },
      create: { 
        user_id: userId, 
        email, 
        full_name: fullName ?? "", 
        avatar_url: avatarUrl ?? null 
      },
    });

    console.log("User upsert successful:", { userId: user.user_id });

    return NextResponse.json({
      success: true,
      user: {
        ...user,
        created_at: user.created_at?.toISOString(),
        updated_at: user.updated_at?.toISOString(),
      },
      serverTime: new Intl.DateTimeFormat("id-ID", {
        timeZone: "Asia/Jakarta",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(new Date()),
    });
  } catch (dbError: any) {
    console.error("=== DATABASE OPERATION ERROR ===");
    console.error("Error type:", typeof dbError);
    console.error("Error name:", dbError?.name);
    console.error("Error code:", dbError?.code);
    console.error("Error message:", dbError?.message);
    console.error("Error meta:", dbError?.meta);
    
    return NextResponse.json({ 
      success: false, 
      error: "Failed to upsert user", 
      detail: dbError?.message || String(dbError),
      errorCode: dbError?.code,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}