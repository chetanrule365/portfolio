# Hardest class of bugs Chetan tracks down

- Fintech / remittance UI bugs where the UI looks fine but money-adjacent state is wrong: stale React Query caches after a transfer step, optimistic UI that drifts from server truth, or PWA/session edge cases after backgrounding the app.
- Micro-frontend boundary bugs in the Kanji Forex Cash Portal (single-spa): an issue that only appears when two independently deployed apps share routing, auth context, or global styles — hard because local reproduction in one package is often green.
- How he debugs: reproduce with the real multi-app shell, isolate which parcel owns the state, check network + cache invalidation before blaming React render, add Playwright coverage for the path once fixed.

When asked for "the hardest bug," lead with this class of problem and a concrete example shape from Niyo/Kanji — do not invent a fake ticket ID, dollar amount, or root-cause anecdote that is not above.
