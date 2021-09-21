import { RouteConfig } from 'react-router-config'

import FeatureFlags from './pages/FeatureFlags/FeatureFlags'
import BasketPage from './pages/BasketPage'
import VFUK from '@web-shop-core/helpers/environmentVariables'
import MainTemplate from './templates/mainTemplate/MainTemplate'

const disableFeatureFlagPage = (): boolean => {
  const futProdWhiteListDomains: string[] = VFUK.env.FUT_PROD_WHITELIST_DOMAINS ? VFUK.env.FUT_PROD_WHITELIST_DOMAINS.split(',') : []
  return VFUK.env.TEALIUM_ENVIRONMENT === 'prod' && !futProdWhiteListDomains.includes(window.location.hostname)
}

const routes: RouteConfig[] = [
  {
    component: MainTemplate,
    routes: [
      {
        path: ['/basket'],
        exact: true,
        component: BasketPage,
      },
      {
        path: '/basket/feature-flags',
        exact: true,
        component: disableFeatureFlagPage() ? BasketPage : FeatureFlags,
      },
    ],
  },
]

export default routes
