"use client";

import React, { useState } from "react";
import Link from "next/link";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);

    if (!isSupabaseConfigured) {
      setErrorMsg(
        "Supabase is not configured yet. Please configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local"
      );
      setIsLoading(false);
      return;
    }

    try {
      const origin = typeof window !== "undefined" ? window.location.origin : "";
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${origin}/forgot-password?reset=true`,
      });

      if (error) {
        setErrorMsg(error.message);
      } else {
        setIsSubmitted(true);
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to dispatch reset email";
      setErrorMsg(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (newPassword.length < 6) {
      setErrorMsg("Password should be at least 6 characters long.");
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        setErrorMsg(error.message);
      } else {
        setResetSuccess(true);
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to update password";
      setErrorMsg(message);
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
            Reset Password
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Recover access to your learning assistant account
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-white/80 bg-white/85 p-6 sm:p-8 shadow-[0_20px_60px_-20px_rgba(79,70,229,0.15)] backdrop-blur-xl">
          {errorMsg && (
            <div className="mb-4 rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs font-semibold text-rose-700 flex items-center gap-2">
              <span>⚠️</span> {errorMsg}
            </div>
          )}

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-slate-600 leading-5">
                Enter your registered school or parent email address. We will verify your account and provide reset instructions.
              </p>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Registered Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. aarav.student@school.edu"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="mt-2 w-full rounded-xl bg-blue-700 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-700/25 transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:opacity-75 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Sending Reset Link...
                  </>
                ) : (
                  <>Send Password Reset Link →</>
                )}
              </button>
            </form>
          ) : resetSuccess ? (
            <div className="text-center py-4 space-y-4 animate-fade-in">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-2xl text-emerald-600">
                ✓
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                Password Successfully Reset!
              </h2>
              <p className="text-sm text-slate-600">
                Your new password has been applied. You can now log into your account.
              </p>
              <Link
                href="/login"
                className="inline-block w-full rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white shadow-md hover:bg-blue-800 transition"
              >
                Proceed to Login →
              </Link>
            </div>
          ) : (
            <div className="space-y-5 animate-fade-in">
              <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-900 text-sm">
                <div className="flex items-center gap-2 font-bold mb-1">
                  <span>✓</span> Reset Instructions Dispatched!
                </div>
                <p className="text-xs text-emerald-700">
                  A verification link has been issued for <strong>{email}</strong>.
                </p>
              </div>

              <form onSubmit={handleResetPassword} className="space-y-3 pt-2">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Set New Password
                </p>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold outline-none focus:border-blue-600"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white shadow-md hover:bg-emerald-700 transition"
                >
                  Confirm & Update Password
                </button>
              </form>
            </div>
          )}

          {/* Links */}
          <div className="mt-6 border-t border-slate-100 pt-5 text-center">
            <Link
              href="/login"
              className="text-xs font-bold text-blue-700 hover:text-blue-800 hover:underline inline-flex items-center gap-1"
            >
              ← Back to Sign In
            </Link>
          </div>
        </div>

        {/* Back to Home Link */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
