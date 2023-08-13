import chalk from 'chalk'
export const info = function (message) {
  console.log(chalk.blue(message))
}
export const success = function (message) {
  console.log(chalk.green(message))
}
export const warning = function (message) {
  console.log(chalk.yellow(message))
}
export const error = function (message) {
  console.log(chalk.bgRed(message))
}
