import { hasBroadband, hasPayg, hasPaym, hasSimo, hasDataSimo, hasMobileBroadband } from '@helpers/typeCheck'
import getABTestFeatureValue from '@helpers/getABTestFeatureValue'

const isDeliveryAvailable = (packages: BasketV2.ModelPackage[] = []) =>
  !hasBroadband(packages) &&
  !hasDataSimo(packages) &&
  !hasSimo(packages) &&
  (hasMobileBroadband(packages) || hasPaym(packages) || hasPayg(packages)) &&
  getABTestFeatureValue('showDeliveryMessage')

export default isDeliveryAvailable
