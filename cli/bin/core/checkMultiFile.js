import fs from 'node:fs'
import path from 'node:path'
/**
 * Check if the package contains the babel configuration file
 * @param   { String }   matchStr By default, match with '. babel'
 * @returns { Promise }  babelFiles: Array
 */
const checkMultiFile = async function (matchStr = '.babel') {
  const __dirname = path.resolve()
  return new Promise((resolve, reject) => {
    return fs.readdir(__dirname, async (err, files) => {
      if (err) {
        reject(err)
        return
      }
      const babelFiles = []
      files.forEach(file => {
        if (file.includes(matchStr)) {
          babelFiles.push({
            path: path.resolve(__dirname, file),
            file: file
          })
        }
      })
      resolve(babelFiles)
    })
  })
}
export default checkMultiFile
