import getABTestFeatureValue from '@helpers/getABTestFeatureValue'
import { PackageWithHeaderStatus } from '../../BasketPackage.types'

const getPairedWatchTitle = (renderedPackage: PackageWithHeaderStatus): string => {
  const displayTitle = getABTestFeatureValue('showStorageColourIcons') ? 'shortDisplayName' : 'displayName'

  return renderedPackage?.hardwares?.[0]?.[displayTitle] || ''
}

export default getPairedWatchTitle
