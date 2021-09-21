import { PackageWithHeaderStatus } from '../../BasketPackage.types'

const getAllActivePackages = (
  pkg: PackageWithHeaderStatus | PackageWithHeaderStatus[],
  matchedWatchPackages: PackageWithHeaderStatus[],
): PackageWithHeaderStatus[] => {
  const mainPackages = Array.isArray(pkg) ? pkg : [pkg]
  const allIncludedPackages: PackageWithHeaderStatus[] = [...mainPackages, ...matchedWatchPackages]

  return allIncludedPackages.filter(({ headerStatus }) => headerStatus !== 'removed')
}

export default getAllActivePackages
