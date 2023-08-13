#!/usr/bin/env node
import path from 'node:path'
import fs from 'node:fs'
import stringify from 'json-stable-stringify-without-jsonify'
// import { info, error } from './core/logging.js'
import * as log from './core/logging.js'
import { write } from './core/write.js'
import checkMultiFile from './core/checkMultiFile.js'
import { replaceTemplate } from './core/replaceTemplate.js'
import local from './local/index.js'
import rollupTemplate from './rollupConfig/rollupTemplate.js'
import {
  checkAnswer,
  babelConfigAnswer,
  installAnswers
} from './answers/index.js'
import processConfigs from './processConfigs/index.js'
import {
  getInstallModulesData,
  consoleInstallModules,
  installModules
} from './core/installModules.js'
!(async function () {
  const __dirname = path.resolve()
  if (process.argv.includes('--babel-config')) {
    /**---------------------------------------------------
     * A1. Find the babel configuration for the current package
     * A2. If found, prompt to overwrite
     *---------------------------------------------------*/
    const containBabelFiles = await checkMultiFile()
    if (containBabelFiles && containBabelFiles.length) {
      log.warning(local.lang['babel.check.old.config'])
      containBabelFiles.forEach(item => {
        log.warning(`- ${item.path}`)
      })
      const checkBabel = await checkAnswer()
      if (!checkBabel.overwrite) {
        return
      }
    }
    /**---------------------------------------------------
     * B1. Asking users how to use babel
     * B2. Based on the answer, obtain the Babel configuration and the packages that need to be installed
     *---------------------------------------------------*/
    const babelConfigAnswers = await babelConfigAnswer()
    const modulesData = getInstallModulesData(babelConfigAnswers)
    log.info(consoleInstallModules(modulesData))
    /**---------------------------------------------------
     * C1. Ask the user if they want to install it
     *---------------------------------------------------*/
    const babelInstallAnswers = await installAnswers()
    const install =
      babelInstallAnswers.install &&
      babelInstallAnswers.installConfirmAgain &&
      babelInstallAnswers.packageManager !== 'normal'
    if (install) {
      modulesData.forEach(async moduleGroup => {
        await installModules(
          moduleGroup.names,
          babelInstallAnswers.packageManager,
          moduleGroup.type
        )
      })
    }
    /**---------------------------------------------------
     * D1. Generate Babel configuration file
     *---------------------------------------------------*/
    const configs = processConfigs(babelConfigAnswers)
    const filePath = `.babelrc.${babelConfigAnswers.moduleType}`
    write(configs, filePath)
    const configFile = path.resolve(__dirname, filePath)
    console.log(`----------------------------------------------`)
    log.success(`${local.lang['babel.generate.file.success']}: `)
    log.success(path.resolve(configFile))

    /**---------------------------------------------------
     * E1. Check for duplicate babel configuration files
     *---------------------------------------------------*/
    const allBabelConfigFiles = await checkMultiFile()
    if (allBabelConfigFiles?.length > 1) {
      log.warning(local.lang['babel.check.config'])
      allBabelConfigFiles.forEach(item => {
        log.warning(`- ${path.resolve(item.path)}`)
      })
    }
    /**---------------------------------------------------
     * F1. Generate Rollup configuration file
     *---------------------------------------------------*/
    if (babelConfigAnswers.cliType !== 'rollup') {
      return
    }
    const configRollupPluginBabel = processConfigs(babelConfigAnswers, 'rollup')
    const templateContents = {
      typescriptPluginImport:
        'import typescript from "@rollup/plugin-typescript"',
      inputFile: babelConfigAnswers.useTypescript
        ? '"./src/index.ts"'
        : '"./src/index.js"',
      typescriptPlugin: 'typescript(),',
      babelPlugin: stringify(configRollupPluginBabel, {
        space: 2
      })
    }
    if (!babelConfigAnswers.useTypescript) {
      templateContents.typescriptPluginImport = ' '
      templateContents.typescriptPlugin = ' '
    }

    const configsRollup = await replaceTemplate(
      rollupTemplate,
      templateContents
    )
    log.info(
      `${local.lang['package.shell']}: babel src --out-dir lib --extensions ".ts,.js,.cjs,.mjs,.json"`
    )
    /**---------------------------------------------------
     * H1. Check for duplicate babel configuration files
     *---------------------------------------------------*/
    const filePathRollup = 'rollup.config.js'
    const configFileRollup = path.resolve(__dirname, filePathRollup)
    fs.writeFileSync(configFileRollup, configsRollup, 'utf8')
    console.log(`----------------------------------------------`)
    log.success(`${local.lang['rollup.generate.file.success']}: `)
    log.success(path.resolve(configFileRollup))
    log.info(`${local.lang['package.shell']}: "rollup -c"`)
    const allRollupConfigFiles = await checkMultiFile('rollup.')
    if (allRollupConfigFiles?.length > 1) {
      log.warning(local.lang['rollup.check.config'])
      allRollupConfigFiles.forEach(item => {
        log.warning(local.lang[`- ${path.resolve(item.path)}`])
      })
    }
  }
})()
