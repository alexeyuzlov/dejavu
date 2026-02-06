# Dejavu

## Overview

Dejavu is a 2D platformer game built with the Phaser framework. Traverse through challenging levels, face enemies, and prepare for an epic boss fight at the end. Immerse yourself in this fast-paced, retro-style adventure.

## Build Instructions

To set up and build the project, follow these steps:

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Start dev server**:
   ```bash
   npm run dev
   ```
3. **Build the project**:
   ```bash
   npm run build
   ```
4. **Build for GitHub Pages**:
   ```bash
   npm run build:prod
   ```

## E2E Tests

Local e2e uses Playwright with browsers installed into `node_modules`.

1. **Install Playwright browsers (local)**:
   ```bash
   npm run test:e2e:install
   ```
2. **Build the project**:
   ```bash
   npm run build
   ```
3. **Run e2e locally**:
   ```bash
   npm run test:e2e
   ```

### Docker e2e

Run the e2e tests inside the Playwright Docker image:

```bash
npm run test:e2e:docker
```

## License

This project is licensed under the [MIT License](LICENSE).
