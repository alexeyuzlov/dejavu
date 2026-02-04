const js = require("@eslint/js");
const tseslint = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");

const browserGlobals = {
  window: "readonly",
  document: "readonly",
  navigator: "readonly",
  console: "readonly",
};

const nodeGlobals = {
  module: "readonly",
  require: "readonly",
  process: "readonly",
  __dirname: "readonly",
  __filename: "readonly",
  console: "readonly",
};

module.exports = [
  {
    ignores: ["dist/**", "node_modules/**"],
  },
  js.configs.recommended,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        sourceType: "module",
        ecmaVersion: "latest",
      },
      globals: browserGlobals,
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-wrapper-object-types": "off",
      "no-undef": "off",
    },
  },
  {
    files: [
      "playwright.config.ts",
      "vite.config.js",
      "eslint.config.js",
      "scripts/**/*.js",
      "tests/**/*.ts",
    ],
    languageOptions: {
      globals: nodeGlobals,
    },
  },
];
