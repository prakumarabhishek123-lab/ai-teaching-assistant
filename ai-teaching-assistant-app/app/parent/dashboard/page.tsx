"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import {
  MOCK_CHAT_MESSAGES,
  MOCK_NOTICES,
  MOCK_MONTHLY_ATTENDANCE,
} from "@/lib/dummy-data/educationData";

const weeklyProgress = [
  { day: "Mon", value: 72 },
  { day: "Tue", value: 86 },
  { day: "Wed", value: 64 },
  { day: "Thu", value: 92 },
  { day: "Fri", value: 78 },
  { day: "Sat", value: 55 },
  { day: "Sun", value: 40 },
] as const;

const recentActivities = [
  { title: "Completed Fractions practice", detail: "Mathematics · 9 of 10 correct", time: "Today, 4:20 PM", icon: "MA" },
  { title: "Finished Water Cycle quiz", detail: "Science · Score 86%", time: "Yesterday", icon: "SC" },
  { title: "Practised Hindi dictation", detail: "Hindi · 15 minutes", time: "2 days ago", icon: "HI" },
] as const;

const notifications = [
  { title: "Homework due tomorrow", detail: "English reading worksheet", accent: "bg-amber-500" },
  { title: "New teacher note", detail: "Great participation in Science", accent: "bg-blue-500" },
  { title: "Weekly report ready", detail: "View this week’s learning summary", accent: "bg-emerald-500" },
] as const;

const reportCards = [
  { subject: "Mathematics", score: 92, grade: "A+", remarks: "Strong logical thinking; excels in word problems and fractions." },
  { subject: "Science", score: 88, grade: "A", remarks: "Curious student, very active during voice quiz revision." },
  { subject: "Computer Studies", score: 95, grade: "A+", remarks: "Very quick with logic, creative in digital board assignments." },
  { subject: "Hindi", score: 90, grade: "A+", remarks: "Good grasp of vyakaran and beautiful handwriting." },
  { subject: "English", score: 84, grade: "A", remarks: "Fluent speaker; needs a little extra attention on spelling difficult words." },
  { subject: "Social Science", score: 78, grade: "B+", remarks: "Recommend 15 minutes daily reading on Indian community and history." },
];

