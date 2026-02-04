const fs = require('fs');
const path = require('path');

const preloadPath = path.resolve(__dirname, '../src/state/preload.ts');
const projectRoot = path.resolve(__dirname, '..');

if (!fs.existsSync(preloadPath)) {
  console.error('Preload file not found:', preloadPath);
  process.exit(1);
}

const preloadSource = fs.readFileSync(preloadPath, 'utf8');
const matches = [...preloadSource.matchAll(/'assets\/[^']+'/g)];
const assets = Array.from(new Set(matches.map((match) => match[0].slice(1, -1))));

if (assets.length === 0) {
  console.log('No assets found in Preload.ts');
  process.exit(0);
}

const missing = assets.filter((assetPath) => {
  const fsPath = path.resolve(projectRoot, 'public', assetPath);
  return !fs.existsSync(fsPath);
});

if (missing.length > 0) {
  console.error('Missing assets:');
  missing.forEach((assetPath) => {
    console.error(`- ${assetPath}`);
  });
  process.exit(1);
}

console.log(`Asset check passed (${assets.length} files).`);
