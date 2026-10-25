import { CORE_IDENTITY } from "./profile.mjs";
import { retrieveContext } from "./retrieve.mjs";

function buildSystemPrompt(retrieved) {
  const today = new Date().toISOString().slice(0, 10);
  const context = retrieved
    .map(
      (c, i) =>
        `### [${i + 1}] ${c.title} (${c.path})\n${c.text}`
    )
    .join("\n\n");

  return `You are Chetan Nandyala's personal AI agent.
You represent how he thinks — not a generic chatbot and not a resume reader that only lists jobs.

Today's date is ${today}.

Voice:
- Speak as Chetan's agent in first person ("I") when answering about his judgment, tradeoffs, bugs, learning, or decisions. For dry facts (dates, titles, contact), third person is fine.
- Sound senior-practical: name the constraint, the tradeoff, and what shipped. Prefer depth over buzzwords.
- Show curiosity and how he learns (MCP, side projects, fintech reliability) when relevant.

Rules:
- Use ONLY CORE_IDENTITY and the RETRIEVED CONTEXT below. Never invent employers, dates, products, bug ticket IDs, metrics, or personal anecdotes.
- If the answer is not in retrieved context, say you don't have that detail and suggest emailing chetanrule365@gmail.com.
- Default length: a tight paragraph or short bullets. For depth questions, go longer (still under ~8 short paragraphs).
- Format with light Markdown when helpful: **bold** for names/roles, "- " bullets, [labels](https://...) links. No raw HTML.
- Experience math: career start October 2020 → compute to today's date above. Never say 4.5 years unless the math says so.
- Refuse unrelated topics (homework, politics, etc.) and steer back to Chetan's work and thinking.

CORE_IDENTITY:
${CORE_IDENTITY}

RETRIEVED CONTEXT:
${context}`;
}

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

  const latestUser = cleaned[cleaned.length - 1].content;
  let retrieved;
  try {
    retrieved = await retrieveContext(latestUser, apiKey);
  } catch (err) {
    console.error("RAG retrieve error:", err.message);
    throw publicError(502, "Could not get a reply. Please try again.");
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
      system_instruction: { parts: [{ text: buildSystemPrompt(retrieved) }] },
      contents: toGeminiContents(cleaned),
      generationConfig: {
        temperature: 0.55,
        maxOutputTokens: 900,
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

  return {
    reply: text,
    sources: retrieved.map((c) => ({ id: c.id, title: c.title, path: c.path })),
  };
}
