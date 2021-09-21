import { BabelConfigEntry } from '../../tools/build/createBabelConfig'

export const customAliases = {
  '@basketMocks': './__mockapi__/responses',
  '@components': './app/client/components',
  '@constants': './app/client/constants',
  '@containers': './app/client/containers',
  '@cypress-root': './cypress',
  '@helpers': './app/client/helpers',
  '@hooks': './app/client/hooks',
  '@pages': './app/client/pages',
  '@server': './app/server',
  '@shared': './app/shared',
  '@store': './app/client/store',
  '@utilities': './app/client/utilities',
  '@tools': './tools',
}

export const presets: BabelConfigEntry[] = []
export const plugins: BabelConfigEntry[] = []
