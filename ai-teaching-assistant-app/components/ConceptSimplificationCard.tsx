"use client";

import { useEffect, useMemo, useState } from "react";

type SimplifiedConcept = {
  explanation: string;
  keyPoints: string[];
  example: string;
  worksheet: string[];
};

type LanguageOption = "English" | "Hindi" | "Hinglish";

type ConceptSimplificationCardProps = {
  title: string;
  description: string;
  inputLabel: string;
  placeholder: string;
  outputTitle: string;
};

const languages: LanguageOption[] = ["English", "Hindi", "Hinglish"];

const speechLanguageCodes: Record<LanguageOption, string> = {
  English: "en-US",
  Hindi: "",
  Hinglish: "hi-IN",
};

const languageVoiceHints: Partial<Record<LanguageOption, string[]>> = {
  English: ["male", "man", "david", "ravi", "hemant", "mark", "alex"],
  Hinglish: ["female", "woman", "zira", "susan", "heera", "kalpana", "swara", "lekha"],
};

const sectionLabels: Record<
  LanguageOption,
  {
    keyPoints: string;
    example: string;
    worksheet: string;
  }
> = {
  English: {
    keyPoints: "Key points",
    example: "Real-life example",
    worksheet: "Worksheet",
  },
  Hindi: {
    keyPoints: "मुख्य बातें",
    example: "वास्तविक जीवन का उदाहरण",
    worksheet: "वर्कशीट",
  },
  Hinglish: {
    keyPoints: "Key points",
    example: "Real-life example",
    worksheet: "Worksheet",
  },
};

function getSpokenText(result: SimplifiedConcept, language: LanguageOption) {
  const labels = sectionLabels[language];

  return [
    result.explanation,
    labels.keyPoints,
    ...result.keyPoints,
    labels.example,
    result.example,
    labels.worksheet,
    ...result.worksheet,
  ].join(" ");
}

function getSpeechVoice(language: LanguageOption, loadedVoices: SpeechSynthesisVoice[]) {
  const voices = loadedVoices.length > 0 ? loadedVoices : window.speechSynthesis.getVoices();
  const languageCode = speechLanguageCodes[language].toLowerCase();
  const matchingLanguageVoices = voices.filter((voice) => voice.lang.toLowerCase() === languageCode);
  const voiceHints = languageVoiceHints[language] ?? [];
  const preferredVoice = matchingLanguageVoices.find((voice) =>
    voiceHints.some((hint) => voice.name.toLowerCase().includes(hint)),
  );

  return preferredVoice ?? matchingLanguageVoices[0] ?? null;
}

function createDemoConcept(topic: string, language: LanguageOption): SimplifiedConcept {
  const cleanTopic = topic.replace(/\s+/g, " ").trim();

  if (language === "Hindi") {
    return {
      explanation: `${cleanTopic} को समझने का आसान तरीका है कि इसे छोटे-छोटे हिस्सों में देखें। पहले बच्चे देखें कि क्या हो रहा है, फिर मुख्य बातों को पहचानें, और अंत में अपने शब्दों में समझाएं।`,
      keyPoints: [
        `${cleanTopic} को बच्चों के रोजमर्रा के अनुभव से जोड़कर शुरू करें।`,
        "सरल शब्दों का उपयोग करें और एक समय पर एक ही विचार समझाएं।",
        "बच्चों से अपना उदाहरण देकर बात दोहराने को कहें।",
      ],
      example: `${cleanTopic} को नाश्ता बांटने, रास्ता चुनने, पैसे बचाने, या ऐसी किसी रोज की स्थिति से जोड़ें जहां वही विचार साफ दिखाई दे।`,
      worksheet: [
        `${cleanTopic} को एक वाक्य में समझाइए।`,
        `${cleanTopic} का एक वास्तविक जीवन उदाहरण लिखिए या बनाइए।`,
        `उत्तर दें: ${cleanTopic} रोजमर्रा के जीवन में क्यों उपयोगी है?`,
      ],
    };
  }

  if (language === "Hinglish") {
    return {
      explanation: `${cleanTopic} ko samajhne ka simple tareeka hai ki isse chhote steps mein dekhein. Pehle students notice karein kya ho raha hai, phir main parts ko naam dein, aur finally apne words mein explain karein.`,
      keyPoints: [
        `${cleanTopic} ko students ki daily life se connect karke start karein.`,
        "Simple words use karein, ek time par ek idea, aur beech-beech mein understanding check karein.",
        "Students se kahen ki woh apna example dekar concept explain karein.",
      ],
      example: `Agar topic ${cleanTopic} hai, to ise snacks share karne, route plan karne, money save karne, ya kisi daily-life situation se compare karein jahan same idea dikhai deta hai.`,
      worksheet: [
        `${cleanTopic} ko ek sentence mein explain karo.`,
        `${cleanTopic} ka ek real-life example draw ya write karo.`,
        `Answer: ${cleanTopic} daily life mein useful kyun hai?`,
      ],
    };
  }

  return {
    explanation: `${cleanTopic} means understanding the main idea step by step instead of trying to memorize it. In class, students can first notice what happens, then name the important parts, and finally explain the idea in their own words.`,
    keyPoints: [
      `Start ${cleanTopic} with a familiar situation students already know.`,
      "Use simple words, one idea at a time, and check understanding often.",
      "Ask students to explain the concept back with their own example.",
    ],
    example: `If the topic is ${cleanTopic}, compare it to sharing snacks, planning a route, saving money, or another daily-life situation where students can see the same idea in action.`,
    worksheet: [
      `Write one sentence explaining ${cleanTopic}.`,
      `Draw or list a real-life example of ${cleanTopic}.`,
      `Answer: Why is ${cleanTopic} useful in everyday life?`,
    ],
  };
}

