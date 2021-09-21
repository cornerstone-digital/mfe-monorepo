export interface UserState {
  accountCategory?: BasketV2.ModelPackage['accountCategory']
  accountSubCategory?: BasketV2.ModelPackage['accountSubCategory']
  accountType?: string
  subscriptionIdHash?: string
  isLoggedIn?: boolean
  loginStatus?: boolean
}

export interface BasketPageUrlParams {
  packageId?: string
}

export interface PackageRemoveUndoParams {
  packageId?: BasketV2.ModelPackage['packageId']
  contractOptions?: BasketV2.Hardware['contractOptions']
}

export interface BasketPackage extends BasketV2.ModelPackage {
  headerStatus?: string
  tradeInHeaderStatus?: HeaderStatusType
}

export type HeaderStatusType = 'present' | 'removing' | 'removed' | 'retrieving'

export type DataSpeedStatus = 'MAX_2_MBPS' | 'MAX_10_MBPS' | 'MAX_AVAILABLE'

export interface BasketPackageService extends BasketV2.Service {
  headerStatus?: HeaderStatusType
}
export interface BasketHardwareWithHeaderStatus extends BasketV2.Hardware {
  headerStatus?: HeaderStatusType
}
export interface Flags {
  [key: string]: boolean
}

export type OnUndoRemoveAddOn = (
  packageId: BasketV2.ModelPackage['packageId'],
  skuId: BasketV2.Bundle['skuId'],
  productType: string,
) => void

export type OnRemoveAddOn = (
  packageId: BasketV2.ModelPackage['packageId'],
  packageLineId: BasketV2.Bundle['packageLineId'],
  skuId: BasketV2.Bundle['skuId'],
) => void

export type ProductRequestType = { products: BasketV2.Product[] } | string

export interface BasketError {
  errorCode: string
  errorMessage: string
  message?: string
}

interface ValidationData extends BasketError {
  validationDetails?: BasketError[]
}

export interface BasketStatusError {
  data?: ValidationData
  status?: string
}
