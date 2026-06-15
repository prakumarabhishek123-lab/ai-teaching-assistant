"use client";
import { useState } from "react";

// ─────────────────────────────────────────────────────────────
// DashboardToolCard.tsx
// Translation & Dictation module by Anushka Singh
// CDF Round 2 — AI Teaching Assistant
// Uses: Google Gemini API (key from .env.local)
// ─────────────────────────────────────────────────────────────

type DashboardToolCardProps = {
  title: string;
  description: string;
  inputLabel: string;
  placeholder: string;
  outputTitle: string;
};

async function callGemini(prompt: string): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  if (!apiKey) {
    return "Gemini API key not found.";
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    }
  );

  const data = await response.json();

  return (
    data?.candidates?.[0]?.content?.parts?.[0]?.text ??
    "Could not generate response."
  );
}

// Calls Gemini API using the key from environment variables
// process.env.NEXT_PUBLIC_GEMINI_API_KEY reads from .env.local

async function translateWithGemini(
  text: string,
  direction: string
): Promise<string> {
  const prompt =
    direction === "English to Hindi"
      ? `Translate this English text to simple Hindi. Return only the translation.\n\n${text}`
      : `Translate this Hindi text to simple English. Return only the translation.\n\n${text}`;

  return callGemini(prompt);
}

// Generate a short dictation passage on any topic
async function generateDictationWithGemini(topic: string): Promise<string> {
  const prompt = `Generate a short, simple dictation passage suitable for Indian government school students on the topic: ${topic}.
Use clear classroom language and provide a passage that can be read aloud for dictation. Return only the passage.`;
  return callGemini(prompt);
}

// Browser's built-in text to speech — no library needed
function speakText(text: string, lang: string) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;      // "hi-IN" for Hindi, "en-US" for English
  utterance.rate = 0.85;      // slightly slow for classroom clarity
  window.speechSynthesis.cancel(); // stop any ongoing speech first
  window.speechSynthesis.speak(utterance);
}

