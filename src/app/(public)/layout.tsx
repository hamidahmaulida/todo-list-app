// app/(public)/layout.tsx
"use client"; 
import NavbarPublic from "@/components/navbars/NavbarPublic";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbf8]">
      {/* Navbar hanya muncul di halaman public */}
      <NavbarPublic />
      <main className="flex-1">{children}</main>
    </div>
  );
}
