module.exports = {
    root: true,
    env: {
      node: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:vue/vue3-recommended',
      '@vue/eslint-config-typescript',
      'plugin:prettier/recommended',
    ],
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  }