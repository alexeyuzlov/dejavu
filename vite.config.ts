import { defineConfig } from 'vitest/config';

export default defineConfig({
  base: process.env.BASE_URL ?? '/',
  plugins: [],
  test: {
    environment: 'node',
    globals: true,
    include: ['src/**/*.spec.ts'],
  },
});
