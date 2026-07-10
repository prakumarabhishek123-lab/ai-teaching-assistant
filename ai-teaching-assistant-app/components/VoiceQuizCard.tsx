"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { CLASS_LEVELS, SUBJECTS, type ClassLevel, type Subject } from "@/lib/config/education";

type VoiceQuizCardProps = {
  title: string;
  description: string;
  inputLabel: string;
  placeholder: string;
  outputTitle: string;
};

type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

type QuizResponse = {
  questions: QuizQuestion[];
};

type QuizProgressEntry = {
  id: string;
  topic: string;
  classLevel: ClassLevel;
  subject: Subject;
  language: LanguageOption;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  percentage: number;
  completedAt: string;
};

type LanguageOption = "English" | "Hindi" | "Hinglish";

const languages: LanguageOption[] = ["English", "Hindi", "Hinglish"];

const speechLanguageCodes: Record<LanguageOption, string> = {
  English: "en-US",
  Hindi: "hi-IN",
  Hinglish: "hi-IN",
};

const QUIZ_PROGRESS_HISTORY_KEY = "aiTeachingAssistant.quizProgressHistory";

function getQuestionSpeech(question: QuizQuestion, index: number, language: LanguageOption) {
  const options = question.options.map((option, optionIndex) => {
    const label = String.fromCharCode(65 + optionIndex);
    return `Option ${label}: ${option}`;
  });

  if (language === "Hindi") {
    return [`Prashn ${index + 1}. ${question.question}`, ...options].join(". ");
  }

  return [`Question ${index + 1}. ${question.question}`, ...options].join(". ");
}

function getScoreRating(score: number, totalQuestions: number) {
  const percentage = totalQuestions === 0 ? 0 : score / totalQuestions;

  if (percentage >= 0.8) {
    return "Excellent";
  }

  if (percentage >= 0.5) {
    return "Very Good";
  }

  if (score > 0) {
    return "Good";
  }

  return "Needs Practice";
}

function saveQuizProgress(entry: QuizProgressEntry) {
  try {
    const existingRaw = window.localStorage.getItem(QUIZ_PROGRESS_HISTORY_KEY);
    const existingEntries = existingRaw ? (JSON.parse(existingRaw) as QuizProgressEntry[]) : [];
    const nextEntries = [entry, ...existingEntries].slice(0, 25);
    window.localStorage.setItem(QUIZ_PROGRESS_HISTORY_KEY, JSON.stringify(nextEntries));
  } catch {
    // Progress history is helpful, but quiz submission should still succeed if storage is unavailable.
  }
}

