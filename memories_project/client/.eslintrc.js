module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:import/typescript',
    'eslint:recommended',

  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    indent: ['off'],
    '@typescript-eslint/indent': ['error', 2],
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'function-declaration',
      },
    ],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/react-in-jsx-scope': 'off',
    'no-unused-vars': ['warn', { vars: 'all' }],
  },
};
