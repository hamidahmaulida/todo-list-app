"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  // hanya redirect kalau user masuk halaman private
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace("/login"); // kalau belum login, pindah ke login
    }
  }, [isSignedIn, isLoaded, router]);

  if (!isLoaded) return <div>Loading...</div>; // spinner sementara
  if (!isSignedIn) return null; // belum login, tampilkan login/register

  return <>{children}</>; // user sudah login, tampilkan konten private
}
