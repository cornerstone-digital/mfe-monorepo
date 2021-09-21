import webpack, { Configuration } from 'webpack'

export const createDevServer = (webpackConfig: Configuration, options: any) => {
  const webpackDevServer = require('webpack-dev-server')
  webpackDevServer.addDevServerEntrypoints(webpackConfig, options)
  const compiler = webpack(webpackConfig)
  return new webpackDevServer(compiler, options)
}

export default createDevServer
