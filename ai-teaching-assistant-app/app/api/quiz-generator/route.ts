import { NextResponse } from "next/server";
import { CLASS_LEVELS, SUBJECTS, type ClassLevel, type Subject } from "@/lib/config/education";
import {
  SUBJECT_TOPIC_MISMATCH_MESSAGE,
  validateSubjectTopic,
} from "@/lib/server/subjectValidation";
import { generateGroqJson, groqErrorResponse } from "@/lib/server/groq";

type QuizLanguage = "English" | "Hindi" | "Hinglish";

type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

type QuizPayload = {
  questions: QuizQuestion[];
};

const LANGUAGES: QuizLanguage[] = ["English", "Hindi", "Hinglish"];

function cleanString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isClassLevel(value: unknown): value is ClassLevel {
  return typeof value === "string" && CLASS_LEVELS.includes(value as ClassLevel);
}

function isSubject(value: unknown): value is Subject {
  return typeof value === "string" && SUBJECTS.includes(value as Subject);
}

function isQuizLanguage(value: unknown): value is QuizLanguage {
  return typeof value === "string" && LANGUAGES.includes(value as QuizLanguage);
}

function normalizeQuiz(raw: Partial<QuizPayload>, topic: string): QuizPayload {
  const questions = Array.isArray(raw.questions)
    ? raw.questions
        .map((item, index) => {
          const question = cleanString((item as Partial<QuizQuestion>).question) || `${topic} question ${index + 1}`;
          const options = Array.isArray((item as Partial<QuizQuestion>).options)
            ? (item as Partial<QuizQuestion>).options
                ?.map((option) => cleanString(option))
                .filter(Boolean)
                .slice(0, 4)
            : [];
          const paddedOptions = [...(options ?? [])];

          while (paddedOptions.length < 4) {
            paddedOptions.push(`${topic} option ${paddedOptions.length + 1}`);
          }

          const rawAnswer = cleanString((item as Partial<QuizQuestion>).correctAnswer);
          const correctAnswer = paddedOptions.includes(rawAnswer) ? rawAnswer : paddedOptions[0];
          const explanation =
            cleanString((item as Partial<QuizQuestion>).explanation) ||
            `${correctAnswer} is correct for this question.`;

          return {
            question,
            options: paddedOptions,
            correctAnswer,
            explanation,
          };
        })
        .slice(0, 10)
    : [];

  return { questions };
}

function buildQuizPrompt(classLevel: ClassLevel, subject: Subject, topic: string, language: QuizLanguage) {
  return [
    `Create a quiz for ${classLevel}.`,
    `Subject: ${subject}.`,
    `Topic: ${topic}.`,
    `Language: ${language}.`,
    "Generate exactly 10 multiple-choice questions.",
    "Each question must have exactly 4 options.",
    "Each correctAnswer must exactly match one of the options.",
    "Each question must include a short explanation of why the correct answer is right.",
    "Keep vocabulary, difficulty, and examples appropriate for the selected class.",
    "For Hindi, write in Devanagari. For Hinglish, write natural Roman-script classroom Hinglish.",
    "Return only valid JSON with this shape: {\"questions\":[{\"question\":\"...\",\"options\":[\"...\",\"...\",\"...\",\"...\"],\"correctAnswer\":\"...\",\"explanation\":\"...\"}]}",
  ].join("\n");
}

export async function POST(request: Request) {
  let body: { classLevel?: unknown; subject?: unknown; topic?: unknown; language?: unknown };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Please send valid quiz details." }, { status: 400 });
  }

  const classLevel = body.classLevel;
  const subject = body.subject;
  const topic = cleanString(body.topic);
  const language = body.language;

  if (!isClassLevel(classLevel)) {
    return NextResponse.json({ error: "Please choose a class from Class 1 to Class 8." }, { status: 400 });
  }

  if (!isSubject(subject)) {
    return NextResponse.json({ error: "Please choose a valid subject." }, { status: 400 });
  }

  if (!topic) {
    return NextResponse.json({ error: "Please enter a quiz topic." }, { status: 400 });
  }

  if (!isQuizLanguage(language)) {
    return NextResponse.json({ error: "Please choose English, Hindi, or Hinglish." }, { status: 400 });
  }

  try {
    const isValidTopic = await validateSubjectTopic({ subject, topic });

    if (!isValidTopic) {
      return NextResponse.json({ error: SUBJECT_TOPIC_MISMATCH_MESSAGE }, { status: 400 });
    }

    const rawQuiz = await generateGroqJson<Partial<QuizPayload>>({
      system: "You are an accurate Indian school teacher creating age-appropriate MCQ quizzes for Classes 1–8. Never invent facts. Return valid JSON only.",
      prompt: buildQuizPrompt(classLevel, subject, topic, language),
      maxTokens: 1900,
      temperature: 0.3,
    });
    const quiz = normalizeQuiz(rawQuiz, topic);

    if (quiz.questions.length !== 10) {
      return NextResponse.json({ error: "AI did not return 10 quiz questions. Please try again." }, { status: 502 });
    }

    return NextResponse.json(quiz);
  } catch (error) {
    console.error("Quiz generator request failed", error);
    return groqErrorResponse(error);
  }
}
