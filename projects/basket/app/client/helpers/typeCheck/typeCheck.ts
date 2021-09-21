import { BASKET_CONSTS, DiscountType } from '@constants'
import matchesConstCI from '@helpers/matchesConstCI'
import { BasketHardwareWithHeaderStatus } from '@pages/BasketPage/BasketPage.types'

export const isSimCard = (hardware: BasketV2.Hardware): boolean => {
  return matchesConstCI(BASKET_CONSTS.PRODUCT_CLASS_SIM_CARD, hardware.productClass)
}

export const isBingo = (modelPackage: BasketV2.ModelPackage): boolean => {
  return matchesConstCI(BASKET_CONSTS.PLAN_TYPE_BINGO, modelPackage?.planType)
}

export const isAccessoryPackage = (modelPackage: BasketV2.ModelPackage): boolean => {
  return matchesConstCI(BASKET_CONSTS.PLAN_TYPE_ACCESSORY, modelPackage?.planType)
}

export const isAccessory = (hardware: BasketV2.Hardware): boolean => {
  return matchesConstCI(BASKET_CONSTS.PRODUCT_CLASS_ACCESSORY, hardware.productClass)
}

export const isAirtime = (packageItem: BasketV2.ModelPackage): boolean => {
  return (
    !isBroadband(packageItem?.planType) &&
    !isWatchSimo(packageItem?.bundle) &&
    !hasWatch(packageItem.hardwares) &&
    !isDataSimo(packageItem?.bundle) &&
    !isDataDevice(packageItem?.bundle) &&
    !isSimo(packageItem?.bundle)
  )
}

export const isHandset = (hardware: BasketV2.Hardware): boolean => {
  return matchesConstCI(BASKET_CONSTS.PRODUCT_CLASS_HANDSET, hardware.productClass) || isEHandset(hardware)
}

// We want to differentiate a handset from a watch (which is also an 'eHandset' in API response)
export const isEHandset = (hardware: BasketV2.Hardware): boolean => {
  return (
    matchesConstCI(BASKET_CONSTS.PRODUCT_CLASS_EHANDSET, hardware.productClass) &&
    // productSubClass checked as productClass = 'eHandset' is also used for watches
    matchesConstCI(BASKET_CONSTS.PRODUCT_SUB_CLASS_HANDSET, hardware.productSubClass)
  )
}

export const isWatch = (hardware: BasketV2.Hardware): boolean => {
  return (
    matchesConstCI(BASKET_CONSTS.PRODUCT_CLASS_EHANDSET, hardware.productClass) &&
    // productSubClass checked as productClass = 'eHandset' is also used for handsets
    matchesConstCI(BASKET_CONSTS.PRODUCT_SUB_CLASS_WATCH, hardware.productSubClass)
  )
}

export const isSimo = (bundle: BasketV2.ModelPackage['bundle']): boolean => {
  return matchesConstCI(BASKET_CONSTS.BUNDLE_CLASS_SIMO, bundle?.bundleClass)
}

export const isBasicSimo = (bundle: BasketV2.ModelPackage['bundle']): boolean => {
  return (
    matchesConstCI(BASKET_CONSTS.BUNDLE_CLASS_SIMO, bundle?.bundleClass) &&
    matchesConstCI(BASKET_CONSTS.BUNDLE_TYPE_BASICS_PLAN, bundle?.bundleType)
  )
}

export const isDataSimo = (bundle: BasketV2.ModelPackage['bundle']): boolean => {
  return matchesConstCI(BASKET_CONSTS.BUNDLE_CLASS_DATA_SIMO, bundle?.bundleClass)
}

export const isDataDevice = (bundle: BasketV2.ModelPackage['bundle']): boolean => {
  return matchesConstCI(BASKET_CONSTS.BUNDLE_CLASS_DATA_DEVICE, bundle?.bundleClass)
}

export const isWatchSimo = (bundle: BasketV2.ModelPackage['bundle']): boolean => {
  return matchesConstCI(BASKET_CONSTS.BUNDLE_CLASS_WATCH_SIMO, bundle?.bundleClass)
}

export const isSimTypePhysical = (hardware?: BasketV2.Hardware): boolean => {
  return hardware?.simType === 'PHYSICAL' // typed, not string
}

export const isSimTypeEsim = (hardware?: BasketV2.Hardware): boolean => {
  return hardware?.simType === 'ESIMONLY' // typed, not string
}

export const isSimTypeHybrid = (hardware?: BasketV2.Hardware): boolean => {
  return hardware?.simType === 'HYBRID' // typed, not string
}

export const isBusiness = (accountCategory: BasketV2.ModelPackage['accountCategory']): boolean => {
  return matchesConstCI(BASKET_CONSTS.ACCOUNT_CATEGORY_BUSINESS, accountCategory)
}

export const isBroadband = (planType: BasketV2.ModelPackage['planType']): boolean => {
  return (
    matchesConstCI(BASKET_CONSTS.PLAN_TYPE_BROADBAND_FTTH, planType) ||
    matchesConstCI(BASKET_CONSTS.PLAN_TYPE_BROADBAND_FTTC, planType) ||
    matchesConstCI(BASKET_CONSTS.PLAN_TYPE_BROADBAND_FTTP, planType)
  )
}

