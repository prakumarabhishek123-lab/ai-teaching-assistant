"use client";

import { useRef, useState } from "react";
import { CLASS_LEVELS, SUBJECTS, type ClassLevel, type Subject } from "@/lib/config/education";

type SolverLanguage = "English" | "Hindi" | "Hinglish";
type DoubtSolution = { answer: string; steps: string[]; example: string; finalAnswer: string };

const languages: SolverLanguage[] = ["English", "Hindi", "Hinglish"];
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

export function DoubtSolverCard() {
  const [question, setQuestion] = useState("");
  const [classLevel, setClassLevel] = useState<ClassLevel>("Class 5");
  const [subject, setSubject] = useState<Subject>("Mathematics");
  const [language, setLanguage] = useState<SolverLanguage>("English");
  const [image, setImage] = useState<{ name: string; type: string; data: string } | null>(null);
  const [solution, setSolution] = useState<DoubtSolution | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleImage(file: File | undefined) {
    setError("");
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setError("Please upload a JPG, PNG, or WebP image.");
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setError("Please choose an image smaller than 5 MB.");
      return;
    }

    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(new Error("Could not read this image."));
      reader.readAsDataURL(file);
    });
    setImage({ name: file.name, type: file.type, data: dataUrl.split(",")[1] ?? "" });
  }

  async function solveDoubt() {
    setError("");
    setSolution(null);
    if (!question.trim() && !image) {
      setError("Type your question or add a photo first.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/doubt-solver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: question.trim(), classLevel, subject, language, image: image?.data, imageType: image?.type }),
      });
      const data = (await response.json()) as DoubtSolution & { error?: string };
      if (!response.ok) throw new Error(data.error ?? "Unable to solve this doubt.");
      setSolution(data);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Unable to solve this doubt.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 via-white to-blue-50 shadow-sm" aria-labelledby="doubt-solver-heading">
      <div className="p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 text-sm font-black text-white shadow-lg shadow-violet-900/15" aria-hidden="true">AI</span>
          <div><p className="text-sm font-bold uppercase tracking-wider text-violet-700">Ask without worry</p><h2 id="doubt-solver-heading" className="mt-1 text-2xl font-bold">AI Doubt Solver</h2><p className="mt-1 text-sm leading-6 text-slate-600">Type a question or share a clear photo. Your AI tutor will explain it step by step.</p></div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <label className="text-sm font-bold text-slate-700">Your class<select value={classLevel} onChange={(event) => setClassLevel(event.target.value as ClassLevel)} className="mt-2 min-h-12 w-full rounded-xl border border-violet-200 bg-white px-4 text-base font-semibold outline-none focus:border-violet-600 focus:ring-4 focus:ring-violet-100">{CLASS_LEVELS.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label className="text-sm font-bold text-slate-700">Subject<select value={subject} onChange={(event) => setSubject(event.target.value as Subject)} className="mt-2 min-h-12 w-full rounded-xl border border-violet-200 bg-white px-4 text-base font-semibold outline-none focus:border-violet-600 focus:ring-4 focus:ring-violet-100">{SUBJECTS.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label className="text-sm font-bold text-slate-700">Answer language<select value={language} onChange={(event) => setLanguage(event.target.value as SolverLanguage)} className="mt-2 min-h-12 w-full rounded-xl border border-violet-200 bg-white px-4 text-base font-semibold outline-none focus:border-violet-600 focus:ring-4 focus:ring-violet-100">{languages.map((item) => <option key={item}>{item}</option>)}</select></label>
        </div>

        <label className="mt-4 block text-sm font-bold text-slate-700" htmlFor="student-doubt">What do you want to understand?</label>
        <textarea id="student-doubt" value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Example: Why do we need a common denominator to add fractions?" className="mt-2 min-h-28 w-full resize-y rounded-xl border border-violet-200 bg-white px-4 py-3 text-base outline-none placeholder:text-slate-400 focus:border-violet-600 focus:ring-4 focus:ring-violet-100" />

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={(event) => void handleImage(event.target.files?.[0])} />
          <button type="button" onClick={() => fileInputRef.current?.click()} className="min-h-12 rounded-xl border border-violet-200 bg-white px-4 py-3 text-sm font-bold text-violet-800 transition hover:bg-violet-50 focus:outline-none focus:ring-4 focus:ring-violet-100">Add textbook or worksheet photo</button>
          {image ? <div className="flex min-w-0 items-center gap-2 text-sm"><span className="truncate font-semibold text-slate-700">{image.name}</span><button type="button" onClick={() => { setImage(null); if (fileInputRef.current) fileInputRef.current.value = ""; }} className="shrink-0 font-bold text-red-600">Remove</button></div> : <span className="text-xs text-slate-500">JPG, PNG or WebP · max 5 MB</span>}
        </div>

        {error ? <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p> : null}
        <button type="button" onClick={solveDoubt} disabled={isLoading} className="mt-4 min-h-12 w-full rounded-xl bg-gradient-to-r from-violet-700 to-blue-700 px-5 py-3 font-bold text-white shadow-lg shadow-violet-900/15 transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60 sm:w-auto">{isLoading ? "Working through the steps…" : "Explain my doubt"}</button>
      </div>

      {solution ? <div className="border-t border-violet-100 bg-white/80 p-5 sm:p-6" aria-live="polite"><p className="text-sm font-bold uppercase tracking-wider text-blue-700">Let’s understand it</p><p className="mt-2 leading-7 text-slate-700">{solution.answer}</p>{solution.steps.length > 0 ? <div className="mt-5"><h3 className="font-bold">Step-by-step explanation</h3><ol className="mt-3 space-y-3">{solution.steps.map((step, index) => <li key={`${index}-${step}`} className="flex gap-3 rounded-xl bg-blue-50 p-3 text-sm leading-6 text-slate-700"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-700 text-xs font-bold text-white">{index + 1}</span><span>{step}</span></li>)}</ol></div> : null}{solution.example ? <div className="mt-5 rounded-xl bg-amber-50 p-4"><h3 className="font-bold text-amber-900">Easy example</h3><p className="mt-2 text-sm leading-6 text-amber-900/80">{solution.example}</p></div> : null}{solution.finalAnswer ? <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4"><h3 className="font-bold text-emerald-900">Answer</h3><p className="mt-2 leading-7 text-emerald-900">{solution.finalAnswer}</p></div> : null}</div> : null}
    </section>
  );
}
