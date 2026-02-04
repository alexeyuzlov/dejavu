const fs = require('fs');
const path = require('path');
const { defineConfig } = require('vite');

module.exports = defineConfig({
  root: 'app',
  publicDir: 'assets',
  plugins: [
    {
      name: 'copy-legacy-vendor',
      configResolved(resolved) {
        this._outDir = resolved.build.outDir;
      },
      closeBundle() {
        const outDir = path.resolve(__dirname, this._outDir || 'build-vite');
        const copies = [
          {
            src: path.resolve(__dirname, 'app/vendor/phaser-official/build/phaser.min.js'),
            dest: path.join(outDir, 'vendor/phaser.min.js'),
          },
          {
            src: path.resolve(__dirname, 'app/vendor/stats.js/build/stats.min.js'),
            dest: path.join(outDir, 'vendor/stats.min.js'),
          },
        ];

        copies.forEach(({ src, dest }) => {
          if (!fs.existsSync(src)) return;
          fs.mkdirSync(path.dirname(dest), { recursive: true });
          fs.copyFileSync(src, dest);
        });
      },
    },
  ],
  build: {
    outDir: path.resolve(__dirname, 'build-vite'),
    emptyOutDir: false,
    rollupOptions: {
      input: path.resolve(__dirname, 'app/index.html'),
    },
  },
});
