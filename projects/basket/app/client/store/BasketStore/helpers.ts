import { PackageWithHeaderStatus } from '@components/BasketContents/components/BasketPackage/BasketPackage.types'
import { BasketPackage } from '@pages/BasketPage/BasketPage.types'

export const getPackageUpdatePayload = (packageItem: BasketPackage): BasketV2.UpdatePackage | undefined => {
  if (packageItem) {
    return {
      accountCategory: packageItem.accountCategory,
      bundle: {
        action: packageItem.bundle?.action,
        productLineId: packageItem.bundle?.packageLineId, // is  it correct??
        skuId: packageItem.bundle?.skuId,
      },
      hardwares: packageItem.hardwares?.map(item => ({
        action: item.action,
        contractOptions: item.contractOptions,
        skuId: item.skuId,
      })),
      confirmRequired: packageItem?.confirmRequired,
      packageType: packageItem.packageType,
      tradeInCredit: packageItem.tradeInCredit,
      tradeInOfferCode: packageItem.tradeInOfferCode,
      services: packageItem.services?.map(item => ({
        action: item.action,
        attributes: item.attributes,
        skuId: item.skuId,
      })),
    }
  }
}

export const getActivePackages = (packages?: BasketV2.ModelPackage[]) => {
  if (!packages || !packages.length) {
    return []
  }
  return packages.filter((item: PackageWithHeaderStatus) => item.headerStatus !== 'removed')
}
