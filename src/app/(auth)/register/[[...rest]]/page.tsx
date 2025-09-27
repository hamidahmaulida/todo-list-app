"use client";

import { SignUp } from "@clerk/nextjs";

export default function RegisterPage() {
  return (
    <div className="flex justify-center items-center bg-[#F9FAFB]">
      <div className="w-full max-w-md">
        <SignUp
          path="/register"
          routing="path"
          signInUrl="/login"
          fallbackRedirectUrl="/dashboard"
          appearance={{
            elements: {
              formButtonPrimary: "bg-[#0F766E] hover:bg-[#115E59] text-white",
              card: "shadow-lg p-6 rounded-lg",
            },
          }}
        />
      </div>
    </div>
  );
}
