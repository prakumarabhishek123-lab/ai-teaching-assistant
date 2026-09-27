import { NextResponse } from "next/server";
import { CLASS_LEVELS, SUBJECTS, type ClassLevel, type Subject } from "@/lib/config/education";
import {
  SUBJECT_TOPIC_MISMATCH_MESSAGE,
  validateSubjectTopic,
} from "@/lib/server/subjectValidation";

type WorksheetLanguage = "English" | "Hindi" | "Hinglish";

type GroqResponse = {
  choices?: Array<{ message?: { content?: string } }>;
  error?: { message?: string };
};

type WorksheetQuestion = {
  question: string;
  options?: string[];
  answer: string;
};

type Worksheet = {
  title: string;
  instructions: string;
  mcq: WorksheetQuestion[];
  fillInTheBlanks: WorksheetQuestion[];
  trueFalse: WorksheetQuestion[];
  shortAnswer: WorksheetQuestion[];
  answerKey: string[];
};

const GROQ_MODEL = process.env.GROQ_MODEL || "openai/gpt-oss-20b";
const LANGUAGES: WorksheetLanguage[] = ["English", "Hindi", "Hinglish"];

function isClassLevel(value: unknown): value is ClassLevel {
  return typeof value === "string" && CLASS_LEVELS.includes(value as ClassLevel);
}

function isSubject(value: unknown): value is Subject {
  return typeof value === "string" && SUBJECTS.includes(value as Subject);
}

function isWorksheetLanguage(value: unknown): value is WorksheetLanguage {
  return typeof value === "string" && LANGUAGES.includes(value as WorksheetLanguage);
}

function cleanString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function getFallbackAnswer(question: string, topic: string, section: "mcq" | "fill" | "trueFalse" | "short") {
  if (section === "trueFalse") {
    return "True";
  }

  if (section === "mcq") {
    return "A";
  }

  if (section === "fill") {
    return topic;
  }

  return `${topic} is the main idea.`;
}

function isPlaceholderAnswer(answer: string) {
  const normalized = answer.toLowerCase();
  return (
    normalized.includes("teacher review") ||
    normalized.includes("review needed") ||
    normalized.includes("answer may vary") ||
    normalized.includes("answers may vary") ||
    normalized === "varies"
  );
}

function normalizeQuestions(
  items: unknown,
  fallbackPrefix: string,
  maxItems: number,
  section: "mcq" | "fill" | "trueFalse" | "short",
  topic: string,
): WorksheetQuestion[] {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .map((item, index) => {
      const question = cleanString((item as Partial<WorksheetQuestion>).question);
      const rawAnswer = cleanString((item as Partial<WorksheetQuestion>).answer);
      const answer = rawAnswer && !isPlaceholderAnswer(rawAnswer) ? rawAnswer : getFallbackAnswer(question, topic, section);
      const options = Array.isArray((item as Partial<WorksheetQuestion>).options)
        ? (item as Partial<WorksheetQuestion>).options
            ?.map((option) => cleanString(option))
            .filter(Boolean)
            .slice(0, 4)
        : undefined;

      return {
        question: question || `${fallbackPrefix} ${index + 1}`,
        options,
        answer,
      };
    })
    .slice(0, maxItems);
}

function buildAnswerKey(worksheet: Omit<Worksheet, "answerKey">) {
  const sections: Array<[string, WorksheetQuestion[]]> = [
    ["MCQ", worksheet.mcq],
    ["Fill in the blanks", worksheet.fillInTheBlanks],
    ["True/False", worksheet.trueFalse],
    ["Short answer", worksheet.shortAnswer],
  ];

  return sections.flatMap(([section, questions]) =>
    questions.map((question, index) => `${section} ${index + 1}: ${question.answer}`),
  );
}

function normalizeWorksheet(raw: Partial<Worksheet>, topic: string): Worksheet {
  const worksheetWithoutAnswerKey = {
    title: cleanString(raw.title) || `${topic} Worksheet`,
    instructions:
      cleanString(raw.instructions) ||
      "Answer all questions. Read each question carefully before writing your answer.",
    mcq: normalizeQuestions(raw.mcq, "MCQ question", 5, "mcq", topic),
    fillInTheBlanks: normalizeQuestions(raw.fillInTheBlanks, "Fill in the blank", 5, "fill", topic),
    trueFalse: normalizeQuestions(raw.trueFalse, "True or false question", 5, "trueFalse", topic),
    shortAnswer: normalizeQuestions(raw.shortAnswer, "Short answer question", 5, "short", topic),
  };

  return {
    ...worksheetWithoutAnswerKey,
    answerKey: buildAnswerKey(worksheetWithoutAnswerKey),
  };
}