export function VoiceQuizCard({
  title,
  description,
  inputLabel,
  placeholder,
  outputTitle,
}: VoiceQuizCardProps) {
  const [classLevel, setClassLevel] = useState<ClassLevel>("Class 5");
  const [subject, setSubject] = useState<Subject>("Science");
  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState<LanguageOption>("Hinglish");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);
  const currentQuestion = questions[currentQuestionIndex];
  const percentage = score === null || questions.length === 0 ? 0 : Math.round((score / questions.length) * 100);
  const wrongAnswers = score === null ? 0 : questions.length - score;
  const hasCompletedQuiz = score !== null;

  async function handleGenerateQuiz() {
    const trimmedTopic = topic.trim();
    setError("");
    setScore(null);
    setAnswers({});
    setQuestions([]);
    setCurrentQuestionIndex(0);

    if (!trimmedTopic) {
      setError("Please enter a quiz topic first.");
      return;
    }

    setIsGenerating(true);

    try {
      const response = await fetch("/api/quiz-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ classLevel, subject, topic: trimmedTopic, language }),
      });
      const data = (await response.json()) as QuizResponse | { error?: string };

      if (!response.ok) {
        throw new Error("error" in data && data.error ? data.error : "Unable to generate quiz.");
      }

      setQuestions((data as QuizResponse).questions);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Unable to generate quiz.");
    } finally {
      setIsGenerating(false);
    }
  }

  function handleSubmitQuiz() {
    if (questions.length === 0) {
      return;
    }

    if (answeredCount === 0) {
      setError("Please answer at least one question before submitting.");
      return;
    }

    const totalScore = questions.reduce((total, question, index) => {
      return total + (answers[index] === question.correctAnswer ? 1 : 0);
    }, 0);
    const resultPercentage = Math.round((totalScore / questions.length) * 100);

    setError("");
    setScore(totalScore);
    saveQuizProgress({
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      topic: topic.trim(),
      classLevel,
      subject,
      language,
      totalQuestions: questions.length,
      correctAnswers: totalScore,
      wrongAnswers: questions.length - totalScore,
      percentage: resultPercentage,
      completedAt: new Date().toISOString(),
    });
  }

  function handleSpeakQuestion(question: QuizQuestion, index: number) {
    if (!("speechSynthesis" in window)) {
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(getQuestionSpeech(question, index, language));
    utterance.lang = speechLanguageCodes[language];
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }

  function handleLanguageChange(nextLanguage: LanguageOption) {
    setLanguage(nextLanguage);
    setScore(null);
    setAnswers({});
    setQuestions([]);
    setCurrentQuestionIndex(0);
  }

  return (
    <article className="dashboard-card-cinematic group flex min-h-[360px] min-w-0 flex-col rounded-[1.5rem] border border-white/80 bg-white/70 p-4 shadow-[0_18px_60px_rgba(76,29,149,0.08)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_24px_70px_rgba(76,29,149,0.14)] sm:p-6">
      <div className="flex items-start gap-4">
        <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-2xl border border-white/80 shadow-sm transition duration-300 group-hover:scale-105">
          <Image
            src="/voice-quiz-logo.jpg"
            alt="Voice Quiz logo"
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

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <label className="text-sm font-medium text-slate-800" htmlFor={`${title}-class`}>
          Class
          <select
            id={`${title}-class`}
            value={classLevel}
            onChange={(event) => {
              setClassLevel(event.target.value as ClassLevel);
              setQuestions([]);
              setAnswers({});
              setScore(null);
              setCurrentQuestionIndex(0);
            }}
            className="mt-2 w-full min-w-0 rounded-xl border border-white/90 bg-white/65 px-4 py-3 text-sm font-semibold text-slate-900 shadow-inner outline-none transition focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
          >
            {CLASS_LEVELS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm font-medium text-slate-800" htmlFor={`${title}-subject`}>
          Subject
          <select
            id={`${title}-subject`}
            value={subject}
            onChange={(event) => {
              setSubject(event.target.value as Subject);
              setQuestions([]);
              setAnswers({});
              setScore(null);
              setCurrentQuestionIndex(0);
            }}
            className="mt-2 w-full min-w-0 rounded-xl border border-white/90 bg-white/65 px-4 py-3 text-sm font-semibold text-slate-900 shadow-inner outline-none transition focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
          >
            {SUBJECTS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm font-medium text-slate-800" htmlFor={`${title}-language`}>
          Language Selector
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
        </label>
      </div>

      <button
        type="button"
        onClick={handleGenerateQuiz}
        disabled={isGenerating}
        className="mt-4 rounded-xl bg-gradient-to-r from-blue-700 to-violet-700 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-900/15 transition hover:-translate-y-0.5 hover:from-blue-600 hover:to-violet-600 focus:outline-none focus:ring-4 focus:ring-violet-200 disabled:cursor-not-allowed disabled:from-slate-400 disabled:to-slate-400"
      >
        {isGenerating ? "Generating..." : "Generate Quiz"}
      </button>

      <div className="mt-5 flex min-w-0 flex-1 flex-col overflow-hidden rounded-2xl border border-white/90 bg-white/55 p-3 shadow-inner shadow-violet-950/5 sm:p-4">
        <p className="text-sm font-semibold text-slate-800">{outputTitle}</p>

        {isGenerating ? (
          <p className="mt-3 text-sm leading-6 text-slate-500">Preparing 10 quiz questions...</p>
        ) : null}

        {error ? <p className="mt-3 text-sm leading-6 text-red-600">{error}</p> : null}

        {!isGenerating && !error && questions.length === 0 ? (
          <p className="mt-3 text-sm leading-6 text-slate-500">Output placeholder</p>
        ) : null}

        {currentQuestion ? (
          <div className="mt-4 space-y-5 text-sm text-slate-700">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <p className="font-semibold text-slate-900">
                Question {currentQuestionIndex + 1} of {questions.length}
              </p>
              <button
                type="button"
                onClick={() => handleSpeakQuestion(currentQuestion, currentQuestionIndex)}
                className="w-fit rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-teal-500 hover:text-teal-700"
              >
                Speak Question
              </button>
            </div>

            <fieldset className="space-y-3 border-t border-slate-200 pt-4">
              <legend className="font-semibold leading-6 text-slate-900">
                {currentQuestionIndex + 1}. {currentQuestion.question}
              </legend>

              <div className="grid gap-2">
                {currentQuestion.options.map((option) => {
                  const isCorrect = hasCompletedQuiz && option === currentQuestion.correctAnswer;
                  const isWrongSelection =
                    hasCompletedQuiz &&
                    answers[currentQuestionIndex] === option &&
                    option !== currentQuestion.correctAnswer;

                  return (
                    <label
                      key={option}
                      className={`flex gap-2 rounded-md border bg-white px-3 py-2 ${
                        isCorrect
                          ? "border-green-700 bg-green-100 font-bold text-green-700"
                          : isWrongSelection
                            ? "border-red-300 text-red-700"
                            : "border-slate-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`${title}-${currentQuestionIndex}`}
                        value={option}
                        checked={answers[currentQuestionIndex] === option}
                        disabled={hasCompletedQuiz}
                        onChange={() =>
                          setAnswers((currentAnswers) => ({
                            ...currentAnswers,
                            [currentQuestionIndex]: option,
                          }))
                        }
                        className="mt-1"
                      />
                      <span className="min-w-0 break-words">{option}</span>
                    </label>
                  );
                })}
              </div>

              {hasCompletedQuiz ? (
                <div className="rounded-md border border-emerald-200 bg-emerald-50 p-3">
                  <p className="text-xs font-semibold text-emerald-900">
                    Correct answer: {currentQuestion.correctAnswer}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-emerald-900/80">
                    {currentQuestion.explanation}
                  </p>
                </div>
              ) : null}
            </fieldset>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentQuestionIndex((current) => Math.max(0, current - 1))}
                  disabled={currentQuestionIndex === 0}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-teal-500 hover:text-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentQuestionIndex((current) => Math.min(questions.length - 1, current + 1))}
                  disabled={currentQuestionIndex === questions.length - 1}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-teal-500 hover:text-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </div>

              <button
                type="button"
                onClick={handleSubmitQuiz}
                disabled={answeredCount === 0 || hasCompletedQuiz}
                className="rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                Submit Quiz
              </button>
            </div>

            <p className="text-xs font-semibold text-slate-500">
              Answered {answeredCount}/{questions.length}
            </p>

            {hasCompletedQuiz ? (
              <div className="rounded-md border border-slate-200 bg-white p-3">
                <p className="text-sm font-semibold text-slate-900">
                  Score: {score}/{questions.length}
                </p>
                <p className="mt-1 text-sm text-slate-700">
                  Total questions: {questions.length} | Correct: {score} | Wrong: {wrongAnswers}
                </p>
                <p className="mt-1 text-sm font-bold text-teal-700">
                  Result: {percentage}% - {getScoreRating(score, questions.length)}
                </p>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}
