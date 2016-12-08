module.exports = {
    "env": {
        "node": true,
        "es6": true,
    },
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
    },
    "globals": {
        "Game": true,
        "Memory": true,
        "OK": true,
        "ERR_NOT_IN_RANGE": true,
        "ERR_NOT_ENOUGH_ENERGY": true,
        "ERR_INVALID_TARGET": true,
        "FIND_STRUCTURES": true,
        "FIND_HOSTILE_CREEPS": true,
        "FIND_CONSTRUCTION_SITES": true,
        "FIND_SOURCES": true,
        "FIND_MY_STRUCTURES": true,
        "STRUCTURE_WALL": true,
        "STRUCTURE_RAMPART": true,
        "STRUCTURE_EXTENSION": true,
        "STRUCTURE_SPAWN": true,
        "STRUCTURE_TOWER": true,
        "RESOURCE_ENERGY": true,
        "WORK": true,
        "CARRY": true,
        "MOVE": true,
        "PathFinder": true
    },
    "extends": "eslint:recommended",
    "rules": {
        "no-console": ["error", { "allow": ["warn", "error"] }],
        "use-isnan": "error",
        "valid-typeof": "error",
        "dot-notation": "error",
        "default-case": "error",
        "array-callback-return": "error",
        "no-alert": "error",
        "no-caller": "error",
        "no-global-assign": "error",
        "no-labels": "error",
        "no-invalid-this": "error",
        "no-new-wrappers": "error",
        "no-param-reassign": "error",
        "no-self-compare": "error",
        "no-with": "error",
        "vars-on-top": "error",
        "no-catch-shadow": "error",
        "no-undefined": "error",
        "brace-style": "error",
        "camelcase": "off",
        "no-bitwise": "error",
        "no-continue": "error",
        "no-inline-comments": "error",
        "arrow-spacing": "error",
        "generator-star-spacing": ["error", {"before": false, "after": true}],
        "no-duplicate-imports": "error",
        "prefer-template": "error",
        "prefer-spread": "error",
        "prefer-rest-params": "error",
        "array-bracket-spacing": ["error", "never"],
        "block-spacing": "error",
        "comma-spacing": ["error", { "before": false, "after": true }],
        "computed-property-spacing": ["error", "always"],
        "func-call-spacing": ["error", "never"],
        "key-spacing": ["error", { "beforeColon": false, "afterColon": true, "mode": "strict" }],
        "keyword-spacing": ["error", { "before": true, "after": true }],
        "object-curly-spacing": ["error", "always"],
        "semi-spacing": ["error", {"before": false, "after": false}],
        "space-before-blocks": "error",
        "space-before-function-paren": ["error", "never"],
        "space-in-parens": ["error", "never"],
        "space-infix-ops": "error",
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
}
