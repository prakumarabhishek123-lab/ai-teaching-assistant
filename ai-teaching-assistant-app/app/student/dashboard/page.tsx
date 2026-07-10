import Link from "next/link";
import { DashboardLayout } from "@/components/DashboardLayout";
import { DoubtSolverCard } from "@/components/DoubtSolverCard";
import { CLASS_LEVELS } from "@/lib/config/education";

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

const goals = [
  { label: "Complete one Maths practice", complete: true },
  { label: "Read for 15 minutes", complete: true },
  { label: "Try a Science voice quiz", complete: false },
] as const;

const recentActivity = [
  { title: "Fractions made easy", subject: "Maths", time: "Today" },
  { title: "The water cycle quiz", subject: "Science", time: "Yesterday" },
  { title: "Hindi dictation practice", subject: "Hindi", time: "2 days ago" },
] as const;

export default function StudentDashboardPage() {
  return (
    <DashboardLayout
      role="student"
      title="Ready to learn something new?"
      description="Pick your class and subject, meet your daily goals, or jump back into your favourite learning tool."
    >
      <div className="space-y-9">
        <section className="flex flex-col gap-4 rounded-2xl bg-blue-50 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <h2 className="text-xl font-bold">Choose your class</h2>
            <p className="mt-1 text-sm text-slate-600">We will show learning that is right for you.</p>
          </div>
          <label className="flex min-w-52 flex-col gap-2 text-sm font-bold text-slate-700">
            Class level
            <select
              defaultValue="Class 5"
              className="min-h-12 rounded-xl border border-blue-200 bg-white px-4 text-base font-semibold text-slate-900 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            >
              {CLASS_LEVELS.map((classLevel) => <option key={classLevel}>{classLevel}</option>)}
            </select>
          </label>
        </section>

        <DoubtSolverCard />

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

        <section aria-labelledby="quick-tools-heading">
          <p className="text-sm font-bold uppercase tracking-wider text-violet-700">AI learning helpers</p>
          <h2 id="quick-tools-heading" className="mt-1 text-2xl font-bold">Quick access</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {quickTools.map((tool) => (
              <Link
                key={tool.name}
                href="/dashboard"
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

        <div className="grid gap-5 lg:grid-cols-2">
          <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:p-6" aria-labelledby="goals-heading">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-emerald-700">2 of 3 complete</p>
                <h2 id="goals-heading" className="mt-1 text-xl font-bold">Today&apos;s goals</h2>
              </div>
              <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-emerald-700">67%</span>
            </div>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-white" aria-label="67 percent of daily goals complete">
              <div className="h-full w-2/3 rounded-full bg-emerald-500" />
            </div>
            <ul className="mt-5 space-y-3">
              {goals.map((goal) => (
                <li key={goal.label} className="flex items-center gap-3 rounded-xl bg-white/80 p-3 text-sm font-semibold">
                  <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs ${goal.complete ? "bg-emerald-500 text-white" : "border-2 border-emerald-300"}`} aria-hidden="true">
                    {goal.complete ? "✓" : ""}
                  </span>
                  <span className={goal.complete ? "text-slate-500 line-through" : "text-slate-800"}>{goal.label}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6" aria-labelledby="activity-heading">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-700">Keep going</p>
            <h2 id="activity-heading" className="mt-1 text-xl font-bold">Recent activity</h2>
            <ul className="mt-4 divide-y divide-slate-100">
              {recentActivity.map((activity) => (
                <li key={activity.title} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-blue-700">{activity.subject.slice(0, 2).toUpperCase()}</span>
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
    </DashboardLayout>
  );
}
