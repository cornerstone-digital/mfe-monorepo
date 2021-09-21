import { Application, Request, RequestHandler, Response } from 'express'
import { createFeatureFlaggingServiceMiddleware } from '@vfuk/lib-web-feature-flagging/server/createFeatureFlaggingServiceMiddleware'

import config from '../../config/global'
import { FeatureFlagConfig, GlobalConfig } from '../../types/global'

import { FEATURE_FLAG_LD_KEYS, FEATURE_FLAGS_CONSTS } from '../../constants'
import { FeatureFlaggingServiceServer } from '@vfuk/lib-web-feature-flagging/server/FeatureFlaggingServiceServer'

const defaultFlagValues: Record<string, boolean> = {}
const overrideFlagValues: Record<string, boolean> = {}

Object.values(FEATURE_FLAGS_CONSTS).forEach(feature => {
  defaultFlagValues[FEATURE_FLAG_LD_KEYS[feature]] = false
})

const globalConfig: GlobalConfig = config

const flags = globalConfig.featureFlags || {}

if (flags.flags) {
  flags.flags.forEach(flag => {
    overrideFlagValues[FEATURE_FLAG_LD_KEYS[flag.key]] = flag.enabled
  })
}

export const initFeatureFlagService: RequestHandler = (req, res, next) => {
  return createFeatureFlaggingServiceMiddleware({
    featureFlaggingConfig: {
      defaultFlagValues,
      overrideFlagValues,
    },
  })(req, res, next)
}

export const sendFlagsMiddleware = async (req: Request, res: Response) => {
  const featureFlaggingService: FeatureFlaggingServiceServer = res.locals.featureFlaggingService
  const featureFlags = await featureFlaggingService.getFeatureFlags()

  const flagsConfig: FeatureFlagConfig = {
    enabled: true,
    flags: [],
  }

  Object.values(FEATURE_FLAGS_CONSTS).forEach(feature => {
    flagsConfig.flags.push({
      group: 'feature',
      key: feature,
      enabled: featureFlags[FEATURE_FLAG_LD_KEYS[feature]],
      flags: [],
    })
  })

  return res.send(flagsConfig)
}

const featureFlaggingMiddleware = (app: Application) => {
  app.get(`${globalConfig.pathPrefix}/flags`, sendFlagsMiddleware)
}

export default featureFlaggingMiddleware
