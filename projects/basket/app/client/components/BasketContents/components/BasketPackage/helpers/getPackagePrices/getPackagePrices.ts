import { PackageWithHeaderStatus, PriceDetails } from '../../BasketPackage.types'

const getPackagePrices = (
  currentPackage: PackageWithHeaderStatus,
  withDiscount: boolean = false,
  netGrossType: keyof BasketV2.Price,
): PriceDetails => {
  const { priceDetails: { oneOffPrice, oneOffDiscountPrice, monthlyPrice, monthlyDiscountPrice } = {} } = currentPackage
  const upfrontWithDiscount = oneOffDiscountPrice || oneOffPrice
  const upfront = withDiscount ? upfrontWithDiscount : oneOffPrice
  const monthlyWithDiscount = monthlyDiscountPrice || monthlyPrice
  const monthly = withDiscount ? monthlyWithDiscount : monthlyPrice

  return {
    upfrontPrice: upfront?.[netGrossType] || '0',
    monthlyPrice: monthly?.[netGrossType] || '0',
  }
}

export default getPackagePrices