export const isPaym = (bundle?: BasketV2.Bundle): boolean => {
  return matchesConstCI(BASKET_CONSTS.PAYMENT_POSTPAID, bundle?.paymentType)
}

export const isPayg = (bundle?: BasketV2.Bundle): boolean => {
  return matchesConstCI(BASKET_CONSTS.BUNDLE_PAYMENT_TYPE_PRE, bundle?.paymentType)
}

export const isUpgradeJourney = (journeyType: BasketV2.Journey['journeyType']): boolean => {
  return matchesConstCI(BASKET_CONSTS.UPGRADE_ORDER, journeyType)
}

export const isActiveSubscription = (activeBundle?: BasketV2.ActiveBundle): boolean => {
  return activeBundle?.isActiveSubscription || false
}

export const isFixedLineService = (service?: BasketV2.Service): boolean => {
  return BASKET_CONSTS.SERVICE_PRODUCT_CLASS_FIXED_LINE === service?.productClass
}

export const isBonusData = (service?: BasketV2.Service): boolean => {
  return BASKET_CONSTS.SERVICE_PRODUCT_CLASS_BONUS_DATA === service?.productClass
}

export const isSuperWifi = (service?: BasketV2.Service): boolean => {
  return BASKET_CONSTS.SERVICE_PRODUCT_CLASS_SUPER_WIFI === service?.productClass
}

export const isInsuranceService = (service?: BasketV2.Service): boolean => {
  return matchesConstCI(BASKET_CONSTS.SERVICE_PRODUCT_CLASS_INSURANCE, service?.productClass)
}

export const isRedHybridPackage = (packageItem: BasketV2.ModelPackage): boolean => {
  return matchesConstCI(BASKET_CONSTS.PLAN_TYPE_RED_HYBRID, packageItem?.planType) && isSimo(packageItem?.bundle)
}

export const isRedHybridServiceProduct = (service?: BasketV2.Service): boolean => {
  return BASKET_CONSTS.SERVICE_PRODUCT_CLASS_HYBRID_BUNDLES === service?.productClass
}

/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////

export const hasBingo = (packages: BasketV2.Basket['packages']): boolean => {
  return packages?.some(isBingo) || false
}

export const hasWatch = (hardwares: BasketV2.ModelPackage['hardwares']): boolean => {
  return hardwares?.some(isWatch) || false
}

export const hasSimTypePhysical = (hardwares: BasketV2.ModelPackage['hardwares']): boolean => {
  return !!hardwares?.some(isSimTypePhysical)
}

export const hasHandset = (hardwares: BasketV2.ModelPackage['hardwares']): boolean => {
  return hardwares?.some(isHandset) || false
}

export const hasDataDevice = (hardwares: BasketV2.Hardware[] = []): boolean => {
  return hardwares.some(hardware => {
    return matchesConstCI(BASKET_CONSTS.PRODUCT_CLASS_DATA_DEVICE, hardware?.productClass)
  })
}

export const hasAccessoryAddon = (hardwares: BasketV2.Hardware[]): boolean => {
  return hardwares?.some(isAccessory) || false
}

export const hasBroadband = (packages: BasketV2.Basket['packages']): boolean => {
  return packages?.some(pkg => isBroadband(pkg.planType)) || false
}

const isAccessoryRemoved = (hardware: BasketV2.Hardware) => {
  return (hardware as BasketHardwareWithHeaderStatus).headerStatus === 'removed'
}

export const hasAccessoryDiscount = (hardware: BasketV2.Hardware): boolean => {
  return (
    isAccessory(hardware) &&
    !isAccessoryRemoved(hardware) &&
    hardware?.priceDetails?.merchandisingPromotions?.mpType === DiscountType.ACCESSORY_DISCOUNT
  )
}

export const hasBasketAnyDiscount = (packages: BasketV2.Basket['packages']) => {
  return Boolean(
    packages?.some(
      p =>
        p?.bundle?.priceDetails?.listOfMerchandisingPromotion?.length ||
        p?.hardwares?.some((hardware: BasketV2.Hardware) => !isAccessoryRemoved(hardware) && hasAccessoryDiscount(hardware)),
    ),
  )
}

export const hasPaym = (packages: BasketV2.Basket['packages']) => {
  return packages?.some(pkg => isPaym(pkg.bundle))
}

export const hasPayg = (packages: BasketV2.Basket['packages']) => {
  return packages?.some(pkg => isPayg(pkg.bundle))
}

export const hasSimo = (packages: BasketV2.Basket['packages']) => {
  return packages?.some(pkg => isSimo(pkg.bundle))
}

export const hasDataSimo = (packages: BasketV2.Basket['packages']) => {
  return packages?.some(pkg => isDataSimo(pkg.bundle))
}

export const hasMobileBroadband = (packages: BasketV2.ModelPackage[]) => {
  return packages.some(item => hasDataDevice(item.hardwares))
}
