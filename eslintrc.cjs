/**
 * ESLint configuration for SoundTweak (Vue 3 + TypeScript + Prettier).
 * Enforces:
 *  - <script setup lang="ts"> only
 *  - single path comment at top of each SFC
 *  - Prettier formatting (no style drift)
 */
module.exports = {
  root: true,
  env: { browser: true, node: true, es2020: true },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    extraFileExtensions: ['.vue']
  },
  plugins: ['@typescript-eslint', 'vue', 'header'],
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  rules: {
    // --- Vue / TS harmony ---
    'vue/block-lang': ['error', { script: { lang: 'ts' } }],
    'vue/no-export': 'error',
    'vue/require-default-prop': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    // --- Project‑specific ---
    // Require first line in every .vue to be a path comment like "// src/components/foo/Bar.vue"
    'header/header': [
      'error',
      'line',
      {
        pattern: '^//\\s+src\\/.*\\.vue$'
      }
    ]
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        // defineProps / defineEmits are compiler macros, not runtime imports
        'no-undef': 'off'
      }
    }
  ]
};
