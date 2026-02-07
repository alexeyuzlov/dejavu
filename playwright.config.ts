import { defineConfig } from '@playwright/test';

const basePath = process.env.BASE_URL ?? '/';
const normalizedBasePath = basePath.endsWith('/') ? basePath : `${basePath}/`;

export default defineConfig({
  testDir: './tests',
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: `http://127.0.0.1:4173${normalizedBasePath}`,
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run build && vite preview --host 127.0.0.1 --port 4173',
    url: `http://127.0.0.1:4173${normalizedBasePath}`,
    reuseExistingServer: false,
  },
});
