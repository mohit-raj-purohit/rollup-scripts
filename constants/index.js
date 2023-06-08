const fs = require('node:fs');
const path = require('node:path');

const SCRIPT_NAME = 'rollup-scripts';

const ROOT = fs.realpathSync(process.cwd());
const SCRIPT_ROOT = path.resolve(__dirname, '../');
const CONFIG_FILE = 'rs.config.js';
const OUT = 'dist/umd/output.js';

const EXT_REGEX = /\.(j|mj|cj|t)sx?$/;
const INDEX_REGEX = /index\.(j|mj|cj|t)sx?$/;

const SUPPORTED_BABEL_FILES = [
  /^babel\.config\.(j|mj|cj|ct)s$/,
  /^babel\.config\.json$/,
  /^\.babelrc\.(j|mj|cj|ct)s$/,
  /^\.babelrc\.json$/,
  /^\.babelrc$/,
];

const MSG_COMPILE = 'Compiling...';
const MSG_COMPILED = 'Compiled in';
const MSG_EMITTED = 'Emitted:';
const MSG_BABELRC = (babelrcFile) => `Using "${babelrcFile}"`;
const MSG_CHECKBABEL = 'Checking babelrc...';
const MSG_CONFIG = (filename) => `Created "${filename}" in project root.`;
const MSG_CONFIGBABEL = 'Created ".babelrc" in project root.';
const ERR_NOTFOUND = 'File not found!';
const ERR_ENTRYFILE =
  'Warning: Entry file not detected automatically. Run the following command to configure entry file.';
const ERR_ENTRYTYPESCRIPT =
  'Warning: Entry file seems to be a "TypeScript" module. Pass --typescript to enable Typescript compilation.';
const ERR_REACT = (isTsxFile) =>
  `Warning: Entry file seems to be a "${
    isTsxFile ? 'TypeScript ' : ''
  }React" module. Pass --react${
    isTsxFile ? ' and --typescript' : ''
  } to enable React compilation.`;

const CMD_INIT = `npx ${SCRIPT_NAME} init`;
const CMD_BUILD = ({ typescript, react }) =>
  `npx ${SCRIPT_NAME} build${react ? ' --react' : ''}${
    typescript ? ' --typescript' : ''
  }`;

module.exports = {
  ROOT,
  SCRIPT_ROOT,
  CONFIG_FILE,
  EXT_REGEX,
  INDEX_REGEX,
  OUT,
  ERR_NOTFOUND,
  ERR_ENTRYFILE,
  ERR_ENTRYTYPESCRIPT,
  ERR_REACT,
  SUPPORTED_BABEL_FILES,
  MSG_EMITTED,
  MSG_COMPILE,
  MSG_COMPILED,
  MSG_BABELRC,
  MSG_CHECKBABEL,
  MSG_CONFIG,
  MSG_CONFIGBABEL,
  CMD_BUILD,
  CMD_INIT,
  SCRIPT_NAME,
};
