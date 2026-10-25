import { handleChat } from "./_shared/chat-handler.mjs";

const ALLOWED_ORIGINS = (
  process.env.CHAT_ALLOWED_ORIGINS ||
  "https://www.chetanchandrasaireddy.in,https://chetanchandrasaireddy.in,https://chetanchandrasaireddy.netlify.app,http://localhost:5173,http://127.0.0.1:5173"
)
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

function corsHeaders(origin) {
  const allowed =
    origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    Vary: "Origin",
  };
}

export async function handler(event) {
  const origin = event.headers?.origin || event.headers?.Origin || "";
  const headers = corsHeaders(origin);

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    return {
      statusCode: 403,
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Forbidden" }),
    };
  }

  if (event.body && event.body.length > 20_000) {
    return {
      statusCode: 413,
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Request too large" }),
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const result = await handleChat({
      messages: body.messages,
      apiKey: process.env.GEMINI_API_KEY,
    });

    return {
      statusCode: 200,
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify(result),
    };
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return {
      statusCode,
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({
        error: error.message || "Something went wrong",
      }),
    };
  }
}
