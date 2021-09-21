import { globalProvider } from '@vfuk/lib-web-analytics'
import { getValue } from '@web-shop-core/helpers/envVars'

const tealiumEnv = getValue('TEALIUM_ENVIRONMENT') || 'dev'
const tealiumTagUrl = `//tags.tiqcdn.com/utag/vodafone/uk-reinvent/${tealiumEnv}`

const getAnalyticsConfig = (reviewMode: boolean) => {
  const pageSection = reviewMode ? 'checkout' : 'basket'

  return {
    tealiumTagUrl: String(tealiumTagUrl),
    globalConfig: globalProvider({
      sessionCookiePrefix: getValue('AUTH_COOKIE_PREFIX'),
      override: {
        // Global Shared
        pageName: `uk>shop>${pageSection}`,
        pageSection: 'shop',
        pageSubsection: pageSection,
        pageLocale: 'en gb',
        pageCurrency: 'GBP',
      },
    }),
    pageConfig: {},
    eventsConfig: {},
    logging: getValue('ENABLE_UDL_LOGS') === 'true',
    env: tealiumEnv,
  }
}

export default getAnalyticsConfig
