"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RoleType, ROLE_TYPES, ROLE_DASHBOARD_PATHS } from "@/lib/config/education";
import { useAuth } from "@/lib/auth/authContext";

const roleInfo: Record<RoleType, { label: string; icon: string; description: string; color: string }> = {
  student: {
    label: "Student",
    icon: "🎓",
    description: "Access lessons, doubt solver, assignments & voice quiz",
    color: "bg-blue-600 text-white",
  },
  teacher: {
    label: "Teacher",
    icon: "👩‍🏫",
    description: "Manage classes, create worksheets, quizzes & tracks",
    color: "bg-amber-600 text-white",
  },
  parent: {
    label: "Parent",
    icon: "👨‍👩‍👧",
    description: "Review child attendance, marks, activities & chat",
    color: "bg-violet-600 text-white",
  },
};

export default function LoginPage() {
  const router = useRouter();
  const { user, isLoading: authLoading, login } = useAuth();
  const [selectedRole, setSelectedRole] = useState<RoleType>("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!authLoading && user) {
      router.replace(ROLE_DASHBOARD_PATHS[user.role] || "/student/dashboard");
    }
  }, [user, authLoading, router]);

  const handleRoleChange = (role: RoleType) => {
    setSelectedRole(role);
    setErrorMsg("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);

    try {
      const res = await login(email, password, selectedRole);
      if (res?.error) {
        setErrorMsg(res.error);
        setIsLoading(false);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to sign in";
      setErrorMsg(message);
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#f8faff_0%,#f3eeff_50%,#fff5fa_100%)] text-slate-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background ambient accents */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-blue-300/30 blur-3xl" />
        <div className="absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-violet-300/30 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 font-bold tracking-tight text-xl mb-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-700 text-base font-black text-white shadow-lg shadow-blue-700/25">
              AI
            </span>
            <span className="text-slate-900">AI Teaching Assistant</span>
          </Link>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Sign in to access your learning workspace
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-3xl border border-white/80 bg-white/85 p-6 sm:p-8 shadow-[0_20px_60px_-20px_rgba(79,70,229,0.15)] backdrop-blur-xl">
          {/* Role Selection Tabs */}
          <div className="mb-6">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
              Select Your Role
            </label>
            <div className="grid grid-cols-3 gap-2">
              {ROLE_TYPES.map((role) => {
                const info = roleInfo[role];
                const isSelected = selectedRole === role;
                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => handleRoleChange(role)}
                    className={`flex flex-col items-center justify-center rounded-2xl p-3 text-center transition-all ${
                      isSelected
                        ? "bg-slate-950 text-white shadow-md shadow-slate-950/20 scale-[1.02]"
                        : "border border-slate-200 bg-white/70 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span className="text-xl mb-1">{info.icon}</span>
                    <span className="text-xs font-bold">{info.label}</span>
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-center text-xs text-slate-500 font-medium">
              {roleInfo[selectedRole].description}
            </p>
          </div>


          {errorMsg && (
            <div className="mb-4 rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs font-semibold text-rose-700 flex items-center gap-2">
              <span>⚠️</span> {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@school.edu"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-semibold text-blue-700 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 px-1 py-1"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                Remember me on this browser
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 w-full rounded-xl bg-blue-700 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-700/25 transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:opacity-75 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Opening {roleInfo[selectedRole].label} Dashboard...
                </>
              ) : (
                <>Sign In as {roleInfo[selectedRole].label} →</>
              )}
            </button>
          </form>

          {/* Switch to Register */}
          <div className="mt-6 border-t border-slate-100 pt-5 text-center">
            <p className="text-xs text-slate-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-bold text-blue-700 hover:text-blue-800 hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home Link */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition inline-flex items-center gap-1.5"
          >
            ← Back to Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
