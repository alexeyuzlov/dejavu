import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
    {
        ignores: ["app/assets/**", "app/vendor/**", "maps-gen/**", "app/scripts/typing/**/*.d.ts"],
    },
    {
        files: ["app/scripts/**/*.ts"],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 5,
                sourceType: "script",
            },
        },
        plugins: {
            "@typescript-eslint": tseslint,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...tseslint.configs.recommended.rules,
            "no-undef": "off",
            "@typescript-eslint/no-unused-vars": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-namespace": "off",
            "@typescript-eslint/prefer-namespace-keyword": "off",
            "@typescript-eslint/triple-slash-reference": "off",
        },
    },
];
