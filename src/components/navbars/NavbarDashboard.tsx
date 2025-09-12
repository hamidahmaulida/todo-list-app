"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiMenu } from "react-icons/fi";

interface NavbarDashboardProps {
  user: { name: string; email: string };
  onToggleSidebar: () => void;
}

export default function NavbarDashboard({ user, onToggleSidebar }: NavbarDashboardProps) {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Get initial from email
  const getInitial = (email: string) => {
    return email.charAt(0).toUpperCase();
  };

  const handleSignOut = async () => {
    try {
      // Clear tokens
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      
      // Clear any other auth data if needed
      localStorage.removeItem("user");
      sessionStorage.removeItem("user");
      
      // Close dropdown
      setDropdownOpen(false);
      
      // Redirect to login
      router.push("/login");
      
      // Optional: force reload to clear any cached data
      window.location.href = "/login";
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleSettingsClick = () => {
    setDropdownOpen(false);
    router.push("/dashboard/settings");
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
          className="flex items-center justify-center w-10 h-10 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-200 font-semibold text-lg"
        >
          {getInitial(user.email)}
        </button>

        {dropdownOpen && (
          <>
            {/* Backdrop to close dropdown when clicking outside */}
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setDropdownOpen(false)}
            />
            
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 z-20">
              {/* User info section */}
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">{user.email}</p>
              </div>
              
              {/* Menu items */}
              <div className="py-1">
                <button
                  onClick={handleSettingsClick}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-800 transition-colors duration-150"
                >
                  Settings
                </button>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-150"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}