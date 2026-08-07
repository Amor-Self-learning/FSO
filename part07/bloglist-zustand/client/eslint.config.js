import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default defineConfig([
  globalIgnores(['dist', 'node_modules']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.vitest,
      },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      // Code quality rules stay here
      eqeqeq: 'error',
      'no-console': 'off',
      // Formatting rules (indent, quotes, semi, etc.) have been removed
      // because Prettier will now handle them automatically.
    },
  },
  eslintPluginPrettierRecommended,
]);
