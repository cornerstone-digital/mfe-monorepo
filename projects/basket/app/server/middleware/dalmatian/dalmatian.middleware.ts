import { mountDalmatianMiddleware, getEShopLocalDefaults } from '@vfuk/dalmatian'
import { Application, Router } from 'express'

import { DalmatianMiddlewareOptions } from '@vfuk/dalmatian/src/dalmatian/helpers/mountDalmatianMiddleware/mountDalmatian.middleware'

import dalmatianConfig from './config'

export default (app: Application, router: Router): void => {
  if (app.get('isMockingEnabled')) return

  const middlewareConfig: DalmatianMiddlewareOptions = {
    app,
    router,
    dalmatianConfig,
  }

  if (process.env.NODE_ENV === 'development') {
    const isIdmEnabled: boolean = process.env.IDM_ENABLED === 'true'
    middlewareConfig.local = getEShopLocalDefaults(isIdmEnabled)
  }

  mountDalmatianMiddleware(middlewareConfig)
}
