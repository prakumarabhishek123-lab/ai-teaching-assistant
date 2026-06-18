import { NextResponse } from "next/server";

type GeminiPart = {
  text?: string;
};

type GeminiResponse = {
  candidates?: Array<{
    content?: {
      parts?: GeminiPart[];
    };
  }>;
  error?: {
    message?: string;
  };
};

type SimplifiedConcept = {
  explanation: string;
  keyPoints: string[];
  example: string;
};

const GEMINI_MODEL = "gemini-2.0-flash";
const MAX_WORDS = 150;

function countWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function trimToWords(text: string, maxWords: number) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  return words.length > maxWords ? `${words.slice(0, maxWords).join(" ")}...` : text.trim();
}

function normalizeConcept(raw: Partial<SimplifiedConcept>): SimplifiedConcept {
  const keyPoints = Array.isArray(raw.keyPoints)
    ? raw.keyPoints.filter((point) => typeof point === "string" && point.trim()).slice(0, 3)
    : [];

  while (keyPoints.length < 3) {
    keyPoints.push("Connect the idea to what students already know.");
  }

  const concept = {
    explanation:
      typeof raw.explanation === "string" && raw.explanation.trim()
        ? raw.explanation.trim()
        : "This topic can be understood by breaking it into small, familiar steps.",
    keyPoints,
    example:
      typeof raw.example === "string" && raw.example.trim()
        ? raw.example.trim()
        : "For example, compare it with a simple classroom or home activity students see every day.",
  };

  let remainingWords = MAX_WORDS;
  concept.explanation = trimToWords(concept.explanation, Math.max(35, Math.min(80, remainingWords)));
  remainingWords -= countWords(concept.explanation);

  concept.keyPoints = concept.keyPoints.map((point) => {
    const trimmed = trimToWords(point, Math.max(8, Math.floor(remainingWords / 4)));
    remainingWords -= countWords(trimmed);
    return trimmed;
  });

  concept.example = trimToWords(concept.example, Math.max(12, remainingWords));

  return concept;
}

function extractText(response: GeminiResponse) {
  return response.candidates?.[0]?.content?.parts?.map((part) => part.text ?? "").join("").trim() ?? "";
}

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "Gemini API key is not configured." }, { status: 500 });
  }

  let topic = "";

  try {
    const body = (await request.json()) as { topic?: unknown };
    topic = typeof body.topic === "string" ? body.topic.trim() : "";
  } catch {
    return NextResponse.json({ error: "Please send a valid topic." }, { status: 400 });
  }

  if (!topic) {
    return NextResponse.json({ error: "Please enter a topic to simplify." }, { status: 400 });
  }

  try {
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Simplify this classroom topic for a teacher: ${topic}`,
                },
              ],
            },
          ],
          generationConfig: {
            maxOutputTokens: 220,
            temperature: 0.4,
            responseMimeType: "application/json",
            responseSchema: {
              type: "OBJECT",
              properties: {
                explanation: {
                  type: "STRING",
                },
                keyPoints: {
                  type: "ARRAY",
                  items: {
                    type: "STRING",
                  },
                },
                example: {
                  type: "STRING",
                },
              },
              required: ["explanation", "keyPoints", "example"],
            },
          },
          systemInstruction: {
            parts: [
              {
                text:
                  "You help school teachers explain concepts simply. Return only JSON. Keep the total response under 150 words. Use warm, classroom-friendly language. Include exactly 3 short key points and 1 real-life example.",
              },
            ],
          },
        }),
      },
    );

    const data = (await geminiResponse.json()) as GeminiResponse;

    if (!geminiResponse.ok) {
      return NextResponse.json(
        { error: data.error?.message ?? "Gemini could not simplify this topic." },
        { status: geminiResponse.status },
      );
    }

    const text = extractText(data);

    if (!text) {
      return NextResponse.json({ error: "Gemini returned an empty response." }, { status: 502 });
    }

    const concept = normalizeConcept(JSON.parse(text) as Partial<SimplifiedConcept>);

    return NextResponse.json(concept);
  } catch {
    return NextResponse.json(
      { error: "Something went wrong while simplifying the concept." },
      { status: 500 },
    );
  }
}
