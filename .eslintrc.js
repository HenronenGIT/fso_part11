module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  ignorePatterns: [
    "main.js",
    "node_modules/",
    "build/",
    "*test*",
    "cypress/",
    "*config*",
  ],
  // extends: ["plugin:react/recommended"],
  // extends: ["eslint:recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    quotes: ["error", "double"],
    // eqeqeq: "error",
    "no-unused-vars": "warn",
    "no-trailing-spaces": "error",
    "object-curly-spacing": ["error", "always"],
    "arrow-spacing": ["error", { before: true, after: true }],
    "react/prop-types": 0,
  },
};
