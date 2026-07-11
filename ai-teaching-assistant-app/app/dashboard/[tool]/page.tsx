import Link from "next/link";
import { notFound } from "next/navigation";

import { ConceptSimplificationCard } from "@/components/ConceptSimplificationCard";
import { DigitalBoardCard } from "@/components/DigitalBoardCard";
import { TranslationDictationCard } from "@/components/TranslationDictationCard";
import { VoiceQuizCard } from "@/components/VoiceQuizCard";

const toolData = {
  "concept-simplification": {
    badge: "AI LEARNING HELPER",
    icon: "CS",
    heroTitle: "Turn difficult ideas into simple explanations.",
    heroDescription:
      "Create short, student-friendly explanations with relatable examples and classroom-ready language.",
    accent: "from-fuchsia-500 via-violet-500 to-indigo-500",
    softBackground: "bg-fuchsia-50",
    softBorder: "border-fuchsia-100",
    accentText: "text-fuchsia-700",
    cardProps: {
      title: "Concept Simplification",
      description:
        "Turn a heavy topic into clear classroom language, with examples students can picture.",
      inputLabel: "Topic, chapter line, or textbook paragraph",
      placeholder:
        "Example: Fractions for Grade 5, explained through sharing food.",
      outputTitle: "Classroom explanation",
    },
    steps: [
      "Enter the topic or textbook paragraph.",
      "Choose the preferred language.",
      "Generate a simple classroom explanation.",
    ],
    tips: [
      "Mention the student’s class level.",
      "Add the subject for better context.",
      "Ask for an everyday example.",
    ],
    samplePrompt:
      "Explain fractions for a Class 5 student using pizza and chocolate examples.",
  },

  "voice-quiz": {
    badge: "SPOKEN LEARNING",
    icon: "VQ",
    heroTitle: "Make revision more interactive with voice quizzes.",
    heroDescription:
      "Generate quick spoken questions that help students practise and check their understanding.",
    accent: "from-blue-500 via-indigo-500 to-violet-500",
    softBackground: "bg-blue-50",
    softBorder: "border-blue-100",
    accentText: "text-blue-700",
    cardProps: {
      title: "Voice Quiz",
      description:
        "Build a short oral check-in that helps you hear understanding in the room.",
      inputLabel: "Topic for the check-in",
      placeholder:
        "Example: Water cycle, Grade 6, five spoken questions.",
      outputTitle: "Quick oral check",
    },
    steps: [
      "Enter the quiz topic.",
      "Select class, subject and language.",
      "Generate and answer the questions aloud.",
    ],
    tips: [
      "Use a specific chapter name.",
      "Choose the correct class level.",
      "Start with a short five-question quiz.",
    ],
    samplePrompt:
      "Create five spoken questions about the water cycle for Class 6.",
  },

  "translation-dictation": {
    badge: "LANGUAGE PRACTICE",
    icon: "TR",
    heroTitle: "Practise translation and dictation in one place.",
    heroDescription:
      "Translate classroom content and turn it into clear, useful dictation practice.",
    accent: "from-emerald-500 via-teal-500 to-cyan-500",
    softBackground: "bg-emerald-50",
    softBorder: "border-emerald-100",
    accentText: "text-emerald-700",
    cardProps: {
      title: "Translation & Dictation",
      description:
        "Move a sentence across languages and shape it into simple dictation practice.",
      inputLabel: "Text and language direction",
      placeholder:
        "Example: Translate this paragraph to Hindi, then make a dictation line.",
      outputTitle: "Translation and dictation",
    },
    steps: [
      "Enter the text you want to translate.",
      "Choose the required language.",
      "Generate translation and dictation practice.",
    ],
    tips: [
      "Use short and clear paragraphs.",
      "Check names and technical words.",
      "Read the dictation result slowly.",
    ],
    samplePrompt:
      "Translate this English paragraph into Hindi and create five dictation lines.",
  },

  "digital-board": {
    badge: "VISUAL LEARNING",
    icon: "DB",
    heroTitle: "Organise every topic into a clear board-ready flow.",
    heroDescription:
      "Generate headings, key points, examples and questions for an organised classroom board.",
    accent: "from-amber-500 via-orange-500 to-rose-500",
    softBackground: "bg-amber-50",
    softBorder: "border-amber-100",
    accentText: "text-amber-700",
    cardProps: {
      title: "Digital Board",
      description:
        "Sketch a board-ready flow with headings, key points, examples, and questions.",
      inputLabel: "Topic for the board",
      placeholder:
        "Example: Newton's laws with one everyday example.",
      outputTitle: "Board-ready flow",
    },
    steps: [
      "Enter the classroom topic.",
      "Add the class level or subject.",
      "Generate a structured digital board.",
    ],
    tips: [
      "Use one topic at a time.",
      "Mention the required class level.",
      "Ask for examples and recap questions.",
    ],
    samplePrompt:
      "Prepare a digital board for Newton’s laws with definitions, examples and recap questions.",
  },
} as const;

