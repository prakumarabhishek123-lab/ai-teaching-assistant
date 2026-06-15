import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {
      topic,
      language = "Hinglish",
      classLevel = "General",
    } = await req.json();

    if (!topic) {
      return NextResponse.json(
        { error: "Topic is required" },
        { status: 400 }
      );
    }

    const geminiKey = process.env.GEMINI_API_KEY;

    if (!geminiKey) {
      return NextResponse.json(
        { error: "Gemini API key not found" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(geminiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-lite",
    });

    const prompt = `
You are an AI Teaching Assistant.

Explain the topic in ${language}.
Topic: ${topic}
Class Level: ${classLevel}

Rules:
- Keep explanation short and mobile friendly.
- Use simple classroom language.
- Explanation must be easy for voice speaking.
- Do not make long paragraphs.
- Give maximum 5 key points.
- Worksheet questions should be exam-focused for this class level.
- Keep answers short.

Return ONLY valid JSON. No markdown. No extra text.

JSON format:
{
  "title": "",
  "explanation": "",
  "keyPoints": [],
  "example": "",
  "worksheet": {
    "mcqs": [
      {
        "question": "",
        "options": ["", "", "", ""],
        "answer": ""
      }
    ],
    "oneMark": [
      {
        "question": "",
        "answer": ""
      }
    ],
    "twoMark": [
      {
        "question": "",
        "answer": ""
      }
    ],
    "shortAnswer": [
      {
        "question": "",
        "answer": ""
      }
    ]
  },
  "voiceText": ""
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
        worksheet: {
          mcqs: [],
          oneMark: [],
          twoMark: [],
          shortAnswer: [],
        },
        voiceText: cleanedText,
      };
    }

    return NextResponse.json({
      success: true,
      response: parsedResponse,
    });
  } catch (error: any) {
    console.error("FULL ERROR:", error);

    const message =
      error?.message?.includes("429")
        ? "Gemini quota exceeded. Please use another API key or try later."
        : error?.message?.includes("503")
          ? "Gemini server is busy. Please try again in 1-2 minutes."
          : error?.message || "Failed to generate content";

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}