"use client";

import { useMemo, useState } from "react";

type TranslationDictationCardProps = {
  title: string;
  description: string;
  inputLabel: string;
  placeholder: string;
  outputTitle: string;
};

type DirectionOption = "English → Hindi" | "Hindi → English" | "Hindi → Hinglish";

type TranslationResult = {
  translatedText: string;
  dictationSentence: string;
};

const directions: DirectionOption[] = ["English → Hindi", "Hindi → English", "Hindi → Hinglish"];

const speechLanguageCodes: Record<DirectionOption, string> = {
  "English → Hindi": "hi-IN",
  "Hindi → English": "en-US",
  "Hindi → Hinglish": "hi-IN",
};

const englishToHindiWords: Record<string, string> = {
  air: "हवा",
  animal: "जानवर",
  book: "किताब",
  classroom: "कक्षा",
  earth: "पृथ्वी",
  food: "भोजन",
  friend: "मित्र",
  good: "अच्छा",
  heat: "गर्मी",
  light: "प्रकाश",
  plant: "पौधा",
  rain: "बारिश",
  river: "नदी",
  school: "विद्यालय",
  student: "विद्यार्थी",
  sun: "सूर्य",
  teacher: "शिक्षक",
  water: "पानी",
};

const hindiToEnglishWords: Record<string, string> = {
  अच्छा: "good",
  कक्षा: "classroom",
  किताब: "book",
  गर्मी: "heat",
  जानवर: "animal",
  नदी: "river",
  पानी: "water",
  पौधा: "plant",
  प्रकाश: "light",
  बारिश: "rain",
  भोजन: "food",
  मित्र: "friend",
  विद्यार्थी: "student",
  विद्यालय: "school",
  शिक्षक: "teacher",
  सूर्य: "sun",
  हवा: "air",
};

const hindiToHinglishWords: Record<string, string> = {
  अच्छा: "achha",
  कक्षा: "classroom",
  किताब: "kitaab",
  गर्मी: "garmi",
  जानवर: "jaanvar",
  नदी: "nadi",
  पानी: "paani",
  पौधा: "paudha",
  प्रकाश: "prakash",
  बारिश: "baarish",
  भोजन: "bhojan",
  मित्र: "mitra",
  विद्यार्थी: "vidyarthi",
  विद्यालय: "vidyalaya",
  शिक्षक: "shikshak",
  सूर्य: "surya",
  हवा: "hawa",
};

function translateEnglishToHindi(text: string) {
  const lowerText = text.toLowerCase();
  const translated = Object.entries(englishToHindiWords).reduce((currentText, [english, hindi]) => {
    return currentText.replace(new RegExp(`\\b${english}\\b`, "gi"), hindi);
  }, lowerText);

  return translated === lowerText
    ? `यह सरल हिंदी अनुवाद है: ${text}`
    : translated.replace(/^\w/, (letter) => letter.toUpperCase());
}

function translateFromHindi(text: string, dictionary: Record<string, string>) {
  const translated = Object.entries(dictionary).reduce((currentText, [hindi, replacement]) => {
    return currentText.replaceAll(hindi, replacement);
  }, text);

  return translated === text ? `Demo translation: ${text}` : translated;
}

function getDemoTranslation(text: string, direction: DirectionOption): TranslationResult {
  if (direction === "English → Hindi") {
    return {
      translatedText: translateEnglishToHindi(text),
      dictationSentence: "विद्यार्थी साफ अक्षरों में यह वाक्य लिखेंगे।",
    };
  }

  if (direction === "Hindi → English") {
    return {
      translatedText: translateFromHindi(text, hindiToEnglishWords),
      dictationSentence: "Students will write this sentence neatly.",
    };
  }

  return {
    translatedText: translateFromHindi(text, hindiToHinglishWords),
    dictationSentence: "Students is sentence ko clearly likhenge.",
  };
}

export function TranslationDictationCard({
  title,
  description,
  inputLabel,
  placeholder,
  outputTitle,
}: TranslationDictationCardProps) {
  const [input, setInput] = useState("");
  const [direction, setDirection] = useState<DirectionOption>("English → Hindi");
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [error, setError] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copyLabel, setCopyLabel] = useState("Copy");

  const canListen = useMemo(
    () => result !== null && typeof window !== "undefined" && "speechSynthesis" in window,
    [result],
  );

  function handleTranslate() {
    const trimmedInput = input.trim();
    stopSpeaking();
    setError("");
    setCopyLabel("Copy");

    if (!trimmedInput) {
      setResult(null);
      setError("Please enter text to translate.");
      return;
    }

    // Temporary interview demo mode. Reconnect Gemini by replacing this helper
    // with a POST request to a future translation API route.
    setResult(getDemoTranslation(trimmedInput, direction));
  }

  function handleListen() {
    if (!result || !("speechSynthesis" in window)) {
      return;
    }

    if (isSpeaking) {
      stopSpeaking();
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(
      `${result.translatedText}. Dictation sentence. ${result.dictationSentence}`,
    );
    utterance.lang = speechLanguageCodes[direction];
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

  async function handleCopy() {
    if (!result) {
      return;
    }

    const output = `Translated output:\n${result.translatedText}\n\nDictation:\n${result.dictationSentence}`;

    try {
      await navigator.clipboard.writeText(output);
      setCopyLabel("Copied");
    } catch {
      setCopyLabel("Copy failed");
    }
  }

  function handleDirectionChange(nextDirection: DirectionOption) {
    stopSpeaking();
    setDirection(nextDirection);

    if (result && input.trim()) {
      setResult(getDemoTranslation(input.trim(), nextDirection));
      setCopyLabel("Copy");
    }
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

      <label className="mt-4 text-sm font-medium text-slate-800" htmlFor={`${title}-direction`}>
        Language direction
      </label>
      <select
        id={`${title}-direction`}
        value={direction}
        onChange={(event) => handleDirectionChange(event.target.value as DirectionOption)}
        className="mt-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100"
      >
        {directions.map((directionOption) => (
          <option key={directionOption} value={directionOption}>
            {directionOption}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={handleTranslate}
        className="mt-4 rounded-lg bg-teal-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-200"
      >
        Translate
      </button>

      <div className="mt-5 flex flex-1 flex-col rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <p className="text-sm font-semibold text-slate-800">{outputTitle}</p>
          {result ? (
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleListen}
                disabled={!canListen}
                className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-teal-500 hover:text-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSpeaking ? "⏹ Stop" : "🔊 Listen"}
              </button>
              <button
                type="button"
                onClick={handleCopy}
                className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-teal-500 hover:text-teal-700"
              >
                {copyLabel}
              </button>
            </div>
          ) : null}
        </div>

        {error ? <p className="mt-3 text-sm leading-6 text-red-600">{error}</p> : null}

        {!error && !result ? <p className="mt-3 text-sm leading-6 text-slate-500">Output placeholder</p> : null}

        {result ? (
          <div className="mt-4 space-y-4 text-sm leading-6 text-slate-700">
            <div>
              <p className="font-semibold text-slate-800">Translated output</p>
              <p className="mt-1 rounded-md bg-white p-3">{result.translatedText}</p>
            </div>

            <div>
              <p className="font-semibold text-slate-800">Dictation mode</p>
              <p className="mt-1 rounded-md bg-white p-3">{result.dictationSentence}</p>
            </div>
          </div>
        ) : null}
      </div>
    </article>
  );
}
