module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['plugin:react/recommended', 'google'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint'],
    rules: {
        'linebreak-style': 'off',
        'max-len': ['error', { code: 140 }],
        'object-curly-spacing': ['error', 'always'],
        'operator-linebreak': 'off',
        'indent': [
            'error',
            4,
            {
                SwitchCase: 1,
            },
        ],
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
