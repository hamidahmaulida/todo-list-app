"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiMenu, FiSettings, FiLogOut } from "react-icons/fi";

interface NavbarDashboardProps {
  user: { name: string; email: string };
  onToggleSidebar: () => void;
}

export default function NavbarDashboard({ user, onToggleSidebar }: NavbarDashboardProps) {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getUserInitials = (email: string) => email.split('@')[0].substring(0, 2).toUpperCase();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setDropdownOpen(false);
    router.push("/login");
  };

  const handleSettings = () => {
    setDropdownOpen(false);
    router.push("/dashboard/settings");
  };

  return (
    <nav className="w-full bg-white shadow-sm px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      {/* Kiri */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded hover:bg-gray-100 transition-colors"
        >
          <FiMenu className="w-6 h-6 text-[#0F766E]" />
        </button>
        <span className="text-lg font-semibold text-[#0F766E]">Dashboard</span>
      </div>

      {/* Kanan */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="p-1 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          <div className="w-9 h-9 bg-[#0F766E] text-white rounded-full flex items-center justify-center text-sm font-medium shadow-sm">
            {getUserInitials(user.email)}
          </div>
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-50 md:w-56 max-w-[calc(100vw-2rem)]">
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Signed in as</p>
              <p className="text-sm font-medium text-gray-900 truncate mt-1">{user.email}</p>
            </div>
            <div className="py-1">
              <button
                onClick={handleSettings}
                className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
              >
                <FiSettings className="mr-3 h-4 w-4" />
                Settings
              </button>
              <button
                onClick={handleSignOut}
                className="w-full flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
              >
                <FiLogOut className="mr-3 h-4 w-4" />
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
