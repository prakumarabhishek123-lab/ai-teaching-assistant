"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/DashboardLayout";
import { CLASS_LEVELS, SUBJECTS, ClassLevel, Subject } from "@/lib/config/education";
import {
  INITIAL_STUDENTS_CLASS_5,
  MOCK_NOTICES,
  StudentRecord,
} from "@/lib/dummy-data/educationData";

interface AssignmentItem {
  title: string;
  className: string;
  subject: string;
  status: string;
  due: string;
}

const initialAssignments: AssignmentItem[] = [
  { title: "Fractions practice", className: "Class 5", subject: "Mathematics", status: "18 of 24 submitted", due: "Due today" },
  { title: "Our environment", className: "Class 4", subject: "Environmental Studies", status: "20 of 22 submitted", due: "Due tomorrow" },
  { title: "Reading comprehension", className: "Class 6", subject: "English", status: "28 of 30 submitted", due: "Due 8 July" },
  { title: "Water cycle diagram", className: "Class 5", subject: "Science", status: "21 of 24 submitted", due: "Due Friday" },
];

export default function TeacherDashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "roster" | "attendance" | "notices">("overview");
  const [selectedClass, setSelectedClass] = useState<ClassLevel>("Class 5");
  const [selectedSubject, setSelectedSubject] = useState<Subject>("Mathematics");

  const [assignments, setAssignments] = useState<AssignmentItem[]>(initialAssignments);
  const [students, setStudents] = useState<StudentRecord[]>(INITIAL_STUDENTS_CLASS_5);
  const [notices, setNotices] = useState(MOCK_NOTICES);

  // Modals state
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDueDate, setNewDueDate] = useState("Due Tomorrow");

  const [selectedStudentForNote, setSelectedStudentForNote] = useState<StudentRecord | null>(null);
  const [parentNoteText, setParentNoteText] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Announcement state
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeContent, setNoticeContent] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newAsg: AssignmentItem = {
      title: newTitle,
      className: selectedClass,
      subject: selectedSubject,
      status: `0 of ${students.length} submitted`,
      due: newDueDate,
    };

    setAssignments([newAsg, ...assignments]);
    setIsAssignModalOpen(false);
    setNewTitle("");
    showToast(`New assignment "${newTitle}" created for ${selectedClass}!`);
  };

  const toggleStudentAttendance = (studentId: string, status: "Present" | "Absent" | "Late") => {
    setStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, status } : s))
    );
  };

  const handleSendParentNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudentForNote) return;
    showToast(`Note sent to ${selectedStudentForNote.parentName} (${selectedStudentForNote.name}'s parent)!`);
    setSelectedStudentForNote(null);
    setParentNoteText("");
  };

  const handlePublishNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeTitle.trim() || !noticeContent.trim()) return;
    const newNotice = {
      id: `not-${Date.now()}`,
      title: noticeTitle,
      date: "Today",
      sender: "Mrs. Sunita Verma (Class 5 Teacher)",
      category: "Classroom",
      content: noticeContent,
    };
    setNotices([newNotice, ...notices]);
    setNoticeTitle("");
    setNoticeContent("");
    showToast("Class announcement published to parents!");
  };

  const presentCount = students.filter((s) => s.status === "Present").length;
  const absentCount = students.filter((s) => s.status === "Absent").length;
  const lateCount = students.filter((s) => s.status === "Late").length;
  const attendanceRate = Math.round((presentCount / students.length) * 100);

  return (
    <DashboardLayout
      role="teacher"
      title="Your teaching dashboard"
      description="Plan classes, manage learning activities, and support every student from Class 1 to Class 8."
    >
      <div className="space-y-8">
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
          <nav className="flex flex-wrap gap-2" aria-label="Teacher Dashboard Tabs">
            {[
              { id: "overview", label: "📋 Overview & Classwork" },
              { id: "roster", label: `👥 Student Roster (${students.length})` },
              { id: "attendance", label: `📅 Attendance Register (${attendanceRate}%)` },
              { id: "notices", label: "📢 Announcements & Notices" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition ${
                  activeTab === tab.id
                    ? "bg-slate-950 text-white shadow-md shadow-slate-950/20"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* TAB 1: OVERVIEW & CLASSWORK */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-fade-in">
            {/* Teaching Context Section */}
            <section className="rounded-2xl bg-blue-50 p-5 sm:p-6" aria-labelledby="teaching-context-heading">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-blue-700">Teaching context</p>
                  <h2 id="teaching-context-heading" className="mt-1 text-xl font-bold">Choose a class and subject</h2>
                  <p className="mt-1 text-sm text-slate-600">Set the context before creating learning material.</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:w-[32rem]">
                  <label className="flex flex-col gap-2 text-sm font-bold text-slate-700">
                    Class
                    <select
                      value={selectedClass}
                      onChange={(e) => setSelectedClass(e.target.value as ClassLevel)}
                      className="min-h-12 rounded-xl border border-blue-200 bg-white px-4 text-base font-semibold outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    >
                      {CLASS_LEVELS.map((classLevel) => <option key={classLevel}>{classLevel}</option>)}
                    </select>
                  </label>
                  <label className="flex flex-col gap-2 text-sm font-bold text-slate-700">
                    Subject
                    <select
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value as Subject)}
                      className="min-h-12 rounded-xl border border-blue-200 bg-white px-4 text-base font-semibold outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    >
                      {SUBJECTS.map((subject) => <option key={subject}>{subject}</option>)}
                    </select>
                  </label>
                </div>
              </div>
            </section>

            {/* Quick Actions */}
            <section aria-labelledby="quick-actions-heading">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-violet-700">Plan and manage</p>
                  <h2 id="quick-actions-heading" className="mt-1 text-2xl font-bold">Quick actions</h2>
                </div>
                <Link href="/dashboard" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-100">
                  Open AI teaching tools <span aria-hidden="true">→</span>
                </Link>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
                <Link href="/teacher/worksheet-generator" className="min-h-36 rounded-2xl border p-4 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-100 bg-blue-50 text-blue-800 border-blue-200">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/80 text-xs font-black shadow-sm" aria-hidden="true">WS</span>
                  <span className="mt-4 block font-bold">Create Worksheet</span>
                  <span className="mt-1 block text-xs font-medium opacity-80 sm:text-sm">Build class-ready practice</span>
                </Link>

                <Link href="/teacher/quiz-generator" className="min-h-36 rounded-2xl border p-4 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-100 bg-violet-50 text-violet-800 border-violet-200">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/80 text-xs font-black shadow-sm" aria-hidden="true">QZ</span>
                  <span className="mt-4 block font-bold">Create Quiz</span>
                  <span className="mt-1 block text-xs font-medium opacity-80 sm:text-sm">Check student understanding</span>
                </Link>

                <button
                  type="button"
                  onClick={() => setIsAssignModalOpen(true)}
                  className="min-h-36 rounded-2xl border p-4 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-100 bg-amber-50 text-amber-800 border-amber-200"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/80 text-xs font-black shadow-sm" aria-hidden="true">HW</span>
                  <span className="mt-4 block font-bold">Assign Homework</span>
                  <span className="mt-1 block text-xs font-medium opacity-80 sm:text-sm">Set work for the class</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("roster")}
                  className="min-h-36 rounded-2xl border p-4 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-100 bg-emerald-50 text-emerald-800 border-emerald-200"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/80 text-xs font-black shadow-sm" aria-hidden="true">PR</span>
                  <span className="mt-4 block font-bold">View Student Progress</span>
                  <span className="mt-1 block text-xs font-medium opacity-80 sm:text-sm">Review learning at a glance</span>
                </button>
              </div>
            </section>

            {/* Assignments & Class Overview */}
            <div className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
              <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6" aria-labelledby="assignments-heading">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wider text-blue-700">Classwork</p>
                    <h2 id="assignments-heading" className="mt-1 text-xl font-bold">Recent assignments</h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsAssignModalOpen(true)}
                    className="rounded-xl bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700 hover:bg-blue-100 transition"
                  >
                    + New
                  </button>
                </div>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full min-w-[34rem] text-left text-sm">
                    <thead className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                      <tr>
                        <th className="pb-3 font-semibold">Assignment</th>
                        <th className="pb-3 font-semibold">Class</th>
                        <th className="pb-3 font-semibold">Submissions</th>
                        <th className="pb-3 text-right font-semibold">Due</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {assignments.map((assignment, idx) => (
                        <tr key={`${assignment.title}-${idx}`}>
                          <td className="py-4 pr-4">
                            <span className="block font-semibold text-slate-900">{assignment.title}</span>
                            <span className="mt-0.5 block text-xs text-slate-500">{assignment.subject}</span>
                          </td>
                          <td className="py-4 pr-4 font-medium">{assignment.className}</td>
                          <td className="py-4 pr-4 text-slate-600">{assignment.status}</td>
                          <td className="py-4 text-right font-medium text-blue-700">{assignment.due}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:p-6" aria-labelledby="students-heading">
                <p className="text-sm font-bold uppercase tracking-wider text-emerald-700">
                  {selectedClass} overview
                </p>
                <h2 id="students-heading" className="mt-1 text-xl font-bold">Students</h2>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <OverviewStat value={String(students.length)} label="Students" />
                  <OverviewStat value="88%" label="On track" />
                  <OverviewStat value="2" label="Need support" />
                  <OverviewStat value={`${attendanceRate}%`} label="Attendance" />
                </div>
                <p className="mt-5 text-sm leading-6 text-slate-600">
                  Click below to view full student grades, attendance register, and send parent notes.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTab("roster")}
                  className="mt-4 w-full rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition"
                >
                  Manage Student Roster →
                </button>
              </section>
            </div>
          </div>
        )}

        {/* TAB 2: STUDENT ROSTER & MARKS */}
        {activeTab === "roster" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{selectedClass} Student Roster & Gradebook</h3>
                <p className="text-xs text-slate-500">Monitor academic performance, attendance, and send feedback to parents.</p>
              </div>
              <div className="flex gap-2">
                <span className="rounded-lg bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-800">
                  Excelling: {students.filter((s) => s.category === "Excelling").length}
                </span>
                <span className="rounded-lg bg-rose-100 px-3 py-1.5 text-xs font-bold text-rose-800">
                  Needs Support: {students.filter((s) => s.category === "Needs Support").length}
                </span>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
              <table className="w-full min-w-[40rem] text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase">
                  <tr>
                    <th className="py-3 px-4">Roll #</th>
                    <th className="py-3 px-4">Student Name</th>
                    <th className="py-3 px-4">Maths</th>
                    <th className="py-3 px-4">Science</th>
                    <th className="py-3 px-4">English</th>
                    <th className="py-3 px-4">Grade</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {students.map((student) => (
                    <tr key={student.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3 px-4 font-bold text-slate-400">#{student.rollNo}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                            {student.avatar}
                          </span>
                          <div>
                            <p className="font-bold text-slate-900">{student.name}</p>
                            <p className="text-[11px] text-slate-500">{student.parentName}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-semibold">{student.marks.Mathematics}%</td>
                      <td className="py-3 px-4 font-semibold">{student.marks.Science}%</td>
                      <td className="py-3 px-4 font-semibold">{student.marks.English}%</td>
                      <td className="py-3 px-4">
                        <span className="rounded-md bg-blue-50 px-2 py-0.5 text-xs font-bold text-blue-700">
                          {student.overallGrade}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                            student.category === "Excelling"
                              ? "bg-emerald-100 text-emerald-800"
                              : student.category === "Needs Support"
                                ? "bg-rose-100 text-rose-800"
                                : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {student.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedStudentForNote(student);
                            setParentNoteText(`Dear ${student.parentName}, here is an update regarding ${student.name}'s classroom progress...`);
                          }}
                          className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition"
                        >
                          Send Note
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ATTENDANCE REGISTER */}
        {activeTab === "attendance" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{selectedClass} Daily Attendance Register</h3>
                <p className="text-xs text-slate-500">Live roster check for today. Click buttons to toggle student attendance.</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-xl bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 border border-emerald-200">
                  Present: {presentCount}
                </span>
                <span className="rounded-xl bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-700 border border-rose-200">
                  Absent: {absentCount}
                </span>
                <span className="rounded-xl bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700 border border-amber-200">
                  Late: {lateCount}
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="space-y-2">
                {students.map((student) => (
                  <div
                    key={student.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl p-3 border border-slate-100 hover:bg-slate-50 transition"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-slate-400 w-6">#{student.rollNo}</span>
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                        {student.avatar}
                      </span>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{student.name}</p>
                        <p className="text-[11px] text-slate-500">Attendance avg: {student.attendancePct}%</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 self-end sm:self-auto">
                      {(["Present", "Absent", "Late"] as const).map((status) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => toggleStudentAttendance(student.id, status)}
                          className={`rounded-lg px-3 py-1 text-xs font-bold transition ${
                            student.status === status
                              ? status === "Present"
                                ? "bg-emerald-600 text-white shadow-sm"
                                : status === "Absent"
                                  ? "bg-rose-600 text-white shadow-sm"
                                  : "bg-amber-500 text-white shadow-sm"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: ANNOUNCEMENTS & NOTICES */}
        {activeTab === "notices" && (
          <div className="space-y-6 animate-fade-in">
            {/* Create Announcement Form */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-slate-900 mb-1">Post Class Announcement</h3>
              <p className="text-xs text-slate-500 mb-4">Send a notice to all Class 5 students and parents.</p>

              <form onSubmit={handlePublishNotice} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Announcement Title
                  </label>
                  <input
                    type="text"
                    required
                    value={noticeTitle}
                    onChange={(e) => setNoticeTitle(e.target.value)}
                    placeholder="e.g. Science Project Submission Deadline Extended"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-semibold outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Message Body
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={noticeContent}
                    onChange={(e) => setNoticeContent(e.target.value)}
                    placeholder="Enter details for students and guardians..."
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-semibold outline-none focus:border-blue-600"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-xl bg-blue-700 px-4 py-2.5 text-xs font-bold text-white hover:bg-blue-800 transition shadow-sm"
                >
                  Publish Announcement 📢
                </button>
              </form>
            </div>

            {/* List of Notices */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                Active Classroom Notices
              </h3>
              {notices.map((n) => (
                <div key={n.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-700">
                      {n.category}
                    </span>
                    <span className="text-xs text-slate-400">{n.date}</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900">{n.title}</h4>
                  <p className="text-xs text-slate-600 leading-5">{n.content}</p>
                  <p className="text-[11px] text-slate-400 pt-1 font-medium">Posted by: {n.sender}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MODAL: ASSIGN HOMEWORK */}
      {isAssignModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Assign Homework</h3>
            <p className="text-xs text-slate-500 mb-4">Set a homework task for {selectedClass} ({selectedSubject}).</p>

            <form onSubmit={handleCreateAssignment} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Assignment Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Chapter 4 Fractions Practice"
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-semibold outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Due Timeline
                </label>
                <input
                  type="text"
                  required
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                  placeholder="e.g. Due Tomorrow at 4 PM"
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-semibold outline-none focus:border-blue-600"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAssignModalOpen(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-blue-700 px-5 py-2 text-xs font-bold text-white hover:bg-blue-800 shadow-sm"
                >
                  Publish Homework
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: SEND NOTE TO PARENT */}
      {selectedStudentForNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Send Note to Parent</h3>
            <p className="text-xs text-slate-500 mb-4">
              To: <strong>{selectedStudentForNote.parentName}</strong> (Parent of {selectedStudentForNote.name})
            </p>

            <form onSubmit={handleSendParentNote} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Message Content
                </label>
                <textarea
                  rows={4}
                  required
                  value={parentNoteText}
                  onChange={(e) => setParentNoteText(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-3 text-xs font-semibold outline-none focus:border-blue-600"
                />
              </div>

              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => setParentNoteText("Aarav is showing great focus and participation during class discussions today!")}
                  className="rounded-lg bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-200"
                >
                  + Praise participation
                </button>
                <button
                  type="button"
                  onClick={() => setParentNoteText("Please make sure to review mathematics chapter formulas this evening.")}
                  className="rounded-lg bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-200"
                >
                  + Request revision
                </button>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedStudentForNote(null)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-blue-700 px-5 py-2 text-xs font-bold text-white hover:bg-blue-800 shadow-sm"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

function OverviewStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl bg-white/85 p-3 shadow-sm">
      <p className="text-xl font-bold text-slate-900">{value}</p>
      <p className="mt-1 text-xs font-semibold text-slate-500">{label}</p>
    </div>
  );
}
