import Link from "next/link";
import { FeatureCard } from "@/components/FeatureCard";
import { HowItWorksStep } from "@/components/HowItWorksStep";

const features = [
  {
    title: "Explain the hard part",
    description:
      "Shape a difficult idea into language your class can actually hold on to.",
    icon: "CS",
  },
  {
    title: "Check the room",
    description:
      "Create quick spoken questions that reveal who is ready and who needs one more example.",
    icon: "VQ",
  },
  {
    title: "Bridge the language gap",
    description:
      "Move between classroom languages without losing the warmth of the lesson.",
    icon: "TR",
  },
];

const steps = [
  {
    step: "1",
    title: "Pick the classroom moment",
    description:
      "Begin with the part of the lesson that needs the most care.",
  },
  {
    step: "2",
    title: "Add the real context",
    description:
      "Bring in the topic, grade, language, or paragraph your students will meet.",
  },
  {
    step: "3",
    title: "Walk in with a draft",
    description:
      "Use the result as a starting point, then make it sound like your own classroom.",
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-slate-50 text-slate-950">
      <section className="landing-scroll-cover-hero sticky top-0 z-0 isolate overflow-hidden bg-[linear-gradient(135deg,#f6d1fb_0%,#f4a2c4_48%,#ffaaa6_100%)] text-white">

        <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-4 sm:px-8 sm:py-6 lg:px-10">
          <nav className="animate-fade-in flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/"
              className="flex min-w-0 items-center justify-center gap-3 text-center text-sm font-bold tracking-tight text-slate-950 sm:justify-start sm:text-left sm:text-lg"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/50 bg-white/70 text-sm text-blue-700 shadow-lg shadow-blue-950/10 backdrop-blur">
                AI
              </span>
              <span>AI Teaching Assistant</span>
            </Link>
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/25 bg-slate-950/90 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-950/20 transition hover:-translate-y-0.5 hover:bg-slate-900 sm:w-auto"
              >
                Open Dashboard
                <span className="w-0 translate-x-[-4px] overflow-hidden opacity-0 transition-all group-hover:w-4 group-hover:translate-x-0 group-hover:opacity-100">
                  →
                </span>
              </Link>
            </div>
          </nav>

          <div className="grid min-w-0 flex-1 items-center gap-8 py-10 sm:gap-12 sm:py-16 lg:grid-cols-[0.88fr_1.18fr] lg:gap-14 lg:py-10">
            <div className="animate-fade-up">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/55 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-blue-600 shadow-[0_0_18px_rgba(37,99,235,0.9)]" />
                Built for teachers. Tuned for real classrooms.
              </p>
              <h1 className="mt-6 max-w-4xl text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:mt-8 sm:text-4xl lg:text-5xl">
                <span className="block">AI-Powered Teaching Assistant</span>
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:mt-6 sm:text-xl sm:leading-8">
                Plan explanations, quick checks, translations, and board notes
                with a tool that feels closer to a teaching partner than a blank
                page.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/dashboard"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-6 py-3.5 text-center text-sm font-semibold text-white shadow-xl shadow-blue-950/25 transition hover:-translate-y-1 hover:bg-blue-950 hover:shadow-2xl sm:w-auto"
                >
                  Open Dashboard
                  <span className="w-0 translate-x-[-4px] overflow-hidden opacity-0 transition-all group-hover:w-4 group-hover:translate-x-0 group-hover:opacity-100">
                    →
                  </span>
                </Link>
              </div>
              <div className="mt-7 grid max-w-2xl grid-cols-2 gap-2 text-xs font-semibold text-slate-700 sm:mt-8 sm:grid-cols-4 sm:gap-3">
                {["Voice Quiz", "Lesson Planning", "Translation", "Worksheet Generator"].map(
                  (item) => (
                    <div
                      key={item}
                      className="rounded-lg border border-white/50 bg-white/45 px-3 py-2 text-center shadow-sm backdrop-blur transition hover:-translate-y-1 hover:bg-white/70"
                    >
                      {item}
                    </div>
                  ),
                )}
              </div>
            </div>

            <div className="animate-fade-up-delayed lg:-mr-8 xl:-mr-14">
              <div id="demo" className="relative min-w-0 overflow-hidden rounded-[1.25rem] border border-white/35 bg-white/15 p-2 shadow-[0_34px_120px_rgba(15,23,42,0.45)] backdrop-blur-2xl sm:rounded-[1.75rem] sm:p-3">
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/35 via-blue-500/10 to-violet-500/20" />
                <div className="absolute right-5 top-5 z-10 animate-pulse rounded-full bg-white/80 px-3 py-2 text-xs font-semibold text-slate-900 shadow-lg shadow-slate-900/15 backdrop-blur-xl ring-1 ring-white/60 sm:right-7 sm:top-7 sm:px-4 sm:text-sm">
                  ✨ AI Assistant Active
                </div>
                <video
                  className="aspect-video h-auto w-full max-w-full rounded-[0.9rem] object-cover shadow-2xl sm:rounded-[1.25rem] lg:min-h-[430px]"
                  src="/teaching.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="Teaching assistant classroom preview"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      <section className="landing-scroll-cover-panel relative z-10 bg-[radial-gradient(ellipse_at_46%_60%,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.82)_24%,transparent_48%),radial-gradient(ellipse_at_78%_58%,rgba(255,244,232,0.95)_0%,rgba(255,231,222,0.56)_28%,transparent_50%),linear-gradient(180deg,#f9a8b8_0%,#f6bfd0_22%,#f2d7f2_58%,#fff8fd_100%)] px-4 py-12 sm:px-8 sm:py-16 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Made for the everyday work of teaching
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Not a loud promise. Just a quieter way to prepare the moments
              that make a lesson land.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="relative z-10 border-y border-white/70 bg-[radial-gradient(ellipse_at_18%_20%,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.58)_28%,transparent_52%),radial-gradient(ellipse_at_82%_78%,rgba(255,225,211,0.72)_0%,transparent_46%),linear-gradient(135deg,#fffaf5_0%,#f9e5ee_48%,#f1edf9_100%)] px-4 py-12 sm:px-8 sm:py-16 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">How it comes together</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Keep the classroom voice yours. Let the tool handle the first
              draft.
            </p>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {steps.map((step) => (
              <HowItWorksStep key={step.step} {...step} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 bg-[#fbf7f2] px-4 py-12 sm:px-8 sm:py-16 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-lg bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.88)_0%,rgba(255,224,232,0.62)_34%,transparent_62%),linear-gradient(135deg,#ffd9e3_0%,#f5b7ca_48%,#f8d9e6_100%)] px-4 py-10 text-center text-slate-950 shadow-sm shadow-pink-900/10 sm:px-10 sm:py-12">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Prepare with a little more breathing room
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-700">
              Open the dashboard and turn rough lesson ideas into something you
              can use before the bell.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/dashboard"
                className="w-full rounded-lg bg-teal-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-400 sm:w-auto"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
