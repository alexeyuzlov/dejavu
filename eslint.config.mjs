import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
    {
        ignores: ["public/assets/**", "public/vendor/**", "maps-gen/**", "src/typing/**/*.d.ts"],
    },
    {
        files: ["src/**/*.ts"],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 2015,
                sourceType: "module",
                project: "./tsconfig.json",
                tsconfigRootDir: process.cwd(),
            },
            globals: {
                Phaser: "readonly",
                PIXI: "readonly",
                console: "readonly",
                localStorage: "readonly",
                window: "readonly",
            },
        },
        plugins: {
            "@typescript-eslint": tseslint,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...tseslint.configs.recommended.rules,
            // ...tseslint.configs["recommended-type-checked"].rules,
            "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
            "@typescript-eslint/strict-boolean-expressions": "off",
        },
    },
    {
        files: ["src/**/*.spec.ts"],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 2015,
                sourceType: "module",
                project: "./tsconfig.test.json",
                tsconfigRootDir: process.cwd(),
            },
            globals: {
                Phaser: "readonly",
                PIXI: "readonly",
                console: "readonly",
                localStorage: "readonly",
                window: "readonly",
                afterAll: "readonly",
                afterEach: "readonly",
                beforeAll: "readonly",
                beforeEach: "readonly",
                describe: "readonly",
                expect: "readonly",
                it: "readonly",
                vi: "readonly",
            },
        },
        plugins: {
            "@typescript-eslint": tseslint,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...tseslint.configs.recommended.rules,
            "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
            "@typescript-eslint/strict-boolean-expressions": "off",
        },
    },
];
