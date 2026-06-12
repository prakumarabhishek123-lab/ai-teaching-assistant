import Link from "next/link";
import { FeatureCard } from "@/components/FeatureCard";
import { HowItWorksStep } from "@/components/HowItWorksStep";

const features = [
  {
    title: "Simple Lesson Support",
    description:
      "Turn difficult textbook concepts into classroom-ready explanations for mixed learning levels.",
    icon: "CS",
  },
  {
    title: "Voice-Ready Practice",
    description:
      "Prepare oral quizzes and speaking prompts that help teachers check understanding quickly.",
    icon: "VQ",
  },
  {
    title: "Local Language Help",
    description:
      "Support translation, dictation, and multilingual learning moments for government school classrooms.",
    icon: "TR",
  },
];

const steps = [
  {
    step: "1",
    title: "Choose a classroom task",
    description:
      "Start with concept simplification, quiz creation, translation, dictation, or board planning.",
  },
  {
    step: "2",
    title: "Enter the lesson context",
    description:
      "Add a topic, grade level, language preference, or short paragraph from the lesson.",
  },
  {
    step: "3",
    title: "Generate teacher-ready output",
    description:
      "Review the output, adapt it for your students, and use it directly during class.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="relative isolate overflow-hidden bg-[#050b2c] text-white">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_20%_18%,rgba(147,197,253,0.95),transparent_28%),radial-gradient(circle_at_72%_26%,rgba(168,85,247,0.6),transparent_32%),linear-gradient(115deg,#f8fbff_0%,#e9efff_32%,#5b6ee8_58%,#07143f_100%)]" />
        <div className="absolute inset-0 -z-10 opacity-70 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="absolute bottom-0 left-0 right-0 -z-10 h-56 animate-parallax-slow bg-[radial-gradient(ellipse_at_bottom,rgba(59,130,246,0.38),transparent_62%)]" />
        <div className="absolute bottom-0 left-0 right-0 -z-10 h-44 bg-[linear-gradient(135deg,transparent_20%,rgba(255,255,255,0.22)_20.5%,transparent_21%),linear-gradient(45deg,transparent_20%,rgba(255,255,255,0.14)_20.5%,transparent_21%)] bg-[length:34px_34px] opacity-30 [mask-image:linear-gradient(to_top,black,transparent)]" />

        <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-6 sm:px-8 lg:px-10">
          <nav className="animate-fade-in flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-3 text-base font-bold tracking-tight text-slate-950 sm:text-lg"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/50 bg-white/70 text-sm text-blue-700 shadow-lg shadow-blue-950/10 backdrop-blur">
                AI
              </span>
              <span>AI Teaching Assistant</span>
            </Link>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/prakumarabhishek123-lab/ai-teaching-assistant"
                target="_blank"
                rel="noreferrer"
                className="hidden rounded-lg border border-slate-900/10 bg-white/45 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/70 sm:inline-flex"
              >
                View GitHub
              </a>
              <Link
                href="/dashboard"
                className="rounded-lg border border-white/25 bg-slate-950/90 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-950/20 transition hover:-translate-y-0.5 hover:bg-slate-900"
              >
                Open Dashboard
              </Link>
            </div>
          </nav>

          <div className="grid flex-1 items-center gap-12 py-16 lg:grid-cols-[0.88fr_1.18fr] lg:gap-14 lg:py-10">
            <div className="animate-fade-up">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/55 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-blue-600 shadow-[0_0_18px_rgba(37,99,235,0.9)]" />
                Voice-first. Teacher-first. Future-ready.
              </p>
              <h1 className="mt-8 max-w-4xl font-mono text-3xl font-semibold leading-tight tracking-normal text-slate-950 sm:text-4xl lg:text-5xl">
                <span className="block">Voice-Enabled</span>
                <span className="block">AI Teaching Assistant</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700 sm:text-xl">
                Empowering government school teachers with AI-driven concept
                simplification, voice quizzes, translation support, and digital
                board tools.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/dashboard"
                  className="rounded-lg bg-slate-950 px-6 py-3.5 text-center text-sm font-semibold text-white shadow-xl shadow-blue-950/25 transition hover:-translate-y-1 hover:bg-blue-950 hover:shadow-2xl"
                >
                  Open Dashboard
                </Link>
                <a
                  href="https://github.com/prakumarabhishek123-lab/ai-teaching-assistant"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-slate-900/10 bg-white/60 px-6 py-3.5 text-center text-sm font-semibold text-slate-900 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:bg-white"
                >
                  View GitHub
                </a>
              </div>
              <div className="mt-8 grid max-w-2xl grid-cols-2 gap-3 text-xs font-semibold text-slate-700 sm:grid-cols-4">
                {["Save Time", "Simplify Concepts", "Engage Students", "Teach Better"].map(
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
              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/35 bg-white/15 p-3 shadow-[0_34px_120px_rgba(15,23,42,0.45)] backdrop-blur-2xl">
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/35 via-blue-500/10 to-violet-500/20" />
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

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight">
            Built for everyday school teaching
          </h2>
          <p className="mt-4 leading-7 text-slate-600">
            The assistant focuses on practical classroom moments: explaining,
            questioning, translating, dictating, and preparing the board.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>

      <section
        id="how-it-works"
        className="border-y border-slate-200 bg-white px-6 py-16 sm:px-8 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight">How it works</h2>
            <p className="mt-4 leading-7 text-slate-600">
              A simple workflow keeps the teacher in control while reducing
              preparation time.
            </p>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {steps.map((step) => (
              <HowItWorksStep key={step.step} {...step} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
        <div className="rounded-lg bg-slate-950 px-6 py-12 text-center text-white sm:px-10">
          <h2 className="text-3xl font-bold tracking-tight">
            Prepare a better lesson in minutes
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-300">
            Open the dashboard to explore the four classroom tools and shape
            content for your students.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/dashboard"
              className="rounded-lg bg-teal-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-400"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
