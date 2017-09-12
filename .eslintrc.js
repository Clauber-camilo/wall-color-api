module.exports = {
    "extends": "airbnb-base",
    "rules": {
        "global-require": 0,
        "arrow-spacing": 2,
        "keyword-spacing": 2,
        "no-unused-vars": 1,
        "no-var": 2,
        "comma-dangle": [2, "never"],
        "comma-style": [2, "first", { "exceptions": { "ArrayExpression": true, "ObjectExpression": true } }],
        "indent": [2, 4],
        "prefer-arrow-callback": 2,
        "semi": [2, "never"],
        "space-before-blocks": 2,
        "space-before-function-paren": [2, "always"],
        "arrow-parens": [2, "as-needed"],
        "one-var": 0,
        "padded-blocks": 0,
        "eol-last": 0,
        "no-useless-constructor": 0,
        "class-methods-use-this": 0,
        "no-extra-boolean-cast": 0,
        "consistent-return": 0,
        "no-param-reassign": 0,
        "import/extensions": [0, "never"],
        "import/no-unresolved": [0, "never"],
        "import/no-dynamic-require": [0, "never"],
        "import/no-extraneous-dependencies": [0, "never"]
    },
    "env": {
        "browser": true,
        "node": true
    }
};