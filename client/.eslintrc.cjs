module.exports = {
  "extends": [
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
    "plugin:prettier/recommended"
  ],
  "plugins": [
    "react",
    "@typescript-eslint",
    "jest",
    "import",
    "unused-imports"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module",
    "project": "./tsconfig.json"
  },
  "rules": {
    "prettier/prettier": [
      "error",
      {
        "singleQuote": true
      }
    ],
    "react/react-in-jsx-scope": "off",
    "react/jsx-curly-newline": "off",
    "react/jsx-props-no-spreading": "off",
    "react/destructuring-assignment": "off",
    "jsx-a11y/anchor-is-valid": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [".js", ".jsx", "ts", ".tsx"]
      }
    ],
    "import/no-cycle": 0,
    "import/prefer-default-export": 0,
    "import/no-unresolved": 0,
    "import/order": [
      "error",
      {
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": true
        },
        "newlines-between": "always",
        "groups": [
          "builtin",
          "external",
          "internal",
          "sibling",
          "index",
          "parent"
        ]
      }
    ],
    "@typescript-eslint/no-unused-expressions": 0,
    "object-curly-spacing": ["error", "always"],
    "consistent-return": 0,
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": "interface",
        "format": ["PascalCase"],
        "custom": {
          "regex": "^I[A-Z]",
          "match": true
        }
      }
    ],
    "no-param-reassign": [
      2,
      {
        "props": false
      }
    ],
    "no-multiple-empty-lines": [
      2,
      {
        "max": 1,
        "maxEOF": 0,
        "maxBOF": 0
      }
    ],
    "no-duplicate-imports": ["error"],
    "eol-last": ["error", "always"],
    "no-use-before-define": 0,
    "@typescript-eslint/no-use-before-define": 1,
    "react-hooks/exhaustive-deps": 0,
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        "vars": "all",
        "varsIgnorePattern": "^_",
        "args": "after-used",
        "argsIgnorePattern": "^_"
      }
    ],
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["warn"]
  },
  "ignorePatterns": ["types.d.ts"]
}

