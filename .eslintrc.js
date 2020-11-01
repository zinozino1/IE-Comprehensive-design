module.exports = {
    parser: "babel-eslint",
    parserOptions: {
        ecmaVersion: 11,
        sourceType: "module",
    },
    env: {
        browser: true,
        es2020: true,
        node: true,
    },
    extends: ["airbnb-base", "plugin:prettier/recommended"],

    rules: {
        "prettier/prettier": "off",
        "no-console": "off",
        "spaced-comment": "off",
        "no-else-return": "off",
        camelcase: "off",
        "no-loop-func": "off",
        "consistent-return": "off",
        "no-empty-function": "off",
        "no-plusplus": "off",
        "no-unused-vars": "off",
    },
};
