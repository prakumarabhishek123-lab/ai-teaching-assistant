"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

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
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  async function handleGenerate() {
    if (!input.trim()) {
      alert("Please enter a topic");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/concept-simplify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: input,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setResult(data.response);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function speakText() {
    if (!result?.voiceText) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const speech = new SpeechSynthesisUtterance(result.voiceText);

    speech.lang = "hi-IN";

    speech.onend = () => {
      setIsSpeaking(false);
    };

    setIsSpeaking(true);

    window.speechSynthesis.speak(speech);
  }

  return (
    <article className="flex min-h-[360px] flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div>
        <h2 className="text-xl font-semibold text-slate-950">
          {title}
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          {description}
        </p>
      </div>

      <label
        className="mt-6 text-sm font-medium text-slate-800"
        htmlFor={title}
      >
        {inputLabel}
      </label>

      <textarea
        id={title}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={placeholder}
        className="mt-2 min-h-28 resize-none rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm"
      />

      <button
        type="button"
        onClick={handleGenerate}
        disabled={loading}
        className="mt-4 rounded-lg bg-teal-600 px-4 py-3 text-sm font-semibold text-white hover:bg-teal-700 disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate"}
      </button>

      <div className="mt-5 rounded-lg border border-slate-200 p-4 bg-slate-50">
        {!result ? (
          <p className="text-slate-500">
            Output will appear here
          </p>
        ) : (
          <>
            <h3 className="text-2xl font-bold text-slate-900">
              {result.title}
            </h3>

            <h4 className="mt-4 text-lg font-bold text-teal-700">
              Explanation
            </h4>

            <div className="mt-2 text-base font-medium leading-8 text-slate-800">
              <ReactMarkdown>
                {result.explanation}
              </ReactMarkdown>
            </div>

            <h4 className="mt-6 text-lg font-bold text-teal-700">
              Key Points
            </h4>

            <ul className="mt-2 list-disc pl-6">
              {result.keyPoints?.map(
                (point: string, index: number) => (
                  <li
                    key={index}
                    className="py-1 text-base font-medium text-slate-800"
                  >
                    <ReactMarkdown>{point}</ReactMarkdown>
                  </li>
                )
              )}
            </ul>

            <h4 className="mt-6 text-lg font-bold text-teal-700">
              Classroom Example
            </h4>


            <div className="mt-2 text-base font-medium leading-8 text-slate-800">
              <ReactMarkdown>
                {result.example}
              </ReactMarkdown>
            </div>

            <button
              onClick={speakText}
              className={`mt-6 rounded-lg px-4 py-3 text-white font-semibold ${isSpeaking
                ? "bg-red-600 hover:bg-red-700"
                : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
              {isSpeaking
                ? "⏹ Stop Speaking"
                : "🔊 Speak Explanation"}
            </button>
          </>
        )}
      </div>
    </article>
  );
}