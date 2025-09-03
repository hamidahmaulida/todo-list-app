"use client";
import React, { useState } from "react";
import Link from "next/link";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setIsError(false);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Account created! Please login.");
        setIsError(false);
        setEmail("");
        setPassword("");
      } else {
        setMessage(data.error || "Registration failed");
        setIsError(true);
      }
    } catch (err) {
      console.error(err);
      setMessage("Network error");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        <h2 className="text-xl font-semibold text-center text-[#1c170d] mb-4">
          Create Your Account
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleRegister}>
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

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-full bg-[#f0b00f] text-[#1c170d] font-bold transition hover:bg-[#ddb30a] ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Registering..." : "Sign Up"}
          </button>

          {message && (
            <p
              className={`mt-2 text-center text-sm ${
                isError ? "text-red-500" : "text-green-500"
              }`}
            >
              {message}
            </p>
          )}
        </form>

        <p className="text-center text-sm text-[#9b844b] mt-4">
          Already have an account?{" "}
          <Link
            href="/login"
            className="underline text-[#1c170d] hover:text-[#f0b00f]"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
