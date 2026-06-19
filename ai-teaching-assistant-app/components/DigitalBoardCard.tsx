"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type DigitalBoardCardProps = {
  title: string;
  description: string;
  inputLabel: string;
  placeholder: string;
  outputTitle: string;
};

type BoardContent = {
  topicTitle: string;
  definition: string;
  keyPoints: string[];
  example: string;
  importantQuestions: string[];
};

type LanguageOption = "English" | "Hindi" | "Hinglish";

const languages: LanguageOption[] = ["English", "Hindi", "Hinglish"];

const speechLanguageCodes: Record<LanguageOption, string> = {
  English: "en-US",
  Hindi: "hi-IN",
  Hinglish: "hi-IN",
};

const boardLabels: Record<
  LanguageOption,
  {
    topicTitle: string;
    definition: string;
    keyPoints: string;
    example: string;
    importantQuestions: string;
  }
> = {
  English: {
    topicTitle: "Topic Title",
    definition: "Definition",
    keyPoints: "Key Points",
    example: "Example",
    importantQuestions: "Important Questions",
  },
  Hindi: {
    topicTitle: "विषय शीर्षक",
    definition: "परिभाषा",
    keyPoints: "मुख्य बातें",
    example: "उदाहरण",
    importantQuestions: "महत्वपूर्ण प्रश्न",
  },
  Hinglish: {
    topicTitle: "Topic Title",
    definition: "Definition",
    keyPoints: "Key Points",
    example: "Example",
    importantQuestions: "Important Questions",
  },
};

function createDemoBoard(topic: string, language: LanguageOption): BoardContent {
  const cleanTopic = topic.replace(/\s+/g, " ").trim();

  if (language === "Hindi") {
    return {
      topicTitle: cleanTopic,
      definition: `${cleanTopic} एक महत्वपूर्ण कक्षा विषय है। इसे अर्थ, मुख्य बातों और रोजमर्रा के उपयोग से आसानी से समझा जा सकता है।`,
      keyPoints: [
        `${cleanTopic} का अर्थ सरल शब्दों में समझें।`,
        "विवरण सीखने से पहले मुख्य विचार पहचानें।",
        "विषय को कक्षा या घर के परिचित उदाहरण से जोड़ें।",
        "याद रखने के लिए छोटे नोट्स, चित्र या मुख्य शब्दों का उपयोग करें।",
      ],
      example: `उदाहरण के लिए, शिक्षक ${cleanTopic} को विद्यार्थियों के रोजमर्रा के अनुभव से जोड़कर समझा सकते हैं और उनसे अपना उदाहरण पूछ सकते हैं।`,
      importantQuestions: [
        `${cleanTopic} क्या है?`,
        `${cleanTopic} क्यों महत्वपूर्ण है?`,
        `${cleanTopic} का एक वास्तविक जीवन उदाहरण दीजिए।`,
        `${cleanTopic} को अपने शब्दों में कैसे समझाएंगे?`,
      ],
    };
  }

  if (language === "Hinglish") {
    return {
      topicTitle: cleanTopic,
      definition: `${cleanTopic} ek important classroom concept hai. Isse meaning, main features, aur daily-life use se easily samjha ja sakta hai.`,
      keyPoints: [
        `${cleanTopic} ka meaning simple words mein samjho.`,
        "Details seekhne se pehle main idea identify karo.",
        "Concept ko classroom ya home ke familiar example se connect karo.",
        "Yaad rakhne ke liye short notes, diagrams, ya keywords use karo.",
      ],
      example: `For example, teacher ${cleanTopic} ko students ki daily-life situation se compare karke explain kar sakte hain, phir students se similar example pooch sakte hain.`,
      importantQuestions: [
        `${cleanTopic} kya hai?`,
        `${cleanTopic} important kyun hai?`,
        `${cleanTopic} ka ek real-life example do.`,
        `${cleanTopic} ko apne words mein kaise explain karoge?`,
      ],
    };
  }

  return {
    topicTitle: cleanTopic,
    definition: `${cleanTopic} is an important classroom concept that can be understood by learning its meaning, main features, and daily-life use.`,
    keyPoints: [
      `Understand the meaning of ${cleanTopic} in simple words.`,
      "Look for the main idea before learning details.",
      "Connect the concept with a familiar classroom or home example.",
      "Use short notes, diagrams, or keywords to remember it.",
    ],
    example: `For example, a teacher can explain ${cleanTopic} by comparing it with a situation students see in daily life, then ask them to describe one similar example.`,
    importantQuestions: [
      `What is ${cleanTopic}?`,
      `Why is ${cleanTopic} important?`,
      `Give one real-life example of ${cleanTopic}.`,
      `How can you explain ${cleanTopic} in your own words?`,
    ],
  };
}

