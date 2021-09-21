import { OnUndoRemoveAddOn, OnRemoveAddOn, Flags } from '@pages/BasketPage/BasketPage.types'
import { ServiceValues } from '../PackageItemList/PackageItemList.types'

export interface BasketExtraProps {
  packageId: BasketV2.ModelPackage['packageId']
  service: ServiceValues
  planType: BasketV2.ModelPackage['planType']
  bundleType: BasketV2.Bundle['bundleType']
  isBusiness: boolean
  onUndoRemoveAddOn?: OnUndoRemoveAddOn
  onRemoveAddOn?: OnRemoveAddOn
  flags?: Flags
}

export interface MockBasketExtraData {
  packageId: BasketV2.ModelPackage['packageId']
  service: ServiceValues
  planType: BasketV2.ModelPackage['planType']
  isBroadband: boolean
}

export type BasketExtraPassImage = { [key: string]: string }
