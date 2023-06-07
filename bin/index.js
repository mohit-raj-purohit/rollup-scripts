#!/usr/bin/env node
const { build, init } = require('./rollup-scripts');
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const { CONFIG_FILE } = require('../constants');

yargs(hideBin(process.argv))
  .scriptName('rollup-scripts')
  .usage('$0 <cmd> [args]')
  .command(
    'build',
    'Build rollup library',
    (yargs) => {
      return yargs
        .option('typescript', {
          default: false,
          type: 'boolean',
          describe: 'Enable typescript compilation',
          alias: 't',
        })
        .option('react', {
          default: false,
          type: 'boolean',
          describe: 'Enable react compilation',
          alias: 'r',
        })
        .option('configFile', {
          default: CONFIG_FILE,
          type: 'string',
          describe: 'Provide custom rollup configuration',
          alias: 'c',
        });
    },
    (args) => {
      build(args);
    }
  )
  .command(
    'init',
    'Setup "rs.config.js" file',
    (yargs) => yargs,
    () => {
      init();
    }
  )
  .demandCommand(
    1,
    'Rollup scripts require at least one command. Check --help for more details!'
  )
  .help().argv;
