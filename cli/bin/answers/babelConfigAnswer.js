import enquirer from 'enquirer'
import local from '../local/index.js'
const babelConfigAnswer = async () => {
  return await enquirer.prompt([
    {
      type: 'select',
      name: 'buildType',
      message: local.lang['babel.answer.use.babel'],
      initial: 2,
      choices: [
        {
          message: local.lang['babel.config.nothing'],
          name: 'nothing'
        },
        {
          message: local.lang['babel.config.corejs'],
          name: 'corejs'
        },
        {
          message: local.lang['babel.config.transform'],
          name: 'reuse'
        }
      ]
    },
    {
      type: 'toggle',
      name: 'useTypescript',
      message: local.lang['babel.use.ts'],
      enabled: 'Yes',
      disabled: 'No',
      initial: 0
    },
    {
      type: 'select',
      name: 'moduleType',
      message: local.lang['babel.module.type'],
      initial: 0,
      choices: [
        { message: 'CommonJS (require/exports)', name: 'cjs' },
        { message: 'JavaScript modules (import/export)', name: 'js' },
        { message: 'JSON file', name: 'json' }
      ]
    },
    {
      type: 'select',
      name: 'cliType',
      message: local.lang['babel.build.cli'],
      initial: 0,
      choices: [
        {
          message: '@babel/cli',
          name: 'babel'
        },
        {
          message: 'rollup',
          name: 'rollup'
        }
      ]
    }
  ])
}
export default babelConfigAnswer
