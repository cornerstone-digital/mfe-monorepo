import { PackageWithHeaderStatus } from '../../BasketPackage.types'

export interface PackageHeaderProps {
  renderedPackage: PackageWithHeaderStatus | PackageWithHeaderStatus[]
  primaryPackage: PackageWithHeaderStatus
  isPairedWatch?: boolean
  title?: string
  subTitle?: string
  actionDisabled?: boolean
  showPackageHeaderUnderline?: boolean
}
