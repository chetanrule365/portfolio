# Chetan profile

Chatbot knowledge source of truth: `agent/knowledge/*.md`

Rebuild the RAG index after edits:

```bash
npm run agent:index
```

That writes `netlify/functions/_shared/knowledge-index.json` (commit it with knowledge changes).
