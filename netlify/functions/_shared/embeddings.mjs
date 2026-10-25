const EMBED_MODEL = process.env.GEMINI_EMBED_MODEL || "gemini-embedding-001";
const OUTPUT_DIM = 768;

export async function embedText(text, apiKey, taskType = "RETRIEVAL_QUERY") {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${EMBED_MODEL}:embedContent`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify({
      model: `models/${EMBED_MODEL}`,
      content: { parts: [{ text }] },
      taskType,
      outputDimensionality: OUTPUT_DIM,
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const msg = data?.error?.message || `Embedding failed (${response.status})`;
    throw new Error(msg);
  }

  const values = data?.embedding?.values;
  if (!Array.isArray(values) || !values.length) {
    throw new Error("Embedding response missing values");
  }
  return values;
}

export function cosineSimilarity(a, b) {
  let dot = 0;
  let na = 0;
  let nb = 0;
  const n = Math.min(a.length, b.length);
  for (let i = 0; i < n; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  if (!na || !nb) return 0;
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

export { EMBED_MODEL, OUTPUT_DIM };
