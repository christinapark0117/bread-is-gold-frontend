import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  { ignores: ['dist'] },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    settings: { react: { version: 'detect' } },
    plugins: { react, 'react-hooks': reactHooks },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      // This project doesn't use PropTypes.
      'react/prop-types': 'off',
      // Apostrophes in JSX text render fine; escaping them only hurts readability.
      'react/no-unescaped-entities': 'off',
      // `import React` is no longer required with the JSX runtime but is harmless.
      'no-unused-vars': ['error', { varsIgnorePattern: '^React$' }],
    },
  },
  {
    files: ['**/*.test.{js,jsx}'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
];
