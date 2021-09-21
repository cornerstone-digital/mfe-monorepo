import { HeaderStatusType } from './components/PackageItemList/PackageItemList.types'

export interface BasketPackageProps {
  thisPackage: PackageWithHeaderStatus | PackageWithHeaderStatus[]
  showPackageHeaderUnderline: boolean
  showBorder: boolean
  phonePaired?: string
  matchedWatchPackages?: PackageWithHeaderStatus[]
  index: number
}

export interface PackageProps extends PackageWithHeaderStatus {
  changePackageLink?: string
  onRemove?: () => void
  onUndo?: () => void
  headerStatus?: HeaderStatusType
  packageId?: BasketV2.ModelPackage['packageId']
}

export interface PackageWithHeaderStatus extends BasketV2.ModelPackage {
  headerStatus?: HeaderStatusType
  tradeInHeaderStatus?: HeaderStatusType
  contractOptions?: BasketV2.Hardware['contractOptions']
}

export interface AddonWithHeaderStatus extends BasketV2.Service {
  headerStatus?: HeaderStatusType
}

export interface BasketParams {
  basketId?: BasketV2.Basket['basketId']
  packageId?: BasketV2.ModelPackage['packageId']
  bundleId?: BasketV2.Bundle['skuId']
  deviceId?: BasketV2.Hardware['skuId']
  extrasId?: BasketV2.Service['skuId'][]
  packageType: BasketV2.ModelPackage['packageType']
  accountCategory: BasketV2.ModelPackage['accountCategory']
  isUpgrade: boolean
  contractOptions: BasketV2.Hardware['contractOptions']
  confirmRequired?: boolean
  tradeInCredit?: BasketV2.TradeInCredit
}

export interface PriceDetails {
  upfrontPrice: string
  monthlyPrice: string
}

export interface BorderDetails {
  borderAppearance?: string
  borderShadow?: boolean
}
