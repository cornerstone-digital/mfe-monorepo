import config from '../../config/global'
import { whitelist } from '../../middleware/dalmatian/whitelist'
import { getDalmatianConfig, IGlobalConfig, TunnelEnvs } from '@vfuk/dalmatian'

const loginRedirectConfig: IGlobalConfig['loginRedirect'] = {
  enableIdmNoRedirectParam: false,
  authenticatedOnlyPagePaths: [],
  dualModePagePaths: [['/basket', { assuranceLevel: 3 }]],
  dangerouslyEnableSessionRedirect: true,
  loginUrl: '/web-shop/login',
}

const dalmatianConfig: IGlobalConfig = getDalmatianConfig({
  debug: {
    enabled: process.env.DALMATIAN_DEBUG_ENABLED === 'true',
    password: process.env.DALMATIAN_DEBUG_PASSWORD || 'showConfig',
  },
  logger: {
    namespace: 'Web-Shop-Basket',
    masking: {
      enabled: true,
      rules: [],
    },
    enabled: process.env.DALMATIAN_LOGGER_ENABLED === 'true',
    level: process.env.DALMATIAN_LOGGER_LEVEL ? parseInt(process.env.DALMATIAN_LOGGER_LEVEL, 10) : 7,
  },
  validation: {
    bastion: {
      enabled: false,
      multiPort: false,
    },
  },
  api: {
    prefix: config.pathPrefix,
    proxyWhitelist: whitelist,
  },
  dal: {
    environment: process.env.DALMATIAN_ENVIRONMENT as TunnelEnvs,
    url: String(process.env.AWS_GATEWAY_DAL_URL),
    apiKey: String(process.env.AWS_GATEWAY_DAL_API_KEY),
    host: String(process.env.AWS_GATEWAY_HOST_HEADER),
    authSecret: String(process.env.DAL_AUTHENTICATION_SECRET),
  },
  idm: {
    authCookiePrefix: String(process.env.AUTH_COOKIE_PREFIX),
  },
  enableLoginRedirect: true,
  loginRedirect: loginRedirectConfig,
})

export default dalmatianConfig
