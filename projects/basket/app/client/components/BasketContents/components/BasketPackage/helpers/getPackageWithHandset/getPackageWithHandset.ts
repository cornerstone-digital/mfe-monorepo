import { hasHandset } from '@helpers/typeCheck'
import { PackageWithHeaderStatus } from '../../BasketPackage.types'

const getPackageWithHandset = (packages: PackageWithHeaderStatus[]): PackageWithHeaderStatus => {
  const singlePackage = packages.find(({ hardwares }) => hasHandset(hardwares))
  return singlePackage || packages[0]
}

export default getPackageWithHandset
