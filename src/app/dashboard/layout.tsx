"use client";
import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavbarDashboard from "@/components/navbars/NavbarDashboard";
// import Sidebar from "@/components/sidebar/Sidebar"; // Uncomment when ready to use

interface User {
  email: string;
}

interface DashboardLayoutProps {
  children: ReactNode;
}

// Interface untuk props yang akan di-pass ke children
interface ChildProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Keep for future sidebar implementation
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  // Cek auth user
  useEffect(() => {
    const checkAuth = async () => {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const res = await fetch("/api/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Token invalid");

        const data: User = await res.json();
        if (!data.email) throw new Error("Invalid user data");

        setUser(data);
      } catch (err) {
        console.error(err);
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  if (!user) return null;

  const renderChildren = () => {
    if (React.isValidElement(children)) {
      // FIXED: Specify proper type instead of 'any'
      return React.cloneElement(children as ReactElement<ChildProps>, {
        isModalOpen: isTaskModalOpen,
        setIsModalOpen: setIsTaskModalOpen,
      });
    }
    return children;
  };

  const handleToggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
    // TODO: Remove this console.log when sidebar is implemented
    console.log("Sidebar toggle clicked, sidebarOpen:", !sidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbf8]">
      {/* Navbar */}
      <NavbarDashboard
        user={{ name: user.email, email: user.email }}
        onToggleSidebar={handleToggleSidebar}
      />

      <div className="flex flex-1 relative">
        {/* Sidebar - Uncomment when ready to use */}
        {/*
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onNewTask={() => setIsTaskModalOpen(true)}
        />
        */}

        {/* Main content */}
        <main className="flex-1 p-6">{renderChildren()}</main>
      </div>
    </div>
  );
}