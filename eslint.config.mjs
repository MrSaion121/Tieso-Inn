import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        languageOptions: { globals: globals.browser }
    },
    {
        ignores: ['dist/', 'node_modules/', 'public/', '*.js']
    },
    {
        files: ['src/**/*.ts'],
        rules: {
            "eol-last": ["error", "always"],
            '@typescript-eslint/explicit-module-boundary-types': 'warn',
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/ban-ts-comment': 'warn',
            'no-console': ['warn', { allow: ['warn', 'error'] }],
            'eqeqeq': ['error', 'always'],
            'semi': ['error', 'always'],
            'quotes': ['error', 'single'],
            'indent': ['error', 4],
            'curly': ['error', 'all'],
            'consistent-return': 'warn',
            'brace-style': ['error', '1tbs'],
            'arrow-parens': ['error', 'always'],
            'no-trailing-spaces': 'error',
            'space-before-function-paren': ['error', 'never'],
            'no-throw-literal': 'error',
            'prefer-const': 'error',
            'no-debugger': 'error',
            'no-empty-function': 'warn',
            'no-empty': 'warn',
        },
    },
];
