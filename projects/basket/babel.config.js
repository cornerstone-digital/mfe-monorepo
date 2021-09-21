require('ts-node').register()

const getBaseBabelConfig = require('../../tools/build/createBabelConfig').default
const babelConfig = require('./custom.babel')

module.exports = getBaseBabelConfig(babelConfig.presets, babelConfig.plugins, babelConfig.customAliases)
