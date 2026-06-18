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
              Classroom studio
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Prepare tomorrow&apos;s class with more ease
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Draft the parts of a lesson that usually take the longest: the
              explanation, the questions, the language support, and the board.
            </p>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-5 px-6 py-10 sm:px-8 lg:grid-cols-2 lg:px-10">
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
      </section>
    </main>
  );
}
