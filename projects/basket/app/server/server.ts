import './middleware/datadog/datadog.middleware'
import { resolve } from 'path'

import express, { Request, Response, NextFunction, Application } from 'express'
import cookieParser from 'cookie-parser'
import ejs from 'ejs'

// Utils
import Logger from './utils/logger'

// Middleware
import featureFlaggingMiddleware, { initFeatureFlagService } from './middleware/featureFlagging/featureFlagging.middleware'
import renderMiddleware from './middleware/render/render.middleware'
import dalmatianMiddleware from './middleware/dalmatian/dalmatian.middleware'
import mockingMiddleware from './middleware/mocking/mocking.middleware'

// Proxies
import proxies from './proxies'

// Config
import config from './config/global'
import { GlobalConfig } from './types/global'

// @ts-ignore
import healthCheck from '@vfuk/lib-web-health-checks'
import healthCheckConfig from './healthCheck.config'

const getAssetPath = (env: string) => {
  if (env === 'development') return resolve(process.cwd(), './build/client/assets')

  return resolve(process.cwd(), '/build/client/assets')
}

class MainServer {
  private app: Application = express()
  private logger: Logger = new Logger('Server', config.logger)
  private config: GlobalConfig = config
  private staticPath: string = getAssetPath(String(process.env.NODE_ENV))

  private mountMiddleware() {
    this.app.use((req: Request, _res: Response, next: NextFunction) => {
      const cleanedUrl = req.url.replace(/\/digital\/v[1-9]/i, '')
      if (cleanedUrl !== req.url) {
        req.url = cleanedUrl
        return next()
      } else {
        return next()
      }
    })

    // apiCacheMiddleware(this.app)
    this.app.use(cookieParser())
    this.app.use(express.json({ limit: '2mb' }))
    this.app.use(express.urlencoded({ extended: true, limit: '2mb' }))
    this.app.use(initFeatureFlagService)
    featureFlaggingMiddleware(this.app)
    mockingMiddleware(this.app)
    dalmatianMiddleware(this.app, express.Router())
    renderMiddleware(this.app)
  }

  private configureProxies() {
    proxies.assetProxy(this.app, this.staticPath)
    // proxies.dalmatianProxy(this.app) // comment in to use Dalmatian's playground server locally
    if (process.env.STUB_APIS === 'true') {
      console.log('stubbing')
      proxies.stubProxy(this.app)
    }
    if (process.env.NODE_ENV === 'development' && process.env.CYPRESS_RUN !== 'true') {
      console.log('env proxy mounting')
      proxies.envProxy(this.app)
    }
  }

  public bootstrap() {
    ejs.delimiter = '?srv' // differentiate from webback templating which uses % as a delimiter

    this.logger.debug('Bootstapping server')

    this.app.disable('x-powered-by')
    this.app.enable('trust proxy')
    this.app.set('views', this.staticPath)
    this.app.engine('html', ejs.renderFile)
    this.app.set('view engine', 'html')

    healthCheck.init(this.app, healthCheckConfig)
    this.configureProxies()
    this.mountMiddleware()

    return this
  }

  public setGlobalConfig(globalConfig: GlobalConfig) {
    this.config = globalConfig

    return this
  }

  public setApp(app: Application) {
    this.app = app

    return this
  }

  public startServer() {
    this.app.listen(this.config.http.port, () => {
      console.log('Listening on port', this.config.http.port)
    })
  }
}

export default new MainServer()
