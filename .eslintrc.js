module.exports = {
  env: {
    node: true,
    es2021: true,
    jest: true,
    browser: true
  },
  extends: [
    'plugin:react/recommended',
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function'
      }
    ],
    'no-nested-ternary': 'warn',
    'no-unused-vars': ['warn', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }]
  }
};
