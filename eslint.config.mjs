/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js"],
    rules: {
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'object-curly-spacing': ['error', 'always'],
      'indent': ['error', 2],
    }
  }
];