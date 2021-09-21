import { Application } from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import config from '../config/global'

export default (app: Application) => {
  if (!config.isProd) {
    const localForwardUrl = 'http://localhost:8082'
    console.log('LocalForward:', localForwardUrl)
    const dalmatianProxy = createProxyMiddleware(['/web-shop/login/**'], {
      changeOrigin: true,
      secure: false,
      target: localForwardUrl,
    })

    app.use(dalmatianProxy)
  }
}
