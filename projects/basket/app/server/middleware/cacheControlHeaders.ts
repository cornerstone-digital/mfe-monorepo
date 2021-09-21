import { resolve } from 'path'

import expressStaticGzip from 'express-static-gzip'

import { Router, Request, Response, NextFunction } from 'express-serve-static-core'

import config from '@server/config/global'
import { ServerResponse } from 'http'

const { msToExpiry } = config.http.headers.cache

const cacheControlHeaders = (router: Router) => {
  let enableBrotli: boolean = true
  let staticPath: string = resolve(process.cwd(), '/build/client/assets')

  if (process.env.NODE_ENV === 'development') {
    enableBrotli = false
    staticPath = resolve(process.cwd(), 'build/assets')
  }

  router.use(
    '/assets',
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

  return (_req: Request, _res: Response, next: NextFunction) => {
    next()
  }
}

export default cacheControlHeaders
