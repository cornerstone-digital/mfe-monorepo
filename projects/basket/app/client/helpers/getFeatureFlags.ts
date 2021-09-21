import VFUK from '@web-shop-core/helpers/environmentVariables'
import unionBy from 'lodash/unionBy'
import { FeatureFlagConfig } from '@shared/types/global'

const LOCAL_STORAGE_FEATURE_FLAG_KEY = 'vfuk-feature-flags'
const futProdWhiteListDomains: string[] = VFUK.env.FUT_PROD_WHITELIST_DOMAINS ? VFUK.env.FUT_PROD_WHITELIST_DOMAINS.split(',') : []

/**
 * getFeatureFlags
 * Return the appropriate list of feature flags considering:
 * a) Whether this is a prod env and the domain is whitelisted
 * b) Account for any flag overrides previously set to localstorage
 */
export const getFeatureFlags = (LDFlagValues: FeatureFlagConfig): FeatureFlagConfig => {
  const envFeatureFlags: FeatureFlagConfig = LDFlagValues
  const localStorageFlagsString = localStorage.getItem(LOCAL_STORAGE_FEATURE_FLAG_KEY)
  const localStorageFlags: FeatureFlagConfig = localStorageFlagsString && JSON.parse(localStorageFlagsString)

  // Restrict to FUT whitelists domains if prod
  if (VFUK.env.TEALIUM_ENVIRONMENT === 'prod' && !futProdWhiteListDomains.includes(window.location.hostname)) return envFeatureFlags

  if (localStorageFlags) {
    return {
      ...localStorageFlags,
      flags: unionBy(localStorageFlags.flags, envFeatureFlags.flags, 'key'),
    }
  }

  return envFeatureFlags
}

export const saveFeatureFlagsToLocalStorage = (featureFlags: FeatureFlagConfig) => {
  localStorage.setItem(LOCAL_STORAGE_FEATURE_FLAG_KEY, JSON.stringify(featureFlags))
}
