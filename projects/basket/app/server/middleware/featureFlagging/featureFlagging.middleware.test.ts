import express, { Request, Response } from 'express'
import * as createFeatureFlaggingServiceMiddleware from '@vfuk/lib-web-feature-flagging/server/createFeatureFlaggingServiceMiddleware'
import featureFlaggingMiddleware, {
  initFeatureFlagService,
  sendFlagsMiddleware,
} from '@server/middleware/featureFlagging/featureFlagging.middleware'

describe('featureFlaggingMiddleware', () => {
  it('creates featureFlaggingServiceMiddleware with valid default values', () => {
    const mockedFeatureFlaggingServiceMiddleware = jest.fn()
    jest
      .spyOn(createFeatureFlaggingServiceMiddleware, 'createFeatureFlaggingServiceMiddleware')
      .mockReturnValue(mockedFeatureFlaggingServiceMiddleware)

    const req = {} as Request
    const res = {} as Response
    const next = () => {}

    initFeatureFlagService(req, res, next)

    expect(createFeatureFlaggingServiceMiddleware.createFeatureFlaggingServiceMiddleware).toHaveBeenCalledWith({
      featureFlaggingConfig: {
        defaultFlagValues: {
          'web-shop-basket-bingo-enabled': false,
          'web-shop-basket-bingo-launch-enabled': false,
          'web-shop-basket-esim-enabled': false,
          'web-shop-basket-bingo-onenumberrename-enabled': false,
        },
        overrideFlagValues: {},
      },
    })

    expect(mockedFeatureFlaggingServiceMiddleware).toHaveBeenLastCalledWith(req, res, next)
  })

  it('should hit sendFlagsMiddleware when hitting /flags path', () => {
    const app = express()
    const appGetSpy = jest.spyOn(app, 'get')
    featureFlaggingMiddleware(app)

    expect(appGetSpy).toHaveBeenCalledWith('/basket/flags', sendFlagsMiddleware)
  })

  it('should send default flag settings when sendFlagsMiddleware is being called', async () => {
    const defaultFlags = {
      enabled: true,
      flags: [
        {
          enabled: undefined,
          flags: [],
          group: 'feature',
          key: 'bingo',
        },
        {
          enabled: undefined,
          flags: [],
          group: 'feature',
          key: 'esim',
        },
        {
          enabled: undefined,
          flags: [],
          group: 'feature',
          key: 'bingo_launched',
        },
        {
          enabled: undefined,
          flags: [],
          group: 'feature',
          key: 'bingo_onenumberrename',
        },
      ],
    }
    const spySend = jest.fn()
    const req = {} as Request
    const res = {
      send: spySend,
      locals: { featureFlaggingService: { getFeatureFlags: jest.fn().mockResolvedValue({}) } },
    } as Partial<Response>
    await sendFlagsMiddleware(req, res as Response)

    expect(spySend).toBeCalledWith(defaultFlags)
  })
})
