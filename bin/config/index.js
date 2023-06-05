const { defineConfig } = require('rollup');
const json = require('@rollup/plugin-json');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const { babel } = require('@rollup/plugin-babel');
const terser = require('@rollup/plugin-terser');
const replace = require('@rollup/plugin-replace');
const babelConfig = require('./babelConfig');
const {
  configFile,
  fromPackage,
  getName,
  resolvePath,
  getOutputFileName,
  env,
  resolveInput,
  resolveOutputFields,
} = require('../../utils');

const commonOutputConfig = {
  name: getName(),
  exports: 'named',
  sourcemap: true,
};

const { main: pjMain, module: pjModule } = resolveOutputFields();

const defaultConfig = defineConfig({
  output: [
    {
      ...commonOutputConfig,
      file: getOutputFileName(pjModule, true),
      format: 'es',
    },
    {
      ...commonOutputConfig,
      file: getOutputFileName(pjMain, true),
      format: 'umd',
    },
    {
      ...commonOutputConfig,
      file: getOutputFileName(pjModule),
      format: 'es',
      sourcemap: false,
      plugins: [terser()],
    },
    {
      ...commonOutputConfig,
      file: getOutputFileName(pjMain),
      format: 'umd',
      sourcemap: false,
      plugins: [terser()],
    },
  ],
  plugins: [
    replace({
      values: env(),
      preventAssignment: true,
      objectGuards: true,
    }),
    json(),
    nodeResolve(),
    commonjs({
      include: 'node_modules/**',
      extensions: ['.js', '.ts'],
    }),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.es6', '.es'],
      babelHelpers: 'runtime',
      ...babelConfig,
    }),
  ],
  external: Object.keys(fromPackage('dependencies') ?? {}),
});

module.exports = async (args) => {
  let configFn;
  let finalConfig = Object.assign(defaultConfig, {
    input: resolveInput(args),
  });
  try {
    configFn = require(resolvePath(configFile));
  } catch (e) {}

  if (typeof configFn === 'function') {
    finalConfig = await Promise.resolve(configFn(defaultConfig));
  }
  return finalConfig;
};
