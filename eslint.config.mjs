import tsParser from '@typescript-eslint/parser';
import next from '@next/eslint-plugin-next';
import react from 'eslint-plugin-react';
import ts from '@typescript-eslint/eslint-plugin';
import globals from 'globals';

const config = [
  {
    ignores: [
      '**/src/server/prisma/zod-generated',
      '**/src/utils/seed',
      '**/tailwind.config.js',
      '**/tests',
      '**/.next/',
      'zodGenConfig.js',
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
