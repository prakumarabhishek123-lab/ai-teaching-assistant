import { generateGroqJson, groqErrorResponse } from "@/lib/server/groq";

const DIRECTIONS = ["English → Hindi", "Hindi → English", "Hindi → Hinglish"] as const;
type Direction = (typeof DIRECTIONS)[number];
type Result = { translatedText: string; dictationSentence: string };

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { text?: unknown; direction?: unknown };
    const text = typeof body.text === "string" ? body.text.trim() : "";
    if (!text) return Response.json({ error: "Please enter text to translate." }, { status: 400 });
    if (!DIRECTIONS.includes(body.direction as Direction)) {
      return Response.json({ error: "Please choose a valid language direction." }, { status: 400 });
    }

    const result = await generateGroqJson<Result>({
      system: "You are a careful Indian school language teacher for Classes 1–8. Translate faithfully without adding facts. Return valid JSON only.",
      prompt: `Translate the text using ${body.direction}. Preserve its meaning and tone. Also create one short, age-appropriate dictation sentence in the target language about the same topic, containing no unsupported factual claim. For Hinglish use natural Roman script. Return {"translatedText":"...","dictationSentence":"..."}. Text: ${text}`,
      maxTokens: 600,
      temperature: 0.15,
    });
    if (!result.translatedText?.trim() || !result.dictationSentence?.trim()) throw new Error("Invalid output");
    return Response.json(result);
  } catch (error) {
    return groqErrorResponse(error);
  }
}
