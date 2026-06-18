"use client";

import { useMemo, useState } from "react";

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
};

type LanguageOption = "English" | "Hindi" | "Hinglish";

const languages: LanguageOption[] = ["English", "Hindi", "Hinglish"];

const speechLanguageCodes: Record<LanguageOption, string> = {
  English: "en-US",
  Hindi: "hi-IN",
  Hinglish: "hi-IN",
};

const sampleQuizzes: Record<string, QuizQuestion[]> = {
  water: [
    {
      question: "What is evaporation?",
      options: ["Water changing into vapor", "Ice melting", "Rain falling", "Clouds becoming solid"],
      correctAnswer: "Water changing into vapor",
    },
    {
      question: "What do clouds form from?",
      options: ["Condensed water vapor", "Dry dust only", "Sunlight", "Rocks"],
      correctAnswer: "Condensed water vapor",
    },
    {
      question: "What is precipitation?",
      options: ["Water falling from clouds", "Water soaking into soil", "Water heating up", "Plants making food"],
      correctAnswer: "Water falling from clouds",
    },
    {
      question: "Which energy source drives the water cycle?",
      options: ["The Sun", "The Moon", "Magnets", "Electric bulbs"],
      correctAnswer: "The Sun",
    },
    {
      question: "Where does collected rainwater often go?",
      options: ["Rivers, lakes, and oceans", "Only clouds", "Only volcanoes", "Only deserts"],
      correctAnswer: "Rivers, lakes, and oceans",
    },
  ],
  fractions: [
    {
      question: "What does the denominator show in a fraction?",
      options: ["Total equal parts", "Selected parts", "The answer only", "The biggest number"],
      correctAnswer: "Total equal parts",
    },
    {
      question: "Which fraction means one out of four equal parts?",
      options: ["1/4", "4/1", "2/4", "1/2"],
      correctAnswer: "1/4",
    },
    {
      question: "Which is equal to one half?",
      options: ["2/4", "1/3", "3/4", "4/5"],
      correctAnswer: "2/4",
    },
    {
      question: "If a pizza is cut into 8 equal slices and you eat 2, what fraction did you eat?",
      options: ["2/8", "8/2", "6/8", "1/8"],
      correctAnswer: "2/8",
    },
    {
      question: "What type of fraction has a numerator smaller than the denominator?",
      options: ["Proper fraction", "Improper fraction", "Mixed number", "Decimal"],
      correctAnswer: "Proper fraction",
    },
  ],
  science: [
    {
      question: "What do plants need to make food?",
      options: ["Sunlight, water, and air", "Only soil", "Only wind", "Only stones"],
      correctAnswer: "Sunlight, water, and air",
    },
    {
      question: "Which part of a plant usually absorbs water?",
      options: ["Roots", "Flowers", "Fruit", "Seeds"],
      correctAnswer: "Roots",
    },
    {
      question: "Which organ helps humans breathe?",
      options: ["Lungs", "Stomach", "Bones", "Skin"],
      correctAnswer: "Lungs",
    },
    {
      question: "What is a solid?",
      options: ["Matter with a fixed shape", "Matter that always floats", "Only hot matter", "Invisible matter"],
      correctAnswer: "Matter with a fixed shape",
    },
    {
      question: "Which sense organ helps us see?",
      options: ["Eyes", "Ears", "Tongue", "Nose"],
      correctAnswer: "Eyes",
    },
  ],
};

const defaultQuiz: QuizQuestion[] = [
  {
    question: "What is the first step to understand a new topic?",
    options: ["Identify the main idea", "Memorize every word", "Skip examples", "Avoid questions"],
    correctAnswer: "Identify the main idea",
  },
  {
    question: "Why are examples useful in learning?",
    options: ["They connect ideas to real life", "They make topics harder", "They replace practice", "They remove thinking"],
    correctAnswer: "They connect ideas to real life",
  },
  {
    question: "What should students do after learning a concept?",
    options: ["Explain it in their own words", "Forget the steps", "Only copy notes", "Stop practicing"],
    correctAnswer: "Explain it in their own words",
  },
  {
    question: "Which activity checks understanding best?",
    options: ["Answering a question with a reason", "Reading silently only", "Closing the book", "Guessing randomly"],
    correctAnswer: "Answering a question with a reason",
  },
  {
    question: "What makes a classroom quiz helpful?",
    options: ["Clear questions and useful feedback", "Confusing wording", "No answer review", "Unrelated options"],
    correctAnswer: "Clear questions and useful feedback",
  },
];

