import { Application } from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'

export default (app: Application) => {
  const getLocalProxyUrl = () => {
    return process.env[`LOCAL_FORWARD_URL`] || 'https://localhost:9000'
  }

  const localForwardUrl = getLocalProxyUrl()
  console.log('LocalForward:', localForwardUrl)
  const localForwardProxy = createProxyMiddleware(
    [
      '**',
      '!/flags/**',
      '!/flags',
      '!/basket/**',
      '!/basket',
      '!/basket/environment-vars',
      '!/web-shop/login',
      '!/web-shop/login/**',
      '!/web-shop/logout',
      '!/web-shop/logout/**',
      '!/sockjs-node/**',
      '!/nuance-chat.html**',
      '!__webpack_hmr',
      '!__webpack_hmr/**',
      '!__coverage__',
      '!__coverage__/**',
    ],
    {
      changeOrigin: true,
      secure: false,
      target: localForwardUrl,
    },
  )

  app.use(localForwardProxy)
}
