import { isUpgradeJourney } from '@helpers/typeCheck'
import { AddonWithHeaderStatus, BasketParams, PackageWithHeaderStatus } from '../../BasketPackage.types'
import getPackageWithHandset from '../getPackageWithHandset'

const getBasketParams = (thisPackage: PackageWithHeaderStatus, accountCategory: string, basketId: string): BasketParams => {
  const currentPackage = Array.isArray(thisPackage) ? getPackageWithHandset(thisPackage) : thisPackage
  const addOns = currentPackage.services || []
  const hardwares = currentPackage.hardwares || []
  const extras: string[] = []

  const basketParams: BasketParams = {
    basketId: basketId,
    packageId: currentPackage?.packageId,
    bundleId: currentPackage?.bundle?.skuId,
    packageType: currentPackage?.packageType || 'Acquisition',
    accountCategory: accountCategory,
    isUpgrade: isUpgradeJourney(currentPackage?.packageType),
    contractOptions: currentPackage?.contractOptions,
    tradeInCredit: currentPackage?.tradeInCredit,
  }

  hardwares.forEach((hardware: BasketV2.Hardware) => {
    const productClass: string | undefined = hardware?.productClass?.toLowerCase()

    if (productClass && !['sim card', 'accessories'].includes(productClass)) {
      basketParams.deviceId = hardware.skuId
      basketParams.contractOptions = hardware.contractOptions
    }
  })

  addOns.forEach((addOn: AddonWithHeaderStatus) => {
    if (addOn?.skuId && addOn.headerStatus !== 'removed') extras.push(addOn.skuId)
  })

  if (extras.length) {
    basketParams.extrasId = extras
  }

  return basketParams
}

export default getBasketParams
