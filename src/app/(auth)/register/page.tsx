"use client";
import React, { useState } from "react";
import Link from "next/link";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Account created! Please login.");
        setEmail("");
        setPassword("");
      } else {
        setMessage(data.error || "Registration failed");
      }
    } catch (err) {
      console.error(err); // biar ga unused
      setMessage("Network error");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#fcfbf8] px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        <h2 className="text-xl font-semibold text-center text-[#1c170d] mb-4">
          Create Your Account
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleRegister}>
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl border border-[#e8e1cf] focus:outline-none focus:ring-1 focus:ring-[#f0b00f] placeholder:text-[#9b844b]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-xl border border-[#e8e1cf] focus:outline-none focus:ring-1 focus:ring-[#f0b00f] placeholder:text-[#9b844b]"
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

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-[#f0b00f] text-[#1c170d] font-bold hover:bg-[#ddb30a] transition"
          >
            Sign Up
          </button>

          {message && (
            <p className="mt-2 text-center text-sm text-red-500">{message}</p>
          )}
        </form>

        <p className="text-center text-sm text-[#9b844b] mt-4">
          Already have an account?{" "}
          <Link href="/login" className="underline hover:text-[#f0b00f]">
            Sign In
          </Link>
        </p>
      </div>
    </main>
  );
}