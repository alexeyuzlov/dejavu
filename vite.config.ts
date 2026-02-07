import { defineConfig } from 'vitest/config';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  base: process.env.BASE_URL ?? '/',
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'node_modules/phaser/build/phaser.min.js',
          dest: 'vendor',
        },
      ],
    }),
  ],
  test: {
    environment: 'node',
    globals: true,
    include: ['src/**/*.spec.ts'],
    setupFiles: ['src/test/phaser-setup.ts'],
  },
});
