import getABTestFeatureValue from '@helpers/getABTestFeatureValue'
import matchesConstCI from '@helpers/matchesConstCI'
import { BASKET_CONSTS } from '@constants'
import { isBroadband } from '@helpers/typeCheck'

const getHBBModalPromptVisibility = (basket?: BasketV2.Basket, packageId?: BasketV2.ModelPackage['packageId']) => {
  const targetVariant2_HBB = getABTestFeatureValue('planBenefitsABHBB')

  if (!targetVariant2_HBB) {
    return false
  }
  const packageDetail = basket?.packages?.find(item => item.packageId === packageId)
  if (packageDetail) {
    const isBroadbandPackage = isBroadband(packageDetail.bundle?.bundleClass)
    const isDataSimo = matchesConstCI(BASKET_CONSTS.BUNDLE_CLASS_DATA_SIMO, packageDetail.bundle?.bundleClass)
    const isDevice = matchesConstCI(BASKET_CONSTS.BUNDLE_CLASS_DATA_DEVICE, packageDetail.bundle?.bundleClass)
    return isBroadbandPackage || isDataSimo || isDevice
  }
  return false
}

export default getHBBModalPromptVisibility
