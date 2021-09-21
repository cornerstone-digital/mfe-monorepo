import { BasketStatusError, Flags, OnRemoveAddOn, OnUndoRemoveAddOn } from '@pages/BasketPage/BasketPage.types'

export interface PackageItemListProps {
  packageId?: string
  isUpgrade: boolean
  onUndoRemoveAddOn?: OnUndoRemoveAddOn
  onRemoveAddOn?: OnRemoveAddOn
  reviewMode?: boolean
  upfrontPrice?: number | string
  monthlyPrice?: number | string
  // modelPackage will be an array if the package is combi
  modelPackage: BasketV2.ModelPackage | BasketV2.ModelPackage[]
  isBusiness: boolean
  hasWatchPackage?: boolean
  isPairedWatch?: boolean
  phonePaired?: string
  onUpdateBasket: () => Promise<void>
  pageError?: string
  pageContent?: BasketPageContent.Basket
  combiProps?: CombiProps[]
  flags?: Flags
  updateStatus: (notification: string, error?: BasketStatusError, basket?: BasketV2.Basket) => void
}

export interface CombiProps {
  onRemove?: () => void
  onUndo?: () => void
}

export interface ExtendedModelPackage extends BasketV2.ModelPackage {
  combiHandlers?: CombiProps
}

export type HeaderStatusType = 'present' | 'removing' | 'removed' | 'retrieving'

export interface ServiceValues extends BasketV2.Service {
  headerStatus?: HeaderStatusType
  isExtra?: boolean
}
