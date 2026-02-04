const fs = require("node:fs");
const path = require("node:path");

const nvmrcPath = path.resolve(__dirname, "..", ".nvmrc");
const expectedRaw = fs.readFileSync(nvmrcPath, "utf8").trim();
const expected = expectedRaw.replace(/^v/, "");
const current = process.version.replace(/^v/, "");

if (!expected) {
  console.error("ERROR: .nvmrc is empty.");
  process.exit(1);
}

if (current !== expected) {
  console.error(
    `ERROR: Node ${expected} is required (current: ${current}). ` +
      "Use nvm or asdf to switch versions.",
  );
  process.exit(1);
}
