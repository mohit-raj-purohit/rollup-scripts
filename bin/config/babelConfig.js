const { typescript, react, opts } = require('../../utils');

module.exports = {
  presets: [
    '@babel/preset-env',
    ...opts(react, ['@babel/preset-react']),
    ...opts(typescript, ['@babel/preset-typescript']),
  ],
  plugins: [
    '@babel/plugin-syntax-optional-chaining',
    ['@babel/plugin-proposal-decorators', { version: '2023-05' }],
    '@babel/plugin-proposal-private-methods',
    ['@babel/plugin-transform-runtime', { regenerator: true }],
  ],
};
