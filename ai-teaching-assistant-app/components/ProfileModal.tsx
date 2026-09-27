"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth/authContext";
import { RoleType, ROLE_TYPES } from "@/lib/config/education";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const roleNames: Record<RoleType, string> = {
  student: "Student",
  teacher: "Teacher",
  parent: "Parent",
};

const roleColors: Record<RoleType, string> = {
  student: "bg-blue-600 text-white",
  teacher: "bg-amber-600 text-white",
  parent: "bg-violet-600 text-white",
};

export function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const { user, updateProfile, switchRole, logout } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [childName, setChildName] = useState("");
  const [subject, setSubject] = useState("");
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "+91 98765 43210");
      setChildName(user.childName || "Aarav Sharma");
      setSubject(user.subject || "Mathematics & Science");
    }
  }, [user]);

  if (!isOpen || !user) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      email,
      phone,
      childName: user.role === "parent" ? childName : undefined,
      subject: user.role === "teacher" ? subject : undefined,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in"
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-200 transition-all max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-blue-700 via-violet-700 to-indigo-800 p-6 text-white relative">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 hover:bg-white/25 transition text-white"
          >
            ✕
          </button>
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white text-2xl font-black text-blue-700 shadow-md">
              {user.avatar || user.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0">
              <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${roleColors[user.role]}`}>
                {roleNames[user.role]}
              </span>
              <h2 id="profile-modal-title" className="text-xl font-bold truncate mt-1">
                {user.name}
              </h2>
              <p className="text-xs text-blue-100 truncate">{user.school}</p>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {savedSuccess && (
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-sm font-semibold text-emerald-800 flex items-center gap-2">
              <span className="text-emerald-600">✓</span> Profile information updated successfully!
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              Personal Information
            </h3>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm font-medium outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm font-medium outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  required
                />
              </div>
            </div>

            {/* Role Specific Fields */}
            {user.role === "student" && (
              <div className="grid grid-cols-3 gap-3 rounded-2xl bg-blue-50/60 p-3.5 border border-blue-100">
                <div>
                  <span className="block text-xs text-slate-500 font-semibold">Class</span>
                  <span className="text-sm font-bold text-slate-800">{user.classLevel || "Class 5"}</span>
                </div>
                <div>
                  <span className="block text-xs text-slate-500 font-semibold">Section</span>
                  <span className="text-sm font-bold text-slate-800">{user.section || "A"}</span>
                </div>
                <div>
                  <span className="block text-xs text-slate-500 font-semibold">Roll No.</span>
                  <span className="text-sm font-bold text-slate-800">{user.rollNo || "12"}</span>
                </div>
              </div>
            )}

            {user.role === "teacher" && (
              <div className="space-y-3 rounded-2xl bg-amber-50/60 p-3.5 border border-amber-100">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Teaching Subject / Department
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full rounded-xl border border-amber-200 bg-white px-3 py-2 text-sm font-medium outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-100"
                  />
                </div>
                <div className="text-xs text-slate-600">
                  <span className="font-bold">Assigned Levels:</span> Class 4, Class 5, Class 6
                </div>
              </div>
            )}

            {user.role === "parent" && (
              <div className="space-y-3 rounded-2xl bg-violet-50/60 p-3.5 border border-violet-100">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Linked Child
                    </label>
                    <input
                      type="text"
                      value={childName}
                      onChange={(e) => setChildName(e.target.value)}
                      className="w-full rounded-xl border border-violet-200 bg-white px-3 py-2 text-sm font-medium outline-none focus:border-violet-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-xl border border-violet-200 bg-white px-3 py-2 text-sm font-medium outline-none focus:border-violet-600"
                    />
                  </div>
                </div>
                <div className="text-xs text-slate-600">
                  <span className="font-bold">Child Class:</span> Class 5 - Section A (Roll No. 12)
                </div>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-800 transition shadow-sm"
              >
                Save Profile
              </button>
            </div>
          </form>

          {/* Quick Role Switcher */}
          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Switch Role Workspace
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {ROLE_TYPES.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => {
                    switchRole(r);
                    onClose();
                  }}
                  className={`rounded-xl p-2.5 text-center text-xs font-bold border transition ${
                    r === user.role
                      ? "border-blue-600 bg-blue-50 text-blue-800"
                      : "border-slate-200 hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  {roleNames[r]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              onClose();
              logout();
            }}
            className="flex items-center gap-1.5 text-sm font-bold text-rose-600 hover:text-rose-700 px-3 py-1.5 rounded-lg hover:bg-rose-50 transition"
          >
            <span>⎋</span> Log Out
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
