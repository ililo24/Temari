// Supabase Edge Function: ai-study
//
// Powers the AI Study Assistant. The React app never holds the AI key:
// it calls this function, which verifies the caller is a signed-in Supabase
// user, calls OpenRouter's chat completions API, and returns structured JSON.
//
// Deploy steps:
//   supabase secrets set OPENROUTER_API_KEY=... OPENROUTER_MODEL=...
//   supabase functions deploy ai-study
// (SUPABASE_URL and SUPABASE_ANON_KEY are provided automatically by Supabase.)

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Mode = "quiz" | "diagnose" | "plan";
type Difficulty = "easy" | "medium" | "hard";
type Grade = "11" | "12";

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: Difficulty;
}

interface QuizResult {
  questions: QuizQuestion[];
}

interface Misconception {
  concept: string;
  why: string;
  fix: string;
}

interface DiagnoseResult {
  summary: string;
  misconceptions: Misconception[];
  nextSteps: string[];
}

interface PlanDay {
  day: number;
  focus: string;
  tasks: string[];
  minutes: number;
}

interface PlanResult {
  days: PlanDay[];
}

type AiResult = QuizResult | DiagnoseResult | PlanResult;

interface AiStudyRequest {
  mode: Mode;
  subject: string;
  topic: string;
  grade: Grade;
  prompt: string;
  questionCount: number;
  difficulty: Difficulty;
  daysAvailable: number;
}

interface OpenRouterChatResponse {
  choices?: Array<{ message?: { content?: unknown } }>;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

const BASE_SYSTEM_PROMPT =
  "You are a tutor for Ethiopian Grade 11/12 students preparing for the national university entrance exam. " +
  "Align all content with the Ethiopian national curriculum. " +
  "Answer in clear English. " +
  "Respond with JSON only.";

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------

function jsonResponse(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function isDifficulty(value: unknown): value is Difficulty {
  return value === "easy" || value === "medium" || value === "hard";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item: unknown) => typeof item === "string");
}

// ---------------------------------------------------------------------------
// Request validation
// ---------------------------------------------------------------------------

// Validates the request body. Returns a typed request, or an error message.
function parseBody(raw: unknown): AiStudyRequest | string {
  if (!isRecord(raw)) {
    return "Request body must be a JSON object.";
  }

  const mode = raw.mode;
  if (mode !== "quiz" && mode !== "diagnose" && mode !== "plan") {
    return "mode must be one of: quiz, diagnose, plan.";
  }

  if (typeof raw.subject !== "string" || raw.subject.trim().length === 0) {
    return "subject is required.";
  }
  const subject = raw.subject.trim().slice(0, 120);

  if (typeof raw.topic !== "string" || raw.topic.trim().length === 0) {
    return "topic is required.";
  }
  const topic = raw.topic.trim().slice(0, 120);

  const grade = raw.grade;
  if (grade !== "11" && grade !== "12") {
    return 'grade must be "11" or "12".';
  }

  let prompt = "";
  if (raw.prompt !== undefined) {
    if (typeof raw.prompt !== "string") {
      return "prompt must be a string.";
    }
    prompt = raw.prompt.trim().slice(0, 1000);
  }

  let questionCount = 5;
  if (raw.questionCount !== undefined) {
    if (typeof raw.questionCount !== "number" || !Number.isFinite(raw.questionCount)) {
      return "questionCount must be a number.";
    }
    questionCount = clamp(Math.round(raw.questionCount), 1, 10);
  }

  let difficulty: Difficulty = "medium";
  if (raw.difficulty !== undefined) {
    if (!isDifficulty(raw.difficulty)) {
      return "difficulty must be one of: easy, medium, hard.";
    }
    difficulty = raw.difficulty;
  }

  let daysAvailable = 3;
  if (raw.daysAvailable !== undefined) {
    if (typeof raw.daysAvailable !== "number" || !Number.isFinite(raw.daysAvailable)) {
      return "daysAvailable must be a number.";
    }
    if (mode === "plan") {
      daysAvailable = clamp(Math.round(raw.daysAvailable), 1, 14);
    }
  }

  return { mode, subject, topic, grade, prompt, questionCount, difficulty, daysAvailable };
}

