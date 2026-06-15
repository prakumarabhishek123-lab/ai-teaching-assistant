import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);

export async function generateQuiz(
  topic: string,
  language: string
) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const prompt = `
Generate exactly 5 MCQ questions on "${topic}".

Language: ${language}

Rules:
- If English, use simple English.
- If Hindi, use simple CBSE Hindi.
- If Hinglish, use Hindi written in English script.

Return ONLY valid JSON.

Example:

[
  {
    "question": "What is AI?",
    "options": [
      "Option A",
      "Option B",
      "Option C",
      "Option D"
    ],
    "answer": "Option C"
  }
]

Do not return markdown.
Do not use \`\`\`json.
Return only JSON.
`;

  const result = await model.generateContent(prompt);

  return result.response.text();
}