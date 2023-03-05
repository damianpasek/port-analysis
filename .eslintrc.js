module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    'standard'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint',
    "import",
    "simple-import-sort",
    "unused-imports"
  ],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'max-len': ['error', { code: 120 }],
    '@typescript-eslint/no-unused-vars': 'error',
    'camelcase': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      }
    ],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'unused-imports/no-unused-imports': 'error',
  }
}
