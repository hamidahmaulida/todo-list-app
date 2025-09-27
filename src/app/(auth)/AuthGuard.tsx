"use client";

import { ReactNode, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface AuthGuardProps {
  children: ReactNode;
  redirectTo?: string; // default dashboard
}

export default function AuthGuard({ children, redirectTo = "/dashboard" }: AuthGuardProps) {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace("/login"); // kalau belum login, ke login
    }
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      // kalau sudah login, redirect ke dashboard
      router.replace(redirectTo);
    }
  }, [isLoaded, isSignedIn, router, redirectTo]);

  if (!isLoaded) return <div>Loading...</div>; // spinner sementara
  if (!isSignedIn) return null; // menunggu redirect ke login

  return <>{children}</>;
}
