import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import next from '@next/eslint-plugin-next';
import react from 'eslint-plugin-react';
import hooks from 'eslint-plugin-react-hooks';
import ts from '@typescript-eslint/eslint-plugin';
import globals from 'globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const config = [
  {
    ignores: [
      '**/src/server/prisma/zod-generated',
      '**/src/utils/seed',
      '**/tailwind.config.js',
      '**/tests',
    ],
  },
  {
    plugins: {
      react: react,
    },
    rules: {
      ...react.configs['jsx-runtime'].rules,
      ...react.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/no-unescaped-entities': 'off',
      'react/no-children-prop': 'off',
      'react/prop-types': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    plugins: {
      'react-hooks': hooks,
    },
    rules: hooks.configs.recommended.rules,
  },
  {
    plugins: {
      '@typescript-eslint': ts,
    },
    rules: {
      ...ts.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/array-type': [
        'warn',
        {
          default: 'generic',
          readonly: 'generic',
        },
      ],
    },
  },
  {
    plugins: {
      '@next/next': next,
    },
    rules: {
      ...next.configs.recommended.rules,
      ...next.configs['core-web-vitals'].rules,
    },
  },
  ...compat.extends('eslint:recommended'),
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        project: true,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      'no-undef': 'off',
      'no-unused-vars': 'off',
      'no-constant-binary-expression': 'error',
      'no-const-assign': 'error',
      'no-dupe-else-if': 'error',
    },
  },
];

export default config;
