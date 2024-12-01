import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

import { fixupPluginRules } from "@eslint/compat";
import eslintPluginNeverthrow from "eslint-plugin-neverthrow";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: { globals: globals.node }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        // because this project uses TS 5.7 which isn't yet officially supported by ESLint
        warnOnUnsupportedTypeScriptVersion: false,
      }
    }
  },
  {
    plugins: {
      eslintPluginNeverthrow: fixupPluginRules(eslintPluginNeverthrow),
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        project: ['./tsconfig.json'],
        // We can use import.meta.dirname with Node.js >= 21.2.0
        tsconfigRootDir: import.meta.dirname,
      }
    },
    rules: {
      'eslintPluginNeverthrow/must-use-result': 'error',
    },
  }
];