type ToolSlug = keyof typeof toolData;

type ToolPageProps = {
  params: Promise<{
    tool: string;
  }>;
};

function isToolSlug(tool: string): tool is ToolSlug {
  return tool in toolData;
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { tool } = await params;

  if (!isToolSlug(tool)) {
    notFound();
  }

  const selectedTool = toolData[tool];

  let selectedCard;

  switch (tool) {
    case "concept-simplification":
      selectedCard = (
        <ConceptSimplificationCard {...selectedTool.cardProps} />
      );
      break;

    case "voice-quiz":
      selectedCard = <VoiceQuizCard {...selectedTool.cardProps} />;
      break;

    case "translation-dictation":
      selectedCard = (
        <TranslationDictationCard {...selectedTool.cardProps} />
      );
      break;

    case "digital-board":
      selectedCard = <DigitalBoardCard {...selectedTool.cardProps} />;
      break;
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(145deg,#fff7fd_0%,#f5f1ff_48%,#eef8ff_100%)] text-slate-950">
      <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-fuchsia-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-48 h-80 w-80 rounded-full bg-blue-300/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <header className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/80 bg-white/70 p-3 shadow-sm backdrop-blur-xl sm:p-4">
          <Link
            href="/student/dashboard"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-violet-800"
          >
            <span aria-hidden="true">←</span>
            Student Dashboard
          </Link>

          <div className="hidden text-center sm:block">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-violet-600">
              AI Teaching Assistant
            </p>
            <p className="text-sm font-semibold text-slate-700">
              Focused learning workspace
            </p>
          </div>

          <Link
            href="/dashboard"
            className="rounded-xl border border-violet-200 bg-violet-50 px-4 py-2.5 text-sm font-semibold text-violet-800 transition hover:border-violet-300 hover:bg-violet-100"
          >
            View all tools
          </Link>
        </header>

        <section className="relative mt-5 overflow-hidden rounded-[2rem] border border-white/80 bg-white/65 p-6 shadow-[0_30px_80px_-40px_rgba(76,29,149,0.45)] backdrop-blur-xl sm:p-8 lg:p-10">
          <div
            className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${selectedTool.accent}`}
          />

          <div className="grid items-center gap-8 lg:grid-cols-[1.35fr_0.65fr]">
            <div>
              <div
                className={`inline-flex items-center gap-2 rounded-full border ${selectedTool.softBorder} ${selectedTool.softBackground} px-3 py-1.5 text-xs font-bold tracking-[0.16em] ${selectedTool.accentText}`}
              >
                <span>{selectedTool.icon}</span>
                {selectedTool.badge}
              </div>

              <h1 className="mt-5 max-w-3xl text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                {selectedTool.heroTitle}
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                {selectedTool.heroDescription}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm">
                  Student friendly
                </span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm">
                  AI powered
                </span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm">
                  Quick results
                </span>
              </div>
            </div>

            <div className="rounded-3xl border border-white bg-white/80 p-5 shadow-lg shadow-violet-950/5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
                How it works
              </p>

              <div className="mt-4 space-y-4">
                {selectedTool.steps.map((step, index) => (
                  <div key={step} className="flex items-start gap-3">
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${selectedTool.accent} text-sm font-black text-white shadow-sm`}
                    >
                      {index + 1}
                    </span>

                    <p className="pt-1 text-sm font-medium leading-6 text-slate-700">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,1.65fr)_minmax(280px,0.75fr)]">
          <section className="rounded-[2rem] border border-white/80 bg-white/75 p-3 shadow-[0_24px_70px_-38px_rgba(76,29,149,0.4)] backdrop-blur-xl sm:p-5">
            <div className="mb-4 px-2 pt-2">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
                Your workspace
              </p>
              <h2 className="mt-1 text-xl font-black text-slate-950">
                Start creating
              </h2>
            </div>

            {selectedCard}
          </section>

          <aside className="space-y-5">
            <section className="rounded-[2rem] border border-white/80 bg-white/75 p-6 shadow-[0_24px_70px_-38px_rgba(76,29,149,0.35)] backdrop-blur-xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
                Better results
              </p>

              <h2 className="mt-2 text-xl font-black text-slate-950">
                Quick tips
              </h2>

              <div className="mt-5 space-y-3">
                {selectedTool.tips.map((tip) => (
                  <div
                    key={tip}
                    className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-white p-3"
                  >
                    <span
                      className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${selectedTool.softBackground} text-xs font-black ${selectedTool.accentText}`}
                    >
                      ✓
                    </span>

                    <p className="text-sm font-medium leading-6 text-slate-600">
                      {tip}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section
              className={`rounded-[2rem] border ${selectedTool.softBorder} ${selectedTool.softBackground} p-6`}
            >
              <p
                className={`text-xs font-bold uppercase tracking-[0.2em] ${selectedTool.accentText}`}
              >
                Try this example
              </p>

              <p className="mt-3 text-sm font-semibold leading-6 text-slate-700">
                “{selectedTool.samplePrompt}”
              </p>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}