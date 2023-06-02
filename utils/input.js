const fs = require('node:fs');
const { react, typescript, cmd } = require('./argv');
const { yellow, gray } = require('./colors');
const { resolvePath } = require('./resolvePath');

const mjsSrc = resolvePath('src/index.mjs');
const jsSrc = resolvePath('src/index.js');
const cjsSrc = resolvePath('src/index.cjs');
const jsxSrc = resolvePath('src/index.jsx');
const tsSrc = resolvePath('src/index.ts');
const tsxSrc = resolvePath('src/index.tsx');

function isValidCommand() {
  return ['build', 'test', 'lint'].includes(cmd);
}

function warnReact(isTsxFile) {
  if (isValidCommand()) {
    if (!react) {
      console.log(
        yellow(
          `Warning: Entry file seems to be a "${
            isTsxFile ? 'TypeScript ' : ''
          }React" module. Pass --react${
            isTsxFile ? ' and --typescript' : ''
          } to enable React compilation.`
        )
      );
      console.log(
        gray(`rollup-scripts build --react${isTsxFile ? ' --typescript' : ''}`)
      );
    } else if (isTsxFile) {
      warnTypescript(' --react');
    }
  }
}

function warnTypescript(ext) {
  if (isValidCommand()) {
    if (!typescript) {
      console.log(
        yellow(
          'Warning: Entry file seems to be a "TypeScript" module. Pass --typescript to enable Typescript compilation.'
        )
      );
      console.log(gray(`rollup-scripts build --typescript${ext ? ext : ''}`));
    }
  }
}

module.exports = {
  resolveInput() {
    if (fs.existsSync(mjsSrc)) {
      return mjsSrc;
    }
    if (fs.existsSync(jsSrc)) {
      return jsSrc;
    }
    if (fs.existsSync(cjsSrc)) {
      return cjsSrc;
    }
    if (fs.existsSync(jsxSrc)) {
      warnReact();
      return jsxSrc;
    }
    if (fs.existsSync(tsSrc)) {
      warnTypescript();
      return tsSrc;
    }
    if (fs.existsSync(tsxSrc)) {
      warnReact(true);
      return tsxSrc;
    }
    if (isValidCommand()) {
      console.log(
        yellow(
          'Warning: Entry file not detected automatically. Run the following command to configure entry file.'
        )
      );
      console.log(gray('npx rollup-scripts init'));
    }
    return mjsSrc;
  },
};
