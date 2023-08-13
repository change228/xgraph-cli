# Introduction

Babel configuration is not user-friendly for beginners, and often we cannot understand how to use it.

The purpose of this project is to achieve Babel with just one click.

1. Babel automation configuration
2. Set babel config like "eslint --init"
3. You can choose "@babel/cli" or "rollup" as your cli

## Install

```shell
pnpm install xgraph-cli -D  // or
yarn add xgraph-cli -D  // or
npm install xgraph-cli -D  // or
```

## Commands

```shell
xgraph-cli --babel-config
```

```txt
PS D:\yourProject> xgraph-cli --babel-config
The package contains the following babel configuration files. If you continue, these files may be overwritten!
- D:\workspace\xgraph\.babelrc.cjs
√ I want to overwrite these files · No / Yes
√ How would you like to use Babel? · reuse
√ Use Typescript · No / Yes
√ What type of modules does your project use · cjs
√ Which cli to use for building? · rollup
The config that you've selected requires the following dependencies
        Babel dependencies: @babel/runtime  @babel/runtime-corejs3
     Babel devDependencies: @babel/preset-env  @babel/plugin-transform-runtime  @babel/preset-typescript
Typescript devDependencies: typescript
    Rollup devDependencies: rollup  @rollup/plugin-commonjs  @rollup/plugin-node-resolve  @rollup/plugin-babel  @rollup/plugin-typescript
√ Would you like to install them now? · No / Yes
√ I have selected it, confirm! · No / Yes
Successfully generated configuration file:
D:\workspace\xgraph\.babelrc.cjs
```

## Add shell script to pakage.json

```json
{
  "scripts": {
    "build:babel": "babel src --out-dir lib --extensions .ts",
    "build:rollup": "rollup -c"
  }
}
```
