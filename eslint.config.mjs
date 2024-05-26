import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  {
    languageOptions: { globals: globals.browser },
    rules: {
      'no-unused-vars': 'error',
      'no-undef': 'error',
      'prefer-const': 'error',
      'no-console': 'warn',
    },
    ignores: ['**/node_modules', '.dist/'],
    // "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
  },

  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
