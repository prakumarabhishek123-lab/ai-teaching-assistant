"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/DashboardLayout";
import { DoubtSolverCard } from "@/components/DoubtSolverCard";
import { CLASS_LEVELS } from "@/lib/config/education";
import {
  MOCK_ASSIGNMENTS,
  MOCK_MONTHLY_ATTENDANCE,
  AssignmentItem,
} from "@/lib/dummy-data/educationData";

const subjects = [
  { name: "Maths", icon: "123", color: "bg-amber-50 text-amber-800 border-amber-200", note: "Numbers & puzzles" },
  { name: "Science", icon: "LAB", color: "bg-emerald-50 text-emerald-800 border-emerald-200", note: "Explore & discover" },
  { name: "English", icon: "ABC", color: "bg-blue-50 text-blue-800 border-blue-200", note: "Read, write & speak" },
  { name: "Hindi", icon: "अ", color: "bg-rose-50 text-rose-800 border-rose-200", note: "पढ़ें और सीखें" },
  { name: "EVS / SST", icon: "EARTH", color: "bg-teal-50 text-teal-800 border-teal-200", note: "Our world & community" },
  { name: "Computer", icon: "PC", color: "bg-violet-50 text-violet-800 border-violet-200", note: "Digital skills" },
] as const;

const quickTools = [
  { name: "Concept Simplification", description: "Make a tricky idea easy", icon: "CS" },
  { name: "Voice Quiz", description: "Answer questions aloud", icon: "VQ" },
  { name: "Translation & Dictation", description: "Practise words and languages", icon: "TR" },
  { name: "Digital Board", description: "See a topic step by step", icon: "DB" },
] as const;

const initialGoals = [
  { id: 1, label: "Complete one Maths practice", complete: true },
  { id: 2, label: "Read for 15 minutes", complete: true },
  { id: 3, label: "Try a Science voice quiz", complete: false },
  { id: 4, label: "Review 10 Hindi vocabulary words", complete: false },
];

const recentActivity = [
  { title: "Fractions made easy", subject: "Maths", time: "Today" },
  { title: "The water cycle quiz", subject: "Science", time: "Yesterday" },
  { title: "Hindi dictation practice", subject: "Hindi", time: "2 days ago" },
] as const;

const subjectMarks = [
  { subject: "Mathematics", score: 92, maxScore: 100, grade: "A+", feedback: "Excellent mental arithmetic and problem solving" },
  { subject: "Science", score: 88, maxScore: 100, grade: "A", feedback: "Thorough understanding of ecosystem & water cycle" },
  { subject: "Computer Studies", score: 95, maxScore: 100, grade: "A+", feedback: "Strong logic and coding fundamentals" },
  { subject: "Hindi", score: 90, maxScore: 100, grade: "A+", feedback: "Neat handwriting and great creative essay" },
  { subject: "English", score: 84, maxScore: 100, grade: "A", feedback: "Good reading comprehension, practice punctuation" },
  { subject: "Social Science", score: 78, maxScore: 100, grade: "B+", feedback: "Needs a bit more revision on Indian geography" },
];

const badges = [
  { name: "Maths Wizard", icon: "🧙‍♂️", unlocked: true, desc: "Scored 90%+ in 3 consecutive tests" },
  { name: "14-Day Streak", icon: "🔥", unlocked: true, desc: "Logged in and learned every day for 2 weeks" },
  { name: "Voice Quiz Master", icon: "🎙️", unlocked: true, desc: "Completed 10 oral practice sessions" },
  { name: "Language Explorer", icon: "🌍", unlocked: true, desc: "Translated 25 paragraphs with AI tools" },
  { name: "Science Fair Champ", icon: "🧪", unlocked: false, desc: "Submit a working model or research paper" },
];

