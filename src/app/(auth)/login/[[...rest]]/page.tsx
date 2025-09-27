"use client";

import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center bg-[#F9FAFB]">
      <div className="w-full max-w-md">
        <SignIn
          path="/login"
          routing="path"
          signUpUrl="/register"
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
