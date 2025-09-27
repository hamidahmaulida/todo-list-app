"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function UserSyncProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();
  const [synced, setSynced] = useState(false);

  useEffect(() => {
    if (!isLoaded || !user || synced) return;

    const email = user.primaryEmailAddress?.emailAddress;
    if (!email) {
      console.warn("⚠️ No primary email, skipping sync");
      return;
    }

    console.log("Syncing user:", user.id, email);

    fetch("/api/sync-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        email,
        fullName: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
        avatarUrl: user.imageUrl,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("User sync response:", data);
        if (data.success) setSynced(true);
      })
      .catch((err) => console.error("Sync failed:", err));
  }, [user, isLoaded, synced]);

  return <>{children}</>;
}