import js from '@eslint/js';

export default [
    js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'script',
            globals: {
                console: 'readonly',
                document: 'readonly',
                window: 'readonly',
                location: 'readonly',
                history: 'readonly',
                MutationObserver: 'readonly',
                Promise: 'readonly',
                setTimeout: 'readonly',
                clearTimeout: 'readonly',
                setInterval: 'readonly',
                clearInterval: 'readonly',
            },
        },
        rules: {
            'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            'no-undef': 'off',
            'no-empty': ['error', { allowEmptyCatch: true }],
            'semi': ['error', 'always'],
            'quotes': ['error', 'single'],
        },
    },
];