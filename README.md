[![CodeQL](https://github.com/scssyworks/rollup-scripts/actions/workflows/codeql.yml/badge.svg)](https://github.com/scssyworks/rollup-scripts/actions/workflows/codeql.yml)

# Rollup scripts

Rollup scripts is a highly configurable "zero configuration" bundler for
libraries.

### What does that mean?

Rollup scripts work out of the box for most cases, means you don't have to spend
time setting up configuration files for your projects. However, in special use
cases, rollup scripts makes it super easy for you to setup configuration.

```sh
# Configure rollup
npx rollup-scripts init
```

# Roadmap

<<<<<<< HEAD

======= >>>>>>> b01b096 (Update README.md)
https://github.com/scssyworks/rollup-scripts/blob/main/ROADMAP.md

# Getting started

1. Create an npm project

```sh
npm init
```

2. Install `rollup-scripts`. **NOTE:** Do not install this package globally!

```sh
npm i -D --save-exact rollup-scripts
```

3. If you are using a forked repository and want to test your changes:

```sh
npm i -D --save-exact github:{your username}/rollup-scripts
```

4. Create `src` folder and an entry file `index.mjs` with a valid `JavaScript`
   code.

```sh
mkdir src
touch src/index.mjs
```

5. Update `package.json` file as follows

```json
{
  "main": "dist/umd/index.js",
  "module": "dist/esm/index.mjs",
  "scripts": {
    "build": "rollup-scripts build",
    "lint": "rollup-scripts lint"
  }
}
```

6. Run command `npm run build` to compile the code.

## NOTE:

Rollup scripts supports compilation for `JavaScript`, `TypeScript`, `React` and
`Preact` projects.

```sh
npx rollup-scripts build
```

# Available commands

Rollup scripts at the moment supports `init`, `build` and `lint` commands. For
more details run:

```sh
npx rollup-scripts --help
npx rollup-scripts build --help
```

## This package is currently experimental and in active development. Version 0.0.x is unstable and should be used only for trial purposes.

<<<<<<< HEAD

======= >>>>>>> b01b096 (Update README.md) Raise a defect here:
https://github.com/scssyworks/rollup-scripts/issues
