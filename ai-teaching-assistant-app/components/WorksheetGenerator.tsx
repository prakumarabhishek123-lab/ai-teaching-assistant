"use client";

import { useState } from "react";
import { CLASS_LEVELS, SUBJECTS, type ClassLevel, type Subject } from "@/lib/config/education";

type WorksheetLanguage = "English" | "Hindi" | "Hinglish";

type WorksheetQuestion = {
  question: string;
  options?: string[];
  answer: string;
};

type Worksheet = {
  title: string;
  instructions: string;
  mcq: WorksheetQuestion[];
  fillInTheBlanks: WorksheetQuestion[];
  trueFalse: WorksheetQuestion[];
  shortAnswer: WorksheetQuestion[];
  answerKey: string[];
};

type WorksheetContext = {
  classLevel: ClassLevel;
  subject: Subject;
  topic: string;
  language: WorksheetLanguage;
};

const languages: WorksheetLanguage[] = ["English", "Hindi", "Hinglish"];

export function WorksheetGenerator() {
  const [classLevel, setClassLevel] = useState<ClassLevel>("Class 5");
  const [subject, setSubject] = useState<Subject>("Mathematics");
  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState<WorksheetLanguage>("English");
  const [worksheet, setWorksheet] = useState<Worksheet | null>(null);
  const [worksheetContext, setWorksheetContext] = useState<WorksheetContext | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleGenerate() {
    const trimmedTopic = topic.trim();
    setError("");
    setWorksheet(null);
    setWorksheetContext(null);

    if (!trimmedTopic) {
      setError("Please enter a topic for the worksheet.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/worksheet-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ classLevel, subject, topic: trimmedTopic, language }),
      });
      const data = (await response.json()) as Worksheet | { error?: string };

      if (!response.ok) {
        throw new Error("error" in data && data.error ? data.error : "Unable to generate worksheet.");
      }

      setWorksheet(data as Worksheet);
      setWorksheetContext({ classLevel, subject, topic: trimmedTopic, language });
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Unable to generate worksheet.");
    } finally {
      setIsLoading(false);
    }
  }

  function handlePrint() {
    window.print();
  }

  function handleDownloadPdf() {
    const previousTitle = document.title;
    const fileSafeTopic = (worksheetContext?.topic ?? "worksheet").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "");
    document.title = `${fileSafeTopic || "worksheet"}-${worksheetContext?.classLevel ?? "class"}`;
    window.print();
    window.setTimeout(() => {
      document.title = previousTitle;
    }, 500);
  }

  return (
    <div className="space-y-6">
      <section className="worksheet-controls rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="grid gap-4 lg:grid-cols-[0.8fr_0.8fr_1.4fr_0.8fr]">
          <label className="flex flex-col gap-2 text-sm font-bold text-slate-700">
            Class
            <select
              value={classLevel}
              onChange={(event) => setClassLevel(event.target.value as ClassLevel)}
              className="min-h-12 rounded-xl border border-slate-300 bg-white px-4 text-base font-semibold outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            >
              {CLASS_LEVELS.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm font-bold text-slate-700">
            Subject
            <select
              value={subject}
              onChange={(event) => setSubject(event.target.value as Subject)}
              className="min-h-12 rounded-xl border border-slate-300 bg-white px-4 text-base font-semibold outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            >
              {SUBJECTS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm font-bold text-slate-700">
            Topic
            <input
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
              placeholder="Example: Fractions, plants, nouns, water cycle"
              className="min-h-12 rounded-xl border border-slate-300 bg-white px-4 text-base outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-bold text-slate-700">
            Language
            <select
              value={language}
              onChange={(event) => setLanguage(event.target.value as WorksheetLanguage)}
              className="min-h-12 rounded-xl border border-slate-300 bg-white px-4 text-base font-semibold outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            >
              {languages.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-600">
            Generates MCQ, fill in the blanks, true/false, short answer, and a teacher answer key.
          </p>
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isLoading}
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {isLoading ? "Generating..." : "Generate Worksheet"}
          </button>
        </div>

        {error ? <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p> : null}
      </section>

      {isLoading ? (
        <section className="rounded-2xl border border-blue-100 bg-blue-50 p-6 text-sm font-semibold text-blue-800">
          Creating a class-ready worksheet...
        </section>
      ) : null}

      {!isLoading && !worksheet ? (
        <section className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-slate-600">
          Your generated worksheet will appear here.
        </section>
      ) : null}

      {worksheet && worksheetContext ? (
        <section className="worksheet-print-area space-y-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-blue-700">
                  {worksheetContext.classLevel} - {worksheetContext.subject}
                </p>
                <h2 className="mt-2 text-2xl font-bold text-slate-950">{worksheet.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{worksheet.instructions}</p>
                <p className="mt-2 text-sm font-semibold text-slate-600">
                  Topic: {worksheetContext.topic} | Language: {worksheetContext.language}
                </p>
              </div>
              <div className="worksheet-actions flex shrink-0 flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  className="inline-flex min-h-10 items-center rounded-xl bg-blue-700 px-4 text-sm font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-100"
                >
                  Download PDF
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex min-h-10 items-center rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
                >
                  Print
                </button>
              </div>
            </div>
          </div>

          <QuestionSection title="MCQ" questions={worksheet.mcq} />
          <QuestionSection title="Fill in the Blanks" questions={worksheet.fillInTheBlanks} />
          <QuestionSection title="True/False" questions={worksheet.trueFalse} />
          <QuestionSection title="Short Answer" questions={worksheet.shortAnswer} />

          <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:p-6" aria-labelledby="answer-key-heading">
            <h3 id="answer-key-heading" className="text-xl font-bold text-slate-950">
              Answer Key
            </h3>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-slate-700">
              {worksheet.answerKey.map((answer) => (
                <li key={answer}>{answer}</li>
              ))}
            </ol>
          </section>
        </section>
      ) : null}
    </div>
  );
}

function QuestionSection({ title, questions }: { title: string; questions: WorksheetQuestion[] }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6" aria-labelledby={`${title}-heading`}>
      <h3 id={`${title}-heading`} className="text-xl font-bold text-slate-950">
        {title}
      </h3>
      <ol className="mt-4 list-decimal space-y-4 pl-5">
        {questions.map((question, index) => (
          <li key={`${title}-${index}-${question.question}`} className="pl-1 text-sm leading-6 text-slate-800">
            <p className="font-semibold">{question.question}</p>
            {question.options?.length ? (
              <ul className="mt-2 grid gap-2 pl-0 sm:grid-cols-2">
                {question.options.map((option, optionIndex) => (
                  <li key={option} className="list-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                    {String.fromCharCode(65 + optionIndex)}. {option}
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  );
}
