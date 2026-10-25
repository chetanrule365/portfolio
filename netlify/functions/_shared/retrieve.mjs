import knowledgeIndex from "./knowledge-index.json" with { type: "json" };
import { cosineSimilarity, embedText } from "./embeddings.mjs";

const TOP_K = 5;
const ALWAYS_INCLUDE = new Set(["basics", "voice"]);

export async function retrieveContext(query, apiKey) {
  if (!knowledgeIndex?.chunks?.length) {
    throw new Error("Knowledge index is empty. Run: npm run agent:index");
  }

  const queryEmbedding = await embedText(query, apiKey, "RETRIEVAL_QUERY");
  const scored = knowledgeIndex.chunks.map((chunk) => ({
    ...chunk,
    score: cosineSimilarity(queryEmbedding, chunk.embedding),
  }));

  scored.sort((a, b) => b.score - a.score);

  const picked = [];
  const seen = new Set();

  for (const chunk of scored) {
    if (picked.length >= TOP_K) break;
    picked.push(chunk);
    seen.add(chunk.id);
  }

  for (const chunk of knowledgeIndex.chunks) {
    if (ALWAYS_INCLUDE.has(chunk.id) && !seen.has(chunk.id)) {
      picked.push(chunk);
      seen.add(chunk.id);
    }
  }

  return picked.map(({ id, path: chunkPath, title, text, score }) => ({
    id,
    path: chunkPath,
    title,
    text,
    score,
  }));
}