export default function StudentDashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "marks" | "assignments" | "attendance">("overview");
  const [selectedClass, setSelectedClass] = useState("Class 5");
  const [goalsList, setGoalsList] = useState(initialGoals);
  const [assignments, setAssignments] = useState<AssignmentItem[]>(MOCK_ASSIGNMENTS);
  const [assignmentFilter, setAssignmentFilter] = useState<"all" | "pending" | "completed">("all");
  const [notificationBanner, setNotificationBanner] = useState<string | null>(null);

  const completedGoalsCount = goalsList.filter((g) => g.complete).length;
  const goalPercentage = Math.round((completedGoalsCount / goalsList.length) * 100);

  const toggleGoal = (id: number) => {
    setGoalsList((prev) =>
      prev.map((goal) =>
        goal.id === id ? { ...goal, complete: !goal.complete } : goal
      )
    );
  };

  const handleCompleteAssignment = (id: string, title: string) => {
    setAssignments((prev) =>
      prev.map((asg) =>
        asg.id === id
          ? { ...asg, studentStatus: "Completed", grade: "Submitted just now" }
          : asg
      )
    );
    setNotificationBanner(`"${title}" submitted successfully for teacher review!`);
    setTimeout(() => setNotificationBanner(null), 4000);
  };

  const filteredAssignments = assignments.filter((a) => {
    if (assignmentFilter === "pending") return a.studentStatus !== "Completed";
    if (assignmentFilter === "completed") return a.studentStatus === "Completed";
    return true;
  });

  return (
    <DashboardLayout
      role="student"
      title="Ready to learn something new?"
      description="Pick your class and subject, meet your daily goals, or jump back into your favourite learning tool."
    >
      <div className="space-y-8">
        {/* Toast Notification */}
        {notificationBanner && (
          <div className="rounded-2xl bg-emerald-600 p-4 text-white shadow-lg animate-fade-in flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold">
              <span>🎉</span> {notificationBanner}
            </div>
            <button
              type="button"
              onClick={() => setNotificationBanner(null)}
              className="text-xs font-bold text-emerald-200 hover:text-white"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Interactive Tab Navigation */}
        <div className="border-b border-slate-200 pb-2">
          <nav className="flex flex-wrap gap-2" aria-label="Student Sections">
            {[
              { id: "overview", label: "🏠 Overview & AI Helpers" },
              { id: "marks", label: "📊 Marks & Report Card" },
              { id: "assignments", label: `📝 Assignments (${assignments.filter((a) => a.studentStatus !== "Completed").length} pending)` },
              { id: "attendance", label: "📅 Attendance & Badges" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition ${
                  activeTab === tab.id
                    ? "bg-blue-700 text-white shadow-md shadow-blue-700/20"
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
          <div className="space-y-9 animate-fade-in">
            {/* Choose class */}
            <section className="flex flex-col gap-4 rounded-2xl bg-blue-50 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div>
                <h2 className="text-xl font-bold">Choose your class</h2>
                <p className="mt-1 text-sm text-slate-600">We will show learning that is right for you.</p>
              </div>
              <label className="flex min-w-52 flex-col gap-2 text-sm font-bold text-slate-700">
                Class level
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="min-h-12 rounded-xl border border-blue-200 bg-white px-4 text-base font-semibold text-slate-900 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                >
                  {CLASS_LEVELS.map((classLevel) => <option key={classLevel}>{classLevel}</option>)}
                </select>
              </label>
            </section>

            {/* AI Doubt Solver Card */}
            <DoubtSolverCard />

            {/* Pick a Subject */}
            <section aria-labelledby="subjects-heading">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-blue-700">Explore</p>
                  <h2 id="subjects-heading" className="mt-1 text-2xl font-bold">Pick a subject</h2>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
                {subjects.map((subject) => (
                  <button
                    key={subject.name}
                    type="button"
                    onClick={() => setActiveTab("marks")}
                    className={`min-h-36 rounded-2xl border p-4 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-100 ${subject.color}`}
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/80 text-xs font-black shadow-sm" aria-hidden="true">
                      {subject.icon}
                    </span>
                    <span className="mt-4 block text-lg font-bold">{subject.name}</span>
                    <span className="mt-1 block text-xs font-medium opacity-80 sm:text-sm">{subject.note}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Quick Tools */}
            <section aria-labelledby="quick-tools-heading">
              <p className="text-sm font-bold uppercase tracking-wider text-violet-700">AI learning helpers</p>
              <h2 id="quick-tools-heading" className="mt-1 text-2xl font-bold">Quick access</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {quickTools.map((tool) => (
                  <Link
                    key={tool.name}
                    href={
                      tool.name === "Concept Simplification"
                        ? "/dashboard/concept-simplification"
                        : tool.name === "Voice Quiz"
                          ? "/dashboard/voice-quiz"
                          : tool.name === "Translation & Dictation"
                            ? "/dashboard/translation-dictation"
                            : "/dashboard/digital-board"
                    }
                    className="group flex min-h-24 items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-violet-300 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-violet-100"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-xs font-black text-violet-800" aria-hidden="true">{tool.icon}</span>
                    <span className="min-w-0">
                      <span className="block font-bold group-hover:text-violet-800">{tool.name}</span>
                      <span className="mt-1 block text-sm text-slate-600">{tool.description}</span>
                    </span>
                    <span className="ml-auto text-xl text-violet-600" aria-hidden="true">→</span>
                  </Link>
                ))}
              </div>
            </section>

            {/* Daily Goals & Recent Activity */}
            <div className="grid gap-5 lg:grid-cols-2">
              <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:p-6" aria-labelledby="goals-heading">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wider text-emerald-700">
                      {completedGoalsCount} of {goalsList.length} complete
                    </p>
                    <h2 id="goals-heading" className="mt-1 text-xl font-bold">Today&apos;s goals</h2>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-emerald-700">
                    {goalPercentage}%
                  </span>
                </div>
                <div className="mt-4 h-3 overflow-hidden rounded-full bg-white" aria-label={`${goalPercentage} percent of daily goals complete`}>
                  <div className="h-full rounded-full bg-emerald-500 transition-all duration-300" style={{ width: `${goalPercentage}%` }} />
                </div>
                <ul className="mt-5 space-y-3">
                  {goalsList.map((goal) => (
                    <li
                      key={goal.id}
                      onClick={() => toggleGoal(goal.id)}
                      className="flex cursor-pointer items-center gap-3 rounded-xl bg-white/80 p-3 text-sm font-semibold transition hover:bg-white"
                    >
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs transition ${
                          goal.complete ? "bg-emerald-500 text-white" : "border-2 border-emerald-300"
                        }`}
                        aria-hidden="true"
                      >
                        {goal.complete ? "✓" : ""}
                      </span>
                      <span className={goal.complete ? "text-slate-500 line-through" : "text-slate-800"}>
                        {goal.label}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-emerald-800/80">Click any goal to mark completed.</p>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6" aria-labelledby="activity-heading">
                <p className="text-sm font-bold uppercase tracking-wider text-blue-700">Keep going</p>
                <h2 id="activity-heading" className="mt-1 text-xl font-bold">Recent activity</h2>
                <ul className="mt-4 divide-y divide-slate-100">
                  {recentActivity.map((activity) => (
                    <li key={activity.title} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-blue-700">
                        {activity.subject.slice(0, 2).toUpperCase()}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-semibold">{activity.title}</span>
                        <span className="block text-sm text-slate-500">{activity.subject}</span>
                      </span>
                      <time className="shrink-0 text-xs font-medium text-slate-500">{activity.time}</time>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        )}

        {/* TAB 2: MARKS & REPORT CARD */}
        {activeTab === "marks" && (
          <div className="space-y-6 animate-fade-in">
            {/* Summary Highlights */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-blue-700">Overall Grade</p>
                <p className="mt-2 text-3xl font-black text-slate-900">A+</p>
                <p className="text-xs text-slate-600 mt-1">Average: 87.8%</p>
              </div>
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">Top Subject</p>
                <p className="mt-2 text-2xl font-black text-slate-900 truncate">Computer</p>
                <p className="text-xs text-slate-600 mt-1">Score: 95/100</p>
              </div>
              <div className="rounded-2xl border border-violet-200 bg-violet-50/70 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-violet-700">Class Rank</p>
                <p className="mt-2 text-3xl font-black text-slate-900">3rd</p>
                <p className="text-xs text-slate-600 mt-1">Out of 24 students</p>
              </div>
              <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-amber-700">Term Status</p>
                <p className="mt-2 text-xl font-black text-slate-900">Term 1 Complete</p>
                <p className="text-xs text-slate-600 mt-1">Term 2 Ongoing</p>
              </div>
            </div>

            {/* Subject Marks Breakdown Table & Cards */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Subject-wise Academic Performance</h3>
                  <p className="text-xs text-slate-500">Based on recent term exams, weekly quizzes, and homework.</p>
                </div>
                <button
                  type="button"
                  onClick={() => alert("Report Card downloaded! (Simulated PDF download)")}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 self-start sm:self-auto"
                >
                  📥 Download Report Card
                </button>
              </div>

              <div className="space-y-4">
                {subjectMarks.map((item) => (
                  <div key={item.subject} className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 hover:border-slate-200 transition">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{item.subject}</span>
                        <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-700">
                          {item.grade}
                        </span>
                      </div>
                      <span className="text-sm font-extrabold text-slate-900">
                        {item.score} / {item.maxScore}
                      </span>
                    </div>

                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          item.score >= 90
                            ? "bg-emerald-500"
                            : item.score >= 80
                              ? "bg-blue-600"
                              : "bg-amber-500"
                        }`}
                        style={{ width: `${item.score}%` }}
                      />
                    </div>

                    <p className="mt-2 text-xs text-slate-500 font-medium">
                      Teacher remark: <span className="text-slate-700 font-semibold">{item.feedback}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ASSIGNMENTS & HOMEWORK */}
        {activeTab === "assignments" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Class 5 Assignments & Homework</h3>
                <p className="text-xs text-slate-500">Track homework tasks, submit completed work, and view grades.</p>
              </div>

              {/* Filter Pills */}
              <div className="flex gap-2">
                {(["all", "pending", "completed"] as const).map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setAssignmentFilter(filter)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-bold capitalize transition ${
                      assignmentFilter === filter
                        ? "bg-slate-950 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              {filteredAssignments.map((assignment) => {
                const isCompleted = assignment.studentStatus === "Completed";
                return (
                  <div
                    key={assignment.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-blue-200 transition"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-lg bg-blue-50 px-2 py-0.5 text-xs font-bold text-blue-700">
                          {assignment.subject}
                        </span>
                        <span className="text-xs text-slate-500">
                          {assignment.dueDate}
                        </span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                            isCompleted
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {assignment.studentStatus || "Pending"}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900">{assignment.title}</h4>
                      <p className="text-xs text-slate-600">{assignment.description}</p>
                      {assignment.grade && (
                        <p className="text-xs font-bold text-emerald-700 mt-1">
                          Grade awarded: {assignment.grade}
                        </p>
                      )}
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      {!isCompleted ? (
                        <button
                          type="button"
                          onClick={() => handleCompleteAssignment(assignment.id, assignment.title)}
                          className="rounded-xl bg-blue-700 px-4 py-2.5 text-xs font-bold text-white hover:bg-blue-800 shadow-sm transition"
                        >
                          Mark Completed ✓
                        </button>
                      ) : (
                        <span className="rounded-xl bg-emerald-50 px-3.5 py-2 text-xs font-bold text-emerald-700 border border-emerald-200">
                          ✓ Submitted
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: ATTENDANCE & BADGES */}
        {activeTab === "attendance" && (
          <div className="space-y-6 animate-fade-in">
            {/* Top Metric Cards */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-blue-200 bg-blue-50/80 p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-700">Yearly Attendance</p>
                <p className="mt-2 text-3xl font-black text-slate-900">94.2%</p>
                <p className="mt-1 text-xs text-slate-600">132 of 140 school days present</p>
              </div>
              <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-700">Present Streak</p>
                <p className="mt-2 text-3xl font-black text-slate-900 flex items-center gap-2">
                  <span>🔥</span> 14 Days
                </p>
                <p className="mt-1 text-xs text-slate-600">Current uninterrupted run</p>
              </div>
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-5 col-span-2 sm:col-span-1">
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Leaves Taken</p>
                <p className="mt-2 text-3xl font-black text-slate-900">3 Days</p>
                <p className="mt-1 text-xs text-slate-600">All medically excused</p>
              </div>
            </div>

            {/* Attendance Calendar Grid */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">September 2026 Attendance Grid</h3>
                  <p className="text-xs text-slate-500">Day-by-day classroom presence.</p>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1"><span className="h-3 w-3 rounded-full bg-emerald-500" /> Present</span>
                  <span className="flex items-center gap-1"><span className="h-3 w-3 rounded-full bg-rose-500" /> Absent</span>
                  <span className="flex items-center gap-1"><span className="h-3 w-3 rounded-full bg-slate-300" /> Weekend</span>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2 text-center text-xs">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                  <span key={d} className="font-bold text-slate-400 py-1">{d}</span>
                ))}
                {MOCK_MONTHLY_ATTENDANCE.map((day) => (
                  <div
                    key={day.day}
                    className={`rounded-xl p-2 font-bold transition flex flex-col items-center justify-center min-h-11 ${
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

            {/* Achievement Badges */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-slate-900 mb-1">Learning Achievements & Badges</h3>
              <p className="text-xs text-slate-500 mb-4">Milestones earned through quizzes, practice, and attendance.</p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {badges.map((badge) => (
                  <div
                    key={badge.name}
                    className={`rounded-2xl p-4 border flex items-center gap-3 transition ${
                      badge.unlocked
                        ? "border-amber-200 bg-amber-50/50 text-amber-950"
                        : "border-slate-200 bg-slate-50/60 opacity-60"
                    }`}
                  >
                    <span className="text-3xl">{badge.icon}</span>
                    <div className="min-w-0">
                      <p className="font-bold text-sm">{badge.name}</p>
                      <p className="text-xs text-slate-600 line-clamp-2">{badge.desc}</p>
                      <span className={`inline-block mt-1 text-[10px] font-bold uppercase ${badge.unlocked ? "text-amber-700" : "text-slate-400"}`}>
                        {badge.unlocked ? "✓ Unlocked" : "🔒 In Progress"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
