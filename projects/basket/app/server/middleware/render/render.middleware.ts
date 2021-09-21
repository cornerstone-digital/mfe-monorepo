import { Application, Response, Request } from 'express'
import config from '../../config/global'
import { GlobalConfig, ClientGlobalVars } from '@shared/types/global'

export default (app: Application) => {
  const globalConfig: GlobalConfig = config
  const tealiumEnv = process.env.TEALIUM_ENVIRONMENT || 'dev'
  const clientUtagScripts = `

<script type='text/javascript'>window.utag_cfg_ovrd = {noview : true};</script>
<script type='text/javascript' src='//tags.tiqcdn.com/utag/vodafone/uk-reinvent/${tealiumEnv}/utag.sync.js'></script>
<script type='text/javascript' src='//tags.tiqcdn.com/utag/vodafone/uk-reinvent/${tealiumEnv}/utag.js'></script>
`

  // Serve templated HTML
  app.get(
    `/*`,
    async (_req: Request, res: Response): Promise<void> => {
      const clientGlobalVars: ClientGlobalVars = {
        env: {
          TEALIUM_ENVIRONMENT: tealiumEnv,
          ASSET_URL: process.env.ASSET_URL || '',
          CDN_DOMAIN: process.env.CDN_DOMAIN || '',
          AUTH_COOKIE_PREFIX: process.env.AUTH_COOKIE_PREFIX || '',
          FUT_PROD_WHITELIST_DOMAINS: process.env.FUT_PROD_WHITELIST_DOMAINS || '',
          ENABLE_UDL_LOGS: process.env.ENABLE_UDL_LOGS || 'false',
          DALMATIAN_ENVIRONMENT: process.env.DALMATIAN_ENVIRONMENT || '',
          ENABLE_DATADOG_RUM: process.env.ENABLE_DATADOG_RUM || '',
        },
        vfukTnt: {
          basket: {},
        },
        basketData: {
          financialInfo: [],
        },
      }

      res.render('index.html', {
        vfuk: JSON.stringify(clientGlobalVars),
        utag: clientUtagScripts,
        dalmatianPrefix: globalConfig.pathPrefix,
      })
    },
  )
}
