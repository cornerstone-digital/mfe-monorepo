import containsText from '@web-shop-core/helpers/containsText'

import { isBasicSimo, isBroadband, isBonusData, isSuperWifi } from '@helpers/typeCheck'
import { BASKET_CONSTS } from '@constants'

import { BasketPackageService } from '@pages/BasketPage/BasketPage.types'
import { ServiceValues } from '../../PackageItemList.types'

const getCombinedServices = (planType: string, bundle: BasketV2.Bundle, services: BasketPackageService[]) => {
  let extraServices: ServiceValues[] = []
  const isBundleBasicSimo = isBasicSimo(bundle)

  const serviceFilterer = (product: BasketPackageService) => !isSuperWifi(product) && !(isBonusData(product) && isBundleBasicSimo)

  if (isBroadband(planType) && bundle.bundledServiceProducts?.length) {
    extraServices = bundle.bundledServiceProducts
      .filter(
        product => containsText(product.description, 'line') && product.productClass !== BASKET_CONSTS.SERVICE_PRODUCT_CLASS_FIXED_LINE,
      )
      .map(product => ({ ...product, isExtra: true }))
  }

  return [...services.filter(serviceFilterer), ...extraServices]
}

export default getCombinedServices
