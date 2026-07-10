import { DashboardLayout } from "@/components/DashboardLayout";

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

export default function ParentDashboardPage() {
  return (
    <DashboardLayout
      role="parent"
      title="A clear view of every learning step"
      description="Follow your child’s progress, celebrate strengths, and see where a little support can make a difference."
    >
      <div className="space-y-6">
        <section className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
          <article className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-violet-50 p-5 sm:p-6" aria-labelledby="child-profile-heading">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 text-2xl font-bold text-white shadow-lg shadow-blue-900/15" aria-hidden="true">AS</div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold uppercase tracking-wider text-blue-700">Child profile</p>
                <h2 id="child-profile-heading" className="mt-1 text-2xl font-bold">Aarav Sharma</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 shadow-sm">Class 5</span>
                  <span className="rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 shadow-sm">Section A</span>
                  <span className="rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 shadow-sm">Roll no. 12</span>
                </div>
              </div>
              <button type="button" className="min-h-12 shrink-0 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-100">
                Contact Teacher
              </button>
            </div>
          </article>

          <article className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:p-6" aria-labelledby="daily-progress-heading">
            <div className="flex items-start justify-between gap-3">
              <div><p className="text-sm font-bold uppercase tracking-wider text-emerald-700">Today</p><h2 id="daily-progress-heading" className="mt-1 text-xl font-bold">Daily learning progress</h2></div>
              <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-emerald-700">3 of 4</span>
            </div>
            <div className="mt-5 h-3 overflow-hidden rounded-full bg-white" aria-label="75 percent of daily learning complete"><div className="h-full w-3/4 rounded-full bg-emerald-500" /></div>
            <div className="mt-4 flex items-end justify-between"><p className="text-sm text-slate-600">One activity left for today</p><p className="text-2xl font-bold text-emerald-700">75%</p></div>
          </article>
        </section>

        <section className="grid grid-cols-2 gap-3 lg:grid-cols-4" aria-label="Learning summary">
          <MetricCard label="Attendance" value="94%" detail="22 of 23 days" tone="blue" />
          <MetricCard label="Homework status" value="8 / 10" detail="2 assignments due" tone="amber" />
          <MetricCard label="Quiz average" value="86%" detail="Up 4% this month" tone="violet" />
          <MetricCard label="Learning time" value="6h 25m" detail="This week" tone="emerald" />
        </section>

        <div className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6" aria-labelledby="weekly-heading">
            <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-sm font-bold uppercase tracking-wider text-blue-700">Weekly report</p><h2 id="weekly-heading" className="mt-1 text-xl font-bold">Learning consistency</h2></div><p className="text-sm font-semibold text-slate-500">5h goal · 4h 12m complete</p></div>
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
            <p className="mt-3 text-sm leading-6 text-slate-300">Aarav is doing well with numbers. Try a 10-minute reading session together today and ask him to retell the story in his own words.</p>
            <button type="button" className="mt-5 min-h-11 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-white/20">See more suggestions</button>
          </section>
        </div>

        <section className="grid gap-4 sm:grid-cols-2">
          <article className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:p-6">
            <p className="text-sm font-bold uppercase tracking-wider text-emerald-700">Strong subjects</p><h2 className="mt-1 text-xl font-bold">Areas to celebrate</h2>
            <div className="mt-4 flex flex-wrap gap-2"><SubjectPill name="Mathematics" score="92%" /><SubjectPill name="Science" score="88%" /></div>
          </article>
          <article className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
            <p className="text-sm font-bold uppercase tracking-wider text-amber-700">Needs support</p><h2 className="mt-1 text-xl font-bold">Weak subjects</h2>
            <div className="mt-4 flex flex-wrap gap-2"><SubjectPill name="English" score="68%" /><SubjectPill name="Social Science" score="72%" /></div>
          </article>
        </section>

        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6" aria-labelledby="activities-heading">
            <p className="text-sm font-bold uppercase tracking-wider text-violet-700">Latest learning</p><h2 id="activities-heading" className="mt-1 text-xl font-bold">Recent activities</h2>
            <ul className="mt-4 divide-y divide-slate-100">
              {recentActivities.map((activity) => <li key={activity.title} className="flex gap-3 py-4 first:pt-0 last:pb-0"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-xs font-black text-violet-700">{activity.icon}</span><span className="min-w-0 flex-1"><span className="block font-semibold">{activity.title}</span><span className="mt-1 block text-sm text-slate-500">{activity.detail}</span></span><time className="shrink-0 text-xs font-medium text-slate-400">{activity.time}</time></li>)}
            </ul>
          </section>

          <aside className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6" aria-labelledby="notifications-heading">
            <div className="flex items-center justify-between gap-3"><div><p className="text-sm font-bold uppercase tracking-wider text-blue-700">Updates</p><h2 id="notifications-heading" className="mt-1 text-xl font-bold">Notifications</h2></div><span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-700">3 new</span></div>
            <ul className="mt-4 space-y-3">{notifications.map((notification) => <li key={notification.title} className="flex gap-3 rounded-xl bg-slate-50 p-3"><span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${notification.accent}`} /><span><span className="block text-sm font-semibold">{notification.title}</span><span className="mt-1 block text-xs leading-5 text-slate-500">{notification.detail}</span></span></li>)}</ul>
          </aside>
        </div>
      </div>
    </DashboardLayout>
  );
}

const metricTones = { blue: "border-blue-200 bg-blue-50 text-blue-800", amber: "border-amber-200 bg-amber-50 text-amber-800", violet: "border-violet-200 bg-violet-50 text-violet-800", emerald: "border-emerald-200 bg-emerald-50 text-emerald-800" } as const;

function MetricCard({ label, value, detail, tone }: { label: string; value: string; detail: string; tone: keyof typeof metricTones }) {
  return <article className={`rounded-2xl border p-4 sm:p-5 ${metricTones[tone]}`}><p className="text-xs font-bold uppercase tracking-wide opacity-75">{label}</p><p className="mt-2 text-2xl font-bold sm:text-3xl">{value}</p><p className="mt-1 text-xs font-medium opacity-75 sm:text-sm">{detail}</p></article>;
}

function SubjectPill({ name, score }: { name: string; score: string }) {
  return <span className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm"><span>{name}</span><strong className="text-slate-950">{score}</strong></span>;
}
