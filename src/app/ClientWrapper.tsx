"use client"; // ini benar2 client component
import { useEffect } from "react";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("Clearing localStorage and sessionStorage for dev...");
      localStorage.clear();
      sessionStorage.clear();
    }
  }, []);

  return <>{children}</>;
}
