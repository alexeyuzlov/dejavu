# Dejavu

2D platformer built with Phaser 3.90.0.

## Requirements

- Node.js 20.19.0
- npm
- Docker (optional, only for Playwright Docker runs)

## Quick start

```bash
npm ci
npm run dev
```

## Common scripts

```bash
npm run format:check
npm run lint
npm run typecheck:tests
npm run test:unit
npm run build
```

## Build targets

- Local build (root `/`):
  ```bash
  npm run build
  ```
- GitHub Pages build:
  ```bash
  BASE_URL=/dejavu/ npm run build
  ```

## E2E tests (Playwright)

Local run uses Playwright with browsers installed into `node_modules`:

```bash
npm run test:e2e:install
npm run test:e2e
```

Docker run (mirrors CI):

```bash
npm run test:e2e:docker
```

## CI/CD

- Checks (format, lint, typecheck, unit, build) run on every push and PR.
- Playwright e2e runs on every push and PR in Docker.
- Deploy runs only on `master` pushes after checks and e2e succeed.

## License

MIT, see `LICENSE`.
