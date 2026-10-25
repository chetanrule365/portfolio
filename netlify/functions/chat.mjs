import { handleChat } from "./_shared/chat-handler.mjs";

const ALLOWED_ORIGINS = (
  process.env.CHAT_ALLOWED_ORIGINS ||
  "https://www.chetanchandrasaireddy.in,https://chetanchandrasaireddy.in,https://chetanchandrasaireddy.netlify.app,http://localhost:5173,http://127.0.0.1:5173"
)
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 20;
const hits = new Map();

function clientIp(event) {
  const forwarded = event.headers?.["x-forwarded-for"] || event.headers?.["X-Forwarded-For"] || "";
  return (
    forwarded.split(",")[0]?.trim() ||
    event.headers?.["client-ip"] ||
    event.headers?.["x-nf-client-connection-ip"] ||
    "unknown"
  );
}

function rateLimited(ip) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.start > RATE_LIMIT_WINDOW_MS) {
    hits.set(ip, { start: now, count: 1 });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

function getBearer(event) {
  const raw =
    event.headers?.authorization || event.headers?.Authorization || "";
  const match = /^Bearer\s+(.+)$/i.exec(raw.trim());
  return match?.[1]?.trim() || "";
}

function isAuthorized(event, origin) {
  const apiKey = process.env.CHAT_API_KEY;
  const bearer = getBearer(event);
  if (apiKey && bearer && bearer === apiKey) return true;
  if (origin && ALLOWED_ORIGINS.includes(origin)) return true;
  return false;
}

function corsHeaders(origin) {
  const allowed =
    origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
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

  if (!isAuthorized(event, origin)) {
    return {
      statusCode: 403,
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({
        error:
          "Forbidden. Use an allowlisted Origin or Authorization: Bearer <CHAT_API_KEY>.",
      }),
    };
  }

  const ip = clientIp(event);
  if (rateLimited(ip)) {
    return {
      statusCode: 429,
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Too many requests. Try again shortly." }),
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
