## Project Handoff Summary

Update this file when build/test workflows, dependencies, or project structure change.

### Build & Tooling

- Build outputs to `dist/` (see build scripts in `package.json`).
- Dev and preview flows are defined in npm scripts.
- Source code lives in `src/`.
- Vite serves static assets from `public/`.
- Type checking runs via `npm run lint:types` (no emit).
- Shared formatting is defined in `.editorconfig`.
- Prettier runs via `npm run format`.

### Dependencies

- Use exact versions in `package.json` (no `~` or `^`).
- Update this section before every `npm install`.
- ESLint is configured in `eslint.config.js` and runs via `npm run lint`.
- Husky manages git hooks; install adds `prepare` script.

### Phaser

- Phaser 3 is sourced from npm; typings are referenced from the package.
- The game bootstraps Phaser via ESM import in `src/main.ts` (no vendor script).

### Playwright Smoke Test

- Config and test live in `playwright.config.ts` and `tests/smoke.spec.ts`.
- Smoke tests start the Vite server via `scripts/run-smoke.js` to manage
  lifecycle and avoid background process hangs.
- `npm run test:smoke` runs inside Docker by default.
- Local browser install may fail due to TLS (`UNABLE_TO_GET_ISSUER_CERT_LOCALLY`).
- Prefer running smoke tests via Docker to avoid local TLS/browser install issues.

### CI

- GitHub Actions workflows live in `.github/workflows/ci.yml` (parallel `lint`,
  `typecheck`, `build`, `smoke`, and `lighthouse` jobs with cached
  `node_modules` and `dist`, plus `dist` size reporting) and
  `.github/workflows/deploy-pages.yml` (deploy runs only after CI success on
  `master`, or via manual dispatch).

### Assets & Levels

- Runtime levels are in `public/assets/levels/`.
- Tiled exports are in `tools/tiled/` (workflow described in README).

### Node Versions

- See `.nvmrc` and `.tool-versions`. CI validates with
  `node scripts/check-node.js`; run it manually before local scripts as needed.
