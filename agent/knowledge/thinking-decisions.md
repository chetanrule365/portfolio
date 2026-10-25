# Technical decisions Chetan would make differently today

- Reax / earlier product work: investing earlier in a shared design-system + Playwright smoke suite for the 10+ core UI components, instead of revamping components reactively as stability issues surfaced.
- Micro-frontends: he would still choose single-spa for the Forex Cash Portal when multiple teams need independent deploys — but he would define shared dependency and design-token contracts up front more strictly, so style/auth collisions are design-time constraints, not runtime mysteries.
- Side projects: for Options Paper Lab, he would separate market-data ingestion from the UI earlier (clearer service boundary) so backtests and live quotes do not share accidental coupling.
