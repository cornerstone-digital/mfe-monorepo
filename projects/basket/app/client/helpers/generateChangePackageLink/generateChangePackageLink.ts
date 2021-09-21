import qs from 'qs'

import { hasHandset, hasWatch, hasDataDevice, isBroadband, isSimo, isRedHybridPackage } from '@helpers/typeCheck'
import getBroadbandPackageLink from '@helpers/getBroadbandPackageLink'
import matchesConstCI from '@helpers/matchesConstCI'

import { BASKET_CONSTS } from '@constants'

const getQueryStrings = (queries?: { [key: string]: string | undefined }) => {
  return qs.stringify(queries, { encode: false, addQueryPrefix: true, indices: false })
}

const generateChangePackageLink = ({
  accountCategory,
  bundle = {},
  hardwares = [],
  packageId,
  services = [],
  planType = '',
}: BasketV2.ModelPackage): string | undefined => {
  const { bundleType, paymentType } = bundle
  const changePassSkuId = services.map(item => item.skuId).join() || ''
  const handset = hardwares.find(hardware => hasHandset([hardware]))
  const watch = hardwares.find(hardware => hasWatch([hardware]))
  const dataDevice = hardwares.find(hardware => hasDataDevice([hardware]))
  const isPayg = matchesConstCI(BASKET_CONSTS.BUNDLE_PAYMENT_TYPE_PRE, paymentType)
  const isSimoBasics = matchesConstCI(BASKET_CONSTS.BUNDLE_TYPE_BASIC, bundleType)
  const isBusiness = matchesConstCI(BASKET_CONSTS.ACCOUNT_CATEGORY_BUSINESS, accountCategory)
  const isDataSimo = matchesConstCI(BASKET_CONSTS.PLAN_TYPE_DATA_SIMO, planType)
  const isBroadbandPackage = isBroadband(planType)
  const businessPrefix = isBusiness ? '/business' : ''
  const queryStrings = getQueryStrings({ packageId, changePassSkuId })
  const queryPackageId = getQueryStrings({ packageId })

  if (isRedHybridPackage({ planType, bundle })) {
    return '/pay-as-you-go/flexi-sim'
  }

  if (handset) {
    const { make = '', model = '' } = handset
    const contractTypePrefix = isPayg ? 'pay-as-you-go' : 'pay-monthly-contracts'

    return `/mobile/phones/${contractTypePrefix}/${make}/${model}${queryStrings}`
  }

  if (watch) {
    const { make = '', model = '' } = watch

    return `/smart-watches-and-wearables/${make}/${model}${queryPackageId}`
  }

  if (isDataSimo) {
    return `${businessPrefix}/data-only-sim`
  }

  if (isSimo(bundle)) {
    if (isSimoBasics) {
      return 'https://www.vodafone.co.uk/shop/bundles-and-sims/sim-only-deals/basics/b'
    }

    return `/mobile/best-sim-only-deals${queryStrings}`
  }

  // must occur before checking for 'dataDevice' as HBB can include dataDevice in hardwares
  if (isBroadbandPackage) {
    const broadbandLink = getBroadbandPackageLink(isBusiness, isBroadbandPackage)

    return broadbandLink + queryStrings
  }

  if (dataDevice) {
    const { make = '', model = '' } = dataDevice
    const isDongleOrMifi = matchesConstCI(BASKET_CONSTS.MAKE_VODAFONE, make)
    const isDongle = model?.toLowerCase().includes('dongle')
    let typeOfDataDevice = 'tablets'

    if (isDongle) {
      typeOfDataDevice = 'dongles'
    } else if (isDongleOrMifi) {
      typeOfDataDevice = 'mobile-wifi'
    }

    return `/mobile-broadband/pay-monthly-contracts/${typeOfDataDevice}/${make}/${model}${queryStrings}`
  }
}

export default generateChangePackageLink
