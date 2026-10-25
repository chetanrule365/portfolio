import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { embedText, EMBED_MODEL, OUTPUT_DIM } from "../netlify/functions/_shared/embeddings.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const knowledgeDir = path.join(root, "agent", "knowledge");
const outPath = path.join(
  root,
  "netlify",
  "functions",
  "_shared",
  "knowledge-index.json"
);

async function loadEnvFile() {
  try {
    const raw = await readFile(path.join(root, ".env"), "utf8");
    for (const line of raw.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      let val = trimmed.slice(eq + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = val;
    }
  } catch {
    // optional local .env
  }
}

function titleFromMarkdown(text, fallback) {
  const match = text.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : fallback;
}

async function main() {
  await loadEnvFile();
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is required to build the knowledge index.");
    process.exit(1);
  }

  const files = (await readdir(knowledgeDir))
    .filter((f) => f.endsWith(".md"))
    .sort();

  if (!files.length) {
    console.error(`No markdown files in ${knowledgeDir}`);
    process.exit(1);
  }

  const chunks = [];
  for (const file of files) {
    const full = path.join(knowledgeDir, file);
    const text = (await readFile(full, "utf8")).trim();
    if (!text) continue;
    const id = file.replace(/\.md$/, "");
    const title = titleFromMarkdown(text, id);
    process.stdout.write(`Embedding ${file}… `);
    const embedding = await embedText(text, apiKey, "RETRIEVAL_DOCUMENT");
    chunks.push({
      id,
      path: `agent/knowledge/${file}`,
      title,
      text,
      embedding,
    });
    console.log("ok");
  }

  const index = {
    version: 1,
    model: EMBED_MODEL,
    outputDimensionality: OUTPUT_DIM,
    generatedAt: new Date().toISOString(),
    chunks,
  };

  await writeFile(outPath, `${JSON.stringify(index, null, 2)}\n`, "utf8");
  console.log(`Wrote ${chunks.length} chunks → ${path.relative(root, outPath)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
