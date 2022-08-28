/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
    plugins: ['@typescript-eslint', 'react-hooks', 'import', 'simple-import-sort', 'prettier'],
    extends: [
        'react-app',
        'react-app/jest',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'plugin:prettier/recommended',
    ],
    rules: {
        'prettier/prettier': 'error',
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: [
                    '**/*.(spec|test).@(js|ts)?(x)',
                    '**/jest.setup.ts',
                    '**/webpack.*.js',
                    '**/mocks/**/*.@(js|ts)?(x)',
                ],
            },
        ],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/function-component-definition': 'off',
        'import/no-duplicates': 'off',
        'no-console': 'warn',
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
    },
    overrides: [
        {
            files: ['./packages/**/*.(ts|js)'],
            parser: '@typescript-eslint/parser',
            extends: [
                'plugin:@typescript-eslint/recommended',
                'plugin:@typescript-eslint/recommended-requiring-type-checking',
            ],
            rules: {
                '@typescript-eslint/explicit-module-boundary-types': 'error',
                'no-use-before-define': 'error',
                '@typescript-eslint/no-use-before-define': ['error', { variables: false }],
                'no-useless-constructor': 'error',
                '@typescript-eslint/no-useless-constructor': 'error',
                '@typescript-eslint/no-floating-promises': 'error',
            },
            parserOptions: {
                ecmaVersion: 2015,
                sourceType: 'module',
                project: ['./tsconfig.json', './packages/**/tsconfig.json'],
            },
        },
        {
            files: ['./packages/**/*.tsx'],
            rules: {
                'react/display-name': 'error',
                'react/jsx-key': 'error',
                'react/jsx-no-duplicate-props': 'warn',
                'react-hooks/rules-of-hooks': 'error',
                'react-hooks/exhaustive-deps': 'error',
                'react/prop-types': 'off',
                'react/require-default-props': 'off',
                '@typescript-eslint/explicit-module-boundary-types': 'error',
                'no-use-before-define': 'error',
                '@typescript-eslint/no-use-before-define': ['error', { variables: false }],
                'no-useless-constructor': 'error',
                '@typescript-eslint/no-useless-constructor': 'error',
                '@typescript-eslint/no-floating-promises': 'error',
            },
            extends: [
                'plugin:@typescript-eslint/recommended',
                'plugin:@typescript-eslint/recommended-requiring-type-checking',
            ],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                ecmaVersion: 2015,
                sourceType: 'module',
                project: ['./tsconfig.json', './packages/**/tsconfig.json'],
            },
        },
        {
            files: ['packages/*/**/*.ts?(x)', 'packages/*/**/*.js?(x)'],
            settings: {
                'import/resolver': {
                    typescript: {
                        project: path.resolve(`${__dirname}/packages/*/tsconfig.json`),
                    },
                },
            },
        },
    ],
    settings: {
        'import/extensions': ['.js', '.jsx', '.ts', '.tsx', 'spec.js', 'test.ts', 'test.tsx'],
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts', '.js', '.jsx'],
        },
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
            typescript: {
                alwaysTryTypes: true,
            },
        },
    },
    env: {
        es6: true,
    },
};