// ---------------------------------------------------------------------------
// Prompt building
// ---------------------------------------------------------------------------

function buildSystemPrompt(req: AiStudyRequest): string {
  switch (req.mode) {
    case "quiz":
      return (
        BASE_SYSTEM_PROMPT +
        ` Build a multiple-choice quiz with exactly ${req.questionCount} questions on the given subject and topic.` +
        ` Each question must have exactly 4 options, a correctIndex between 0 and 3, a short explanation, and difficulty "${req.difficulty}".` +
        ' JSON shape: { "questions": [ { "question": string, "options": [4 strings], "correctIndex": 0-3, "explanation": string, "difficulty": "easy" | "medium" | "hard" } ] }.'
      );
    case "diagnose":
      return (
        BASE_SYSTEM_PROMPT +
        " Diagnose the student's misconceptions on the given subject and topic." +
        ' JSON shape: { "summary": string, "misconceptions": [ { "concept": string, "why": string, "fix": string } ], "nextSteps": [string] }.'
      );
    case "plan":
      return (
        BASE_SYSTEM_PROMPT +
        ` Build a study plan with exactly ${req.daysAvailable} days for the given subject and topic.` +
        ' JSON shape: { "days": [ { "day": number, "focus": string, "tasks": [string], "minutes": number } ] }.'
      );
  }
}

function buildUserMessage(req: AiStudyRequest): string {
  const lines = [
    `Subject: ${req.subject}`,
    `Topic: ${req.topic}`,
    `Grade: ${req.grade}`,
  ];
  if (req.prompt.length > 0) {
    lines.push(`Additional instructions from the student: ${req.prompt}`);
  }
  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// OpenRouter call
// ---------------------------------------------------------------------------

async function callOpenRouter(
  apiKey: string,
  model: string,
  systemPrompt: string,
  userMessage: string,
): Promise<string> {
  const response = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.4,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
    }),
  });

  if (!response.ok) {
    // Generic message only: never leak the API key or upstream error bodies.
    throw new Error(`OpenRouter request failed with status ${response.status}`);
  }

  const data = (await response.json()) as OpenRouterChatResponse;
  const content = data.choices?.[0]?.message?.content;
  if (typeof content !== "string" || content.length === 0) {
    throw new Error("OpenRouter returned no content");
  }
  return content;
}

// ---------------------------------------------------------------------------
// Model output parsing and validation
// ---------------------------------------------------------------------------

function stripJsonFences(text: string): string {
  let result = text.trim();
  if (result.startsWith("```")) {
    result = result.replace(/^```[a-zA-Z]*\s*/, "").replace(/\s*```$/, "");
  }
  return result.trim();
}

function validateQuiz(value: Record<string, unknown>, expectedCount: number): QuizResult | null {
  if (!Array.isArray(value.questions) || value.questions.length !== expectedCount) {
    return null;
  }
  const rawQuestions: unknown[] = value.questions;
  const questions: QuizQuestion[] = [];
  for (const item of rawQuestions) {
    if (!isRecord(item)) return null;
    const { question, options, correctIndex, explanation, difficulty } = item;
    if (typeof question !== "string") return null;
    if (!isStringArray(options) || options.length !== 4) return null;
    if (
      typeof correctIndex !== "number" ||
      !Number.isInteger(correctIndex) ||
      correctIndex < 0 ||
      correctIndex > 3
    ) {
      return null;
    }
    if (typeof explanation !== "string") return null;
    if (!isDifficulty(difficulty)) return null;
    questions.push({ question, options, correctIndex, explanation, difficulty });
  }
  return { questions };
}

