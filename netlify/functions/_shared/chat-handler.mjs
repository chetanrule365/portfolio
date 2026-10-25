import { PROFILE } from "./profile.mjs";

const SYSTEM_PROMPT = `You are a helpful assistant on Chetan Nandyala's portfolio website.
Answer questions about Chetan in a friendly, concise, first-person-or-third-person mix that feels natural (prefer third person like "Chetan has…" or "He…", or "I" only if the visitor clearly wants Chetan speaking — default to clear third person about Chetan).

Rules:
- Use ONLY the PROFILE facts below. Do not invent employers, dates, skills, or projects.
- If something is not in the profile, say you don't have that info and suggest emailing chetanrule365@gmail.com.
- Keep answers brief (2–5 short sentences) unless the visitor asks for detail.
- For total experience: he started in Oct 2020; say ~4.5+ years (or compute from that start to "today").
- Fintech: yes — Niyo / Kanji remittance and forex.
- Refuse unrelated topics (general coding homework, politics, etc.) politely and steer back to Chetan's background.

PROFILE:
${PROFILE}`;

const MAX_HISTORY = 10;
const MAX_MESSAGE_CHARS = 500;
const MAX_PAYLOAD_MESSAGES = 20;

function toGeminiContents(messages) {
  return messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));
}

function publicError(statusCode, message) {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
}

export async function handleChat({ messages, apiKey }) {
  if (!apiKey) {
    throw publicError(500, "Chat is temporarily unavailable.");
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    throw publicError(400, "Please send a message.");
  }

  if (messages.length > MAX_PAYLOAD_MESSAGES) {
    throw publicError(400, "Too many messages in one request.");
  }

  const cleaned = messages
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string"
    )
    .map((m) => ({
      role: m.role,
      content: m.content.trim().slice(0, MAX_MESSAGE_CHARS),
    }))
    .filter((m) => m.content.length > 0)
    .slice(-MAX_HISTORY);

  if (!cleaned.length || cleaned[cleaned.length - 1].role !== "user") {
    throw publicError(400, "Please send a message.");
  }

  const model = process.env.GEMINI_MODEL || "gemini-flash-lite-latest";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: toGeminiContents(cleaned),
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 512,
      },
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    console.error("Gemini error:", response.status, data?.error?.message);
    throw publicError(502, "Could not get a reply. Please try again.");
  }

  const text = data?.candidates?.[0]?.content?.parts
    ?.map((p) => p.text)
    .filter(Boolean)
    .join("\n")
    .trim();

  if (!text) {
    throw publicError(502, "Could not get a reply. Please try again.");
  }

  return { reply: text };
}
