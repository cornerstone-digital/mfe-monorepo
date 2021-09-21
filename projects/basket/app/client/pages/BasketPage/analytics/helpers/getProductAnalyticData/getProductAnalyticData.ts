import getAllowanceByType from '@web-shop-core/helpers/getAllowanceByType'
import { isBingo } from '@helpers/typeCheck'

import { ProductAnalyticsData } from './getProductAnalyticsData.types'
import getTradeInParams from '../getTradeInParams'
// FIXME Refactor to handle individual object shapes to not require below hack
type AnalyticValues = BasketV2.Bundle & BasketV2.Hardware & BasketV2.Service & BasketV2.Discount

const getProductAnalyticData = (
  basket: BasketV2.Basket,
  specificPackage?: string,
  addonId?: string,
  hasAccessoryAddon?: boolean,
): object => {
  //* these definitions need to match the names from the UDL data layer */
  const allData: ProductAnalyticsData = {
    productPackageId: [],
    productBrand: [],
    productCapacity: [],
    productColour: [],
    productId: [],
    productModel: [],
    productName: [],
    productPlanData: [],
    productPackagePlanDuration: [],
    productPlanMinutes: [],
    productPlanSms: [],
    productPrice: [],
    productPriceNet: [],
    productPriceRecurrenceAmount: [],
    productPriceRecurrenceAmountNet: [],
    productCategory: [],
    productPackageNetworkSwitchType: [],
    productDiscountValue: [],
    productDiscountValueNet: [],
    productDiscountRecurrenceAmount: [],
    productDiscountRecurrenceAmountNet: [],
    productPackageName: [],
    productQuantity: [],
    transactionCouponCode: basket.voucherCode,
    quoteId: [],
    tradeInAmount: [],
    tradeInDevice: [],
    tradeInDuration: [],
    tradeInType: [],
  }

  const getBundleTitle = (packageId: BasketV2.ModelPackage['packageId']) => {
    const thisPackage = basket.packages?.find(mappedPackage => mappedPackage.packageId === packageId)
    return thisPackage?.bundle?.name?.toLowerCase()
  }

  const pushPaymentPlanCosts = (priceDetails?: BasketV2.Hardware['priceDetails']) => {
    const paymentPlan = priceDetails?.devicePaymentPlan

    const { monthlyDiscountPrice, upFrontDiscountPrice, upFrontPrice, monthlyPrice } = paymentPlan || {}

    allData.productDiscountValue.push(upFrontDiscountPrice?.gross || '0')
    allData.productDiscountValueNet.push(upFrontDiscountPrice?.net || '0')

    allData.productPrice.push(upFrontPrice?.gross || '0')
    allData.productPriceNet.push(upFrontPrice?.net || '0')

    allData.productPriceRecurrenceAmount.push(monthlyPrice?.gross || '0')
    allData.productPriceRecurrenceAmountNet.push(monthlyPrice?.net || '0')

    allData.productDiscountRecurrenceAmount.push(monthlyDiscountPrice?.gross || '0')
    allData.productDiscountRecurrenceAmountNet.push(monthlyDiscountPrice?.net || '0')
  }

  const pushCosts = (priceDetails?: BasketV2.PriceDetails) => {
    const { oneOffDiscountPrice, monthlyDiscountPrice, oneOffPrice, monthlyPrice } = priceDetails || {}

    allData.productDiscountValue.push(oneOffDiscountPrice?.gross || '0')
    allData.productDiscountValueNet.push(oneOffDiscountPrice?.net || '0')

    allData.productDiscountRecurrenceAmount.push(monthlyDiscountPrice?.gross || '0')
    allData.productDiscountRecurrenceAmountNet.push(monthlyDiscountPrice?.net || '0')

    allData.productPrice.push(oneOffPrice?.gross || '0')
    allData.productPriceNet.push(oneOffPrice?.net || '0')

    allData.productPriceRecurrenceAmount.push(monthlyPrice?.gross || '0')
    allData.productPriceRecurrenceAmountNet.push(monthlyPrice?.net || '0')
  }

  const pushAnalyticValues = (data: AnalyticValues, packageId: BasketV2.ModelPackage['packageId'], isBingoPackage?: boolean) => {
    allData.productPackageId.push(packageId || '')
    allData.productModel.push(data.model || '')
    allData.productId.push(data.skuId || '')
    allData.productQuantity.push('1')

    const dataAllowance = getAllowanceByType(data.allowances || [], 'uk data')
    const dataAllowanceValue = dataAllowance?.value?.toLowerCase() || ''
    allData.productPlanData.push(dataAllowanceValue)

    const minAllowance = getAllowanceByType(data.allowances || [], 'uk min', 'voice')
    const minAllowanceValue = minAllowance?.value?.toLowerCase() || ''
    allData.productPlanMinutes.push(minAllowanceValue)

    const textAllowance = getAllowanceByType(data.allowances || [], 'uk text')
    const textAllowanceValue = textAllowance?.value?.toLowerCase() || ''
    allData.productPlanSms.push(textAllowanceValue)

    const bundleTitle = getBundleTitle(packageId) || ''
    allData.productPackageName.push(bundleTitle)

    const productMake = data.make?.toLowerCase() || ''
    allData.productBrand.push(productMake)

    const productMemory = data.memorySize?.replace(' ', '').toLowerCase() || ''
    allData.productCapacity.push(productMemory)

    const productColour = data.deviceColor?.toLowerCase() || ''
    allData.productColour.push(productColour)

    const productName = data.name?.toLowerCase()
    const productLabel = data.label?.toLowerCase() || ''
    allData.productName.push(productName || productLabel)

    const productSwitchType = data.portability?.codeType?.toLowerCase() || ''
    allData.productPackageNetworkSwitchType.push(productSwitchType)

    if (isBingoPackage && data.priceDetails?.devicePaymentPlan) {
      pushPaymentPlanCosts(data.priceDetails)
      allData.productPackagePlanDuration.push(data.priceDetails?.devicePaymentPlan?.duration?.value || '')
    } else {
      pushCosts(data.priceDetails)
      allData.productPackagePlanDuration.push(data.commitmentPeriod?.value || '')
    }
  }

  //* Loop through all hardware and push analytic data for each */
  const getHardwareData = (hardwares: BasketV2.Hardware[], packageId: BasketV2.ModelPackage['packageId'], isBingoPackage: boolean) => {
    if (!Array.isArray(hardwares) || !hardwares.length) return
    hardwares.forEach(hardware => {
      allData.productCategory.push(hardware.productClass?.toLowerCase() || '')
      pushAnalyticValues(hardware, packageId, isBingoPackage)
    })
  }

  //* Loop through all addons and push analytic data for each */
  const getAddonData = (services: BasketV2.Service[], packageId: BasketV2.ModelPackage['packageId'], skuId: string) => {
    if (!Array.isArray(services) || !services.length) return
    services.forEach(service => {
      //* if specific addon is supplied we only want to return the data for that specific addon */
      if (!skuId || skuId === service.skuId) {
        allData.productCategory.push(service.productClass?.toLowerCase() || '')
        pushAnalyticValues(service, packageId)
      }
    })
  }

  //* Loop through all addons and push analytic data for each */
  const getAccessoryAddonData = (hardwares: BasketV2.Hardware[], packageId: BasketV2.ModelPackage['packageId'], skuId: string) => {
    if (!Array.isArray(hardwares) || !hardwares.length) {
      return
    }

    hardwares.forEach(hardware => {
      //* if specific addon is supplied we only want to return the data for that specific addon */
      if (!skuId || skuId === hardware.skuId) {
        allData.productCategory.push(hardware.productClass?.toLowerCase() || '')
        pushAnalyticValues(hardware, packageId)
      }
    })
  }

  //* push analytic data for bundle */
  const getBundleData = (bundle: BasketV2.Bundle, packageId: BasketV2.ModelPackage['packageId']) => {
    if (!bundle) return
    allData.productCategory.push('bundle')
    pushAnalyticValues(bundle, packageId)
  }

  //* Loop through all discounts and push analytic data for each */
  const getDiscountData = (discounts: BasketV2.Discount[], packageId: BasketV2.ModelPackage['packageId']) => {
    if (!Array.isArray(discounts) || !discounts.length) return
    discounts.forEach(discount => {
      allData.productCategory.push('discount')
      pushAnalyticValues(discount, packageId)
    })
  }

  if (basket.packages) {
    basket.packages.forEach(thisPackage => {
      const isBingoPackage = isBingo(thisPackage)
      if (thisPackage.tradeInCredit && (!specificPackage || thisPackage.packageId === specificPackage)) {
        const tradeInData = getTradeInParams(thisPackage.tradeInCredit)
        allData.quoteId.push(tradeInData.quoteId || '')
        allData.tradeInType.push(tradeInData.tradeInType)
        allData.tradeInDuration.push(tradeInData.tradeInDuration || 0)
        allData.tradeInAmount.push(tradeInData.tradeInAmount || 0)
        allData.tradeInDevice.push(tradeInData.tradeInDevice || '')
      }
      if (!hasAccessoryAddon && addonId && thisPackage.services) {
        return getAddonData(thisPackage.services, thisPackage.packageId, addonId)
      }
      if (hasAccessoryAddon && addonId && thisPackage.hardwares) {
        return getAccessoryAddonData(thisPackage.hardwares, thisPackage.packageId, addonId)
      }
      if (!specificPackage || (specificPackage && specificPackage === thisPackage.packageId)) {
        if (thisPackage.hardwares) {
          getHardwareData(thisPackage.hardwares, thisPackage.packageId, isBingoPackage)
        }
        if (thisPackage.services) {
          getAddonData(thisPackage.services, thisPackage.packageId, '')
        }
        if (thisPackage.bundle) {
          getBundleData(thisPackage.bundle, thisPackage.packageId)
        }
        if (thisPackage.discounts) {
          getDiscountData(thisPackage.discounts, thisPackage.packageId)
        }
      }
    })
  }

  return allData
}

export default getProductAnalyticData
