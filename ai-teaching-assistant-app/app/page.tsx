import Link from "next/link";
import { FeatureCard } from "@/components/FeatureCard";
import { HowItWorksStep } from "@/components/HowItWorksStep";

const features = [
  {
    title: "Create quizzes instantly",
    description:
      "Turn any classroom topic into a ready-to-use voice quiz in seconds.",
    icon: "VQ",
  },
  {
    title: "Assess as you teach",
    description:
      "Use quick spoken questions to see who understands and who needs more help.",
    icon: "AS",
  },
  {
    title: "Keep students engaged",
    description:
      "Make every check-in feel natural, interactive, and part of the lesson.",
    icon: "EN",
  },
];

const steps = [
  {
    step: "1",
    title: "Choose your topic",
    description:
      "Start with the lesson, concept, or skill you want to assess.",
  },
  {
    step: "2",
    title: "Generate your quiz",
    description:
      "Create clear voice questions tailored to your classroom in seconds.",
  },
  {
    step: "3",
    title: "Ask and assess",
    description:
      "Run the quiz, hear student responses, and check understanding right away.",
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen bg-slate-50 text-slate-950">
      <section className="sticky top-0 z-0 isolate overflow-hidden bg-[linear-gradient(135deg,#ffedd5_0%,#fb923c_48%,#ef4444_100%)] text-white">

        <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-6 sm:px-8 lg:px-10">
          <nav className="animate-fade-in flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-3 text-base font-bold tracking-tight text-slate-950 sm:text-lg"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/50 bg-white/70 text-sm text-orange-700 shadow-lg shadow-red-950/10 backdrop-blur">
                VQ
              </span>
              <span>Voice Quiz Generator</span>
            </Link>
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="group inline-flex items-center gap-2 rounded-lg border border-white/25 bg-red-950/90 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-red-950/20 transition hover:-translate-y-0.5 hover:bg-red-900"
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
              <p className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/55 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm backdrop-blur">
                <span aria-hidden="true">🎤</span>
                Voice Quiz Ready
              </p>
              <h1 className="mt-8 max-w-4xl text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                <span className="block">Voice Quiz Generator for Teachers</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700 sm:text-xl">
                Create instant voice quizzes and assess students in seconds.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/dashboard"
                  className="group inline-flex items-center justify-center gap-2 rounded-lg bg-red-950 px-6 py-3.5 text-center text-sm font-semibold text-white shadow-xl shadow-red-950/25 transition hover:-translate-y-1 hover:bg-red-900 hover:shadow-2xl"
                >
                  Open Dashboard
                  <span className="w-0 translate-x-[-4px] overflow-hidden opacity-0 transition-all group-hover:w-4 group-hover:translate-x-0 group-hover:opacity-100">
                    →
                  </span>
                </Link>
              </div>
              <div className="mt-8 grid max-w-2xl grid-cols-2 gap-3 text-xs font-semibold text-slate-700 sm:grid-cols-4">
                {["Voice Quizzes", "Instant Questions", "Student Checks", "Teaching Support"].map(
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
              <div id="demo" className="relative overflow-hidden rounded-[1.75rem] border border-white/35 bg-white/15 p-3 shadow-[0_34px_120px_rgba(15,23,42,0.45)] backdrop-blur-2xl">
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/35 via-orange-500/10 to-red-500/20" />
                <div className="absolute right-5 top-5 z-10 animate-pulse rounded-full bg-white/80 px-3 py-2 text-xs font-semibold text-slate-900 shadow-lg shadow-slate-900/15 backdrop-blur-xl ring-1 ring-white/60 sm:right-7 sm:top-7 sm:px-4 sm:text-sm">
                  🎤 Voice Quiz Active
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

      <section className="relative z-10 bg-[radial-gradient(ellipse_at_46%_60%,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.82)_24%,transparent_48%),radial-gradient(ellipse_at_78%_58%,rgba(255,247,237,0.95)_0%,rgba(254,215,170,0.6)_28%,transparent_50%),linear-gradient(180deg,#fb923c_0%,#fdba74_22%,#fed7aa_58%,#fff7ed_100%)] px-6 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight">
              Fast checks for every classroom moment
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Create focused voice questions, keep students involved, and know
              what they understand before moving on.
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
        className="relative z-10 border-y border-white/70 bg-[radial-gradient(ellipse_at_18%_20%,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.58)_28%,transparent_52%),radial-gradient(ellipse_at_82%_78%,rgba(254,215,170,0.78)_0%,transparent_46%),linear-gradient(135deg,#fff7ed_0%,#ffedd5_48%,#fee2e2_100%)] px-6 py-16 sm:px-8 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight">From topic to voice quiz</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Build a quick assessment and bring it into your lesson in three
              simple steps.
            </p>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {steps.map((step) => (
              <HowItWorksStep key={step.step} {...step} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 bg-[#fff7ed] px-6 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-lg bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.88)_0%,rgba(255,237,213,0.7)_34%,transparent_62%),linear-gradient(135deg,#fed7aa_0%,#fb923c_48%,#fca5a5_100%)] px-6 py-12 text-center text-slate-950 shadow-sm shadow-red-900/10 sm:px-10">
            <h2 className="text-3xl font-bold tracking-tight text-slate-950">
              Ready to check understanding?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-700">
              Open the dashboard and create your next voice quiz in seconds.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/dashboard"
                className="rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-500"
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
