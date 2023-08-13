module.exports = {
  "plugins": [
    [
      "@babel/transform-runtime",
      {
        "absoluteRuntime": false,
        "corejs": 3,
        "helpers": true,
        "regenerator": true
      }
    ]
  ],
  "presets": [
    "@babel/env",
    "@babel/typescript"
  ]
}
