const { defineConfig } = require('rollup');
const path = require('node:path');
const json = require('@rollup/plugin-json');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const { babel } = require('@rollup/plugin-babel');
const babelConfig = require('./babelConfig');
const { ROOT } = require('../../constants');
const { configFile, fromPackage } = require('../../utils');

function resolvePath(p) {
    return path.join(ROOT, p);
}

// Read configuration from current workspace. Default config file: rs.config.js
const defaultConfig = defineConfig({
    input: resolvePath('src/index.mjs'),
    output: [
        {
            file: resolvePath('dist/esm/output.mjs'),
            format: 'es'
        },
        {
            file: resolvePath('dist/umd/output.js'),
            format: 'umd'
        }
    ],
    plugins: [
        json(),
        nodeResolve(),
        commonjs(),
        babel({
            babelrc: false,
            exclude: 'node_modules/**',
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.es6', '.es'],
            babelHelpers: 'runtime',
            ...babelConfig
        }),
    ],
    external: Object.keys(fromPackage('dependencies') ?? {})
});

module.exports = async () => {
    let configFn;
    let finalConfig = defaultConfig;
    try {
        configFn = require(resolvePath(configFile));
    } catch (e) { }

    if (typeof configFn === 'function') {
        finalConfig = await Promise.resolve(configFn(defaultConfig, {
            ROOT,
            resolvePath,
            defineConfig
        }));
    }
    return finalConfig;
}