import { generateGroqJson, groqErrorResponse } from "@/lib/server/groq";

type Concept = { explanation: string; keyPoints: string[]; example: string; worksheet: string[] };
const LANGUAGES = ["English", "Hindi", "Hinglish"];

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { topic?: unknown; language?: unknown };
    const topic = typeof body.topic === "string" ? body.topic.trim() : "";
    if (!topic) return Response.json({ error: "Please enter a topic to simplify." }, { status: 400 });
    if (!LANGUAGES.includes(String(body.language))) return Response.json({ error: "Please choose a valid language." }, { status: 400 });

    const concept = await generateGroqJson<Concept>({
      system: "You are an accurate Indian school teacher for Classes 1–8. Never invent facts. Explain only established information, say when a topic is ambiguous, and return valid JSON only.",
      prompt: `Explain "${topic}" in ${body.language} using simple, warm, age-appropriate classroom language. For Hindi use Devanagari; for Hinglish use natural Roman script. Provide exactly 3 key points, one familiar real-life example, and exactly 3 short worksheet questions. Return {"explanation":"...","keyPoints":["..."],"example":"...","worksheet":["..."]}.`,
      maxTokens: 900,
      temperature: 0.25,
    });
    if (!concept.explanation || concept.keyPoints?.length !== 3 || concept.worksheet?.length !== 3) throw new Error("Invalid output");
    return Response.json(concept);
  } catch (error) {
    return groqErrorResponse(error);
  }
}
