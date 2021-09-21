export interface BasketParams {
  basketId?: string
  bundleId?: string | string[] | qs.ParsedQs | qs.ParsedQs[]
  deviceId?: string | string[] | qs.ParsedQs | qs.ParsedQs[]
  extrasId?: string | string[] | qs.ParsedQs | qs.ParsedQs[]
  voucherCode?: string | string[] | qs.ParsedQs | qs.ParsedQs[]
  packageType: string
  accountCategory: string
  affiliateFlag: boolean
}

export enum Consts {
  ACQUISITION = 'Acquisition',
  CONSUMER = 'Consumer',
  BUSINESS = 'Business',
  BASKET_ID_COOKIE = 'basketId',
  ERROR_GENERAL = 'general',
}
