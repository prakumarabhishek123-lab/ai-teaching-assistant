import Link from "next/link";
import {
  CLASS_LEVELS,
  LANGUAGES,
  ROLE_DASHBOARD_PATHS,
  ROLE_TYPES,
  SUBJECTS,
  type RoleType,
} from "@/lib/config/education";

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
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-8 lg:px-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-3 font-bold tracking-tight">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-700 text-sm text-white">
                AI
              </span>
              AI Teaching Assistant
            </Link>
            <span className="rounded-full bg-blue-50 px-3 py-1.5 text-sm font-semibold capitalize text-blue-800">
              {roleLabels[role]} workspace
            </span>
          </div>
          <nav aria-label="Role dashboards" className="flex flex-wrap gap-2">
            {ROLE_TYPES.map((item) => (
              <Link
                key={item}
                href={ROLE_DASHBOARD_PATHS[item]}
                aria-current={item === role ? "page" : undefined}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  item === role
                    ? "bg-slate-950 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {roleLabels[item]}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8 lg:px-10 lg:py-12">
        <section className="rounded-3xl bg-gradient-to-br from-blue-700 to-violet-700 p-6 text-white shadow-xl shadow-blue-950/10 sm:p-9">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-100">
            Class 1–8 learning hub
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
          <p className="mt-3 max-w-2xl leading-7 text-blue-50">{description}</p>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-3" aria-label="Learning configuration">
          <SummaryCard label="Class levels" value={`${CLASS_LEVELS.length} classes`} detail="Class 1 through Class 8" />
          <SummaryCard label="Subjects" value={`${SUBJECTS.length} subjects`} detail={SUBJECTS.slice(0, 3).join(", ")} />
          <SummaryCard label="Languages" value={`${LANGUAGES.length} languages`} detail={LANGUAGES.join(", ")} />
        </section>

        <section className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-6 sm:p-8">
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

