module.exports = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  singleQuote: true,
  semi: false,
  trailingComma: 'none',
  bracketSpacing: true,
  arrowParens: 'avoid',
  proseWrap: 'preserve',
  jsxBracketSameLine: true,
  htmlWhitespaceSensitivity: 'ignore',
  overrides: [
    {
      files: '*.html',
      options: {
        parser: 'html'
      }
    }
  ]
}
