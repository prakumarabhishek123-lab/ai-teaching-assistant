import "server-only";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
export const GROQ_MODEL = process.env.GROQ_MODEL || "openai/gpt-oss-20b";

const CANDIDATE_MODELS = [
  GROQ_MODEL,
  "openai/gpt-oss-20b",
  "openai/gpt-oss-120b",
  "llama-3.3-70b-versatile",
].filter((m, i, arr) => Boolean(m) && arr.indexOf(m) === i);

type GroqResponse = {
  choices?: Array<{ message?: { content?: string } }>;
  error?: { message?: string };
};

export class GroqError extends Error {
  constructor(message: string, public readonly status = 502) {
    super(message);
    this.name = "GroqError";
  }
}

export async function generateGroqJson<T>({
  system,
  prompt,
  maxTokens = 1200,
  temperature = 0.3,
}: {
  system: string;
  prompt: string;
  maxTokens?: number;
  temperature?: number;
}): Promise<T> {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new GroqError("AI is not configured yet. Please ask the administrator to add GROQ_API_KEY.", 503);
  }

  let lastError: GroqError | null = null;

  for (const model of CANDIDATE_MODELS) {
    try {
      const bodyPayload: Record<string, unknown> = {
        model,
        temperature,
        max_tokens: maxTokens,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: system },
          { role: "user", content: prompt },
        ],
      };

      if (model.includes("gpt-oss")) {
        bodyPayload.reasoning_format = "hidden";
      }

      const response = await fetch(GROQ_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyPayload),
        signal: AbortSignal.timeout(30000),
      });

      const data = (await response.json().catch(() => ({}))) as GroqResponse;
      if (!response.ok) {
        const errorMsg = data.error?.message || "";
        const isModelMissing =
          response.status === 404 ||
          errorMsg.toLowerCase().includes("does not exist") ||
          errorMsg.toLowerCase().includes("do not have access");

        if (isModelMissing && model !== CANDIDATE_MODELS[CANDIDATE_MODELS.length - 1]) {
          console.warn(`Groq model '${model}' unavailable, trying fallback...`);
          continue;
        }

        throw new GroqError(
          response.status === 429
            ? "AI is busy right now. Please wait a moment and try again."
            : errorMsg || "AI could not create the content right now. Please try again.",
          response.status,
        );
      }

      const content = data.choices?.[0]?.message?.content?.trim();
      if (!content) throw new GroqError("AI returned an empty response. Please try again.");

      const fenced = content.match(/```(?:json)?\s*([\s\S]*?)```/i)?.[1] ?? content;
      try {
        return JSON.parse(fenced) as T;
      } catch {
        throw new GroqError("AI returned an incomplete response. Please try again.");
      }
    } catch (err: unknown) {
      if (err instanceof GroqError && err.status === 429) {
        throw err;
      }
      lastError = err instanceof GroqError ? err : new GroqError(err instanceof Error ? err.message : "AI request failed");
    }
  }

  throw lastError || new GroqError("All Groq models failed. Please try again.");
}

export function groqErrorResponse(error: unknown) {
  const groqError = error instanceof GroqError ? error : new GroqError("Something went wrong. Please try again.", 500);
  return Response.json({ error: groqError.message }, { status: groqError.status });
}