function getLocalizedDemoQuiz(topic: string, language: LanguageOption): QuizQuestion[] {
  const cleanTopic = topic.replace(/\s+/g, " ").trim();

  if (language === "Hindi") {
    return [
      {
        question: `${cleanTopic} का मुख्य विचार क्या है?`,
        options: ["विषय की सबसे जरूरी बात", "सिर्फ कठिन शब्द", "सिर्फ चित्र", "बिना कारण याद करना"],
        correctAnswer: "विषय की सबसे जरूरी बात",
      },
      {
        question: `${cleanTopic} को समझाने के लिए उदाहरण क्यों उपयोगी होता है?`,
        options: ["यह बात को रोजमर्रा के जीवन से जोड़ता है", "यह सीखना रोकता है", "यह प्रश्न हटाता है", "यह विषय बदल देता है"],
        correctAnswer: "यह बात को रोजमर्रा के जीवन से जोड़ता है",
      },
      {
        question: `${cleanTopic} सीखने के बाद विद्यार्थी को क्या करना चाहिए?`,
        options: ["अपने शब्दों में समझाना", "अभ्यास छोड़ देना", "केवल नकल करना", "प्रश्न न पूछना"],
        correctAnswer: "अपने शब्दों में समझाना",
      },
      {
        question: `${cleanTopic} में समझ जांचने का अच्छा तरीका क्या है?`,
        options: ["कारण के साथ उत्तर देना", "सिर्फ चुपचाप पढ़ना", "अनुमान लगाना", "कॉपी बंद करना"],
        correctAnswer: "कारण के साथ उत्तर देना",
      },
      {
        question: `${cleanTopic} पर अच्छा क्विज कैसा होना चाहिए?`,
        options: ["स्पष्ट प्रश्न और सही प्रतिक्रिया वाला", "बहुत उलझा हुआ", "बिना उत्तर वाला", "असंबंधित विकल्प वाला"],
        correctAnswer: "स्पष्ट प्रश्न और सही प्रतिक्रिया वाला",
      },
    ];
  }

  if (language === "Hinglish") {
    return [
      {
        question: `${cleanTopic} ka main idea kya hai?`,
        options: ["Topic ki sabse important baat", "Sirf difficult words", "Sirf pictures", "Bina reason memorize karna"],
        correctAnswer: "Topic ki sabse important baat",
      },
      {
        question: `${cleanTopic} samjhane ke liye example useful kyun hota hai?`,
        options: ["Ye idea ko daily life se connect karta hai", "Ye learning stop karta hai", "Ye questions hata deta hai", "Ye topic change karta hai"],
        correctAnswer: "Ye idea ko daily life se connect karta hai",
      },
      {
        question: `${cleanTopic} seekhne ke baad student ko kya karna chahiye?`,
        options: ["Apne words mein explain karna", "Practice chhod dena", "Sirf notes copy karna", "Question na poochna"],
        correctAnswer: "Apne words mein explain karna",
      },
      {
        question: `${cleanTopic} mein understanding check karne ka best tareeka kya hai?`,
        options: ["Reason ke saath answer dena", "Sirf silently read karna", "Random guess karna", "Book close karna"],
        correctAnswer: "Reason ke saath answer dena",
      },
      {
        question: `${cleanTopic} par helpful quiz kaisa hota hai?`,
        options: ["Clear questions aur useful feedback wala", "Confusing wording wala", "Bina answer review wala", "Unrelated options wala"],
        correctAnswer: "Clear questions aur useful feedback wala",
      },
    ];
  }

  const normalizedTopic = topic.toLowerCase();

  if (normalizedTopic.includes("water")) {
    return sampleQuizzes.water;
  }

  if (normalizedTopic.includes("fraction")) {
    return sampleQuizzes.fractions;
  }

  if (
    normalizedTopic.includes("science") ||
    normalizedTopic.includes("plant") ||
    normalizedTopic.includes("human") ||
    normalizedTopic.includes("matter")
  ) {
    return sampleQuizzes.science;
  }

  return defaultQuiz.map((question) => ({
    ...question,
    question: question.question.replace("a new topic", topic),
  }));
}

function getQuestionSpeech(question: QuizQuestion, index: number, language: LanguageOption) {
  const options = question.options.map((option, optionIndex) => {
    const label = String.fromCharCode(65 + optionIndex);
    if (language === "Hindi") {
      return `विकल्प ${label}: ${option}`;
    }

    if (language === "Hinglish") {
      return `Option ${label}: ${option}`;
    }

    return `Option ${label}: ${option}`;
  });

  if (language === "Hindi") {
    return [`प्रश्न ${index + 1}. ${question.question}`, ...options].join(". ");
  }

  return [`Question ${index + 1}. ${question.question}`, ...options].join(". ");
}

function getScoreRating(score: number, totalQuestions: number) {
  const percentage = totalQuestions === 0 ? 0 : score / totalQuestions;

  if (score === 0) {
    return "😞 Bad";
  }

  if (percentage >= 0.8) {
    return "🏆 Excellent";
  }

  if (percentage >= 0.5) {
    return "🌟 Very Good";
  }

  return "👍 Good";
}

