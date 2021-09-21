// @ts-nocheck
module.exports = function babelConfig(api) {
  api.cache(true)

  const presets = ['@babel/preset-env', '@babel/preset-typescript']

  const plugins = [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-class-properties',
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@basketMocks': './__mockapi__/responses',
          '@containers': './src/containers',
          '@helpers': './src/helpers',
          '@server': './src/server',
          '@shared': './src/shared',
        },
      },
    ],
  ]

  return {
    presets,
    plugins,
  }
}
