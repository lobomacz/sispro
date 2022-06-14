module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'indent': [2, 'tab'],
    'no-tabs': 0,
    'no-console': 'off',
    'no-template-curly-in-string': 0,
    'vue/html-indent': [0, 'tab'],
    'camelcase': [0, {'properties': 'never', 'ignoreGlobals': true, 'allow': ['^[a-z]_']}]
  }
}
