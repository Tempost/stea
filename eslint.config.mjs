import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

const config = [{
    ignores: [
        "**/src/server/prisma/zod-generated",
        "**/src/utils/seed",
        "**/tailwind.config.js",
    ],
}, ...compat.extends(
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:@typescript-eslint/recommended",
), {
    languageOptions: {
        parser: tsParser,
    },

    rules: {
        "react/no-unescaped-entities": "off",
        "react/no-children-prop": "off",
        "react/prop-types": "off",
        "no-constant-binary-expression": "error",
        "no-const-assign": "error",
        "no-dupe-else-if": "error",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-empty-object-type": "off",
        "@typescript-eslint/array-type": ["warn", {
            default: "generic",
            readonly: "generic",
        }],
    },
}];

export default config;
