"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        if (rememberMe) localStorage.setItem("token", data.token);
        else sessionStorage.setItem("token", data.token);

        setMessage("Login successful!");
        setEmail("");
        setPassword("");
        router.push("/dashboard");
      } else setMessage(data.error || "Login failed");
    } catch {
      setMessage("Network error");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#fcfbf8] px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        <h2 className="text-xl font-semibold text-center text-[#1c170d] mb-4">
          Welcome Back
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl border border-[#e8e1cf] focus:outline-none focus:ring-1 focus:ring-[#f0b00f] placeholder:text-[#9b844b] text-[#1c170d]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-xl border border-[#e8e1cf] focus:outline-none focus:ring-1 focus:ring-[#f0b00f] placeholder:text-[#9b844b] text-[#1c170d]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>

          <div className="flex items-center justify-between text-sm text-[#9b844b]">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4"
              />
              Remember me
            </label>
            <Link
              href="/forgot-password"
              className="underline text-[#1c170d] hover:text-[#f0b00f]"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-[#f0b00f] text-[#1c170d] font-bold hover:bg-[#ddb30a] transition"
          >
            Login
          </button>

          {message && (
            <p className="mt-2 text-center text-sm text-red-500">{message}</p>
          )}
        </form>

        <p className="text-center text-sm text-[#9b844b] mt-4">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="underline text-[#1c170d] hover:text-[#f0b00f]"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  );
}
