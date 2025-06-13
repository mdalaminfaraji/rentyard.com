import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Ignore build files and node_modules
  {
    ignores: [
      "**/.next/**",
      "**/node_modules/**",
      "**/dist/**",
      "**/.git/**",
      "**/public/**",
    ],
  },
  ...compat.extends(
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier"
  ),
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      "no-console": ["warn", { "allow": ["warn", "error"] }],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];

export default eslintConfig;
