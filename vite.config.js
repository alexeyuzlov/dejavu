const path = require('path');
const { defineConfig } = require('vite');

module.exports = defineConfig(() => ({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'),
    },
  },
}));
