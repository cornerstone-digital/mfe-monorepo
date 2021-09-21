import containsText from '@web-shop-core/helpers/containsText'

import getPrice from '@helpers/getPrice'
import { ServiceValues } from '../../../PackageItemList/PackageItemList.types'

export const isExtraHiddenEngineer = (service: Partial<ServiceValues>, isBusiness: boolean) => {
  const { displayDescription, description, name, priceDetails }: Partial<ServiceValues> = service

  const upfrontPrice = getPrice(priceDetails?.oneOffPrice, isBusiness)
  const isEngineer: boolean = containsText([name, displayDescription, description], ['engineer', 'installation'])
  // Hidden Engineer add on when upfront found to be 0 pounds.
  return isEngineer && parseFloat(upfrontPrice) <= 0
}

export const isExtraHidden = (service: Partial<ServiceValues>) => {
  const { isExtra, action = '', name, headerStatus, productClass }: Partial<ServiceValues> = service

  const itemStatus = ['add', 'retain', 'removed', 'removing', 'retrieving']
  const hasActionStatus = itemStatus.includes(action.toLowerCase())
  const hasHeaderStatus = itemStatus.includes((headerStatus || '').toLowerCase())
  const isFlexiUpgrade = productClass?.toLowerCase() === 'fee' && name?.toLowerCase() === 'fee for flexi-upgrade'

  return !(isExtra || hasActionStatus || hasHeaderStatus) || isFlexiUpgrade
}

const isHiddenService = (service: ServiceValues, isBusiness: boolean) => {
  return isExtraHidden(service) || isExtraHiddenEngineer(service, isBusiness)
}

export default isHiddenService