export function VoiceQuizCard({
  title,
  description,
  inputLabel,
  placeholder,
  outputTitle,
}: VoiceQuizCardProps) {
  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState<LanguageOption>("Hinglish");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [score, setScore] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);

  async function handleGenerateQuiz() {
    const trimmedTopic = topic.trim();
    setError("");
    setScore(null);
    setAnswers({});
    setQuestions([]);

    if (!trimmedTopic) {
      setError("Please enter a quiz topic first.");
      return;
    }

    setIsGenerating(true);

    try {
      // Temporary interview demo mode. Reconnect Gemini by replacing this with
      // a POST request to a future quiz API route.
      await new Promise((resolve) => setTimeout(resolve, 350));
      setQuestions(getLocalizedDemoQuiz(trimmedTopic, language).slice(0, 5));
    } finally {
      setIsGenerating(false);
    }
  }

  function handleSubmitQuiz() {
    if (questions.length === 0) {
      return;
    }

    const totalScore = questions.reduce((total, question, index) => {
      return total + (answers[index] === question.correctAnswer ? 1 : 0);
    }, 0);

    setScore(totalScore);
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

    if (questions.length > 0 && topic.trim()) {
      setQuestions(getLocalizedDemoQuiz(topic, nextLanguage).slice(0, 5));
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
        value={topic}
        onChange={(event) => setTopic(event.target.value)}
        placeholder={placeholder}
        className="mt-2 min-h-28 resize-none rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100"
      />

      <label className="mt-4 text-sm font-medium text-slate-800" htmlFor={`${title}-language`}>
        🌐 Language Selector
      </label>
      <select
        id={`${title}-language`}
        value={language}
        onChange={(event) => handleLanguageChange(event.target.value as LanguageOption)}
        className="mt-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100"
      >
        {languages.map((languageOption) => (
          <option key={languageOption} value={languageOption}>
            {languageOption}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={handleGenerateQuiz}
        disabled={isGenerating}
        className="mt-4 rounded-lg bg-teal-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-200 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        {isGenerating ? "Generating..." : "Generate Quiz"}
      </button>

      <div className="mt-5 flex flex-1 flex-col rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4">
        <p className="text-sm font-semibold text-slate-800">{outputTitle}</p>

        {isGenerating ? (
          <p className="mt-3 text-sm leading-6 text-slate-500">Preparing 5 demo quiz questions...</p>
        ) : null}

        {error ? <p className="mt-3 text-sm leading-6 text-red-600">{error}</p> : null}

        {!isGenerating && !error && questions.length === 0 ? (
          <p className="mt-3 text-sm leading-6 text-slate-500">Output placeholder</p>
        ) : null}

        {questions.length > 0 ? (
          <div className="mt-4 space-y-5 text-sm text-slate-700">
            {questions.map((question, questionIndex) => (
              <fieldset key={question.question} className="space-y-3 border-t border-slate-200 pt-4 first:border-t-0 first:pt-0">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <legend className="font-semibold leading-6 text-slate-900">
                    {questionIndex + 1}. {question.question}
                  </legend>
                  <button
                    type="button"
                    onClick={() => handleSpeakQuestion(question, questionIndex)}
                    className="w-fit rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-teal-500 hover:text-teal-700"
                  >
                    Speak Question
                  </button>
                </div>

                <div className="grid gap-2">
                  {question.options.map((option) => {
                    const isCorrect = score !== null && option === question.correctAnswer;
                    const isWrongSelection =
                      score !== null && answers[questionIndex] === option && option !== question.correctAnswer;

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
                          name={`${title}-${questionIndex}`}
                          value={option}
                          checked={answers[questionIndex] === option}
                          onChange={() =>
                            setAnswers((currentAnswers) => ({
                              ...currentAnswers,
                              [questionIndex]: option,
                            }))
                          }
                          className="mt-1"
                        />
                        <span>{option}</span>
                      </label>
                    );
                  })}
                </div>

                {score !== null ? (
                  <p className="text-xs font-semibold text-slate-700">
                    Correct answer: {question.correctAnswer}
                  </p>
                ) : null}
              </fieldset>
            ))}

            <button
              type="button"
              onClick={handleSubmitQuiz}
              disabled={answeredCount === 0}
              className="rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              Submit Quiz
            </button>

            {score !== null ? (
              <div className="rounded-md border border-slate-200 bg-white p-3">
                <p className="text-sm font-semibold text-slate-900">
                  Score: {score}/{questions.length}
                </p>
                <p className="mt-1 text-sm font-bold text-teal-700">
                  Rating: {getScoreRating(score, questions.length)}
                </p>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}
