module.exports = {
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: [
        '@babel/plugin-transform-arrow-functions',
        '@babel/plugin-proposal-throw-expressions',
        '@babel/plugin-proposal-class-properties',
    ],
    ignore: ['node_modules', 'dist']
};
