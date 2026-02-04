const path = require('path');
const { defineConfig } = require('vite');

module.exports = defineConfig(() => ({
  root: '.',
  publicDir: 'public',
  base: '/dejavu/',
  define: {
    'import.meta.env.VITE_BUILD_DATE': JSON.stringify(new Date().toISOString()),
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'),
    },
  },
}));
