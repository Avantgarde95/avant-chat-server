module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  extends: ["prettier"],
  ignorePatterns: ["node_modules/"],
  rules: {
    "prettier/prettier": "error",
    "arrow-body-style": ["error", "as-needed"],
  },
};
