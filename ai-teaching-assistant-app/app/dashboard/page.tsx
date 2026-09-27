import Link from "next/link";

const tools = [
  {
    title: "Concept Simplification",
    shortName: "CS",
    description:
      "Turn difficult chapters and textbook paragraphs into simple, student-friendly explanations.",
    href: "/dashboard/concept-simplification",
    badge: "AI Explanation",
    features: [
      "Simple classroom language",
      "English, Hindi and Hinglish",
      "Relatable everyday examples",
    ],
    iconBackground: "bg-fuchsia-100",
    iconText: "text-fuchsia-700",
    badgeStyle: "border-fuchsia-200 bg-fuchsia-50 text-fuchsia-700",
    buttonStyle:
      "from-fuchsia-500 via-violet-500 to-indigo-500 shadow-fuchsia-500/20",
    glowStyle: "bg-fuchsia-300/20",
  },
  {
    title: "Voice Quiz",
    shortName: "VQ",
    description:
      "Create short spoken quizzes that make revision more interactive and engaging.",
    href: "/dashboard/voice-quiz",
    badge: "Voice Learning",
    features: [
      "Class-based questions",
      "Subject and language options",
      "Quick oral practice",
    ],
    iconBackground: "bg-blue-100",
    iconText: "text-blue-700",
    badgeStyle: "border-blue-200 bg-blue-50 text-blue-700",
    buttonStyle:
      "from-blue-500 via-indigo-500 to-violet-500 shadow-blue-500/20",
    glowStyle: "bg-blue-300/20",
  },
  {
    title: "Translation & Dictation",
    shortName: "TR",
    description:
      "Translate learning content and turn it into useful language and dictation practice.",
    href: "/dashboard/translation-dictation",
    badge: "Language Practice",
    features: [
      "Easy translation support",
      "Dictation-ready content",
      "Multilingual learning",
    ],
    iconBackground: "bg-emerald-100",
    iconText: "text-emerald-700",
    badgeStyle: "border-emerald-200 bg-emerald-50 text-emerald-700",
    buttonStyle:
      "from-emerald-500 via-teal-500 to-cyan-500 shadow-emerald-500/20",
    glowStyle: "bg-emerald-300/20",
  },
  {
    title: "Digital Board",
    shortName: "DB",
    description:
      "Organise any topic into headings, key points, examples and classroom questions.",
    href: "/dashboard/digital-board",
    badge: "Visual Learning",
    features: [
      "Structured topic flow",
      "Examples and key points",
      "Board-ready lesson content",
    ],
    iconBackground: "bg-amber-100",
    iconText: "text-amber-700",
    badgeStyle: "border-amber-200 bg-amber-50 text-amber-700",
    buttonStyle:
      "from-amber-500 via-orange-500 to-rose-500 shadow-orange-500/20",
    glowStyle: "bg-orange-300/20",
  },
];

export default function ToolsOverviewPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(145deg,#fff7fd_0%,#f5f1ff_45%,#eef8ff_100%)] text-slate-950">
      <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-fuchsia-300/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-52 h-96 w-96 rounded-full bg-blue-300/25 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <header className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/80 bg-white/70 p-3 shadow-sm backdrop-blur-xl sm:p-4">
          <Link
            href="/student/dashboard"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-violet-800"
          >
            <span aria-hidden="true">←</span>
            Student Dashboard
          </Link>

          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-violet-600">
              AI Teaching Assistant
            </p>
            <p className="hidden text-sm font-semibold text-slate-700 sm:block">
              Learning tools workspace
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="rounded-xl border border-violet-200 bg-white px-4 py-2.5 text-sm font-bold text-violet-800 transition hover:bg-violet-50"
            >
              Login
            </Link>
            <Link
              href="/"
              className="rounded-xl border border-violet-200 bg-violet-50 px-4 py-2.5 text-sm font-semibold text-violet-800 transition hover:border-violet-300 hover:bg-violet-100"
            >
              Back Home
            </Link>
          </div>
        </header>

        <section className="mt-6 overflow-hidden rounded-[2rem] border border-white/80 bg-white/65 px-6 py-10 shadow-[0_30px_80px_-42px_rgba(76,29,149,0.45)] backdrop-blur-xl sm:px-10 lg:px-14">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-violet-700">
              Four powerful learning tools
            </span>

            <h1 className="mt-5 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              Choose the tool that helps you learn better.
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Open a focused workspace for explanation, voice practice,
              translation or visual learning.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {["Student friendly", "AI powered", "Multilingual", "Quick results"].map(
                (item) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm"
                  >
                    {item}
                  </span>
                ),
              )}
            </div>
          </div>
        </section>

        <section
          className="mt-6 grid gap-5 md:grid-cols-2"
          aria-label="Available learning tools"
        >
          {tools.map((tool, index) => (
            <article
              key={tool.title}
              className="group relative overflow-hidden rounded-[2rem] border border-white/90 bg-white/80 p-6 shadow-[0_24px_70px_-42px_rgba(76,29,149,0.45)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_-38px_rgba(76,29,149,0.55)] sm:p-7"
            >
              <div
                className={`pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full ${tool.glowStyle} blur-3xl transition duration-300 group-hover:scale-125`}
              />

              <div className="relative flex h-full flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${tool.iconBackground} text-sm font-black ${tool.iconText} shadow-sm`}
                  >
                    {tool.shortName}
                  </div>

                  <span
                    className={`rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-wider ${tool.badgeStyle}`}
                  >
                    {tool.badge}
                  </span>
                </div>

                <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
                  Tool {String(index + 1).padStart(2, "0")}
                </p>

                <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
                  {tool.title}
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
                  {tool.description}
                </p>

                <div className="mt-6 space-y-3">
                  {tool.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${tool.iconBackground} text-xs font-black ${tool.iconText}`}
                      >
                        ✓
                      </span>
                      <span className="text-sm font-medium text-slate-700">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  href={tool.href}
                  className={`mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r px-5 py-3 text-sm font-bold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:shadow-xl ${tool.buttonStyle}`}
                >
                  Open {tool.title}
                  <span
                    className="text-lg transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </section>

        <footer className="mt-8 pb-4 text-center">
          <p className="text-sm font-medium text-slate-500">
            Select a tool to open its focused learning workspace.
          </p>
        </footer>
      </div>
    </main>
  );
}