function validateDiagnose(value: Record<string, unknown>): DiagnoseResult | null {
  const { summary, misconceptions, nextSteps } = value;
  if (typeof summary !== "string") return null;
  if (!Array.isArray(misconceptions)) return null;
  const rawMisconceptions: unknown[] = misconceptions;
  const parsed: Misconception[] = [];
  for (const item of rawMisconceptions) {
    if (!isRecord(item)) return null;
    const { concept, why, fix } = item;
    if (typeof concept !== "string" || typeof why !== "string" || typeof fix !== "string") {
      return null;
    }
    parsed.push({ concept, why, fix });
  }
  if (!isStringArray(nextSteps)) return null;
  return { summary, misconceptions: parsed, nextSteps };
}

function validatePlan(value: Record<string, unknown>, expectedDays: number): PlanResult | null {
  if (!Array.isArray(value.days) || value.days.length !== expectedDays) {
    return null;
  }
  const rawDays: unknown[] = value.days;
  const days: PlanDay[] = [];
  for (const item of rawDays) {
    if (!isRecord(item)) return null;
    const { day, focus, tasks, minutes } = item;
    if (typeof day !== "number" || !Number.isInteger(day) || day < 1) return null;
    if (typeof focus !== "string") return null;
    if (!isStringArray(tasks)) return null;
    if (typeof minutes !== "number" || !Number.isFinite(minutes) || minutes < 0) return null;
    days.push({ day, focus, tasks, minutes });
  }
  return { days };
}

// Parses and shape-checks the model output. Returns null when invalid.
function parseModelOutput(content: string, req: AiStudyRequest): AiResult | null {
  let parsed: unknown;
  try {
    parsed = JSON.parse(stripJsonFences(content));
  } catch {
    return null;
  }
  if (!isRecord(parsed)) {
    return null;
  }
  switch (req.mode) {
    case "quiz":
      return validateQuiz(parsed, req.questionCount);
    case "diagnose":
      return validateDiagnose(parsed);
    case "plan":
      return validatePlan(parsed, req.daysAvailable);
  }
}

// ---------------------------------------------------------------------------
// Request handling
// ---------------------------------------------------------------------------

async function handleRequest(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return jsonResponse(405, { error: "Method not allowed" });
  }

  // Auth: the caller must be a signed-in Supabase user.
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return jsonResponse(401, { error: "Missing Authorization header" });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");
  if (!supabaseUrl || !supabaseAnonKey) {
    return jsonResponse(500, { error: "Server authentication not configured" });
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: authHeader } },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return jsonResponse(401, { error: "Unauthorized" });
  }

  // Body validation.
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return jsonResponse(400, { error: "Request body must be valid JSON." });
  }

  const parsed = parseBody(raw);
  if (typeof parsed === "string") {
    return jsonResponse(400, { error: parsed });
  }

  // Configuration: the model comes from the environment, no hardcoded fallback.
  const apiKey = Deno.env.get("OPENROUTER_API_KEY");
  const model = Deno.env.get("OPENROUTER_MODEL");
  if (!model) {
    return jsonResponse(500, { error: "AI model not configured" });
  }
  if (!apiKey) {
    return jsonResponse(500, { error: "AI service not configured" });
  }

  try {
    const content = await callOpenRouter(
      apiKey,
      model,
      buildSystemPrompt(parsed),
      buildUserMessage(parsed),
    );

    const result = parseModelOutput(content, parsed);
    if (result === null) {
      return jsonResponse(502, { error: "AI returned an invalid response" });
    }

    return jsonResponse(200, { mode: parsed.mode, result });
  } catch {
    // Generic message only: never leak the API key or upstream error bodies.
    return jsonResponse(502, { error: "AI service request failed" });
  }
}

Deno.serve(async (req: Request): Promise<Response> => {
  // CORS preflight.
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS_HEADERS });
  }

  try {
    return await handleRequest(req);
  } catch {
    return jsonResponse(500, { error: "Internal server error" });
  }
});
