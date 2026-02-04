## Project Handoff Summary

Update this file when build/test workflows, dependencies, or project structure change.

### Build & Tooling

- Build outputs to `dist/` (see build scripts in `package.json`).
- Dev and preview flows are defined in npm scripts.
- Shared formatting is defined in `.editorconfig`.
- Prettier runs via `npm run format`.

### Dependencies

- Use exact versions in `package.json` (no `~` or `^`).
- Update this section before every `npm install`.
- ESLint is configured in `eslint.config.js` and runs via `npm run lint`.
- Husky manages git hooks; install adds `prepare` script.

### Phaser

- Phaser is sourced from npm; typings are referenced from the package.

### Playwright Smoke Test

- Config and test live in `playwright.config.ts` and `tests/smoke.spec.ts`.
- Docker fallback script exists; see npm scripts.
- Local browser install may fail due to TLS (`UNABLE_TO_GET_ISSUER_CERT_LOCALLY`).
- Prefer running smoke tests via Docker to avoid local TLS/browser install issues.

### CI

- GitHub Actions workflow lives in `.github/workflows/ci.yml`.

### Assets & Levels

- Runtime levels are in `app/assets/levels/`.
- Tiled exports are in `tools/tiled/` (workflow described in README).

### Node Versions

- See `.nvmrc` and `.tool-versions`.