export default function ParentDashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "report" | "attendance" | "chat" | "school">("overview");
  const [chatMessages, setChatMessages] = useState(MOCK_CHAT_MESSAGES);
  const [newChatText, setNewChatText] = useState("");
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [leaveReason, setLeaveReason] = useState("");
  const [leaveDate, setLeaveDate] = useState("Tomorrow (Oct 1)");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showMoreSuggestions, setShowMoreSuggestions] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChatText.trim()) return;

    const parentMsg = {
      id: `chat-${Date.now()}`,
      sender: "parent",
      senderName: "Rajesh Sharma (Father)",
      time: "Just now",
      text: newChatText,
    };

    setChatMessages((prev) => [...prev, parentMsg]);
    setNewChatText("");

    // Simulate teacher auto-acknowledgement after 1.2s
    setTimeout(() => {
      const teacherReply = {
        id: `chat-reply-${Date.now()}`,
        sender: "teacher",
        senderName: "Mrs. Sunita Verma",
        time: "Just now",
        text: "Thank you for the message, Mr. Sharma. I have noted this down and will assist Aarav during tomorrow's session.",
      };
      setChatMessages((prev) => [...prev, teacherReply]);
    }, 1200);
  };

  const handleApplyLeave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLeaveModalOpen(false);
    showToast(`Leave application for ${leaveDate} submitted to Class Teacher!`);
    setLeaveReason("");
  };

  return (
    <DashboardLayout
      role="parent"
      title="A clear view of every learning step"
      description="Follow your child’s progress, celebrate strengths, and see where a little support can make a difference."
    >
      <div className="space-y-6">
        {/* Toast */}
        {toastMessage && (
          <div className="rounded-2xl bg-slate-900 p-4 text-white shadow-lg animate-fade-in flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold">
              <span>✨</span> {toastMessage}
            </div>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="text-xs font-bold text-slate-300 hover:text-white"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="border-b border-slate-200 pb-2">
          <nav className="flex flex-wrap gap-2" aria-label="Parent Dashboard Tabs">
            {[
              { id: "overview", label: "🏠 Child Overview" },
              { id: "report", label: "📊 Term Report Card" },
              { id: "attendance", label: "📅 Attendance & Leaves" },
              { id: "chat", label: `💬 Teacher Chat (${chatMessages.length})` },
              { id: "school", label: "📢 School Notices & Fees" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition ${
                  activeTab === tab.id
                    ? "bg-violet-700 text-white shadow-md shadow-violet-700/20"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-6 animate-fade-in">
            {/* Child Profile & Daily Progress */}
            <section className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
              <article className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-violet-50 p-5 sm:p-6" aria-labelledby="child-profile-heading">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 text-2xl font-bold text-white shadow-lg shadow-blue-900/15" aria-hidden="true">
                    AS
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold uppercase tracking-wider text-blue-700">Child profile</p>
                    <h2 id="child-profile-heading" className="mt-1 text-2xl font-bold">Aarav Sharma</h2>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 shadow-sm">Class 5</span>
                      <span className="rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 shadow-sm">Section A</span>
                      <span className="rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 shadow-sm">Roll no. 12</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab("chat")}
                    className="min-h-12 shrink-0 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-100"
                  >
                    Contact Teacher 💬
                  </button>
                </div>
              </article>

              <article className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:p-6" aria-labelledby="daily-progress-heading">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wider text-emerald-700">Today</p>
                    <h2 id="daily-progress-heading" className="mt-1 text-xl font-bold">Daily learning progress</h2>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-emerald-700">3 of 4</span>
                </div>
                <div className="mt-5 h-3 overflow-hidden rounded-full bg-white" aria-label="75 percent of daily learning complete">
                  <div className="h-full w-3/4 rounded-full bg-emerald-500" />
                </div>
                <div className="mt-4 flex items-end justify-between">
                  <p className="text-sm text-slate-600">One activity left for today</p>
                  <p className="text-2xl font-bold text-emerald-700">75%</p>
                </div>
              </article>
            </section>

            {/* Metric Summary Cards */}
            <section className="grid grid-cols-2 gap-3 lg:grid-cols-4" aria-label="Learning summary">
              <MetricCard label="Attendance" value="94%" detail="22 of 23 days" tone="blue" />
              <MetricCard label="Homework status" value="8 / 10" detail="2 assignments due" tone="amber" />
              <MetricCard label="Quiz average" value="86%" detail="Up 4% this month" tone="violet" />
              <MetricCard label="Learning time" value="6h 25m" detail="This week" tone="emerald" />
            </section>

            {/* Weekly Consistency & AI Suggestions */}
            <div className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
              <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6" aria-labelledby="weekly-heading">
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wider text-blue-700">Weekly report</p>
                    <h2 id="weekly-heading" className="mt-1 text-xl font-bold">Learning consistency</h2>
                  </div>
                  <p className="text-sm font-semibold text-slate-500">5h goal · 4h 12m complete</p>
                </div>
                <div className="mt-6 flex h-44 items-end justify-between gap-2" aria-label="Daily learning progress chart">
                  {weeklyProgress.map((day) => (
                    <div key={day.day} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                      <span className="text-xs font-semibold text-slate-500">{day.value}%</span>
                      <div className="w-full max-w-10 rounded-t-lg bg-gradient-to-t from-blue-600 to-violet-400" style={{ height: `${day.value}%` }} />
                      <span className="text-xs font-bold text-slate-600">{day.day}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-slate-950 p-5 text-white sm:p-6" aria-labelledby="suggestions-heading">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-xs font-black" aria-hidden="true">AI</span>
                <p className="mt-4 text-sm font-bold uppercase tracking-wider text-blue-300">For parents</p>
                <h2 id="suggestions-heading" className="mt-1 text-xl font-bold">AI suggestion</h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  Aarav is doing well with numbers. Try a 10-minute reading session together today and ask him to retell the story in his own words.
                </p>
                {showMoreSuggestions && (
                  <div className="mt-3 p-3 rounded-xl bg-white/10 text-xs text-slate-200 space-y-2 animate-fade-in border border-white/15">
                    <p>• <strong>Vocabulary boost:</strong> Pick 3 new words from his English chapter and use them during dinner conversation.</p>
                    <p>• <strong>Bedtime routine:</strong> Wind down with 10 mins of spoken reflection instead of digital screen time.</p>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => setShowMoreSuggestions(!showMoreSuggestions)}
                  className="mt-5 min-h-11 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-white/20"
                >
                  {showMoreSuggestions ? "Hide suggestions" : "See more suggestions"}
                </button>
              </section>
            </div>

            {/* Subject Strengths & Needs */}
            <section className="grid gap-4 sm:grid-cols-2">
              <article className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:p-6">
                <p className="text-sm font-bold uppercase tracking-wider text-emerald-700">Strong subjects</p>
                <h2 className="mt-1 text-xl font-bold">Areas to celebrate</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  <SubjectPill name="Mathematics" score="92%" />
                  <SubjectPill name="Science" score="88%" />
                </div>
              </article>
              <article className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
                <p className="text-sm font-bold uppercase tracking-wider text-amber-700">Needs support</p>
                <h2 className="mt-1 text-xl font-bold">Weak subjects</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  <SubjectPill name="English" score="68%" />
                  <SubjectPill name="Social Science" score="72%" />
                </div>
              </article>
            </section>

            {/* Activities & Notifications */}
            <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
              <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6" aria-labelledby="activities-heading">
                <p className="text-sm font-bold uppercase tracking-wider text-violet-700">Latest learning</p>
                <h2 id="activities-heading" className="mt-1 text-xl font-bold">Recent activities</h2>
                <ul className="mt-4 divide-y divide-slate-100">
                  {recentActivities.map((activity) => (
                    <li key={activity.title} className="flex gap-3 py-4 first:pt-0 last:pb-0">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-xs font-black text-violet-700">
                        {activity.icon}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold">{activity.title}</span>
                        <span className="mt-1 block text-sm text-slate-500">{activity.detail}</span>
                      </span>
                      <time className="shrink-0 text-xs font-medium text-slate-400">{activity.time}</time>
                    </li>
                  ))}
                </ul>
              </section>

              <aside className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6" aria-labelledby="notifications-heading">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wider text-blue-700">Updates</p>
                    <h2 id="notifications-heading" className="mt-1 text-xl font-bold">Notifications</h2>
                  </div>
                  <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-700">3 new</span>
                </div>
                <ul className="mt-4 space-y-3">
                  {notifications.map((notification) => (
                    <li key={notification.title} className="flex gap-3 rounded-xl bg-slate-50 p-3">
                      <span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${notification.accent}`} />
                      <span>
                        <span className="block text-sm font-semibold">{notification.title}</span>
                        <span className="mt-1 block text-xs leading-5 text-slate-500">{notification.detail}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </div>
        )}

        {/* TAB 2: ACADEMIC MARKS & REPORT */}
        {activeTab === "report" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Term 1 Progress Report Card</h3>
                <p className="text-xs text-slate-500">Official scholastic performance for Aarav Sharma (Class 5 - Sec A).</p>
              </div>
              <button
                type="button"
                onClick={() => alert("Report Card PDF downloaded successfully!")}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition self-start sm:self-auto"
              >
                📥 Download Term 1 PDF
              </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
              <table className="w-full min-w-[36rem] text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase">
                  <tr>
                    <th className="py-3 px-4">Subject</th>
                    <th className="py-3 px-4">Marks (100)</th>
                    <th className="py-3 px-4">Grade</th>
                    <th className="py-3 px-4">Teacher Remark</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {reportCards.map((rc) => (
                    <tr key={rc.subject} className="hover:bg-slate-50/70 transition">
                      <td className="py-3.5 px-4 font-bold text-slate-900">{rc.subject}</td>
                      <td className="py-3.5 px-4 font-extrabold text-slate-800">{rc.score}/100</td>
                      <td className="py-3.5 px-4">
                        <span className="rounded-md bg-blue-50 px-2 py-0.5 text-xs font-bold text-blue-700">
                          {rc.grade}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-600 font-medium">{rc.remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ATTENDANCE & LEAVES */}
        {activeTab === "attendance" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Attendance Log & Leave Requests</h3>
                <p className="text-xs text-slate-500">Record of school days attended and excused absences.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsLeaveModalOpen(true)}
                className="rounded-xl bg-violet-700 px-4 py-2 text-xs font-bold text-white hover:bg-violet-800 transition self-start sm:self-auto"
              >
                + Apply for Leave
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-4">
                <p className="text-xs font-bold uppercase text-blue-700">Days Present</p>
                <p className="text-2xl font-black text-slate-900 mt-1">22 / 23</p>
                <p className="text-xs text-slate-600 mt-1">94% attendance</p>
              </div>
              <div className="rounded-2xl border border-rose-200 bg-rose-50/70 p-4">
                <p className="text-xs font-bold uppercase text-rose-700">Excused Leaves</p>
                <p className="text-2xl font-black text-slate-900 mt-1">1 Day</p>
                <p className="text-xs text-slate-600 mt-1">Medical checkup</p>
              </div>
              <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4">
                <p className="text-xs font-bold uppercase text-amber-700">Late Arrivals</p>
                <p className="text-2xl font-black text-slate-900 mt-1">0 Days</p>
                <p className="text-xs text-slate-600 mt-1">Always punctual</p>
              </div>
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4">
                <p className="text-xs font-bold uppercase text-emerald-700">Eligibility Status</p>
                <p className="text-2xl font-black text-slate-900 mt-1">Eligible</p>
                <p className="text-xs text-slate-600 mt-1">Above 75% required</p>
              </div>
            </div>

            {/* Mini Calendar View */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h4 className="text-sm font-bold text-slate-900 mb-3">September Presence Timeline</h4>
              <div className="grid grid-cols-7 gap-2 text-center text-xs">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                  <span key={d} className="font-bold text-slate-400 py-1">{d}</span>
                ))}
                {MOCK_MONTHLY_ATTENDANCE.map((day) => (
                  <div
                    key={day.day}
                    className={`rounded-xl p-2 font-bold flex flex-col items-center justify-center min-h-11 ${
                      day.status === "present"
                        ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                        : day.status === "absent"
                          ? "bg-rose-50 text-rose-800 border border-rose-200"
                          : day.status === "holiday"
                            ? "bg-amber-50 text-amber-800 border border-amber-200"
                            : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    <span>{day.day}</span>
                    <span className="text-[9px] uppercase opacity-75">{day.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: DIRECT TEACHER CHAT */}
        {activeTab === "chat" && (
          <div className="space-y-4 animate-fade-in">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700 text-sm">
                  SV
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">Mrs. Sunita Verma</h4>
                  <p className="text-xs text-slate-500">Class 5 Teacher & Faculty Lead • Online</p>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="space-y-3 min-h-[16rem] max-h-[22rem] overflow-y-auto p-2">
                {chatMessages.map((msg) => {
                  const isParent = msg.sender === "parent";
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isParent ? "items-end" : "items-start"}`}
                    >
                      <div
                        className={`max-w-[85%] sm:max-w-md rounded-2xl px-4 py-3 text-xs sm:text-sm ${
                          isParent
                            ? "bg-violet-700 text-white rounded-tr-none"
                            : "bg-slate-100 text-slate-900 rounded-tl-none"
                        }`}
                      >
                        <p className="font-semibold">{msg.text}</p>
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1 px-1">
                        {msg.senderName} • {msg.time}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Input Form */}
              <form onSubmit={handleSendMessage} className="mt-4 flex gap-2 pt-2 border-t border-slate-100">
                <input
                  type="text"
                  required
                  value={newChatText}
                  onChange={(e) => setNewChatText(e.target.value)}
                  placeholder="Type a message to Mrs. Sunita Verma..."
                  className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-xs sm:text-sm outline-none focus:border-violet-600"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-violet-700 px-5 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-violet-800 transition"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 5: SCHOOL NOTICES & FEES */}
        {activeTab === "school" && (
          <div className="space-y-6 animate-fade-in">
            {/* Fee Status Card */}
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                  Tuition Fee Status: Clear
                </span>
                <h4 className="text-lg font-bold text-slate-900 mt-2">Term 1 School Fees Paid in Full</h4>
                <p className="text-xs text-slate-600">Receipt Ref #DEL-2026-88492 · Next installment due Nov 15, 2026</p>
              </div>
              <button
                type="button"
                onClick={() => alert("Fee Receipt downloaded! (Simulated PDF download)")}
                className="rounded-xl border border-emerald-300 bg-white px-4 py-2 text-xs font-bold text-emerald-800 hover:bg-emerald-50 self-start sm:self-auto"
              >
                Download Receipt
              </button>
            </div>

            {/* School Circulars */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                School Circulars & Event Notices
              </h4>
              {MOCK_NOTICES.map((n) => (
                <div key={n.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-700">
                      {n.category}
                    </span>
                    <span className="text-xs text-slate-400">{n.date}</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900">{n.title}</h4>
                  <p className="text-xs text-slate-600 leading-5">{n.content}</p>
                  <p className="text-[11px] text-slate-400 pt-1 font-medium">Issued by: {n.sender}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MODAL: APPLY FOR LEAVE */}
      {isLeaveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Apply for Student Leave</h3>
            <p className="text-xs text-slate-500 mb-4">Submit leave notice for Aarav Sharma to Mrs. Sunita Verma.</p>

            <form onSubmit={handleApplyLeave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Leave Date / Duration
                </label>
                <input
                  type="text"
                  required
                  value={leaveDate}
                  onChange={(e) => setLeaveDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-semibold outline-none focus:border-violet-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Reason for Absence
                </label>
                <textarea
                  rows={3}
                  required
                  value={leaveReason}
                  onChange={(e) => setLeaveReason(e.target.value)}
                  placeholder="e.g. Mild fever, visiting pediatrician..."
                  className="w-full rounded-xl border border-slate-200 p-3 text-xs font-semibold outline-none focus:border-violet-600"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsLeaveModalOpen(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-violet-700 px-5 py-2 text-xs font-bold text-white hover:bg-violet-800 shadow-sm"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

const metricTones = {
  blue: "border-blue-200 bg-blue-50 text-blue-800",
  amber: "border-amber-200 bg-amber-50 text-amber-800",
  violet: "border-violet-200 bg-violet-50 text-violet-800",
  emerald: "border-emerald-200 bg-emerald-50 text-emerald-800",
} as const;

function MetricCard({
  label,
  value,
  detail,
  tone,
}: {
  label: string;
  value: string;
  detail: string;
  tone: keyof typeof metricTones;
}) {
  return (
    <article className={`rounded-2xl border p-4 sm:p-5 ${metricTones[tone]}`}>
      <p className="text-xs font-bold uppercase tracking-wide opacity-75">{label}</p>
      <p className="mt-2 text-2xl font-bold sm:text-3xl">{value}</p>
      <p className="mt-1 text-xs font-medium opacity-75 sm:text-sm">{detail}</p>
    </article>
  );
}

function SubjectPill({ name, score }: { name: string; score: string }) {
  return (
    <span className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm">
      <span>{name}</span>
      <strong className="text-slate-950">{score}</strong>
    </span>
  );
}
