import { isBroadband, isDataDevice, isDataSimo, isSimo, isWatchSimo } from '@helpers/typeCheck'

const getBundlePackageLink = (
  planType?: BasketV2.ModelPackage['planType'],
  isWatch?: boolean,
  bundle?: BasketV2.Bundle,
  changePackageLink?: string,
) => {
  const isAirtime =
    !isBroadband(planType) && !isWatchSimo(bundle) && !isWatch && !isDataSimo(bundle) && !isDataDevice(bundle) && !isSimo(bundle)

  return isAirtime && changePackageLink ? `${changePackageLink.split('?')[0]}#plans` : changePackageLink
}

export default getBundlePackageLink
