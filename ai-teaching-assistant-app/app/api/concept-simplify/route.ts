import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();

    if (!topic) {
      return NextResponse.json(
        {
          error: "Topic is required",
        },
        {
          status: 400,
        }
      );
    }

    const geminiKey = process.env.GEMINI_API_KEY;

    if (!geminiKey) {
      return NextResponse.json(
        {
          error: "Gemini API key not found",
        },
        {
          status: 500,
        }
      );
    }

    const genAI = new GoogleGenerativeAI(geminiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are an AI Teaching Assistant.

Explain "${topic}" for school students.

Rules:
- Use simple Hinglish.
- Suitable for Classes 1-8.
- Keep explanation short (80-120 words).
- Highlight important words using **bold** format.
- Give exactly 3 key points.
- Give one classroom example.
- Create a voice-friendly script.
- voiceText must include:
  1. Explanation
  2. All 3 key points
  3. Classroom example
- It should sound like a teacher speaking in class.


Return ONLY JSON:

{
  "title":"",
  "explanation":"",
  "keyPoints":[],
  "example":"",
  "voiceText":"",
  "voiceText":"Combine explanation + key points + classroom example in a natural speaking format"
  
}
`;

    const result = await model.generateContent(prompt);

    const response = await result.response;
    const text = response.text();

    const cleanedText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsedResponse;

    try {
      parsedResponse = JSON.parse(cleanedText);
    } catch {
      parsedResponse = {
        title: topic,
        explanation: cleanedText,
        keyPoints: [],
        example: "",
        voiceText: cleanedText,
      };
    }


    return NextResponse.json({
  success: true,
  response: parsedResponse,
});
} catch (error: any) {
  console.error("FULL ERROR:", error);

  return NextResponse.json(
    {
      error: error?.message || "Failed to generate content",
    },
    {
      status: 500,
    }
  );
}
}