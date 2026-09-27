import { NextResponse } from "next/server";
import { CLASS_LEVELS, SUBJECTS, type Subject } from "@/lib/config/education";
import {
  SUBJECT_TOPIC_MISMATCH_MESSAGE,
  validateSubjectTopic,
} from "@/lib/server/subjectValidation";

type SolverLanguage = "English" | "Hindi" | "Hinglish";

type GeminiResponse = {
  candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  error?: { message?: string };
};

type GroqResponse = {
  choices?: Array<{ message?: { content?: string } }>;
  error?: { message?: string };
};

type DoubtSolution = {
  answer: string;
  steps: string[];
  example: string;
  finalAnswer: string;
};

const GEMINI_MODEL = "gemini-2.0-flash";
const GROQ_MODEL = process.env.GROQ_MODEL || "openai/gpt-oss-20b";
const LANGUAGES: SolverLanguage[] = ["English", "Hindi", "Hinglish"];
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

function isSolverLanguage(value: unknown): value is SolverLanguage {
  return typeof value === "string" && LANGUAGES.includes(value as SolverLanguage);
}

function isSubject(value: unknown): value is Subject {
  return typeof value === "string" && SUBJECTS.includes(value as Subject);
}

function normalizeSolution(raw: Partial<DoubtSolution>): DoubtSolution {
  return {
    answer: typeof raw.answer === "string" ? raw.answer.trim() : "Let's understand this together.",
    steps: Array.isArray(raw.steps)
      ? raw.steps.filter((step) => typeof step === "string" && step.trim()).slice(0, 8)
      : [],
    example: typeof raw.example === "string" ? raw.example.trim() : "",
    finalAnswer: typeof raw.finalAnswer === "string" ? raw.finalAnswer.trim() : "",
  };
}

function parseJson(text: string) {
  const fencedMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  return JSON.parse(fencedMatch?.[1] ?? text);
}

function buildTutorPrompt(classLevel: string, language: SolverLanguage, question: string) {
  return [
    `Student class: ${classLevel}.`,
    `Answer language: ${language}.`,
    `Student question: ${question}`,
    "First identify what the question is asking. Explain the reasoning in small, numbered steps rather than giving only the result.",
    "For mathematics, show every calculation step and briefly explain why it is done.",
    "For science, explain the idea with a familiar real-life example.",
    "Return only valid JSON with keys: answer, steps, example, finalAnswer.",
  ].join("\n");
}

function buildImageParts(classLevel: string, language: SolverLanguage, question: string, image: string, imageType: string) {
  const parts: Array<{ text?: string; inline_data?: { mime_type: string; data: string } }> = [
    {
      text: [
        `Student class: ${classLevel}.`,
        `Answer language: ${language}.`,
        question ? `Student question: ${question}` : "Read the question from the uploaded image and solve it.",
        "First identify what the question is asking. Explain the reasoning in small, numbered steps rather than giving only the result.",
        "For mathematics, show every calculation step and briefly explain why it is done.",
        "For science, explain the idea with a familiar real-life example.",
        "If the image is unclear or the question is incomplete, say exactly what the student should upload or clarify. Never invent missing text.",
      ].join("\n"),
    },
  ];

  parts.push({ inline_data: { mime_type: imageType, data: image } });
  return parts;
}

async function solveTextDoubt(classLevel: string, language: SolverLanguage, question: string) {
  const groqApiKey = process.env.GROQ_API_KEY;

  if (!groqApiKey) {
    return NextResponse.json({ error: "Groq API key is not configured." }, { status: 500 });
  }

  try {
    const bodyPayload: Record<string, unknown> = {
      model: GROQ_MODEL,
      temperature: 0.25,
      max_tokens: 900,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You are a patient tutor for Indian school children in Class 1 to Class 8. Match vocabulary, detail, and difficulty to the supplied class. Respond only in the requested language: English, Hindi in Devanagari, or natural Hinglish in Roman script. Be warm, accurate, concise, and child-friendly. Return valid JSON only.",
        },
        {
          role: "user",
          content: buildTutorPrompt(classLevel, language, question),
        },
      ],
    };

    if (GROQ_MODEL.includes("gpt-oss")) {
      bodyPayload.reasoning_format = "hidden";
    }

    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${groqApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyPayload),
    });

    const data = (await groqResponse.json()) as GroqResponse;

    if (!groqResponse.ok) {
      console.error("Groq Doubt Solver API error", {
        status: groqResponse.status,
        message: data.error?.message ?? "Unknown Groq error",
      });

      if (groqResponse.status === 429) {
        return NextResponse.json(
          { error: "AI abhi busy hai. Please thodi der baad try karein." },
          { status: 429 },
        );
      }

      return NextResponse.json(
        { error: "AI abhi answer nahi de pa raha hai. Please thodi der baad try karein." },
        { status: groqResponse.status },
      );
    }

    const text = data.choices?.[0]?.message?.content?.trim();
    if (!text) {
      return NextResponse.json({ error: "The AI tutor returned an empty answer." }, { status: 502 });
    }

    return NextResponse.json(normalizeSolution(parseJson(text) as Partial<DoubtSolution>));
  } catch (error) {
    console.error("Groq Doubt Solver request failed", error);
    return NextResponse.json({ error: "Something went wrong while solving this doubt." }, { status: 500 });
  }
}

