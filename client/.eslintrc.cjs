module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    'jest/globals': true,
    'cypress/globals': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'react-refresh', 'jest', 'cypress'],
  ecmaFeatures: {
    jsx: true,
  },
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
};
