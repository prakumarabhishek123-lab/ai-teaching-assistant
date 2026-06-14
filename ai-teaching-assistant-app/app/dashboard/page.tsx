import Link from "next/link";
import { DashboardToolCard } from "@/components/DashboardToolCard";

const tools = [
  {
    
    title: "Concept Simplification",
    description:
      "Break a difficult topic into age-appropriate explanations, examples, and classroom language.",
    inputLabel: "Topic or textbook paragraph",
    placeholder: "Example: Explain fractions for Grade 5 using daily life examples.",
    outputTitle: "Simplified explanation",
  },
  {
    title: "Voice Quiz",
    description:
      "Draft quick spoken questions for checking student understanding during class.",
    inputLabel: "Quiz topic",
    placeholder: "Example: Water cycle, Grade 6, five oral questions.",
    outputTitle: "Voice quiz prompt",
  },
  {
    title: "Translation & Dictation",
    description:
      "Prepare translation support and short dictation practice for multilingual classrooms.",
    inputLabel: "Text and target language",
    placeholder: "Example: Translate this paragraph to Hindi and create dictation lines.",
    outputTitle: "Translation and dictation output",
  },
  {
    title: "Digital Board",
    description:
      "Create a clean board plan with headings, key points, and activity prompts.",
    inputLabel: "Board topic",
    placeholder: "Example: Board layout for Newton's laws with examples.",
    outputTitle: "Digital board plan",
  },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-6 sm:px-8 lg:px-10">
          <nav className="flex items-center justify-between">
            <Link href="/" className="text-lg font-bold tracking-tight">
              AI Teaching Assistant
            </Link>
            <Link
              href="/"
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50"
            >
              Back Home
            </Link>
          </nav>

          <div className="max-w-3xl py-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
              Teacher dashboard
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Classroom tools for faster preparation
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Use these cards to draft lesson support. The inputs and buttons
              are ready for future AI, voice, and translation logic.
            </p>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-5 px-6 py-10 sm:px-8 lg:grid-cols-2 lg:px-10">
        {tools.map((tool) => (
          <DashboardToolCard key={tool.title} {...tool} />
        ))}
      </section>
    </main>
  );
}