export function DashboardToolCard({
  title,
  description,
  inputLabel,
  placeholder,
  outputTitle,
}: DashboardToolCardProps) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  // Translation specific state
  const [direction, setDirection] = useState("English to Hindi");
  const [translationResult, setTranslationResult] = useState("");

  // Dictation specific state
  const [dictationTopic, setDictationTopic] = useState("");
  const [dictationPassage, setDictationPassage] = useState("");
  const [dictationHindi, setDictationHindi] = useState("");
  const [showHindi, setShowHindi] = useState(false);
  const [activeTab, setActiveTab] = useState<"translate" | "dictation">("translate");

  // ── Handler for non-translation cards (other team members' cards) ──
  async function handleGenerate() {
    if (!input.trim()) return;
    setLoading(true);
    setOutput("");
    
    try {
      const prompt = `You are an AI teaching assistant for Indian government school teachers.
Task: ${title}
Input: ${input}
Provide a clear, practical, classroom-ready response in simple English.`;
      const result = await callGemini(prompt);
      setOutput(result);
    } catch {
      setOutput("Error connecting to AI. Please try again.");
    }
    
    setLoading(false);
  }

  // ── Translation handler ──
  async function handleTranslate() {
    if (!input.trim()) return;
    setLoading(true);
    setTranslationResult("");
    
    try {
      const result = await translateWithGemini(input, direction);
      setTranslationResult(result);
    } catch {
      setTranslationResult("Translation failed. Please try again.");
    }
    
    setLoading(false);
  }

  // ── Dictation generation handler ──
  async function handleGenerateDictation() {
    if (!dictationTopic.trim()) return;
    setLoading(true);
    setDictationPassage("");
    setDictationHindi("");
    setShowHindi(false);
    
    try {
      const passage = await generateDictationWithGemini(dictationTopic);
      setDictationPassage(passage);
    } catch {
      setDictationPassage("Could not generate passage. Please try again.");
    }
    
    setLoading(false);
  }

  // ── Show Hindi translation of dictation passage ──
  async function handleShowHindi() {
    if (!dictationPassage) return;
    setLoading(true);
    
    try {
      const hindi = await translateWithGemini(dictationPassage, "English to Hindi");
      setDictationHindi(hindi);
      setShowHindi(true);
    } catch {
      setDictationHindi("Translation failed. Please try again.");
      setShowHindi(true);
    }
    
    setLoading(false);
  }

  // ════════════════════════════════════════════════════════
  // TRANSLATION & DICTATION CARD — Anushka's module
  // ════════════════════════════════════════════════════════
  if (title === "Translation & Dictation") {
    return (
      <article className="flex min-h-[360px] flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        
        {/* Card Header */}
        <div>
          <h2 className="text-xl font-semibold text-slate-950">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
        </div>

        {/* Tab switcher */}
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("translate")}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              activeTab === "translate"
                ? "bg-teal-600 text-white"
                : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            🔄 Translate
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("dictation")}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              activeTab === "dictation"
                ? "bg-teal-600 text-white"
                : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            📝 Dictation
          </button>
        </div>

        {/* ── TRANSLATION TAB ── */}
        {activeTab === "translate" && (
          <div className="mt-4 flex flex-col gap-3">
            
            {/* Direction selector */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setDirection("English to Hindi")}
                className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                  direction === "English to Hindi"
                    ? "border-teal-500 bg-teal-50 text-teal-700"
                    : "border-slate-200 text-slate-600"
                }`}
              >
                English → Hindi
              </button>
              <button
                type="button"
                onClick={() => setDirection("Hindi to English")}
                className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                  direction === "Hindi to English"
                    ? "border-teal-500 bg-teal-50 text-teal-700"
                    : "border-slate-200 text-slate-600"
                }`}
              >
                Hindi → English
              </button>
            </div>

            {/* Text input */}
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                direction === "English to Hindi"
                  ? "Type English text here..."
                  : "यहाँ हिंदी में लिखें..."
              }
              className="min-h-24 resize-none rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm"
            />

            {/* Translate button */}
            <button
              type="button"
              onClick={handleTranslate}
              disabled={loading || !input.trim()}
              className="rounded-lg bg-teal-600 px-4 py-3 text-sm font-semibold text-white disabled:opacity-50"
            >
              {loading ? "Translating..." : "Translate Now"}
            </button>

            {/* Result — shown side by side */}
            {translationResult && (
              <div className="mt-2 grid grid-cols-2 gap-3">
                
                {/* Original */}
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">
                    {direction === "English to Hindi" ? "English" : "Hindi"}
                  </p>
                  <p className="text-sm text-slate-700">{input}</p>
                  <button
                    type="button"
                    onClick={() => speakText(input, direction === "English to Hindi" ? "en-US" : "hi-IN")}
                    className="mt-2 text-xs text-teal-600 underline"
                  >
                    🔊 Listen
                  </button>
                </div>

                {/* Translation */}
                <div className="rounded-lg border border-teal-200 bg-teal-50 p-3">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wide text-teal-600">
                    {direction === "English to Hindi" ? "Hindi" : "English"}
                  </p>
                  <p className="text-sm text-slate-700">{translationResult}</p>
                  <button
                    type="button"
                    onClick={() => speakText(translationResult, direction === "English to Hindi" ? "hi-IN" : "en-US")}
                    className="mt-2 text-xs text-teal-600 underline"
                  >
                    🔊 Listen
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── DICTATION TAB ── */}
        {activeTab === "dictation" && (
          <div className="mt-4 flex flex-col gap-3">
            
            <label className="text-sm font-medium text-slate-800">
              Dictation Topic
            </label>
            <input
              type="text"
              value={dictationTopic}
              onChange={(e) => setDictationTopic(e.target.value)}
              placeholder="e.g., Water cycle, Solar system, Freedom struggle..."
              className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm"
            />

            <button
              type="button"
              onClick={handleGenerateDictation}
              disabled={loading || !dictationTopic.trim()}
              className="rounded-lg bg-teal-600 px-4 py-3 text-sm font-semibold text-white disabled:opacity-50"
            >
              {loading ? "Generating..." : "Generate Dictation"}
            </button>

            {/* Dictation passage */}
            {dictationPassage && (
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">
                  📄 Dictation Passage
                </p>
                <p className="text-sm leading-7 text-slate-700">{dictationPassage}</p>
                
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => speakText(dictationPassage, "en-US")}
                    className="rounded border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600"
                  >
                    🔊 Read Aloud
                  </button>
                  <button
                    type="button"
                    onClick={handleShowHindi}
                    disabled={loading}
                    className="rounded border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-medium text-teal-700 disabled:opacity-50"
                  >
                    {loading ? "Translating..." : "🇮🇳 Show Hindi"}
                  </button>
                </div>
              </div>
            )}

            {/* Hindi translation of dictation */}
            {showHindi && dictationHindi && (
              <div className="rounded-lg border border-teal-200 bg-teal-50 p-4">
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-teal-600">
                  🇮🇳 Hindi Translation
                </p>
                <p className="text-sm leading-7 text-slate-700">{dictationHindi}</p>
                <button
                  type="button"
                  onClick={() => speakText(dictationHindi, "hi-IN")}
                  className="mt-2 text-xs text-teal-600 underline"
                >
                  🔊 Listen in Hindi
                </button>
              </div>
            )}

            {/* Teacher tip */}
            {dictationPassage && (
              <div className="rounded-lg border border-blue-100 bg-blue-50 p-3">
                <p className="text-xs text-blue-700">
                  <strong>📋 Teacher tip:</strong> Read passage aloud while students write.
                  Reveal Hindi version after students finish for self-correction.
                </p>
              </div>
            )}
          </div>
        )}
      </article>
    );
  }

  // ════════════════════════════════════════════════════════
  // DEFAULT CARD — for other team members' sections
  // (Concept Simplification, Voice Quiz, Digital Board)
  // ════════════════════════════════════════════════════════
  return (
    <article className="flex min-h-[360px] flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div>
        <h2 className="text-xl font-semibold text-slate-950">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      </div>

      <label className="mt-6 text-sm font-medium text-slate-800">{inputLabel}</label>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={placeholder}
        className="mt-2 min-h-28 resize-none rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm"
      />

      <button
        type="button"
        onClick={handleGenerate}
        disabled={loading || !input.trim()}
        className="mt-4 rounded-lg bg-teal-600 px-4 py-3 text-sm font-semibold text-white disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate"}
      </button>

      <div className="mt-5 flex flex-1 flex-col rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4">
        <p className="text-sm font-semibold text-slate-800">{outputTitle}</p>
        <pre className="mt-3 whitespace-pre-wrap text-sm text-slate-700">
          {output || "Output will appear here"}
        </pre>
      </div>
    </article>
  );
}
