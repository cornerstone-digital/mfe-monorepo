import { PackageWithHeaderStatus, PriceDetails } from '../../BasketPackage.types'
import getPackagePrices from '../getPackagePrices'

const getCombinedPackageTotals = (
  packages: PackageWithHeaderStatus[],
  withDiscount: boolean = false,
  netGrossType: keyof BasketV2.Price,
): PriceDetails => {
  let upfrontPrice = 0
  let monthlyPrice = 0

  packages.forEach(packageItem => {
    const { upfrontPrice: upfront, monthlyPrice: monthly } = getPackagePrices(packageItem, withDiscount, netGrossType)

    upfrontPrice += parseFloat(upfront)
    monthlyPrice += parseFloat(monthly)
  })

  return {
    upfrontPrice: upfrontPrice.toString(),
    monthlyPrice: monthlyPrice.toString(),
  }
}

export default getCombinedPackageTotals
