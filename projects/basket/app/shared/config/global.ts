import { GlobalConfig, FlagConfig } from '@shared/types/global'
import { csvKeyValToObject } from '@helpers/combiCrossSell/csvKeyValToObject'
import { LogLevels } from '@cornerstone-digital/loggerhead'

const featureFlags: FlagConfig[] =
  Object.entries(csvKeyValToObject(process.env.FEATURE_FLAGS)).map(([key, enabled]) => {
    return {
      group: 'feature',
      key,
      enabled,
      flags: [],
    }
  }) || []

const globalConfig: GlobalConfig = {
  environment: 'int1',
  stubApis: process.env.STUB_APIS === 'true' || String(process.env.DALMATIAN_ENVIRONMENT).toLowerCase().includes('dev1'),
  http: {
    port: 8000,
    robots: 'User-agent: *\nDisallow:',
    methodWhiteList: ['GET', 'POST', 'HEAD', 'PUT', 'DELETE'],
    headers: {
      cache: {
        msToExpiry: 3600000,
      },
    },
  },
  cdnDomain: process.env.NODE_ENV === 'development' || !process.env.CDN_DOMAIN ? '' : process.env.CDN_DOMAIN,
  isProd: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
  logger: {
    namespace: 'web-shop-basket',
    masking: {
      enabled: false,
      rules: [],
    },
    enabled: process.env.DALMATIAN_LOGGER_ENABLED === 'true',
    level: Number(process.env.DALMATIAN_LOGGER_LEVEL || 7) as LogLevels,
  },
  validation: {
    bastion: {
      enabled: false,
      multiPort: false,
    },
  },
  pathPrefix: '/basket',
  state: {
    persist: true,
  },
  strictMode: true,
  featureFlags: {
    enabled: true,
    flags: featureFlags,
  },
  dal: {
    versioning: {
      enabled: process.env.DALMATIAN_VERSIONING_ENABLED === 'true',
      catalogueVersion: String(process.env.DALMATIAN_CATALOGUE_VERSION),
    },
  },
}

export default globalConfig