export function ConceptSimplificationCard({
  title,
  description,
  inputLabel,
  placeholder,
  outputTitle,
}: ConceptSimplificationCardProps) {
  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState<LanguageOption>("Hinglish");
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [result, setResult] = useState<SimplifiedConcept | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState("");

  const canListen = useMemo(
    () => result !== null && language !== "Hindi" && typeof window !== "undefined" && "speechSynthesis" in window,
    [language, result],
  );

  useEffect(() => {
    if (!("speechSynthesis" in window)) {
      return;
    }

    function updateVoices() {
      setAvailableVoices(window.speechSynthesis.getVoices());
    }

    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  async function handleGenerate() {
    const trimmedTopic = topic.trim();
    setError("");
    setResult(null);
    stopSpeaking();

    if (!trimmedTopic) {
      setError("Please enter a topic first.");
      return;
    }

    setIsLoading(true);

    try {
      // Temporary interview demo mode. Reconnect Gemini by replacing this with
      // the existing POST request to /api/concept-simplify.
      await new Promise((resolve) => setTimeout(resolve, 450));
      setResult(createDemoConcept(trimmedTopic, language));
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Unable to simplify this topic.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleListen() {
    if (!result || language === "Hindi" || !("speechSynthesis" in window)) {
      return;
    }

    if (isSpeaking) {
      stopSpeaking();
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(getSpokenText(result, language));
    const voice = getSpeechVoice(language, availableVoices);
    utterance.lang = speechLanguageCodes[language];
    utterance.voice = voice;
    utterance.rate = 0.85;
    utterance.pitch = 1;
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

  function handleLanguageChange(nextLanguage: LanguageOption) {
    stopSpeaking();
    setLanguage(nextLanguage);

    if (result && topic.trim()) {
      setResult(createDemoConcept(topic, nextLanguage));
    }
  }

  return (
    <article className="dashboard-card-cinematic group flex min-h-[360px] min-w-0 flex-col rounded-[1.5rem] border border-white/80 bg-white/70 p-4 shadow-[0_18px_60px_rgba(76,29,149,0.08)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_24px_70px_rgba(76,29,149,0.14)] sm:p-6">
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-violet-200 text-xl shadow-sm transition duration-300 group-hover:scale-105" aria-hidden="true">🧠</span>
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
        onClick={handleGenerate}
        disabled={isLoading}
        className="mt-4 rounded-xl bg-gradient-to-r from-blue-700 to-violet-700 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-900/15 transition hover:-translate-y-0.5 hover:from-blue-600 hover:to-violet-600 focus:outline-none focus:ring-4 focus:ring-violet-200 disabled:cursor-not-allowed disabled:from-slate-400 disabled:to-slate-400"
      >
        {isLoading ? "Generating..." : "Generate"}
      </button>

      <div className="mt-5 flex min-w-0 flex-1 flex-col overflow-hidden rounded-2xl border border-white/90 bg-white/55 p-3 shadow-inner shadow-violet-950/5 sm:p-4">
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:justify-between">
          <p className="text-sm font-semibold text-slate-800">{outputTitle}</p>
          {result ? (
            <button
              type="button"
              onClick={handleListen}
              disabled={!canListen}
              className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-teal-500 hover:text-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSpeaking ? "⏹ Stop" : "🔊 Listen"}
            </button>
          ) : null}
        </div>

        {isLoading ? (
          <p className="mt-3 text-sm leading-6 text-slate-500">Creating a short classroom explanation...</p>
        ) : null}

        {error ? <p className="mt-3 text-sm leading-6 text-red-600">{error}</p> : null}

        {!isLoading && !error && !result ? (
          <p className="mt-3 text-sm leading-6 text-slate-500">Output placeholder</p>
        ) : null}

        {result ? (
          <div className="mt-3 space-y-4 text-sm leading-6 text-slate-700">
            <p>{result.explanation}</p>

            <div>
              <p className="font-semibold text-slate-800">{sectionLabels[language].keyPoints}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {result.keyPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-semibold text-slate-800">{sectionLabels[language].example}</p>
              <p className="mt-1">{result.example}</p>
            </div>

            <div>
              <p className="font-semibold text-slate-800">{sectionLabels[language].worksheet}</p>
              <ol className="mt-2 list-decimal space-y-1 pl-5">
                {result.worksheet.map((question) => (
                  <li key={question}>{question}</li>
                ))}
              </ol>
            </div>
          </div>
        ) : null}
      </div>
    </article>
  );
}
