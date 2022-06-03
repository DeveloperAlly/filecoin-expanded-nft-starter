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
    'plugin:import/warnings',
    'plugin:react-hooks/recommended'
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

// package
// "eslint-config-airbnb": "^19.0.4",
// "eslint-config-prettier": "^8.5.0",
// "eslint-plugin-import": "^2.26.0",
// "eslint-plugin-jsx-a11y": "^6.5.1",
// "eslint-plugin-prettier": "^4.0.0",
// "eslint-plugin-react": "^7.30.0",
// "eslint-plugin-react-hooks": "^4.5.0",

// "eslint-config-prettier": "^8.5.0",
// "eslint-plugin-jsx-a11y": "^6.5.1",
// "eslint-plugin-prettier": "^4.0.0",
// "eslint-plugin-react": "^7.30.0",
// "eslint-plugin-react-hooks": "^4.5.0",
