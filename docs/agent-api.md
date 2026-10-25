# Chetan Agent API

Public personal-agent API powered by Gemini + RAG over Chetan’s knowledge base.

**Base URL:** `https://chetanchandrasaireddy.netlify.app/api/chat`

## Auth

| Client | How |
|--------|-----|
| Browser | Request must send an `Origin` that is listed in Netlify env `CHAT_ALLOWED_ORIGINS` |
| Server | `Authorization: Bearer <CHAT_API_KEY>` (set `CHAT_API_KEY` in Netlify) |

Missing Origin and missing/invalid Bearer → `403`.

## Request

```http
POST /api/chat
Content-Type: application/json
```

```json
{
  "messages": [
    { "role": "user", "content": "What are you learning right now, and why?" }
  ]
}
```

- `messages`: array of `{ role: "user" | "assistant", content: string }`
- Limits: max 20 messages / request, 500 chars / message, ~20KB body
- Rate limit: ~20 requests / minute / IP (best-effort)

## Response

```json
{
  "reply": "…markdown text…",
  "sources": [
    { "id": "thinking-learning", "title": "…", "path": "agent/knowledge/thinking-learning.md" }
  ]
}
```

Errors: `{ "error": "…" }` with `4xx` / `5xx`.

## Browser example

```js
const res = await fetch("https://chetanchandrasaireddy.netlify.app/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    messages: [{ role: "user", content: "What did you build at Niyo?" }],
  }),
});
const data = await res.json();
console.log(data.reply);
```

Your site’s origin must be added to `CHAT_ALLOWED_ORIGINS` in Netlify (comma-separated full origins, including `https://`).

## Server example

```bash
curl -s https://chetanchandrasaireddy.netlify.app/api/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $CHAT_API_KEY" \
  -d '{"messages":[{"role":"user","content":"Hardest bug you have tracked down?"}]}'
```

## How RAG works

1. Knowledge lives in [`agent/knowledge/*.md`](../agent/knowledge)
2. `npm run agent:index` embeds chunks with Gemini → [`netlify/functions/_shared/knowledge-index.json`](../netlify/functions/_shared/knowledge-index.json)
3. Each chat request embeds the latest user message, retrieves top matching chunks (+ always `basics` / `voice`), then generates a reply from that context only

### Update knowledge

```bash
# edit files under agent/knowledge/
npm run agent:index
git add agent/knowledge netlify/functions/_shared/knowledge-index.json
# commit + deploy
```

## Local dev

```bash
# .env with GEMINI_API_KEY
npm run agent:index
npm run dev
# POST http://localhost:5173/api/chat (Vite middleware; no Origin check)
```
