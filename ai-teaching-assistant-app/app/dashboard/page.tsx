"use client";

import { useState } from "react";

export default function QuizPage() {
  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState("English");
  const [quiz, setQuiz] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string;
  }>({});

  const [score, setScore] = useState<number | null>(null);

  const handleGenerate = async () => {
    if (!topic) return;

    setLoading(true);
    setQuiz([]);
    setSelectedAnswers({});
    setScore(null);

    try {
      const response = await fetch("/api/generate-quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic,
          language,
        }),
      });

      const data = await response.json();

      setQuiz(data.quiz);
    } catch (error) {
      console.error(error);
      alert("Failed to generate quiz");
    }

    setLoading(false);
  };

  const handleSubmit = () => {
    let correct = 0;

    quiz.forEach((q, index) => {
      if (selectedAnswers[index] === q.answer) {
        correct++;
      }
    });

    setScore(correct);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">
        Quiz Generator
      </h1>

      <div className="flex gap-4 mb-8 flex-wrap">
        <input
          type="text"
          placeholder="Enter Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="border border-gray-500 bg-gray-800 text-white p-3 rounded w-80"
        />

        <select
          value={language}
          onChange={(e) =>
            setLanguage(e.target.value)
          }
          className="border border-gray-500 bg-gray-800 text-white p-3 rounded"
        >
          <option value="English">
            English
          </option>

          <option value="Hindi">
            Hindi
          </option>

          <option value="Hinglish">
            Hinglish
          </option>
        </select>

        <button
          onClick={handleGenerate}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded"
        >
          {loading ? "Generating..." : "Generate Quiz"}
        </button>
      </div>

      {quiz.length > 0 && (
        <>
          <div className="space-y-6">
            {quiz.map((q, index) => (
              <div
                key={index}
                className="border border-gray-700 rounded-lg p-5"
              >
                <h2 className="text-xl font-bold mb-4">
                  Q{index + 1}. {q.question}
                </h2>

                <div className="space-y-3">
                  {q.options.map(
                    (
                      option: string,
                      optionIndex: number
                    ) => (
                      <label
                        key={optionIndex}
                        className="flex items-center gap-3 border border-gray-600 rounded p-3 cursor-pointer hover:bg-gray-800"
                      >
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value={option}
                          checked={
                            selectedAnswers[index] ===
                            option
                          }
                          onChange={() =>
                            setSelectedAnswers({
                              ...selectedAnswers,
                              [index]: option,
                            })
                          }
                        />

                        {option}
                      </label>
                    )
                  )}
                </div>

                {score !== null && (
                  <div className="mt-4">
                    {selectedAnswers[index] ===
                    q.answer ? (
                      <p className="text-green-500 font-semibold">
                        ✅ Correct
                      </p>
                    ) : (
                      <>
                        <p className="text-red-500 font-semibold">
                          ❌ Wrong
                        </p>

                        <p className="mt-2">
                          Correct Answer:{" "}
                          <span className="font-bold text-green-400">
                            {q.answer}
                          </span>
                        </p>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8">
            <button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded"
            >
              Submit Quiz
            </button>
          </div>

          {score !== null && (
            <div className="mt-8 text-3xl font-bold">
              🎯 Score: {score} / {quiz.length}
            </div>
          )}
        </>
      )}
    </div>
  );
}