import { generateGroqJson, groqErrorResponse } from "@/lib/server/groq";

type Board = { topicTitle: string; definition: string; keyPoints: string[]; example: string; importantQuestions: string[] };
const LANGUAGES = ["English", "Hindi", "Hinglish"];

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { topic?: unknown; language?: unknown };
    const topic = typeof body.topic === "string" ? body.topic.trim() : "";
    if (!topic) return Response.json({ error: "Please enter a board topic first." }, { status: 400 });
    if (!LANGUAGES.includes(String(body.language))) return Response.json({ error: "Please choose a valid language." }, { status: 400 });

    const board = await generateGroqJson<Board>({
      system: "You are an accurate Indian school teacher for Classes 1–8. Never invent facts. If a topic is ambiguous, explain only well-established basics. Return valid JSON only.",
      prompt: `Create concise, step-by-step digital board notes about "${topic}" in ${body.language}. Use simple, age-appropriate language suitable across Classes 1–8, avoiding advanced claims. For Hindi use Devanagari; for Hinglish use Roman script. Give exactly 4 ordered key points and exactly 4 review questions. Return {"topicTitle":"...","definition":"...","keyPoints":["..."],"example":"...","importantQuestions":["..."]}.`,
      maxTokens: 1000,
    });
    if (!board.definition || board.keyPoints?.length !== 4 || board.importantQuestions?.length !== 4) throw new Error("Invalid output");
    return Response.json(board);
  } catch (error) {
    return groqErrorResponse(error);
  }
}
