module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  parser: 'babel-eslint',
  extends: ['eslint:recommended', 'plugin:import/recommended', 'prettier'],
  plugins: ['prettier', 'import'],
  ignorePatterns: ['src/**/*.unit.js'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'import/no-unresolved': [2, { commonjs: true, amd: true }],
    'no-useless-escape': 'off',
    'no-console': 'error',
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'func-names': 'off',
    'no-underscore-dangle': 'off',
    'consistent-return': 'off',
    'security/detect-object-injection': 'off',
    'class-methods-use-this': 'off',
  },
}
