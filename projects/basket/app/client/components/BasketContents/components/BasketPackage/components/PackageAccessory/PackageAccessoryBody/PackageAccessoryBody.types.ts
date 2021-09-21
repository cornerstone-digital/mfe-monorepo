import { PackageWithHeaderStatus } from '../../../BasketPackage.types'

export interface PackageAccessoryBodyProps {
  primaryPackage: PackageWithHeaderStatus
  isBusiness: boolean
  onRemoveAddOn: never
  onUndoRemoveAddOn: never
}
