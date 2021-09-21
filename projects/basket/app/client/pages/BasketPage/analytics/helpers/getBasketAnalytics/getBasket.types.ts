import getBasketAnalytics from './getBasketAnalytics'

export interface BasketCta {
  newBasket: BasketV2.Basket
  pageError?: string
}

export interface PackageCta extends BasketCta {
  packageId: BasketV2.ModelPackage['packageId']
}

export interface NotificationError extends BasketCta {
  eventAction: string
  eventLabel?: string
}

export interface ChangPackageeCta extends PackageCta {
  itemType?: string
}

export interface AddOnCta extends BasketCta {
  addonId: string
}

export interface CouponCta extends BasketCta {
  transactionCouponCode: string
}

export interface NetworkCta extends PackageCta {
  codeType: string
}

export type AnalyticsConfigType = ReturnType<typeof getBasketAnalytics>
