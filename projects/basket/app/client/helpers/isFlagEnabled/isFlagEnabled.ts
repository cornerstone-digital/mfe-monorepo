import { FeatureFlagConfig } from '@shared/types/global'

const isFlagEnabled = (flagKey: string, queryMap: any, flagsConfig?: FeatureFlagConfig): boolean | undefined => {
  // override using query params if available
  if (queryMap && queryMap[flagKey]) return queryMap[flagKey] !== 'false'
  const { enabled: allFlagsEnabled, flags } = flagsConfig || {}
  return (allFlagsEnabled && flags?.find(flag => flag.key === flagKey)?.enabled) || undefined
}

export default isFlagEnabled
