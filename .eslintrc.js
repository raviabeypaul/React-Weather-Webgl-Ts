module.exports = {
  env: {
    node: true,
    es6: true
  },
  extends: [
    "eslint:recommended",
    "prettier/@typescript-eslint",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:jest/recommended"
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "no-console": "off",
    "@typescript-eslint/camelcase": "off"
  }
};
