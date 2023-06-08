#!/usr/bin/env node
const { build, init } = require('./rollup-scripts');
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const { CONFIG_FILE } = require('../constants');

const verboseConfig = {
  default: false,
  type: 'boolean',
  describe: 'Show full error logs',
  alias: 'v',
};

const typescriptConfig = {
  default: false,
  type: 'boolean',
  describe: 'Enable typescript compilation',
  alias: 't',
};

const reactConfig = {
  default: false,
  type: 'boolean',
  describe: 'Enable react compilation',
  alias: 'r',
};

yargs(hideBin(process.argv))
  .scriptName('rollup-scripts')
  .usage('$0 <cmd> [args]')
  .command(
    'build',
    'Build rollup library',
    (yargs) => {
      return yargs
        .option('typescript', typescriptConfig)
        .option('react', reactConfig)
        .option('configFile', {
          default: CONFIG_FILE,
          type: 'string',
          describe: 'Provide custom rollup configuration',
          alias: 'c',
        })
        .option('verbose', verboseConfig);
    },
    (args) => {
      build(args);
    }
  )
  .command(
    'init',
    'Setup "rs.config.js" file',
    (yargs) => {
      return yargs
        .option('babelrc', {
          default: false,
          type: 'boolean',
          describe: 'Enable babelrc instead of built-in configuration',
          alias: 'b',
        })
        .option('typescript', typescriptConfig)
        .option('react', reactConfig)
        .option('verbose', verboseConfig);
    },
    (args) => {
      init(args);
    }
  )
  .demandCommand(
    1,
    'Rollup scripts require at least one command. Check --help for more details!'
  )
  .help().argv;
