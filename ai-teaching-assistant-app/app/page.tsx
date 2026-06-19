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
    <main className="relative min-h-screen bg-slate-50 text-slate-950">
      <section className="sticky top-0 z-0 isolate overflow-hidden bg-[radial-gradient(circle_at_75%_20%,rgba(168,85,247,0.38),transparent_30%),radial-gradient(circle_at_10%_80%,rgba(124,58,237,0.32),transparent_34%),linear-gradient(135deg,#0f071a_0%,#21103d_48%,#3b1670_100%)] text-white">
        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute -right-24 bottom-10 h-96 w-96 rounded-full bg-fuchsia-400/15 blur-3xl" />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-6 sm:px-8 lg:px-10">
          <nav className="animate-fade-in flex items-center justify-between rounded-2xl border border-white/15 bg-white/[0.08] px-3 py-3 shadow-2xl shadow-violet-950/20 backdrop-blur-xl sm:px-4">
            <Link
              href="/"
              className="flex items-center gap-3 text-base font-bold tracking-tight text-white sm:text-lg"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/15 text-sm text-violet-100 shadow-lg shadow-violet-950/20 backdrop-blur">
                AI
              </span>
              <span>AI Translation &amp; Dictation Assistant</span>
            </Link>
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="group inline-flex items-center gap-2 rounded-xl border border-violet-200/25 bg-white/15 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-950/20 backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white/25"
              >
                Open Dashboard
                <span className="w-0 translate-x-[-4px] overflow-hidden opacity-0 transition-all group-hover:w-4 group-hover:translate-x-0 group-hover:opacity-100">
                  →
                </span>
              </Link>
            </div>
          </nav>

          <div className="grid flex-1 items-center gap-12 py-16 lg:grid-cols-[0.88fr_1.18fr] lg:gap-14 lg:py-10">
            <div className="animate-fade-up">
              <p className="inline-flex items-center gap-2 rounded-full border border-violet-200/25 bg-white/10 px-4 py-2 text-sm font-semibold text-violet-50 shadow-lg shadow-violet-950/20 backdrop-blur-xl">
                <span aria-hidden="true">🌐</span>
                Multi-Language Ready
              </p>
              <h1 className="mt-8 max-w-4xl text-4xl font-bold leading-[1.05] tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
                <span className="block">Translate Every Lesson</span>
                <span className="mt-2 block bg-gradient-to-r from-violet-200 via-fuchsia-200 to-purple-300 bg-clip-text font-serif italic text-transparent">
                  Teach Every Learner
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-violet-100/80 sm:text-xl">
                Turn speech into clear notes and translate classroom content
                across languages—all with one AI teaching assistant.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/dashboard"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-7 py-4 text-center text-sm font-semibold text-white shadow-[0_18px_55px_rgba(124,58,237,0.45)] transition duration-300 hover:-translate-y-1 hover:from-violet-500 hover:to-purple-500 hover:shadow-[0_22px_65px_rgba(168,85,247,0.5)]"
                >
                  Open Dashboard
                  <span className="w-0 translate-x-[-4px] overflow-hidden opacity-0 transition-all group-hover:w-4 group-hover:translate-x-0 group-hover:opacity-100">
                    →
                  </span>
                </Link>
              </div>
              <div className="mt-8 grid max-w-2xl grid-cols-2 gap-3 text-xs font-semibold text-violet-50/90 sm:grid-cols-4">
                {["Voice Dictation", "Live Translation", "Lesson Support", "Multi-Language"].map(
                  (item) => (
                    <div
                      key={item}
                      className="rounded-xl border border-white/15 bg-white/[0.08] px-3 py-2.5 text-center shadow-lg shadow-violet-950/20 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-violet-200/30 hover:bg-white/15"
                    >
                      {item}
                    </div>
                  ),
                )}
              </div>
            </div>

            <div className="animate-fade-up-delayed lg:-mr-8 xl:-mr-14">
              <div id="demo" className="group relative overflow-hidden rounded-[2rem] border border-white/20 bg-white/10 p-3 shadow-[0_40px_140px_rgba(8,3,20,0.75)] backdrop-blur-2xl">
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/20 via-purple-500/10 to-violet-500/25" />
                <div className="absolute right-5 top-5 z-20 animate-pulse rounded-full border border-white/20 bg-slate-950/45 px-3 py-2 text-xs font-semibold text-white shadow-lg shadow-slate-950/30 backdrop-blur-xl sm:right-7 sm:top-7 sm:px-4 sm:text-sm">
                  <span className="mr-2 inline-block h-2 w-2 rounded-full bg-violet-300 shadow-[0_0_14px_rgba(196,181,253,1)]" />
                  AI Assistant Active
                </div>
                <video
                  className="aspect-video w-full rounded-[1.4rem] object-cover shadow-2xl transition duration-700 group-hover:scale-[1.02] lg:min-h-[430px]"
                  src="/teaching.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="Teaching assistant classroom preview"
                />
                <div className="pointer-events-none absolute inset-3 rounded-[1.4rem] bg-[linear-gradient(180deg,rgba(76,29,149,0.08)_0%,transparent_48%,rgba(15,7,26,0.72)_100%)]" />

                <div className="pointer-events-none absolute bottom-7 left-6 z-20 animate-bounce rounded-xl border border-white/20 bg-white/15 px-3 py-2 text-white shadow-xl shadow-violet-950/30 backdrop-blur-xl [animation-duration:4.5s] sm:left-7 sm:px-4">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-violet-100/70">Hindi</span>
                  <p className="text-sm font-semibold">नमस्ते</p>
                </div>
                <div className="pointer-events-none absolute bottom-20 right-5 z-20 animate-bounce rounded-xl border border-white/20 bg-white/15 px-3 py-2 text-white shadow-xl shadow-violet-950/30 backdrop-blur-xl [animation-delay:600ms] [animation-duration:5s] sm:right-7 sm:px-4">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-violet-100/70">English</span>
                  <p className="text-sm font-semibold">Hello</p>
                </div>
                <div className="pointer-events-none absolute left-[34%] top-7 z-20 hidden animate-bounce rounded-xl border border-white/20 bg-white/15 px-4 py-2 text-white shadow-xl shadow-violet-950/30 backdrop-blur-xl [animation-delay:1s] [animation-duration:5.5s] sm:block">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-violet-100/70">Spanish</span>
                  <p className="text-sm font-semibold">Hola</p>
                </div>
                <div className="pointer-events-none absolute bottom-7 left-[43%] z-20 hidden animate-bounce rounded-xl border border-white/20 bg-white/15 px-4 py-2 text-white shadow-xl shadow-violet-950/30 backdrop-blur-xl [animation-delay:300ms] [animation-duration:4.8s] sm:block">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-violet-100/70">French</span>
                  <p className="text-sm font-semibold">Bonjour</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section className="relative z-10 bg-[radial-gradient(ellipse_at_46%_60%,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.82)_24%,transparent_48%),radial-gradient(ellipse_at_78%_58%,rgba(237,233,254,0.95)_0%,rgba(221,214,254,0.62)_28%,transparent_50%),linear-gradient(180deg,#a78bfa_0%,#c4b5fd_22%,#e9d5ff_58%,#faf5ff_100%)] px-6 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight">
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
        className="relative z-10 border-y border-white/70 bg-[radial-gradient(ellipse_at_18%_20%,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.58)_28%,transparent_52%),radial-gradient(ellipse_at_82%_78%,rgba(221,214,254,0.78)_0%,transparent_46%),linear-gradient(135deg,#faf5ff_0%,#f3e8ff_48%,#ede9fe_100%)] px-6 py-16 sm:px-8 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight">How it comes together</h2>
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

      <section className="relative z-10 bg-[#faf5ff] px-6 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-lg bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.88)_0%,rgba(237,233,254,0.72)_34%,transparent_62%),linear-gradient(135deg,#ede9fe_0%,#c4b5fd_48%,#ddd6fe_100%)] px-6 py-12 text-center text-slate-950 shadow-sm shadow-violet-900/10 sm:px-10">
            <h2 className="text-3xl font-bold tracking-tight text-slate-950">
              Prepare with a little more breathing room
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-700">
              Open the dashboard and turn rough lesson ideas into something you
              can use before the bell.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/dashboard"
                className="rounded-lg bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-500"
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
