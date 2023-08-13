import enquirer from 'enquirer'
import local from '../local/index.js'
const installAnswers = async () => {
  return await enquirer.prompt([
    {
      type: 'toggle',
      name: 'install',
      message: local.lang['babel.install.now'],
      enabled: 'Yes',
      disabled: 'No',
      initial: 1
    },
    {
      type: 'select',
      name: 'packageManager',
      message: local.lang['babel.install.pkg.manager'],
      initial: 2,
      choices: [
        { message: 'npm', name: 'npm' },
        { message: 'yarn', name: 'yarn' },
        { message: 'pnpm', name: 'pnpm' },
        {
          message: local.lang['babel.only.generate.file'],
          name: 'normal'
        }
      ],
      skip() {
        return !this.state.answers.install
      }
    },
    {
      type: 'toggle',
      name: 'installConfirmAgain',
      message: local.lang['babel.install.confirm.again'],
      enabled: 'Yes',
      disabled: 'No',
      initial: 1,
      skip() {
        return this.state.answers.packageManager === 'normal'
      }
    }
  ])
}
export default installAnswers
