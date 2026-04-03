"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import GoogleIcon from "@/components/ui/GoogleIcon";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        window.location.href = "/dashboard";
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="font-display text-2xl font-bold text-white text-center mb-1">
        Welcome back
      </h2>
      <p className="text-slate-400 text-sm text-center mb-8">
        Sign in to your account
      </p>

      <div className="bg-[#0F0F1A] border border-[#1E1E3A] rounded-2xl p-8 shadow-[0_0_60px_rgba(124,58,237,0.1)]">
        {/* Google OAuth */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full bg-white/5 border border-[#1E1E3A] hover:bg-white/10 text-slate-300 hover:text-white font-medium px-5 py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-3"
        >
          <GoogleIcon />
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-[#1E1E3A]" />
          <span className="text-slate-600 text-xs">or continue with</span>
          <div className="flex-1 h-px bg-[#1E1E3A]" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`bg-[#08080F] border ${
                error ? "border-rose-500" : "border-[#1E1E3A]"
              } focus:border-violet-500 rounded-lg px-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-violet-500/50 transition-all w-full`}
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`bg-[#08080F] border ${
                error ? "border-rose-500" : "border-[#1E1E3A]"
              } focus:border-violet-500 rounded-lg px-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-violet-500/50 transition-all w-full`}
              required
            />
          </div>

          {error && (
            <p className="text-sm text-rose-500 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-violet-600 hover:bg-violet-500 text-white font-semibold px-5 py-3 rounded-lg transition-all duration-200 shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <svg
                className="animate-spin h-4 w-4 mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            ) : (
              "Sign in"
            )}
          </button>
        </form>
      </div>

      <p className="text-center text-sm text-slate-600 mt-6">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="text-violet-400 hover:text-violet-300 transition-colors"
        >
          Sign up
        </Link>
      </p>
    </>
  );
}
