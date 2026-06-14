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
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("Hindi");

  function handleGenerate() {
    if (title === "Translation & Dictation") {
      const translated =
        language === "Hindi"
          ? `Hindi Translation:\n${input}`
          : `English Translation:\n${input}`;

      const dictation = `
Dictation Practice:
1. ${input}
2. Read slowly and write carefully.
3. Check spelling after writing.
`;

      setOutput(
        `${translated}\n\n${dictation}\nVoice Support: Ready for future integration`
      );
    } else {
      setOutput(
        "Generated response preview will appear here once assistant logic is connected."
      );
    }
  }

  return (
    <article className="flex min-h-[360px] flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div>
        <h2 className="text-xl font-semibold text-slate-950">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      </div>

      {title === "Translation & Dictation" && (
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="mt-4 rounded border p-2"
        >
          <option>Hindi</option>
          <option>English</option>
        </select>
      )}

      <label className="mt-6 text-sm font-medium text-slate-800">
        {inputLabel}
      </label>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={placeholder}
        className="mt-2 min-h-28 resize-none rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm"
      />

      <button
        type="button"
        onClick={handleGenerate}
        className="mt-4 rounded-lg bg-teal-600 px-4 py-3 text-sm font-semibold text-white"
      >
        Generate
      </button>

      <div className="mt-5 flex flex-1 flex-col rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4">
        <p className="text-sm font-semibold text-slate-800">{outputTitle}</p>

        <pre className="mt-3 whitespace-pre-wrap text-sm text-slate-700">
          {output || "Output placeholder"}
        </pre>
      </div>
    </article>
  );
}