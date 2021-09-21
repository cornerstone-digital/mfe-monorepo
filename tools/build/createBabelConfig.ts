export type BabelConfigEntry = string | [string, object]

export interface BabelConfigType {
  presets?: BabelConfigEntry[]
  plugins?: BabelConfigEntry[]
}

const createBabelConfig = (
  customPresets: BabelConfigEntry[],
  customPlugins: BabelConfigEntry[],
  customAliases: { [key: string]: string } = {},
): BabelConfigType => {
  let presets: BabelConfigEntry[] = [
    '@babel/preset-env',
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
    '@babel/preset-typescript',
  ]

  let plugins: BabelConfigEntry[] = [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-react-display-name',
    [
      '@babel/plugin-transform-react-jsx',
      {
        runtime: 'automatic',
      },
    ],
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-optional-chaining',
    'babel-plugin-styled-components',
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
    '@babel/plugin-proposal-class-properties',
    'jsx-control-statements',
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: false,
        helpers: false,
        useESModules: true,
      },
    ],
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@web-core': '@vfuk/web-core',
          '@web-cms-core': '@vfuk/web-cms-core',
          '@web-shop-core': '@vfuk/web-shop-core',
          '@lib-web-analytics': '@vfuk/lib-web-analytics',
          ...customAliases,
        },
      },
    ],
  ]

  if (customPresets) presets = presets.concat(customPresets)
  if (customPlugins) presets = presets.concat(customPlugins)

  return {
    presets,
    plugins,
  }
}

export default createBabelConfig
