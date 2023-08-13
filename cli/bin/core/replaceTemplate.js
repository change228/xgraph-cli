/* eslint-disable no-async-promise-executor */
import fs from 'node:fs'
import path from 'node:path'
const __dirname = path.resolve()
/**
 * Check if the file name is correct
 * @param { String }  filePath
 * @return { String } Promise
 * */
const checkFilePath = filePath => {
  return new Promise(async resolve => {
    try {
      const fullFilePath = path.resolve(__dirname, filePath)
      await fs.promises.access(fullFilePath)
      resolve(fullFilePath)
    } catch (error) {
      console.log(
        'Please enter the correct file relative address! For example: "./src/README.md"'
      )
    }
  })
}
/**
 * Compile templates and replace content
 * @param { String }  templateSource    Template source data
 * @param { Object }  templateContents  Replace {{templateName}} to "****"
 * @return { String } Promise
 * */
const replaceTemplate = async function (templateSource, templateContents) {
  const matchTemplates = templateSource.match(/\{\{.*?\}\}/g)
  const templateNames = matchTemplates.map(item =>
    item.replace('{{', '').replace('}}', '')
  )
  let outputData = templateSource
  for (let i = 0; i < matchTemplates.length; ++i) {
    try {
      const matchTemplate = matchTemplates[i]
      const templateName = templateNames[i]
      let templateContent = templateContents[templateName]
      if (!templateContent) {
        throw new Error(
          `Unable to find the desired template compilation context: {{${templateName}}}`
        )
      }
      outputData = await outputData.replace(matchTemplate, templateContent)
    } catch (err) {
      console.log(err)
      break
    }
  }
  return outputData
}

export { checkFilePath, replaceTemplate }
