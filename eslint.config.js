import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";

import myPlugin from "./my-plugin/index.js";

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,                  // optional; default: process.cwd()
  resolvePluginsRelativeTo: __dirname,       // optional
  recommendedConfig: pluginJs.configs.recommended, // optional unless you're using "eslint:recommended"
  allConfig: pluginJs.configs.all,                 // optional unless you're using "eslint:all"
});

/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: { globals: globals.node }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        warnOnUnsupportedTypeScriptVersion: false,
      }
    }
  },

  // ...compat.config({
  //   plugins: ['neverthrow'],
  //   rules: {
  //     'neverthrow/must-use-result': 'error',
  //   },
  //   parser: '@typescript-eslint/parser',
  //   parserOptions: {
  //     ecmaVersion: 2021,
  //     sourceType: 'module',
  //     project: ['./tsconfig.json'],
  //     tsconfigRootDir: __dirname,
  //   },
  // }),

  {
    plugins: {
      myPlugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
      }
    },
    rules: {
      'myPlugin/must-use-result': 'error',
    },
  },
];
