const fs = require('fs');
const path = require('path');
const { defineConfig } = require('vite');

const phaserPath = path.resolve(__dirname, 'node_modules/phaser/build/phaser.min.js');

const serveLegacyAssets = () => ({
  name: 'serve-legacy-assets',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url && req.url.startsWith('/assets/')) {
        const assetPath = path.resolve(__dirname, 'app', req.url.slice(1));
        if (fs.existsSync(assetPath)) {
          fs.createReadStream(assetPath).pipe(res);
          return;
        }
      }

      if (req.url === '/vendor/phaser.min.js') {
        res.setHeader('Content-Type', 'application/javascript');
        fs.createReadStream(phaserPath).pipe(res);
        return;
      }

      next();
    });
  },
});

const copyLegacyAssets = () => ({
  name: 'copy-legacy-assets',
  configResolved(resolved) {
    this._outDir = resolved.build.outDir;
  },
  closeBundle() {
    const outDir = path.resolve(__dirname, this._outDir || 'dist');
    const copyDir = (src, dest) => {
      if (!fs.existsSync(src)) return;
      fs.mkdirSync(dest, { recursive: true });
      fs.cpSync(src, dest, { recursive: true });
    };

    const copies = [
      {
        src: phaserPath,
        dest: path.join(outDir, 'vendor/phaser.min.js'),
      },
    ];

    copies.forEach(({ src, dest }) => {
      if (!fs.existsSync(src)) return;
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.copyFileSync(src, dest);
    });

    copyDir(path.resolve(__dirname, 'app/assets'), path.join(outDir, 'assets'));
  },
});

module.exports = defineConfig(({ command, isPreview }) => {
  if (command === 'serve' && !isPreview) {
    return {
      root: 'app',
      publicDir: false,
      plugins: [serveLegacyAssets()],
      server: {
        fs: {
          allow: ['..'],
        },
      },
    };
  }

  return {
    root: 'app',
    publicDir: false,
    plugins: [copyLegacyAssets()],
    build: {
      outDir: path.resolve(__dirname, 'dist'),
      emptyOutDir: false,
      rollupOptions: {
        input: path.resolve(__dirname, 'app/index.html'),
      },
    },
  };
});
