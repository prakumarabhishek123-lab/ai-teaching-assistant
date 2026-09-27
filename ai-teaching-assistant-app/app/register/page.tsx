"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CLASS_LEVELS, SUBJECTS, RoleType, ROLE_TYPES, ROLE_DASHBOARD_PATHS } from "@/lib/config/education";
import { useAuth } from "@/lib/auth/authContext";

const roleDescriptions: Record<RoleType, { label: string; icon: string; tag: string }> = {
  student: {
    label: "Student",
    icon: "🎓",
    tag: "For learners in Class 1–8",
  },
  teacher: {
    label: "Teacher",
    icon: "👩‍🏫",
    tag: "For educators & instructors",
  },
  parent: {
    label: "Parent",
    icon: "👨‍👩‍👧",
    tag: "For guardians & families",
  },
};

export default function RegisterPage() {
  const router = useRouter();
  const { user, isLoading: authLoading, register } = useAuth();
  const [selectedRole, setSelectedRole] = useState<RoleType>("student");

  // Common fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Role specific fields
  const [classLevel, setClassLevel] = useState<string>("Class 5");
  const [section, setSection] = useState("A");
  const [rollNo, setRollNo] = useState("");
  const [subject, setSubject] = useState<string>("Mathematics");
  const [childName, setChildName] = useState("");
  const [childClass, setChildClass] = useState("Class 5");
  const [relation, setRelation] = useState("Father");

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      router.replace(ROLE_DASHBOARD_PATHS[user.role] || "/student/dashboard");
    }
  }, [user, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match. Please verify both fields.");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("Password should be at least 6 characters long.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await register({
        role: selectedRole,
        name: fullName,
        email,
        password,
        classLevel: selectedRole === "student" ? classLevel : undefined,
        section: selectedRole === "student" ? section : undefined,
        rollNo: selectedRole === "student" ? rollNo : undefined,
        subject: selectedRole === "teacher" ? subject : undefined,
        childName: selectedRole === "parent" ? childName : undefined,
        childClass: selectedRole === "parent" ? `${childClass} - Sec ${section}` : undefined,
      });

      if (res?.error) {
        setErrorMsg(res.error);
        setIsLoading(false);
      } else if (res?.emailConfirmationRequired) {
        setSuccessMsg(
          "Account created! Please check your email to confirm your account, then sign in."
        );
        setIsLoading(false);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Registration failed";
      setErrorMsg(message);
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#f8faff_0%,#f3eeff_50%,#fff5fa_100%)] text-slate-950 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
      {/* Background ambient accents */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-blue-300/30 blur-3xl" />
        <div className="absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-violet-300/30 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-lg">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center gap-3 font-bold tracking-tight text-xl mb-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-700 text-sm font-black text-white shadow-lg shadow-blue-700/25">
              AI
            </span>
            <span className="text-slate-900">AI Teaching Assistant</span>
          </Link>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
            Create an Account
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Join the AI Teaching Assistant learning platform
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-white/80 bg-white/90 p-6 sm:p-8 shadow-[0_20px_60px_-20px_rgba(79,70,229,0.15)] backdrop-blur-xl">
          {/* Step 1: Role Selection */}
          <div className="mb-6">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
              1. Choose your account type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {ROLE_TYPES.map((role) => {
                const info = roleDescriptions[role];
                const isSelected = selectedRole === role;
                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => {
                      setSelectedRole(role);
                      setErrorMsg("");
                      setSuccessMsg("");
                    }}
                    className={`flex flex-col items-center justify-center rounded-2xl p-3 text-center transition-all ${
                      isSelected
                        ? "bg-slate-950 text-white shadow-md shadow-slate-950/20 scale-[1.02]"
                        : "border border-slate-200 bg-white/70 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span className="text-xl mb-1">{info.icon}</span>
                    <span className="text-xs font-bold">{info.label}</span>
                    <span className={`text-[10px] mt-0.5 line-clamp-1 ${isSelected ? "text-slate-300" : "text-slate-400"}`}>
                      {info.tag}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {errorMsg && (
            <div className="mb-4 rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs font-semibold text-rose-700 flex items-center gap-2">
              <span>⚠️</span> {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="mb-4 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-xs font-semibold text-emerald-800 space-y-2">
              <div className="flex items-center gap-2 font-bold">
                <span>✓</span> {successMsg}
              </div>
              <Link
                href="/login"
                className="inline-block rounded-lg bg-emerald-700 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-800 transition"
              >
                Proceed to Login →
              </Link>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Common Inputs */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={
                  selectedRole === "student"
                    ? "e.g. Aarav Sharma"
                    : selectedRole === "teacher"
                      ? "e.g. Sunita Verma"
                      : "e.g. Rajesh Sharma"
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@school.edu"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            {/* Role Specific Dynamic Inputs */}
            {selectedRole === "student" && (
              <div className="rounded-2xl bg-blue-50/70 p-4 border border-blue-100 space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-800">
                  Student Details
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Class Level
                    </label>
                    <select
                      value={classLevel}
                      onChange={(e) => setClassLevel(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-2.5 py-2 text-xs font-semibold outline-none focus:border-blue-600"
                    >
                      {CLASS_LEVELS.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Section
                    </label>
                    <input
                      type="text"
                      maxLength={2}
                      value={section}
                      onChange={(e) => setSection(e.target.value.toUpperCase())}
                      placeholder="A"
                      className="w-full rounded-xl border border-slate-200 bg-white px-2.5 py-2 text-xs font-semibold outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Roll No.
                    </label>
                    <input
                      type="number"
                      value={rollNo}
                      onChange={(e) => setRollNo(e.target.value)}
                      placeholder="12"
                      className="w-full rounded-xl border border-slate-200 bg-white px-2.5 py-2 text-xs font-semibold outline-none focus:border-blue-600"
                    />
                  </div>
                </div>
              </div>
            )}

            {selectedRole === "teacher" && (
              <div className="rounded-2xl bg-amber-50/70 p-4 border border-amber-100 space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  Teacher Specialization
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Primary Subject
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-2.5 py-2 text-xs font-semibold outline-none focus:border-amber-600"
                    >
                      {SUBJECTS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Lead Class Level
                    </label>
                    <select
                      value={classLevel}
                      onChange={(e) => setClassLevel(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-2.5 py-2 text-xs font-semibold outline-none focus:border-amber-600"
                    >
                      {CLASS_LEVELS.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {selectedRole === "parent" && (
              <div className="rounded-2xl bg-violet-50/70 p-4 border border-violet-100 space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-violet-800">
                  Linked Child Information
                </p>
                <div className="grid sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Child&apos;s Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={childName}
                      onChange={(e) => setChildName(e.target.value)}
                      placeholder="e.g. Aarav Sharma"
                      className="w-full rounded-xl border border-slate-200 bg-white px-2.5 py-2 text-xs font-semibold outline-none focus:border-violet-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Child&apos;s Class
                    </label>
                    <select
                      value={childClass}
                      onChange={(e) => setChildClass(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-2.5 py-2 text-xs font-semibold outline-none focus:border-violet-600"
                    >
                      {CLASS_LEVELS.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Relationship to Student
                  </label>
                  <select
                    value={relation}
                    onChange={(e) => setRelation(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-2.5 py-2 text-xs font-semibold outline-none focus:border-violet-600"
                  >
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Guardian">Guardian</option>
                  </select>
                </div>
              </div>
            )}

            {/* Password Fields */}
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat password"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-3 w-full rounded-xl bg-blue-700 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-700/25 transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:opacity-75 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Creating {roleDescriptions[selectedRole].label} Account...
                </>
              ) : (
                <>Complete Registration & Go to Dashboard →</>
              )}
            </button>
          </form>

          {/* Switch to Login */}
          <div className="mt-5 border-t border-slate-100 pt-4 text-center">
            <p className="text-xs text-slate-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-bold text-blue-700 hover:text-blue-800 hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home Link */}
        <div className="mt-5 text-center">
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
