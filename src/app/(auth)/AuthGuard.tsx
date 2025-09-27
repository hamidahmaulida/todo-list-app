"use client";

import { ReactNode, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface AuthGuardProps {
  children: ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace("/login"); // kalau belum login, redirect ke login
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) return <div>Loading...</div>; // spinner sementara
  if (!isSignedIn) return null; // menunggu redirect ke login

  return <>{children}</>;
}
