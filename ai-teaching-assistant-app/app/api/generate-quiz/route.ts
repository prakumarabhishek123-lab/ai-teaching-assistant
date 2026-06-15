import { NextResponse } from "next/server";
import { generateQuiz } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const { topic, language } = await req.json();

    const quizText = await generateQuiz(
      topic,
      language
    );

    const quiz = JSON.parse(quizText);

    return NextResponse.json({ quiz });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to generate quiz",
      },
      {
        status: 500,
      }
    );
  }
}