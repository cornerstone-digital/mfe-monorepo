import { BASKET_CONSTS } from '@constants'

export interface IFooterMessages {
  [key: string]: string
}

const getPackageFooterMessages = (
  basketPackage: BasketV2.ModelPackage | BasketV2.ModelPackage[] | undefined,
  pageContent?: BasketPageContent.Basket,
): IFooterMessages => {
  const messages: IFooterMessages = {}
  const packages = Array.isArray(basketPackage) ? basketPackage : [basketPackage]

  if (!pageContent) {
    return messages
  }

  const hasLimitedTimeMessage: boolean = packages.some(packageItem => {
    const mpType = packageItem?.bundle?.priceDetails?.merchandisingPromotions?.mpType || ''
    return mpType === BASKET_CONSTS.MP_TYPE_LIMITED_TIME
  })

  if (hasLimitedTimeMessage) {
    const message = pageContent?.vf_Modules?.messages?.content?.package_footer?.bodyText || ''
    if (message) {
      messages[BASKET_CONSTS.MP_TYPE_LIMITED_TIME] = message
    }
  }

  return messages
}

export default getPackageFooterMessages
