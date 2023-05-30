const { typescript, react } = require("../../utils");

module.exports = {
    presets: [
        '@babel/preset-env',
        ...(react ? ['@babel/preset-react'] : []),
        ...(typescript ? ['@babel/preset-typescript'] : []),
    ],
    plugins: [
        '@babel/plugin-transform-runtime',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-syntax-optional-chaining',
        '@babel/plugin-proposal-decorators',
        '@babel/plugin-proposal-private-methods',
        '@babel/plugin-transform-regenerator',
        '@babel/plugin-transform-async-to-generator'
    ]
};