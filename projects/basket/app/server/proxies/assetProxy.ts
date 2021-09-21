import { createProxyMiddleware } from 'http-proxy-middleware'
import { Application } from 'express'
import expressStaticGzip from 'express-static-gzip'
import config from '../config/global'
import { ServerResponse } from 'http'

export default (app: Application, staticPath: string) => {
  const assetUrl = 'http://www.vodafone.co.uk'
  const assetProxy = createProxyMiddleware('/en/assets', { changeOrigin: true, target: assetUrl })
  let enableBrotli = true

  if (!config.isProd) {
    app.use('/en/assets', assetProxy)
    enableBrotli = false
  }

  const { msToExpiry } = config.http.headers.cache

  app.use(
    `${config.pathPrefix}/assets`,
    expressStaticGzip(staticPath, {
      enableBrotli,
      serveStatic: {
        fallthrough: false,
        setHeaders: (res: ServerResponse) => {
          res.setHeader('Cache-Control', 'public, max-age=3600')
          res.setHeader('Expires', new Date(Date.now() + msToExpiry).toUTCString())
        },
      },
    }),
  )
}
