"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiUser, FiMenu } from "react-icons/fi";

interface NavbarDashboardProps {
  user: { name: string; email: string };
  onToggleSidebar: () => void;
}

export default function NavbarDashboard({ user, onToggleSidebar }: NavbarDashboardProps) {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <nav className="w-full bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      {/* Kiri: tombol hamburger + label dashboard */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded hover:bg-gray-100"
        >
          <FiMenu className="w-6 h-6 text-[#0F766E]" />
        </button>
        <span className="text-lg font-semibold text-green-800">Dashboard</span>
      </div>

      {/* Kanan: profile */}
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2 bg-green-100 px-3 py-1 rounded hover:bg-green-200 transition"
        >
          <FiUser className="w-5 h-5 text-green-800" />
          <span className="font-medium text-green-800">{user.name}</span>
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded border border-gray-200">
            <div className="px-4 py-2 border-b border-gray-100 text-sm text-gray-700">
              {user.email}
            </div>
            <button
              onClick={() => router.push("/dashboard/settings")}
              className="w-full text-left px-4 py-2 hover:bg-green-100 text-green-800"
            >
              Settings
            </button>
            <button
              onClick={handleSignOut}
              className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-500"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
