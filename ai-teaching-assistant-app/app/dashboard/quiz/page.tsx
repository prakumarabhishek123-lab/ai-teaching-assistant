"use client";

import { useState } from "react";

export default function QuizPage() {
  const [topic, setTopic] = useState("");
  const [quiz, setQuiz] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic) return;

    setLoading(true);

    try {
      const response = await fetch("/api/generate-quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic }),
      });

      const data = await response.json();

      setQuiz(data.quiz);
    } catch (error) {
      console.error(error);
      alert("Failed to generate quiz");
    }

    setLoading(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6">
        Quiz Generator
      </h1>

      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Enter Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="border border-gray-500 bg-gray-800 text-white p-3 rounded w-80"
        />

        <button
          onClick={handleGenerate}
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          {loading ? "Generating..." : "Generate Quiz"}
        </button>
      </div>

      {quiz && (
        <div className="mt-8 whitespace-pre-wrap border p-4 rounded">
          {quiz}
        </div>
      )}
    </div>
  );
}