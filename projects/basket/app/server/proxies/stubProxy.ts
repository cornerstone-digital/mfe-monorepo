import { Application, Request } from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'

export default (app: Application) => {
  const localForwardProxy = createProxyMiddleware(['/basket/api/basket'], {
    changeOrigin: true,
    secure: false,
    target: 'https://dal.dx-dev1-blue.internal.vodafoneaws.co.uk',
    pathRewrite: { '^/basket/api/basket/v2/basket': '/checkout-stubs/basket/v2/basket' },
    onProxyReq: (proxyReq, req: Request) => {
      if (!req.body || !Object.keys(req.body).length) {
        return
      }

      const contentType = proxyReq.getHeader('Content-Type')
      const writeBody = (bodyData: string) => {
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData))
        proxyReq.write(bodyData)
      }

      if (contentType === 'application/json') {
        writeBody(JSON.stringify(req.body))
      }
    },
  })

  app.use(localForwardProxy)
}
