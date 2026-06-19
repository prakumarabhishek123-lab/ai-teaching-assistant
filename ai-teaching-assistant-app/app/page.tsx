import Link from "next/link";
import { FeatureCard } from "@/components/FeatureCard";
import { HowItWorksStep } from "@/components/HowItWorksStep";

const features = [
  {
    title: "Concept Simplification",
    description:
      "Turn difficult topics into short, clear, classroom-friendly explanations.",
    icon: "CS",
  },
  {
    title: "Voice Quiz Generator",
    description:
      "Create quick spoken questions to check student understanding instantly.",
    icon: "VQ",
  },
  {
    title: "Bilingual Translation",
    description:
      "Support English, Hindi, and Hinglish learning without breaking the flow.",
    icon: "TR",
  },
];

const steps = [
  {
    step: "1",
    title: "Teacher enters a topic",
    description:
      "Start with any concept, paragraph, or classroom doubt that needs explanation.",
  },
  {
    step: "2",
    title: "AI prepares content",
    description:
      "Gemini processes the input and creates explanation, quiz, translation, or board notes.",
  },
  {
    step: "3",
    title: "Classroom-ready output",
    description:
      "Use the generated content directly for teaching, revision, or student practice.",
  },
];

const benefits = [
  {
    title: "Save Time",
    description: "Prepare explanations, quizzes, and worksheets within seconds.",
    icon: "⏱️",
  },
  {
    title: "Voice Friendly",
    description: "Short outputs designed for smooth classroom voice reading.",
    icon: "🔊",
  },
  {
    title: "Multi Language",
    description: "Teach using Hindi, English, or Hinglish based on class need.",
    icon: "🌐",
  },
  {
    title: "Exam Ready",
    description: "Generate important questions that help students revise better.",
    icon: "📝",
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen bg-amber-50 text-slate-950">
      <section className="sticky top-0 z-0 isolate overflow-hidden bg-[linear-gradient(135deg,#fffbeb_0%,#fef3c7_42%,#ecfdf5_100%)] text-slate-950">
        <div className="absolute left-[-120px] top-[-120px] h-72 w-72 rounded-full bg-amber-300/40 blur-3xl" />
        <div className="absolute bottom-[-160px] right-[-120px] h-96 w-96 rounded-full bg-emerald-300/40 blur-3xl" />

        <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-6 sm:px-8 lg:px-10">
          <nav className="animate-fade-in flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-3 text-base font-bold tracking-tight text-emerald-900 sm:text-lg"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-200 bg-white/80 text-sm text-emerald-700 shadow-lg shadow-emerald-950/10 backdrop-blur">
                AI
              </span>
              <span>AI Teaching Assistant</span>
            </Link>

            <Link
              href="/dashboard"
              className="group inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-900/20 transition hover:-translate-y-0.5 hover:bg-emerald-700"
            >
              Open Dashboard
              <span className="transition group-hover:translate-x-1">→</span>
            </Link>
          </nav>

          <div className="grid flex-1 items-center gap-12 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:py-10">
            <div className="animate-fade-up">
              <p className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-sm font-semibold text-emerald-800 shadow-sm backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_18px_rgba(16,185,129,0.9)]" />
                Individual Round 2 Submission
              </p>

              <h1 className="mt-8 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Voice-Enabled AI Teaching Assistant for Modern Classrooms
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700 sm:text-xl">
                Explain concepts, generate quizzes, translate content, and
                create classroom-ready worksheets with AI.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/dashboard"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-emerald-900/20 transition hover:-translate-y-1 hover:bg-emerald-700"
                >
                  Start Teaching Smarter
                  <span className="transition group-hover:translate-x-1">→</span>
                </Link>

                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center rounded-xl border border-emerald-200 bg-white/70 px-6 py-3.5 text-sm font-semibold text-emerald-800 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:bg-white"
                >
                  See How It Works
                </a>
              </div>

              <div className="mt-8 grid max-w-2xl grid-cols-2 gap-3 text-xs font-semibold text-emerald-800 sm:grid-cols-4">
                {[
                  "50+ Classroom Topics",
                  "3 Language Modes",
                  "AI Voice Support",
                  "Instant Worksheets",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-emerald-100 bg-white/80 px-3 py-3 text-center shadow-sm backdrop-blur transition hover:-translate-y-1 hover:bg-amber-50"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="animate-fade-up-delayed lg:-mr-8 xl:-mr-14">
              <div
                id="demo"
                className="relative overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/70 p-3 shadow-[0_34px_120px_rgba(15,23,42,0.25)] backdrop-blur-2xl"
              >
                <div className="absolute right-5 top-5 z-10 animate-pulse rounded-full bg-amber-100 px-3 py-2 text-xs font-semibold text-emerald-900 shadow-lg ring-1 ring-amber-200 sm:right-7 sm:top-7 sm:px-4 sm:text-sm">
                  ✨ AI Assistant Active
                </div>

                <video
                  className="aspect-video w-full rounded-[1.25rem] object-cover shadow-2xl lg:min-h-[430px]"
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
            <section className="relative z-10 bg-white px-6 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-600">
              Core Features
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              Made for the everyday work of teaching
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              A simple assistant that helps teachers prepare explanations,
              quizzes, translations, and classroom notes faster.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 overflow-hidden bg-gradient-to-br from-amber-50 via-white to-emerald-50 px-6 py-20 sm:px-8 lg:px-10">
        <div className="absolute left-[-120px] top-10 h-72 w-72 rounded-full bg-amber-300/30 blur-3xl" />
        <div className="absolute bottom-[-120px] right-[-120px] h-72 w-72 rounded-full bg-emerald-300/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-600">
              Benefits
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Why Teachers Love This Assistant
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
              It helps teachers save preparation time, explain topics clearly,
              and make classroom learning more interactive.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="group rounded-3xl border border-amber-100 bg-white/85 p-6 shadow-lg shadow-emerald-950/5 backdrop-blur transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-950/10"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-emerald-600 text-3xl shadow-lg shadow-amber-500/20 transition group-hover:scale-110">
                  {benefit.icon}
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-950">
                  {benefit.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="relative z-10 border-y border-amber-100 bg-white px-6 py-16 sm:px-8 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-amber-600">
              Workflow
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              How It Works
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Keep the classroom voice yours. Let the tool handle the first AI
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

      <section className="relative z-10 bg-amber-50 px-6 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl bg-[linear-gradient(135deg,#064e3b_0%,#059669_52%,#f59e0b_100%)] px-6 py-12 text-center text-white shadow-2xl shadow-emerald-950/20 sm:px-10">
            <h2 className="text-3xl font-bold tracking-tight">
              Ready to make lesson preparation faster?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-emerald-50">
              Open the dashboard and turn rough lesson ideas into clear,
              classroom-ready AI content.
            </p>

            <div className="mt-8 flex justify-center">
              <Link
                href="/dashboard"
                className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-emerald-900 shadow-lg transition hover:-translate-y-1 hover:bg-amber-50"
              >
                Go to Dashboard
              </Link>
            </div>

            <p className="mt-8 text-xs font-medium text-emerald-50">
              Built with Next.js • Powered by Gemini AI • Designed for teachers
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}