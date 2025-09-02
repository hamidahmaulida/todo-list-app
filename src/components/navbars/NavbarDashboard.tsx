"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NavbarDashboard() {
  const router = useRouter();

  const handleSignOut = () => {
    // Hapus token / session (contoh: localStorage)
    localStorage.removeItem("token");
    // Redirect ke login
    router.push("/login");
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="font-bold text-xl">Dashboard</div>
      <div className="space-x-4">
        <Link href="/dashboard">Home</Link>
        <Link href="/dashboard/settings">Settings</Link>
        <button
          onClick={handleSignOut}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
}
