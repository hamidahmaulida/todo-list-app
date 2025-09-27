"use client";

import { ReactNode } from "react";
import NavbarDashboard from "@/components/navbars/NavbarDashboard";
import { useUser } from "@clerk/nextjs";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user } = useUser();

  const currentUser = {
    full_name: user?.fullName || "Anonymous",
    email: user?.primaryEmailAddress?.emailAddress || "no-email@example.com",
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50"> 
      {/* ⬆️ bg-gray-50 biar konsisten sama RootLayout */}
      <NavbarDashboard
        user={currentUser}
        onToggleSidebar={() => console.log("toggle sidebar")}
      />
      <main className="flex-1">{children}</main>
    </div>
  );
}
