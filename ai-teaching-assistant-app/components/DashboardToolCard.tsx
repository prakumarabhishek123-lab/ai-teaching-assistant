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
    <article className="flex min-h-[360px] flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div>
        <h2 className="text-xl font-semibold text-slate-950">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      </div>

      <label className="mt-6 text-sm font-medium text-slate-800" htmlFor={title}>
        {inputLabel}
      </label>
      <textarea
        id={title}
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder={placeholder}
        className="mt-2 min-h-28 resize-none rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100"
      />

      {/* TODO: Add tool-specific AI, voice, translation, or board logic here later. */}
      <button
        type="button"
        onClick={handleGenerate}
        className="mt-4 rounded-lg bg-teal-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-200"
      >
        Generate
      </button>

      <div className="mt-5 flex flex-1 flex-col rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4">
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