async function solveImageDoubt(classLevel: string, language: SolverLanguage, question: string, image: string, imageType: string) {
  const geminiApiKey = process.env.GEMINI_API_KEY;

  if (!geminiApiKey) {
    return NextResponse.json({ error: "Gemini API key is not configured for image questions." }, { status: 500 });
  }

  try {
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${geminiApiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: buildImageParts(classLevel, language, question, image, imageType) }],
          generationConfig: {
            temperature: 0.25,
            maxOutputTokens: 900,
            responseMimeType: "application/json",
            responseSchema: {
              type: "OBJECT",
              properties: {
                answer: { type: "STRING" },
                steps: { type: "ARRAY", items: { type: "STRING" } },
                example: { type: "STRING" },
                finalAnswer: { type: "STRING" },
              },
              required: ["answer", "steps", "example", "finalAnswer"],
            },
          },
          systemInstruction: {
            parts: [
              {
                text: "You are a patient tutor for Indian school children in Class 1 to Class 8. Match vocabulary, detail, and difficulty to the supplied class. Respond only in the requested language: English, Hindi in Devanagari, or natural Hinglish in Roman script. Be warm, accurate, concise, and child-friendly. Return valid JSON only.",
              },
            ],
          },
        }),
      },
    );

    const data = (await geminiResponse.json()) as GeminiResponse;

    if (!geminiResponse.ok) {
      console.error("Gemini Doubt Solver image API error", {
        status: geminiResponse.status,
        message: data.error?.message ?? "Unknown Gemini error",
      });

      if (geminiResponse.status === 429) {
        return NextResponse.json(
          { error: "AI abhi busy hai. Please thodi der baad try karein." },
          { status: 429 },
        );
      }

      return NextResponse.json(
        { error: "AI abhi answer nahi de pa raha hai. Please thodi der baad try karein." },
        { status: geminiResponse.status },
      );
    }

    const text = data.candidates?.[0]?.content?.parts?.map((part) => part.text ?? "").join("").trim();
    if (!text) {
      return NextResponse.json({ error: "The AI tutor returned an empty answer." }, { status: 502 });
    }

    return NextResponse.json(normalizeSolution(parseJson(text) as Partial<DoubtSolution>));
  } catch (error) {
    console.error("Doubt Solver image request failed", error);
    return NextResponse.json({ error: "Something went wrong while solving this doubt." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  let body: { question?: unknown; classLevel?: unknown; subject?: unknown; language?: unknown; image?: unknown; imageType?: unknown };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Please send a valid doubt." }, { status: 400 });
  }

  const question = typeof body.question === "string" ? body.question.trim() : "";
  const classLevel = typeof body.classLevel === "string" ? body.classLevel : "";
  const subject = body.subject;
  const language = body.language;
  const image = typeof body.image === "string" ? body.image : "";
  const imageType = typeof body.imageType === "string" ? body.imageType : "";

  if (!question && !image) {
    return NextResponse.json({ error: "Type a question or upload an image." }, { status: 400 });
  }

  if (!CLASS_LEVELS.includes(classLevel as (typeof CLASS_LEVELS)[number])) {
    return NextResponse.json({ error: "Please choose a class from Class 1 to Class 8." }, { status: 400 });
  }

  if (!isSolverLanguage(language)) {
    return NextResponse.json({ error: "Please choose English, Hindi, or Hinglish." }, { status: 400 });
  }

  if (!isSubject(subject)) {
    return NextResponse.json({ error: "Please choose a valid subject." }, { status: 400 });
  }

  if (question) {
    try {
      const isValidTopic = await validateSubjectTopic({ subject, topic: question });

      if (!isValidTopic) {
        return NextResponse.json({ error: SUBJECT_TOPIC_MISMATCH_MESSAGE }, { status: 400 });
      }
    } catch (error) {
      console.error("Doubt Solver topic validation failed", error);
      return NextResponse.json({ error: "Something went wrong while validating this topic." }, { status: 500 });
    }
  }

  if (!image) {
    return solveTextDoubt(classLevel, language, question);
  }

  if (!ALLOWED_IMAGE_TYPES.includes(imageType)) {
    return NextResponse.json({ error: "Upload a JPG, PNG, or WebP image." }, { status: 400 });
  }

  const estimatedBytes = Math.floor((image.length * 3) / 4);
  if (estimatedBytes > MAX_IMAGE_BYTES) {
    return NextResponse.json({ error: "The image must be smaller than 5 MB." }, { status: 413 });
  }

  return solveImageDoubt(classLevel, language, question, image, imageType);
}