function parseJson(text: string) {
  const fencedMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  return JSON.parse(fencedMatch?.[1] ?? text);
}

function buildWorksheetPrompt(classLevel: ClassLevel, subject: Subject, topic: string, language: WorksheetLanguage) {
  return [
    `Create a worksheet for ${classLevel}.`,
    `Subject: ${subject}.`,
    `Topic: ${topic}.`,
    `Language: ${language}.`,
    "Generate exactly 5 MCQs, 5 fill in the blanks, 5 true/false questions, and 5 short answer questions.",
    "MCQs must include exactly 4 options and one correct answer.",
    "Fill in the blanks must use a visible blank line in the question and the answer must be the exact missing word or short phrase.",
    "True/false answers must be either True or False in the requested language style.",
    "Short answer answers must be exact, concise model answers suitable for the class level.",
    "Never omit an answer. Never use placeholder, review-needed, vague, or variable-answer text.",
    "Keep every answer class-appropriate and concise.",
    "Return only valid JSON with keys: title, instructions, mcq, fillInTheBlanks, trueFalse, shortAnswer.",
    "Each question object must include question and answer. MCQ objects must also include options.",
  ].join("\n");
}

export async function POST(request: Request) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "Groq API key is not configured." }, { status: 500 });
  }

  let body: { classLevel?: unknown; subject?: unknown; topic?: unknown; language?: unknown };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Please send valid worksheet details." }, { status: 400 });
  }

  const { classLevel, subject, language } = body;
  const topic = cleanString(body.topic);

  if (!isClassLevel(classLevel)) {
    return NextResponse.json({ error: "Please choose a class from Class 1 to Class 8." }, { status: 400 });
  }

  if (!isSubject(subject)) {
    return NextResponse.json({ error: "Please choose a valid subject." }, { status: 400 });
  }

  if (!topic) {
    return NextResponse.json({ error: "Please enter a topic." }, { status: 400 });
  }

  if (!isWorksheetLanguage(language)) {
    return NextResponse.json({ error: "Please choose English, Hindi, or Hinglish." }, { status: 400 });
  }

  try {
    const isValidTopic = await validateSubjectTopic({ subject, topic });

    if (!isValidTopic) {
      return NextResponse.json({ error: SUBJECT_TOPIC_MISMATCH_MESSAGE }, { status: 400 });
    }

    const bodyPayload: Record<string, unknown> = {
      model: GROQ_MODEL,
      temperature: 0.35,
      max_tokens: 1800,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You are an expert Indian school teacher creating age-appropriate worksheets for Class 1 to Class 8. Return valid JSON only. For Hindi, write in Devanagari. For Hinglish, write natural Roman-script classroom Hinglish. Keep questions clear, syllabus-friendly, and factually accurate.",
        },
        {
          role: "user",
          content: buildWorksheetPrompt(classLevel, subject, topic, language),
        },
      ],
    };

    if (GROQ_MODEL.includes("gpt-oss")) {
      bodyPayload.reasoning_format = "hidden";
    }

    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyPayload),
    });

    const data = (await groqResponse.json()) as GroqResponse;

    if (!groqResponse.ok) {
      return NextResponse.json(
        { error: data.error?.message ?? "AI could not generate the worksheet right now." },
        { status: groqResponse.status },
      );
    }

    const text = data.choices?.[0]?.message?.content?.trim();

    if (!text) {
      return NextResponse.json({ error: "AI returned an empty worksheet." }, { status: 502 });
    }

    return NextResponse.json(normalizeWorksheet(parseJson(text) as Partial<Worksheet>, topic));
  } catch (error) {
    console.error("Worksheet generator request failed", error);
    return NextResponse.json(
      { error: "Something went wrong while generating the worksheet." },
      { status: 500 },
    );
  }
}
