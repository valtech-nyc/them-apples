module.exports = {
    root: true,
    parser: 'babel-eslint',
    plugins: ['react'],
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
            impliedStrict: true,
            experimentalObjectRestSpread: true
        },
    },
    env: {
        es6: true,
        node: true,
        browser: true
    },
    extends: 'valtech',
    rules: {
        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error',
        'linebreak-style': 0
    }
};
