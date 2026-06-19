"use client";

import { useState } from "react";

type DashboardToolCardProps = {
  title: string;
  description: string;
  inputLabel: string;
  placeholder: string;
  outputTitle: string;
};

export function DashboardToolCard({
  title,
  description,
  inputLabel,
  placeholder,
  outputTitle,
}: DashboardToolCardProps) {
  const [input, setInput] = useState("");
  const [hasGenerated, setHasGenerated] = useState(false);

  function handleGenerate() {
    setHasGenerated(true);
  }

  return (
    <article className="dashboard-card-cinematic group flex min-h-[360px] min-w-0 flex-col rounded-[1.5rem] border border-white/80 bg-white/70 p-4 shadow-[0_18px_60px_rgba(76,29,149,0.08)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_24px_70px_rgba(76,29,149,0.14)] sm:p-6">
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-100 to-violet-200 text-xl shadow-sm transition duration-300 group-hover:scale-105" aria-hidden="true">✦</span>
        <div className="min-w-0">
          <h2 className="text-xl font-semibold text-slate-950">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
        </div>
      </div>

      <label className="mt-6 text-sm font-medium text-slate-800" htmlFor={title}>
        {inputLabel}
      </label>
      <textarea
        id={title}
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder={placeholder}
        className="mt-2 min-h-28 w-full min-w-0 resize-none rounded-xl border border-white/90 bg-white/65 px-4 py-3 text-sm text-slate-900 shadow-inner outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
      />

      {/* TODO: Add tool-specific AI, voice, translation, or board logic here later. */}
      <button
        type="button"
        onClick={handleGenerate}
        className="mt-4 rounded-xl bg-gradient-to-r from-blue-700 to-violet-700 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-900/15 transition hover:-translate-y-0.5 hover:from-blue-600 hover:to-violet-600 focus:outline-none focus:ring-4 focus:ring-violet-200"
      >
        Generate
      </button>

      <div className="mt-5 flex min-w-0 flex-1 flex-col overflow-hidden rounded-2xl border border-white/90 bg-white/55 p-3 shadow-inner shadow-violet-950/5 sm:p-4">
        <p className="text-sm font-semibold text-slate-800">{outputTitle}</p>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          {hasGenerated
            ? "Generated response preview will appear here once the assistant logic is connected."
            : "Output placeholder"}
        </p>
      </div>
    </article>
  );
}
