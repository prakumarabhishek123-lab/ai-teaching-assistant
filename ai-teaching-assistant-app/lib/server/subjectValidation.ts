import { type Subject } from "@/lib/config/education";

type GroqResponse = {
  choices?: Array<{ message?: { content?: string } }>;
  error?: { message?: string };
};

type ValidationResult = {
  matches: boolean;
};

const GROQ_MODEL = "llama-3.1-8b-instant";
export const SUBJECT_TOPIC_MISMATCH_MESSAGE =
  "This topic does not match the selected subject. Please choose the correct subject or enter a relevant topic.";

const subjectKeywords: Record<Subject, string[]> = {
  English: [
    "adjective",
    "adverb",
    "alphabet",
    "article",
    "comprehension",
    "essay",
    "grammar",
    "noun",
    "poem",
    "pronoun",
    "sentence",
    "story",
    "tense",
    "verb",
    "vocabulary",
  ],
  Hindi: [
    "akshar",
    "anuched",
    "hindi",
    "kavita",
    "matra",
    "sangya",
    "sarvanam",
    "vakya",
    "varnamala",
    "visheshan",
    "vyakaran",
    "अक्षर",
    "अनुच्छेद",
    "कविता",
    "मात्रा",
    "वाक्य",
    "व्याकरण",
  ],
  Mathematics: [
    "addition",
    "algebra",
    "angle",
    "area",
    "decimal",
    "division",
    "equation",
    "fraction",
    "geometry",
    "multiplication",
    "number",
    "percentage",
    "perimeter",
    "ratio",
    "subtraction",
  ],
  "Environmental Studies": [
    "animal",
    "community",
    "environment",
    "family",
    "food",
    "health",
    "home",
    "neighbourhood",
    "plant",
    "pollution",
    "safety",
    "season",
    "shelter",
    "transport",
    "water",
  ],
  Science: [
    "atom",
    "body",
    "cell",
    "chemical",
    "digestion",
    "electricity",
    "energy",
    "evaporation",
    "force",
    "gravity",
    "light",
    "magnet",
    "matter",
    "plant",
    "photosynthesis",
    "respiration",
    "science",
    "sound",
    "water",
    "water cycle",
  ],
  "Social Science": [
    "civics",
    "constitution",
    "democracy",
    "earthquake",
    "geography",
    "government",
    "history",
    "map",
    "monsoon",
    "parliament",
    "river",
    "society",
    "state",
    "war",
  ],
  "Computer Studies": [
    "algorithm",
    "computer",
    "cpu",
    "data",
    "email",
    "hardware",
    "internet",
    "keyboard",
    "mouse",
    "programming",
    "software",
    "spreadsheet",
    "typing",
  ],
};

function normalizeText(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9\u0900-\u097f]+/g, " ").trim();
}

function getKeywordSubjects(topic: string) {
  const normalizedTopic = normalizeText(topic);

  return Object.entries(subjectKeywords)
    .filter(([, keywords]) =>
      keywords.some((keyword) => {
        const normalizedKeyword = normalizeText(keyword);
        return new RegExp(`(^|\\s)${normalizedKeyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(\\s|$)`).test(
          normalizedTopic,
        );
      }),
    )
    .map(([subject]) => subject as Subject);
}

function hasSimpleKeywordMismatch(topic: string, subject: Subject) {
  const matchingSubjects = getKeywordSubjects(topic);
  return matchingSubjects.length > 0 && !matchingSubjects.includes(subject);
}

function parseJson(text: string) {
  const fencedMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  return JSON.parse(fencedMatch?.[1] ?? text);
}

export async function validateSubjectTopic({
  subject,
  topic,
}: {
  subject: Subject;
  topic: string;
}) {
  const trimmedTopic = topic.trim();

  if (!trimmedTopic) {
    return true;
  }

  if (hasSimpleKeywordMismatch(trimmedTopic, subject)) {
    return false;
  }

  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error("Groq API key is not configured.");
  }

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      temperature: 0,
      max_tokens: 80,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You validate whether a school topic belongs to a selected subject for Indian Class 1 to Class 8 content. Return only JSON.",
        },
        {
          role: "user",
          content: [
            `Selected subject: ${subject}`,
            `Entered topic: ${trimmedTopic}`,
            "Does this topic clearly belong to the selected subject?",
            "Return JSON exactly like {\"matches\":true} or {\"matches\":false}.",
            "If the topic is broad but commonly valid for the subject, return true.",
          ].join("\n"),
        },
      ],
    }),
  });

  const data = (await response.json()) as GroqResponse;

  if (!response.ok) {
    throw new Error(data.error?.message ?? "Unable to validate the topic.");
  }

  const text = data.choices?.[0]?.message?.content?.trim();

  if (!text) {
    throw new Error("Topic validation returned an empty response.");
  }

  const result = parseJson(text) as Partial<ValidationResult>;
  return result.matches === true;
}
