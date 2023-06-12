module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  env: {
    browser: true,
    es2021: true,
    'vue/setup-compiler-macros': true,
  },
  extends: [
    '@cybozu/eslint-config/globals/kintone',
    'airbnb-base',
    'plugin:vue/vue3-recommended',
    '@cybozu/eslint-config/presets/typescript-prettier',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {},
}
