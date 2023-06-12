module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended-vue',
    'stylelint-prettier/recommended'
  ],
  ignoreFiles: ['node_modules/**/*', 'dist/**/*', 'src/css/51-modern-default.css'],
}
