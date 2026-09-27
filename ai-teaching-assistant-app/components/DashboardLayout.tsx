"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CLASS_LEVELS,
  LANGUAGES,
  ROLE_DASHBOARD_PATHS,
  ROLE_TYPES,
  SUBJECTS,
  type RoleType,
} from "@/lib/config/education";
import { useAuth } from "@/lib/auth/authContext";
import { ProfileModal } from "./ProfileModal";

type DashboardLayoutProps = {
  role: RoleType;
  title: string;
  description: string;
  children?: React.ReactNode;
};

const roleLabels: Record<RoleType, string> = {
  student: "Student",
  teacher: "Teacher",
  parent: "Parent",
};

export function DashboardLayout({
  role,
  title,
  description,
  children,
}: DashboardLayoutProps) {
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <span className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          <p className="text-sm font-semibold text-slate-600">Verifying session...</p>
        </div>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  const currentDisplayName = user.name || (role === "student" ? "Aarav Sharma" : role === "teacher" ? "Sunita Verma" : "Rajesh Sharma");
  const currentAvatar = user.avatar || (role === "student" ? "AS" : role === "teacher" ? "SV" : "RS");

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950 flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Brand Logo & Mobile Toggle */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 lg:hidden"
              >
                {isMobileMenuOpen ? "✕" : "☰"}
              </button>

              <Link href="/" className="flex items-center gap-3 font-bold tracking-tight">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-700 text-sm font-black text-white shadow-sm shadow-blue-700/20">
                  AI
                </span>
                <span className="text-base sm:text-lg">AI Teaching Assistant</span>
              </Link>
            </div>

            {/* Right: Quick Links, Tools, and User Profile Menu */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/dashboard"
                className="hidden rounded-full border border-violet-200 bg-violet-50 px-3.5 py-1.5 text-xs font-bold text-violet-800 transition hover:bg-violet-100 sm:inline-flex items-center gap-1.5"
              >
                <span>✨</span> AI Tools
              </Link>

              <Link
                href="/"
                className="hidden sm:inline-flex rounded-full bg-slate-100 px-3.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-200"
              >
                Home
              </Link>

              <span className="hidden md:inline-flex rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold capitalize text-blue-800 border border-blue-100">
                {roleLabels[role]} workspace
              </span>

              <Link
                href="/login"
                className="hidden sm:inline-flex rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
                title="Switch to another account"
              >
                Login
              </Link>

              <button
                type="button"
                onClick={logout}
                className="inline-flex items-center gap-1 rounded-full border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-700 hover:bg-rose-100 transition"
                title="Sign out and return to Login"
              >
                <span>⎋</span>
                <span className="hidden sm:inline">Log Out</span>
              </button>

              {/* User Profile Pill & Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 rounded-full border border-slate-200 bg-white p-1 pr-3 shadow-sm hover:border-slate-300 hover:bg-slate-50 transition focus:outline-none focus:ring-4 focus:ring-blue-100"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-700 text-xs font-black text-white">
                    {currentAvatar}
                  </span>
                  <span className="text-xs font-bold text-slate-800 max-w-[100px] truncate sm:max-w-[130px]">
                    {currentDisplayName}
                  </span>
                  <span className="text-xs text-slate-400">▾</span>
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl z-50 animate-fade-in text-slate-800">
                    <div className="px-3 py-2 border-b border-slate-100 mb-1">
                      <p className="text-xs font-bold text-slate-900 truncate">{currentDisplayName}</p>
                      <p className="text-[11px] text-slate-500 capitalize">{role} Account</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        setIsProfileOpen(true);
                      }}
                      className="w-full flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition text-left"
                    >
                      <span>👤</span> My Profile
                    </button>

                    <Link
                      href="/dashboard"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="w-full flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition text-left"
                    >
                      <span>✨</span> AI Learning Tools
                    </Link>

                    <div className="my-1 border-t border-slate-100 pt-1">
                      <p className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Switch Workspace
                      </p>
                      {ROLE_TYPES.map((r) => (
                        <Link
                          key={r}
                          href={ROLE_DASHBOARD_PATHS[r]}
                          onClick={() => setIsUserMenuOpen(false)}
                          className={`flex items-center justify-between rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                            r === role ? "bg-blue-50 text-blue-800 font-bold" : "text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          <span>{roleLabels[r]} Dashboard</span>
                          {r === role && <span className="text-xs">✓</span>}
                        </Link>
                      ))}
                    </div>

                    <div className="mt-1 border-t border-slate-100 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 transition text-left"
                      >
                        <span>⎋</span> Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Desktop Role Tabs Nav */}
          <nav aria-label="Role dashboards" className="hidden sm:flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1">
              Dashboards:
            </span>
            {ROLE_TYPES.map((item) => (
              <Link
                key={item}
                href={ROLE_DASHBOARD_PATHS[item]}
                aria-current={item === role ? "page" : undefined}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  item === role
                    ? "bg-slate-950 text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {roleLabels[item]}
              </Link>
            ))}
            <Link
              href="/dashboard"
              className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition"
            >
              AI Tools Hub
            </Link>
          </nav>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="border-t border-slate-200 bg-white px-4 py-4 sm:hidden animate-fade-in space-y-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Dashboards
              </p>
              <div className="grid grid-cols-3 gap-2">
                {ROLE_TYPES.map((item) => (
                  <Link
                    key={item}
                    href={ROLE_DASHBOARD_PATHS[item]}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`rounded-xl p-2.5 text-center text-xs font-bold transition ${
                      item === role
                        ? "bg-blue-700 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {roleLabels[item]}
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-1 pt-2 border-t border-slate-100">
              <Link
                href="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                <span>✨ AI Learning Tools</span>
                <span className="text-slate-400">→</span>
              </Link>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsProfileOpen(true);
                }}
                className="w-full flex items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 text-left"
              >
                <span>👤 Profile Details</span>
                <span className="text-slate-400">→</span>
              </button>
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                <span>🏠 Home</span>
                <span className="text-slate-400">→</span>
              </Link>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  logout();
                }}
                className="w-full flex items-center justify-between rounded-xl px-3 py-2 text-sm font-bold text-rose-600 hover:bg-rose-50 text-left"
              >
                <span>⎋ Log Out</span>
                <span className="text-rose-400">→</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Body */}
      <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-8 lg:px-10 lg:py-12">
        {/* Hero Section */}
        <section className="rounded-3xl bg-gradient-to-br from-blue-700 to-violet-700 p-6 text-white shadow-xl shadow-blue-950/10 sm:p-9">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-100">
                Class 1–8 learning hub
              </p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
              <p className="mt-3 max-w-2xl leading-7 text-blue-50">{description}</p>
            </div>
            <button
              type="button"
              onClick={() => setIsProfileOpen(true)}
              className="self-start md:self-center shrink-0 flex items-center gap-2 rounded-2xl bg-white/15 px-4 py-2.5 text-xs font-bold text-white hover:bg-white/25 transition backdrop-blur-sm border border-white/20"
            >
              <span>👤</span> View Profile
            </button>
          </div>
        </section>

        {/* Learning Configuration Summary Cards */}
        <section className="mt-6 grid gap-4 sm:grid-cols-3" aria-label="Learning configuration">
          <SummaryCard label="Class levels" value={`${CLASS_LEVELS.length} classes`} detail="Class 1 through Class 8" />
          <SummaryCard label="Subjects" value={`${SUBJECTS.length} subjects`} detail={SUBJECTS.slice(0, 3).join(", ")} />
          <SummaryCard label="Languages" value={`${LANGUAGES.length} languages`} detail={LANGUAGES.join(", ")} />
        </section>

        {/* Dashboard Modules Container */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          {children ?? (
            <div>
              <h2 className="text-xl font-bold">Dashboard modules are ready to connect</h2>
              <p className="mt-2 text-slate-600">
                Role-specific lessons, assignments, progress, and communication tools will appear here.
              </p>
            </div>
          )}
        </section>
      </div>

      {/* Global Profile Modal */}
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </main>
  );
}

function SummaryCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold text-slate-500">{label}</p>
      <p className="mt-2 text-xl font-bold">{value}</p>
      <p className="mt-1 truncate text-sm text-slate-600" title={detail}>{detail}</p>
    </article>
  );
}