function getBoardText(board: BoardContent, language: LanguageOption) {
  const labels = boardLabels[language];

  return [
    `${labels.topicTitle}: ${board.topicTitle}`,
    `${labels.definition}: ${board.definition}`,
    `${labels.keyPoints}:`,
    ...board.keyPoints.map((point) => `- ${point}`),
    `${labels.example}: ${board.example}`,
    `${labels.importantQuestions}:`,
    ...board.importantQuestions.map((question) => `- ${question}`),
  ].join("\n");
}

export function DigitalBoardCard({
  title,
  description,
  inputLabel,
  placeholder,
  outputTitle,
}: DigitalBoardCardProps) {
  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState<LanguageOption>("Hinglish");
  const [board, setBoard] = useState<BoardContent | null>(null);
  const [error, setError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copyLabel, setCopyLabel] = useState("Copy Board Content");

  const boardText = useMemo(() => (board ? getBoardText(board, language) : ""), [board, language]);
  const labels = boardLabels[language];

  async function handleGenerateBoard() {
    const trimmedTopic = topic.trim();
    stopSpeaking();
    setError("");
    setBoard(null);
    setCopyLabel("Copy Board Content");

    if (!trimmedTopic) {
      setError("Please enter a board topic first.");
      return;
    }

    setIsGenerating(true);

    try {
      // Temporary interview demo mode. Reconnect Gemini by replacing this with
      // a POST request to a future digital board API route.
      await new Promise((resolve) => setTimeout(resolve, 350));
      setBoard(createDemoBoard(trimmedTopic, language));
    } finally {
      setIsGenerating(false);
    }
  }

  function handleSpeakContent() {
    if (!board || !("speechSynthesis" in window)) {
      return;
    }

    if (isSpeaking) {
      stopSpeaking();
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(boardText);
    utterance.lang = speechLanguageCodes[language];
    utterance.rate = 0.9;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  }

  function stopSpeaking() {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    setIsSpeaking(false);
  }

  async function handleCopyBoard() {
    if (!boardText) {
      return;
    }

    try {
      await navigator.clipboard.writeText(boardText);
      setCopyLabel("Copied");
    } catch {
      setCopyLabel("Copy failed");
    }
  }

  function handleFullscreenToggle() {
    setIsFullscreen((current) => !current);
  }

  function handleLanguageChange(nextLanguage: LanguageOption) {
    stopSpeaking();
    setLanguage(nextLanguage);
    setCopyLabel("Copy Board Content");

    if (board && topic.trim()) {
      setBoard(createDemoBoard(topic, nextLanguage));
    }
  }

  const boardPanel = board ? (
    <div
      className={`min-w-0 overflow-hidden rounded-lg border p-3 shadow-inner sm:p-5 ${
        isFullscreen
          ? "min-h-[80vh] border-slate-700 bg-slate-950 text-white"
          : "border-slate-700 bg-slate-950 text-white"
      }`}
    >
      <div className="border-b border-white/30 pb-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-200">{labels.topicTitle}</p>
        <h3 className="mt-2 break-words text-xl font-bold text-white sm:text-2xl">{board.topicTitle}</h3>
      </div>

      <div className="mt-5 grid gap-5 text-sm leading-6 md:grid-cols-2">
        <section className="rounded-md border border-white/20 bg-white/10 p-4">
          <h4 className="text-base font-bold text-teal-100">{labels.definition}</h4>
          <p className="mt-2 text-slate-100">{board.definition}</p>
        </section>

        <section className="rounded-md border border-white/20 bg-white/10 p-4">
          <h4 className="text-base font-bold text-teal-100">{labels.example}</h4>
          <p className="mt-2 text-slate-100">{board.example}</p>
        </section>

        <section className="rounded-md border border-white/20 bg-white/10 p-4">
          <h4 className="text-base font-bold text-teal-100">{labels.keyPoints}</h4>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-100">
            {board.keyPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </section>

        <section className="rounded-md border border-white/20 bg-white/10 p-4">
          <h4 className="text-base font-bold text-teal-100">{labels.importantQuestions}</h4>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-slate-100">
            {board.importantQuestions.map((question) => (
              <li key={question}>{question}</li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  ) : null;

  return (
    <article className="dashboard-card-cinematic group flex min-h-[360px] min-w-0 flex-col rounded-[1.5rem] border border-white/80 bg-white/70 p-4 shadow-[0_18px_60px_rgba(76,29,149,0.08)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_24px_70px_rgba(76,29,149,0.14)] sm:p-6">
      <div className="flex items-start gap-4">
        <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-2xl border border-white/80 shadow-sm transition duration-300 group-hover:scale-105">
          <Image
            src="/digital-board-logo.avif"
            alt="Digital Board logo"
            fill
            sizes="44px"
            className="object-cover"
          />
        </span>
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
        value={topic}
        onChange={(event) => setTopic(event.target.value)}
        placeholder={placeholder}
        className="mt-2 min-h-28 w-full min-w-0 resize-none rounded-xl border border-white/90 bg-white/65 px-4 py-3 text-sm text-slate-900 shadow-inner outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
      />

      <label className="mt-4 text-sm font-medium text-slate-800" htmlFor={`${title}-language`}>
        🌐 Language Selector
      </label>
      <select
        id={`${title}-language`}
        value={language}
        onChange={(event) => handleLanguageChange(event.target.value as LanguageOption)}
        className="mt-2 w-full min-w-0 rounded-xl border border-white/90 bg-white/65 px-4 py-3 text-sm font-semibold text-slate-900 shadow-inner outline-none transition focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
      >
        {languages.map((languageOption) => (
          <option key={languageOption} value={languageOption}>
            {languageOption}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={handleGenerateBoard}
        disabled={isGenerating}
        className="mt-4 rounded-xl bg-gradient-to-r from-blue-700 to-violet-700 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-900/15 transition hover:-translate-y-0.5 hover:from-blue-600 hover:to-violet-600 focus:outline-none focus:ring-4 focus:ring-violet-200 disabled:cursor-not-allowed disabled:from-slate-400 disabled:to-slate-400"
      >
        {isGenerating ? "Generating..." : "Generate Board"}
      </button>

      <div className="mt-5 flex min-w-0 flex-1 flex-col overflow-hidden rounded-2xl border border-white/90 bg-white/55 p-3 shadow-inner shadow-violet-950/5 sm:p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <p className="text-sm font-semibold text-slate-800">{outputTitle}</p>
          {board ? (
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleFullscreenToggle}
                className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-teal-500 hover:text-teal-700"
              >
                {isFullscreen ? "Exit Full Screen" : "Full Screen Mode"}
              </button>
              <button
                type="button"
                onClick={handleCopyBoard}
                className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-teal-500 hover:text-teal-700"
              >
                {copyLabel}
              </button>
              <button
                type="button"
                onClick={handleSpeakContent}
                className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-teal-500 hover:text-teal-700"
              >
                {isSpeaking ? "⏹ Stop" : "🔊 Listen"}
              </button>
            </div>
          ) : null}
        </div>

        {isGenerating ? <p className="mt-3 text-sm leading-6 text-slate-500">Creating board layout...</p> : null}

        {error ? <p className="mt-3 text-sm leading-6 text-red-600">{error}</p> : null}

        {!isGenerating && !error && !board ? (
          <p className="mt-3 text-sm leading-6 text-slate-500">Output placeholder</p>
        ) : null}

        {board && !isFullscreen ? <div className="mt-4">{boardPanel}</div> : null}
      </div>

      {board && isFullscreen ? (
        <div className="fixed inset-0 z-50 overflow-x-hidden overflow-y-auto bg-slate-950 p-3 sm:p-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-4 flex flex-wrap justify-start gap-2 sm:justify-end">
              <button
                type="button"
                onClick={handleCopyBoard}
                className="rounded-md border border-white/30 px-3 py-2 text-xs font-semibold text-white transition hover:border-teal-300 hover:text-teal-200"
              >
                {copyLabel}
              </button>
              <button
                type="button"
                onClick={handleSpeakContent}
                className="rounded-md border border-white/30 px-3 py-2 text-xs font-semibold text-white transition hover:border-teal-300 hover:text-teal-200"
              >
                {isSpeaking ? "⏹ Stop" : "🔊 Listen"}
              </button>
              <button
                type="button"
                onClick={handleFullscreenToggle}
                className="rounded-md bg-white px-3 py-2 text-xs font-semibold text-slate-950 transition hover:bg-teal-100"
              >
                Exit Full Screen
              </button>
            </div>
            {boardPanel}
          </div>
        </div>
      ) : null}
    </article>
  );
}
