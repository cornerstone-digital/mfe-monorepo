import VFUK from '@web-shop-core/helpers/environmentVariables'
import { FeatureFlagConfig } from '@server/types/global'
import { getFeatureFlags, saveFeatureFlagsToLocalStorage } from './getFeatureFlags'

jest.mock('@web-shop-core/helpers/environmentVariables', () => ({
  __esModule: true,
  default: { env: { TEALIUM_ENVIRONMENT: 'test' } },
}))

const mockFeatureFlags: FeatureFlagConfig = {
  enabled: true,
  flags: [
    {
      id: 'testflag',
      key: 'test-flag',
      enabled: true,
      flags: [],
    },
  ],
}

const localFeatureFlags: FeatureFlagConfig = {
  enabled: true,
  flags: [
    {
      id: 'testflag2',
      key: 'test-flag2',
      enabled: false,
      flags: [],
    },
  ],
}

describe('getFeatureFlags', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should return the flags by default', () => {
    expect(getFeatureFlags(mockFeatureFlags)).toEqual(mockFeatureFlags)
  })

  it('should return the flags merged with settings from localstorage if present', () => {
    jest.spyOn(window.localStorage.__proto__, 'getItem').mockImplementationOnce(() => JSON.stringify(localFeatureFlags))
    expect(getFeatureFlags(mockFeatureFlags).flags).toEqual([localFeatureFlags.flags[0], mockFeatureFlags.flags[0]])
  })

  it('should return with feature flags if in prod', () => {
    VFUK.env.TEALIUM_ENVIRONMENT = 'prod'
    jest.spyOn(window.localStorage.__proto__, 'getItem').mockImplementationOnce(() => JSON.stringify(localFeatureFlags))
    expect(getFeatureFlags(mockFeatureFlags)).toEqual(mockFeatureFlags)
  })
})

describe('saveFeatureFlagsToLocalStorage', () => {
  it('should set localStorage with given value', () => {
    jest.spyOn(window.localStorage.__proto__, 'setItem')
    saveFeatureFlagsToLocalStorage(mockFeatureFlags)
    expect(localStorage.setItem).toHaveBeenCalledWith('vfuk-feature-flags', JSON.stringify(mockFeatureFlags))
  })
})
