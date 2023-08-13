import en_US from './en_US.js'
import zh_CN from './zh_CN.js'
const lang = process.env.LANG.includes('zh_CN') ? zh_CN : en_US
export default {
  lang
}
