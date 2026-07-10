import Link from "next/link";
import { DashboardLayout } from "@/components/DashboardLayout";
import { CLASS_LEVELS, SUBJECTS } from "@/lib/config/education";

const quickActions = [
  { title: "Create Worksheet", description: "Build class-ready practice", icon: "WS", color: "bg-blue-50 text-blue-800 border-blue-200", href: "/teacher/worksheet-generator" },
  { title: "Create Quiz", description: "Check student understanding", icon: "QZ", color: "bg-violet-50 text-violet-800 border-violet-200", href: "/teacher/quiz-generator" },
  { title: "Assign Homework", description: "Set work for the class", icon: "HW", color: "bg-amber-50 text-amber-800 border-amber-200" },
  { title: "View Student Progress", description: "Review learning at a glance", icon: "PR", color: "bg-emerald-50 text-emerald-800 border-emerald-200" },
] as const;

const recentAssignments = [
  { title: "Fractions practice", className: "Class 5", subject: "Mathematics", status: "18 of 24 submitted", due: "Due today" },
  { title: "Our environment", className: "Class 4", subject: "Environmental Studies", status: "20 of 22 submitted", due: "Due tomorrow" },
  { title: "Reading comprehension", className: "Class 6", subject: "English", status: "28 of 30 submitted", due: "Due 8 July" },
] as const;

export default function TeacherDashboardPage() {
  return (
    <DashboardLayout
      role="teacher"
      title="Your teaching dashboard"
      description="Plan classes, manage learning activities, and support every student from Class 1 to Class 8."
    >
      <div className="space-y-8">
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
                <select defaultValue="Class 5" className="min-h-12 rounded-xl border border-blue-200 bg-white px-4 text-base font-semibold outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100">
                  {CLASS_LEVELS.map((classLevel) => <option key={classLevel}>{classLevel}</option>)}
                </select>
              </label>
              <label className="flex flex-col gap-2 text-sm font-bold text-slate-700">
                Subject
                <select defaultValue="Mathematics" className="min-h-12 rounded-xl border border-blue-200 bg-white px-4 text-base font-semibold outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100">
                  {SUBJECTS.map((subject) => <option key={subject}>{subject}</option>)}
                </select>
              </label>
            </div>
          </div>
        </section>

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
            {quickActions.map((action) => (
              "href" in action ? (
                <Link key={action.title} href={action.href} className={`min-h-36 rounded-2xl border p-4 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-100 ${action.color}`}>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/80 text-xs font-black shadow-sm" aria-hidden="true">{action.icon}</span>
                  <span className="mt-4 block font-bold">{action.title}</span>
                  <span className="mt-1 block text-xs font-medium opacity-80 sm:text-sm">{action.description}</span>
                </Link>
              ) : (
                <button key={action.title} type="button" className={`min-h-36 rounded-2xl border p-4 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-100 ${action.color}`}>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/80 text-xs font-black shadow-sm" aria-hidden="true">{action.icon}</span>
                  <span className="mt-4 block font-bold">{action.title}</span>
                  <span className="mt-1 block text-xs font-medium opacity-80 sm:text-sm">{action.description}</span>
                </button>
              )
            ))}
          </div>
        </section>

        <div className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6" aria-labelledby="assignments-heading">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-blue-700">Classwork</p>
              <h2 id="assignments-heading" className="mt-1 text-xl font-bold">Recent assignments</h2>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[34rem] text-left text-sm">
                <thead className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                  <tr><th className="pb-3 font-semibold">Assignment</th><th className="pb-3 font-semibold">Class</th><th className="pb-3 font-semibold">Submissions</th><th className="pb-3 text-right font-semibold">Due</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentAssignments.map((assignment) => (
                    <tr key={assignment.title}>
                      <td className="py-4 pr-4"><span className="block font-semibold text-slate-900">{assignment.title}</span><span className="mt-0.5 block text-xs text-slate-500">{assignment.subject}</span></td>
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
            <p className="text-sm font-bold uppercase tracking-wider text-emerald-700">Class 5 overview</p>
            <h2 id="students-heading" className="mt-1 text-xl font-bold">Students</h2>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <OverviewStat value="24" label="Students" />
              <OverviewStat value="88%" label="On track" />
              <OverviewStat value="5" label="Need support" />
              <OverviewStat value="92%" label="Attendance" />
            </div>
            <p className="mt-5 text-sm leading-6 text-slate-600">Detailed progress, attendance, and support insights will appear here when student records are connected.</p>
          </section>
        </div>
      </div>
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
