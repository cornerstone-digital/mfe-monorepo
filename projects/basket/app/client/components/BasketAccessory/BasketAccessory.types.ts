import { BasketHardwareWithHeaderStatus, OnUndoRemoveAddOn, OnRemoveAddOn } from '@pages/BasketPage/BasketPage.types'
export interface BasketAccessoryProps {
  accessory: BasketHardwareWithHeaderStatus
  packageId: BasketV2.ModelPackage['packageId']
  isBusiness: boolean
  onUndoRemoveAddOn?: OnUndoRemoveAddOn
  onRemoveAddOn?: OnRemoveAddOn
}
