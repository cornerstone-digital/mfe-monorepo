import { Application, NextFunction, Request, Response } from 'express'
import path from 'path'
import fs from 'fs'
import Logger from '../../utils/logger'
import globalConfig from '../../config/global'
import { getMockDataForSpecificEndpoint } from './getMockDataForSpecificEndpoint'

const logger = new Logger('MockingMiddleware', globalConfig.logger)

const isMockingEnabled = (req: Request) => {
  return req.cookies['basketMock']
}

const mockingMiddleware = (app: Application) => {
  if (process.env.NODE_ENV !== 'development') {
    return
  }

  const fixturesPath = path.resolve(path.join(process.cwd(), './cypress/fixtures'))

  app.use((req: Request, _res: Response, next: NextFunction) => {
    // @ts-ignore
    app.set('isMockingEnabled', isMockingEnabled(req))
    next()
  })

  logger.debug('Mocking middleware mounted')
  app.get('/basket/auth/session', (req: Request, res: Response, next: NextFunction) => {
    if (!app.get('isMockingEnabled')) return next()
    logger.debug('Auth Mock hit')
    return res.status(204).send()
  })

  app.get('/basket/api/content/asset', (req: Request, res: Response, next: NextFunction) => {
    if (!app.get('isMockingEnabled')) return next()

    const { assetName } = req.query
    if (assetName) {
      logger.debug('Asset Mock Hit:', assetName)

      const contentMock = JSON.parse(
        fs.readFileSync(`${fixturesPath}/_default/assets/${assetName.toString().toLowerCase()}.json`, { encoding: 'utf8' }),
      )

      return res.status(200).send(contentMock)
    }

    return res.status(200).send({})
  })

  const postRequest = (req: Request, res: Response, next: NextFunction) => {
    if (!app.get('isMockingEnabled')) {
      return next()
    }
    return res.status(200).send(getMockDataForSpecificEndpoint(req))
  }

  app.post('/basket/api/basket/v2/basket/*/package', postRequest)

  app.post('/basket/api/basket/v2/basket/*/package/*/productLine/*', postRequest)

  app.post('/basket/api/basket/v2/basket/*/package/*/product', postRequest)

  app.post('/basket/api/basket/v2/basket/*/empty', postRequest)

  app.post('/basket/api/basket/v2/basket/*/validate', (req: Request, res: Response, next: NextFunction) => {
    const validateMock = req.cookies['basketMockValidate']
    if (!app.get('isMockingEnabled') || !validateMock) return next()

    logger.debug('Validate mock hit:', validateMock)
    const response = JSON.parse(fs.readFileSync(`${fixturesPath}/basket/${validateMock}`, { encoding: 'utf8' }))

    //When we need to mock this is because we're mocking a failure, usually
    res.status(500).send(response)
  })

  app.get('/basket/api/basket/v2/basket/:basketId', (req: Request, res: Response, next: NextFunction) => {
    const basketMock = req.cookies['basketMock']
    if (!app.get('isMockingEnabled') || !basketMock) return next()

    logger.debug('Basket mock hit:', basketMock)
    const response = JSON.parse(fs.readFileSync(`${fixturesPath}/basket/${basketMock}`, { encoding: 'utf8' }))

    res.status(200).send(response)
  })

  app.post('/basket/api/basket/v2/basket/:basketId/package/:packageId', (req: Request, res: Response, next: NextFunction) => {
    if (!app.get('isMockingEnabled')) return next()
    setTimeout(() => {
      res.status(200).send({})
    }, 1000)
  })

  app.get('**/portability/authcode/**', (req: Request, res: Response, next: NextFunction) => {
    if (!app.get('isMockingEnabled')) return next()

    res.status(200).send([
      {
        msisdn: '07195729387',
        code: 'XAE847693',
        expiryDate: '2021-06-03',
        donorServiceProvider: 'XAE',
        donorNetworkOperator: 'EE',
        status: 'VALID',
        validPortDates: ['2021-05-12', '2021-05-13'],
      },
    ])
  })

  app.post('**/basket/**/package/**/bundle/portability', (req: Request, res: Response, next: NextFunction) => {
    if (!app.get('isMockingEnabled')) return next()

    setTimeout(() => {
      res.status(200).send({})
    }, 800)
  })
}

export default mockingMiddleware
