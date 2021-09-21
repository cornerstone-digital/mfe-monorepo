import { hasHandset, isBingo } from '@helpers/typeCheck'
import { PackageWithHeaderStatus } from '../../BasketPackage.types'

const isBingoPackage = (packages?: PackageWithHeaderStatus | PackageWithHeaderStatus[]): boolean => {
  let pkg = packages as BasketV2.ModelPackage

  // if package is combi, find the handset package
  if (Array.isArray(packages)) {
    pkg = packages.find(({ hardwares }) => hasHandset(hardwares)) as BasketV2.ModelPackage
  }

  return isBingo(pkg)
}

export default isBingoPackage
