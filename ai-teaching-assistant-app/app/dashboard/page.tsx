import Link from "next/link";
import { ConceptSimplificationCard } from "@/components/ConceptSimplificationCard";
import { DashboardToolCard } from "@/components/DashboardToolCard";
import { DigitalBoardCard } from "@/components/DigitalBoardCard";
import { TranslationDictationCard } from "@/components/TranslationDictationCard";
import { VoiceQuizCard } from "@/components/VoiceQuizCard";

const tools = [
  {
    title: "Concept Simplification",
    description:
      "Turn a heavy topic into clear classroom language, with examples students can picture.",
    inputLabel: "Topic, chapter line, or textbook paragraph",
    placeholder: "Example: Fractions for Grade 5, explained through sharing food.",
    outputTitle: "Classroom explanation",
  },
  {
    title: "Voice Quiz",
    description:
      "Build a short oral check-in that helps you hear understanding in the room.",
    inputLabel: "Topic for the check-in",
    placeholder: "Example: Water cycle, Grade 6, five spoken questions.",
    outputTitle: "Quick oral check",
  },
  {
    title: "Translation & Dictation",
    description:
      "Move a sentence across languages and shape it into simple dictation practice.",
    inputLabel: "Text and language direction",
    placeholder: "Example: Translate this paragraph to Hindi, then make a dictation line.",
    outputTitle: "Translation and dictation",
  },
  {
    title: "Digital Board",
    description:
      "Sketch a board-ready flow with headings, key points, examples, and questions.",
    inputLabel: "Topic for the board",
    placeholder: "Example: Newton's laws with one everyday example.",
    outputTitle: "Board-ready flow",
  },
];

const stats = [
  { value: "4", label: "Teaching tools", icon: "✦" },
  { value: "3", label: "Languages", icon: "🌐" },
  { value: "Live", label: "Voice support", icon: "🎙" },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[linear-gradient(180deg,#fff7fd_0%,#f8f5ff_42%,#f8fafc_100%)] text-slate-950">
      <header className="dashboard-scroll-cover-hero sticky top-0 z-0 isolate overflow-hidden border-b border-white/70 bg-[radial-gradient(circle_at_82%_22%,rgba(255,255,255,0.72),transparent_28%),linear-gradient(135deg,#f6d1fb_0%,#f4a2c4_48%,#ffaaa6_100%)]">
        <div className="absolute -left-20 top-16 -z-10 h-64 w-64 rounded-full bg-violet-400/25 blur-3xl" />
        <div className="absolute -right-16 bottom-0 -z-10 h-72 w-72 rounded-full bg-white/30 blur-3xl" />
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-4 sm:px-8 sm:py-6 lg:px-10">
          <nav className="flex items-center justify-between gap-3 rounded-2xl border border-white/35 bg-white/25 px-3 py-3 shadow-lg shadow-pink-950/5 backdrop-blur-xl sm:px-4">
            <Link href="/" className="flex min-w-0 items-center gap-3 text-sm font-bold tracking-tight sm:text-lg">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/50 bg-white/60 text-xs text-blue-700 shadow-sm backdrop-blur sm:h-10 sm:w-10">
                AI
              </span>
              <span className="truncate">AI Teaching Assistant</span>
            </Link>
            <Link
              href="/"
              className="shrink-0 rounded-xl border border-white/45 bg-slate-950/90 px-3 py-2 text-xs font-semibold text-white shadow-lg shadow-blue-950/15 transition hover:-translate-y-0.5 hover:bg-blue-950 sm:px-4 sm:text-sm"
            >
              Back Home
            </Link>
          </nav>

          <div className="grid items-end gap-8 py-5 sm:py-8 lg:grid-cols-[1fr_auto] lg:gap-12">
            <div className="max-w-3xl">
            <p className="inline-flex rounded-full border border-white/45 bg-white/40 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-blue-950 shadow-sm backdrop-blur sm:text-sm">
              Classroom studio
            </p>
            <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Prepare tomorrow&apos;s class with more ease
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700 sm:mt-5 sm:text-lg sm:leading-8">
              Draft the parts of a lesson that usually take the longest: the
              explanation, the questions, the language support, and the board.
            </p>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:w-[390px]">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/45 bg-white/35 p-3 text-center shadow-lg shadow-pink-950/5 backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/50 sm:p-4"
                >
                  <span className="text-lg" aria-hidden="true">{stat.icon}</span>
                  <p className="mt-1 text-lg font-bold text-slate-950 sm:text-xl">{stat.value}</p>
                  <p className="mt-0.5 text-[10px] font-semibold text-slate-700 sm:text-xs">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <section className="dashboard-scroll-cover-panel relative z-10 min-h-screen rounded-t-[2rem] border-t border-white/80 bg-[linear-gradient(180deg,#fff7fd_0%,#f8f5ff_42%,#f8fafc_100%)] shadow-[0_-24px_80px_rgba(76,29,149,0.12)] sm:rounded-t-[2.5rem]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8 sm:py-12 lg:px-10 lg:py-16">
          <div className="mb-6 sm:mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">Your workspace</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">Choose a teaching tool</h2>
          </div>
          <div className="dashboard-card-grid grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
          {tools.map((tool) => (
            tool.title === "Concept Simplification" ? (
              <ConceptSimplificationCard key={tool.title} {...tool} />
            ) : tool.title === "Voice Quiz" ? (
              <VoiceQuizCard key={tool.title} {...tool} />
            ) : tool.title === "Translation & Dictation" ? (
              <TranslationDictationCard key={tool.title} {...tool} />
            ) : tool.title === "Digital Board" ? (
              <DigitalBoardCard key={tool.title} {...tool} />
            ) : (
              <DashboardToolCard key={tool.title} {...tool} />
            )
          ))}
          </div>
        </div>
      </section>
    </main>
  );
}
