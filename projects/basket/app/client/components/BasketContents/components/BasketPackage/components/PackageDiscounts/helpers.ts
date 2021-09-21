import { get } from 'lodash'

import { hasAccessoryDiscount } from '@helpers/typeCheck'

export const getPackageDiscountDescriptions = (packageItem: BasketV2.ModelPackage) => {
  const descriptions: string[] = []

  const discountDescriptions = packageItem?.bundle?.priceDetails?.listOfMerchandisingPromotion
    ?.map(promotion => promotion.label || '')
    .filter(item => !!item.length)

  if (discountDescriptions?.length) {
    descriptions.push(...discountDescriptions)
  }

  if (packageItem.hardwares?.length) {
    const hardwareDescriptions = packageItem.hardwares.reduce((items: string[], hardware: BasketV2.Hardware) => {
      if (hasAccessoryDiscount(hardware) && !!hardware.priceDetails?.merchandisingPromotions?.label) {
        items.push(hardware.priceDetails.merchandisingPromotions.label)
      }
      return items
    }, [])

    if (hardwareDescriptions.length) {
      descriptions.push(...hardwareDescriptions)
    }
  }

  return descriptions
}

const getPackageAccessoryDiscount = (packageItem: BasketV2.ModelPackage, priceType: 'net' | 'gross') => {
  return (
    packageItem.hardwares?.reduce((totalAmount, hardware) => {
      if (hasAccessoryDiscount(hardware)) {
        totalAmount += parseFloat(get(hardware, `priceDetails.oneOffPrice.${priceType}`) || '0')
        totalAmount -= parseFloat(get(hardware, `priceDetails.oneOffDiscountPrice.${priceType}`) || '0')
      }
      return totalAmount
    }, 0) || 0
  )
}

export const getPackageDiscountAmounts = (packageItem: BasketV2.ModelPackage, priceType: 'net' | 'gross') => {
  const totalMonthlySavingsAmount = parseFloat(get(packageItem, `bundle.priceDetails.totalMonthlySavingsAmount.${priceType}`) || '0')

  return {
    totalMonthlySavingsAmount,
    totalUpfrontDiscountAmount: getPackageAccessoryDiscount(packageItem, priceType),
  }
}
