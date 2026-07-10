import { type Subject } from "@/lib/config/education";
import { generateGroqJson } from "@/lib/server/groq";

type ValidationResult = {
  matches: boolean;
};

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

  const result = await generateGroqJson<Partial<ValidationResult>>({
    system: "You validate whether a school topic belongs to a selected subject for Indian Classes 1–8. Return valid JSON only.",
    prompt: [
      `Selected subject: ${subject}`,
      `Entered topic: ${trimmedTopic}`,
      "Does this topic clearly belong to the selected subject?",
      "Return {\"matches\":true} or {\"matches\":false}.",
      "If the topic is broad but commonly valid for the subject, return true.",
    ].join("\n"),
    maxTokens: 80,
    temperature: 0,
  });
  return result.matches === true;
}
