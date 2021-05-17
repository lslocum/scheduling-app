module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["import", "unused-imports"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:@angular-eslint/recommended",
  ],
  ignorePatterns: ["src/index.html"],
  rules: {
    // "prettier/prettier": "warn",
    "max-len": [
      "warn",
      {
        code: 120,
        ignoreComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    "no-debugger": ["error"],
    "no-console": ["error", { allow: ["warn", "error"] }],
    // No Bad imports
    // Importing incorrectly can cause build optimization issues
    "no-restricted-imports": ["error", { patterns: ["rxjs/internal/*"] }],
    // Order imports
    "import/order": [
      "error",
      {
        pathGroups: [
          {
            pattern: "src/**",
            group: "internal",
          },
        ],
        pathGroupsExcludedImportTypes: ["builtin"],
        groups: ["external", "internal", "parent", "sibling"],
        "newlines-between": "always",
        alphabetize: { order: "asc", caseInsensitive: true },
      },
    ],
    "@typescript-eslint/no-empty-function": [
      "error",
      { allow: ["arrowFunctions"] },
    ],
    "@typescript-eslint/no-use-before-define": ["warn", { functions: false }],
    "prefer-const": ["warn"],
    // Require === or !== instead of == or != equality checks.
    // Smart allows you to == against typeof and null.
    eqeqeq: ["error", "smart"],

    // Set as a warning, because you really shouldn't have <any> types,
    // but we don't want to eternally nag you for not knowing the type.
    "@typescript-eslint/no-explicit-any": ["warn", { fixToUnknown: false }],
    // 3 rules below make it so that we can auto-remove unused imports.
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports-ts": "error",
    "unused-imports/no-unused-vars-ts": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
  },
  "overrides": [
    {
      "files": ["*.ts"],
      "parserOptions": {
        "project": [
          "tsconfig.app.json",
          "tsconfig.spec.json"
        ],
        "createDefaultProgram": true
      },
      "extends": [
        "plugin:@angular-eslint/recommended",
        // This is required if you use inline templates in Components
        "plugin:@angular-eslint/template/process-inline-templates"
      ],
      "rules": {
        /**
         * Any TypeScript source code (NOT TEMPLATE) related rules you wish to use/reconfigure over and above the
         * recommended set provided by the @angular-eslint project would go here.
         */
        "@angular-eslint/directive-selector": [
          "error",
          { "type": "attribute", "prefix": "app", "style": "camelCase" }
        ],
        "@angular-eslint/component-selector": [
          "error",
          { "type": "element", "prefix": "app", "style": "kebab-case" }
        ]
      }
    },
    {
      "files": ["*.html"],
      "extends": ["plugin:@angular-eslint/template/recommended"],
      "rules": {
        /**
         * Any template/HTML related rules you wish to use/reconfigure over and above the
         * recommended set provided by the @angular-eslint project would go here.
         */
      }
    }
  ]
};
