module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb',
    'plugin:jest/all',
    'prettier',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  settings: {
    'import/resolver': {
      node: {
        'extensions': ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'jest',
    'react',
    '@typescript-eslint',
    'prettier',
  ],
  rules: {
    'prettier/prettier': 'error',
    'arrow-parens': 0,
    'jest/require-to-throw-message': 0,
  },
};
