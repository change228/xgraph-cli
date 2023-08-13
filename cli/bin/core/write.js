import fs from 'node:fs'
import path from 'node:path'
import stringify from 'json-stable-stringify-without-jsonify'

const clearExtName = function (filePath) {
  const extName = path.extname(filePath)
  return filePath.replace(extName, '')
}
const writeConfigFile = async function (config, filePath, exportPreStr = '') {
  const stringifiedContent = `${exportPreStr}${stringify(config, {
    space: 2
  })}\n`
  if (path.extname(filePath) === '.json') {
    filePath = clearExtName(filePath)
  }
  fs.writeFileSync(filePath, stringifiedContent, 'utf8')
}

const write = function (content, filePath) {
  switch (path.extname(filePath)) {
    case '.js':
      writeConfigFile(content, filePath, 'export default ')
      break
    case '.cjs':
      writeConfigFile(content, filePath, 'module.exports = ')
      break
    case '.json':
      writeConfigFile(content, filePath)
      break
    default:
      throw new Error("Can't write to unknown file type.")
  }
}

export { write, writeConfigFile }
