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
  const [language, setLanguage] = useState("Hinglish");
  const [showAnswers, setShowAnswers] = useState(false);
  const isConceptCard = title === "Concept Simplification";

  async function handleGenerate() {
    if (!input.trim()) {
      alert("Please enter a topic");
      return;
    }

    try {
      setLoading(true);
      setShowAnswers(false);

      const res = await fetch("/api/concept-simplify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: input,
          ...(isConceptCard && {
            language,
            classLevel: "General",
          }),
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

    if (language === "English") {
      speech.lang = "en-US";
    } else {
      speech.lang = "hi-IN";
    }

    speech.rate = 0.9;

    speech.onend = () => {
      setIsSpeaking(false);
    };

    setIsSpeaking(true);
    window.speechSynthesis.speak(speech);
  }

  return (
    <article className="relative flex min-h-[360px] flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      {/* Side Language Button */}
      {isConceptCard && (
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="absolute right-5 top-5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm"
        >
          <option value="Hinglish">Hinglish</option>
          <option value="Hindi">Hindi</option>
          <option value="English">English</option>
        </select>
      )}

      <div className={isConceptCard ? "pr-32" : ""}>
        <h2 className="text-xl font-semibold text-slate-950">{title}</h2>

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

      <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4">
        {!result ? (
          <p className="text-slate-500">Output will appear here</p>
        ) : (
          <>
            {/* Speaker Button On Top */}
            <button
              onClick={speakText}
              className={`mb-5 rounded-lg px-4 py-3 text-sm font-semibold text-white ${isSpeaking
                ? "bg-red-600 hover:bg-red-700"
                : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
              {isSpeaking ? "⏹ Stop Speaking" : "🔊 Speak Explanation"}
            </button>

            <h3 className="text-2xl font-bold text-slate-900">
              {result.title}
            </h3>

            <h4 className="mt-4 text-lg font-bold text-teal-700">
              Explanation
            </h4>

            <div className="mt-2 text-base font-medium leading-8 text-slate-800">
              <ReactMarkdown>{result.explanation}</ReactMarkdown>
            </div>

            <h4 className="mt-6 text-lg font-bold text-teal-700">
              Key Points
            </h4>

            <ul className="mt-2 list-disc pl-6">
              {result.keyPoints?.map((point: string, index: number) => (
                <li
                  key={index}
                  className="py-1 text-base font-medium text-slate-800"
                >
                  <ReactMarkdown>{point}</ReactMarkdown>
                </li>
              ))}
            </ul>

            <h4 className="mt-6 text-lg font-bold text-teal-700">
              Classroom Example
            </h4>

            <div className="mt-2 text-base font-medium leading-8 text-slate-800">
              <ReactMarkdown>{result.example}</ReactMarkdown>
            </div>

            {/* Worksheet Section */}
            {result.worksheet && (
              <div className="mt-8 rounded-lg border border-teal-200 bg-white p-4">
                <h4 className="text-lg font-bold text-teal-700">
                  Exam Important Worksheet
                </h4>

                {result.worksheet.mcqs?.length > 0 && (
                  <div className="mt-4">
                    <h5 className="font-bold text-slate-900">MCQs</h5>

                    {result.worksheet.mcqs.map((item: any, index: number) => (
                      <div key={index} className="mt-3 rounded-lg bg-slate-50 p-3">
                        <p className="font-semibold text-slate-800">
                          {index + 1}. {item.question}
                        </p>

                        <ul className="mt-2 list-disc pl-6 text-sm text-slate-700">
                          {item.options?.map((option: string, optionIndex: number) => (
                            <li key={optionIndex}>{option}</li>
                          ))}
                        </ul>

                        {showAnswers && (
                          <p className="mt-2 text-sm font-bold text-green-700">
                            Answer: {item.answer}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {result.worksheet.oneMark?.length > 0 && (
                  <div className="mt-5">
                    <h5 className="font-bold text-slate-900">
                      1 Mark Questions
                    </h5>

                    {result.worksheet.oneMark.map((item: any, index: number) => (
                      <div key={index} className="mt-3 rounded-lg bg-slate-50 p-3">
                        <p className="font-semibold text-slate-800">
                          {index + 1}. {item.question}
                        </p>

                        {showAnswers && (
                          <p className="mt-2 text-sm font-bold text-green-700">
                            Answer: {item.answer}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {result.worksheet.twoMark?.length > 0 && (
                  <div className="mt-5">
                    <h5 className="font-bold text-slate-900">
                      2 Mark Questions
                    </h5>

                    {result.worksheet.twoMark.map((item: any, index: number) => (
                      <div key={index} className="mt-3 rounded-lg bg-slate-50 p-3">
                        <p className="font-semibold text-slate-800">
                          {index + 1}. {item.question}
                        </p>

                        {showAnswers && (
                          <p className="mt-2 text-sm font-bold text-green-700">
                            Answer: {item.answer}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {result.worksheet.shortAnswer?.length > 0 && (
                  <div className="mt-5">
                    <h5 className="font-bold text-slate-900">
                      Short Answer Question
                    </h5>

                    {result.worksheet.shortAnswer.map(
                      (item: any, index: number) => (
                        <div
                          key={index}
                          className="mt-3 rounded-lg bg-slate-50 p-3"
                        >
                          <p className="font-semibold text-slate-800">
                            {index + 1}. {item.question}
                          </p>

                          {showAnswers && (
                            <p className="mt-2 text-sm font-bold text-green-700">
                              Answer: {item.answer}
                            </p>
                          )}
                        </div>
                      )
                    )}
                  </div>
                )}

                <button
                  onClick={() => setShowAnswers(!showAnswers)}
                  className="mt-5 rounded-lg bg-green-600 px-4 py-3 text-sm font-semibold text-white hover:bg-green-700"
                >
                  {showAnswers ? "Hide Answers" : "Show Answers"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </article>
  );
}