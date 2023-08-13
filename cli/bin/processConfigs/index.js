/**
 * Generate Babel configuration json
 * @param { Object } answers Babel Config Answers
 * @param { String } cli     cli: "babel" | "rollup"
 * @returns { Object } configs
 */
const processConfigs = function (answers, cliType = 'babel') {
  const { buildType, useTypescript } = answers
  const ts = useTypescript && cliType === 'babel'
  const configs = {
    presets: setPresets(buildType, ts, cliType)
  }
  if (buildType === 'reuse') {
    configs.plugins = setPlugins()
  }
  if (cliType === 'rollup') {
    configs.allowAllFormats = true
  }
  return configs
}

/**
 * Set presets config
 * @param { String }  buildType      type:    nothing | corejs | reuse
 * @param { Boolean } useTypescript  boolean: true | false
 * @returns { Array } presets
 */
const setPresets = (buildType, useTypescript, cliType) => {
  let presets = []
  const babelPreset = '@babel/env'
  const tsPreset = '@babel/typescript'
  if (buildType === 'corejs') {
    const useBuiltIns =
      cliType === 'rollup'
        ? { useBuiltIns: 'usage', corejs: '3.22', modules: 'amd' }
        : { useBuiltIns: 'usage', corejs: '3.22' }
    if (useTypescript) {
      presets = [[babelPreset, useBuiltIns], tsPreset]
    } else {
      presets = [[babelPreset, useBuiltIns]]
    }
  } else {
    if (useTypescript) {
      presets =
        cliType === 'rollup'
          ? [[babelPreset, { modules: 'amd' }], tsPreset]
          : [babelPreset, tsPreset]
    } else {
      presets =
        cliType === 'rollup'
          ? [[babelPreset, { modules: 'amd' }]]
          : [babelPreset]
    }
  }

  return presets
}

/**
 * Set plugins config
 * @returns { Array } plugins
 */
const setPlugins = () => {
  const plugins = []
  const runtimePlugin = setRuntimePlugin()
  plugins.push(runtimePlugin)
  return plugins
}

/**
 * Set @babel/plugin-transform -runtime
 * @returns { Array } Runtime plugin
 */
const setRuntimePlugin = () => {
  return [
    '@babel/transform-runtime',
    {
      absoluteRuntime: false,
      corejs: 3,
      helpers: true,
      regenerator: true
    }
  ]
}
export default processConfigs
