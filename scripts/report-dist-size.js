const fs = require("node:fs");
const path = require("node:path");

const distPath = path.resolve(process.cwd(), "dist");
const sizeFilePath = path.resolve(process.cwd(), "dist-size.txt");
const summaryPath = process.env.GITHUB_STEP_SUMMARY;

function getDirSize(targetPath) {
  const stats = fs.statSync(targetPath);
  if (stats.isFile()) {
    return stats.size;
  }

  if (!stats.isDirectory()) {
    return 0;
  }

  return fs.readdirSync(targetPath).reduce((total, entry) => {
    const entryPath = path.join(targetPath, entry);
    return total + getDirSize(entryPath);
  }, 0);
}

function formatBytes(bytes) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  const units = ["KB", "MB", "GB"];
  let value = bytes / 1024;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  return `${value.toFixed(2)} ${units[unitIndex]}`;
}

if (!fs.existsSync(distPath)) {
  console.error("ERROR: dist/ not found. Run the build step first.");
  process.exit(1);
}

let previousSize = null;
if (fs.existsSync(sizeFilePath)) {
  const previousRaw = Number.parseInt(
    fs.readFileSync(sizeFilePath, "utf8").trim(),
    10,
  );
  if (Number.isFinite(previousRaw)) {
    previousSize = previousRaw;
  }
}

const currentSize = getDirSize(distPath);
fs.writeFileSync(sizeFilePath, String(currentSize));

const lines = [];
lines.push("## Build size");
lines.push(`- dist: ${formatBytes(currentSize)}`);

if (previousSize !== null) {
  const delta = currentSize - previousSize;
  const deltaPercent = previousSize
    ? ((delta / previousSize) * 100).toFixed(2)
    : "0.00";
  const deltaLabel = `${delta >= 0 ? "+" : "-"}${formatBytes(
    Math.abs(delta),
  )} (${deltaPercent}%)`;
  lines.push(`- previous: ${formatBytes(previousSize)}`);
  lines.push(`- change: ${deltaLabel}`);
}

console.log(lines.join("\n"));

if (summaryPath) {
  fs.appendFileSync(summaryPath, `${lines.join("\n")}\n`);
}
