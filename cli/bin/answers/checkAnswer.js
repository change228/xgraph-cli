import enquirer from 'enquirer'
import local from '../local/index.js'
const checkAnswer = async () => {
  return await enquirer.prompt([
    {
      type: 'toggle',
      name: 'overwrite',
      message: local.lang['babel.check.overwrite.files'],
      enabled: 'Yes',
      disabled: 'No',
      initial: 0
    }
  ])
}
export default checkAnswer
