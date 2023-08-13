import spawn from 'cross-spawn'
import local from '../local/index.js'
/**
 * Install Modules Data
 * @typedef {Object} InstallModulesData
 * @property {string[]} InstallModulesData.names  package names group,
 * @property {string} InstallModulesData.label    package group tips,
 * @property {string} InstallModulesData.type     How to install: "runtime" | "develop"
 */
/**
 * Get the dependent packages that need to be installed
 * @param  { Object }  babelAnswer                Babel answer by "enquirer.prompt()"
 * @param  { String }  babelAnswer.buildType      Babel build type: "nothing" | "corejs" | "reuse"
 * @param  { Boolean } babelAnswer.useTypescript  Use typescript
 * @param  { String }  babelAnswer.cliType        Use cli: "@babel/cli" | "rollup"
 * @return { InstallModulesData }
 */
export const getInstallModulesData = babelAnswer => {
  const { buildType, useTypescript, cliType } = babelAnswer
  const packages = {
    dependencies: {
      names: [],
      label: '        Babel dependencies',
      type: 'runtime'
    },
    devDependencies: {
      names: ['@babel/preset-env'],
      label: '     Babel devDependencies',
      type: 'develop'
    },
    tsDevDependencies: {
      names: [],
      label: 'Typescript devDependencies',
      type: 'develop'
    },
    rollupDevDependencies: {
      names: [],
      label: '    Rollup devDependencies',
      type: 'develop'
    }
  }
  if (buildType === 'corejs') {
    packages.dependencies.names.push('@babel/runtime')
    packages.dependencies.names.push('@babel/runtime-corejs3')
  } else if (buildType === 'reuse') {
    packages.dependencies.names.push('@babel/runtime')
    packages.dependencies.names.push('@babel/runtime-corejs3')
    packages.devDependencies.names.push('@babel/plugin-transform-runtime')
  }
  if (useTypescript) {
    packages.devDependencies.names.push('@babel/preset-typescript')
    packages.tsDevDependencies.names.push('typescript')
    packages.tsDevDependencies.names.push('tslib')
  }

  if (cliType === 'rollup') {
    packages.rollupDevDependencies.names.push('rollup')
    packages.rollupDevDependencies.names.push('@rollup/plugin-commonjs')
    packages.rollupDevDependencies.names.push('@rollup/plugin-node-resolve')
    packages.rollupDevDependencies.names.push('@rollup/plugin-babel')
    packages.rollupDevDependencies.names.push('@rollup/plugin-alias')
    if (useTypescript) {
      packages.rollupDevDependencies.names.push('@rollup/plugin-typescript')
    }
  } else {
    packages.devDependencies.names.unshift('@babel/cli')
  }
  return Object.values(packages).map(group => group)
}

/**
 * Logging the package that will be installed
 * @param  { InstallModulesData } installModulesData       Babel answer by "enquirer.prompt()"
 * @return { string }
 */
export const consoleInstallModules = installModulesData => {
  const output = [local.lang['babel.selected.dependencies']]
  installModulesData.forEach(group => {
    if (group?.names?.length) {
      output.push(`${group.label}: ${group.names.join('  ')}`)
    }
  })
  return output.join('\n')
}

/**
 * Install all dependent packages
 * @param  { String[] } packages          Package names group
 * @param  { string }   packageManager    Package manager: "npm" | "yarn" | "pnpm" | "normal"
 * @param  { boolean }  develop           Is a development dependency?
 * @return { string }
 */
export const installModules = function (
  packages,
  packageManager = 'npm',
  develop = true
) {
  const installCmd = packageManager === 'yarn' ? 'add' : 'install'
  const installType = develop ? '-D' : '-S'
  spawn.sync(packageManager, [installCmd, installType].concat(packages), {
    stdio: 'inherit'
  })
}
