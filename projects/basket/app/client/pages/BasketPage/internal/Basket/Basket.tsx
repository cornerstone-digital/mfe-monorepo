import { lazy, Suspense } from 'react'
import { observer } from 'mobx-react-lite'

import { BasketContainerProps } from '@containers/BasketContainer/BasketContainer.types'
import BasketContentLoader from '@components/BasketContentLoader'

import useBasket from '@hooks/useBasket'
import { useStore } from '@store'
import isDeliveryAvailable from '@components/DeliveryMessage/helpers/isDeliveryAvailable'
import useFlags from '@hooks/useFlags'
import getABTestFeatureValue from '@helpers/getABTestFeatureValue'
import useQueryParams from '@hooks/useQueryParams'
import { getValue } from '@web-shop-core/helpers/envVars'
import { isRedHybridPackage } from '@helpers/typeCheck'

const CrossSellNotification = lazy(() => import('@components/CrossSellNotification'))
const BasketContents = lazy(() => import('@components/BasketContents'))
const BasketTotalCost = lazy(() => import('@components/BasketTotalCost'))
const RedHybridTotalCost = lazy(() => import('@components/RedHybridTotalCost'))

const VoucherCodeEntry = lazy(() => import('@components/VoucherCodeEntry'))

const PageButtons = lazy(() => import('@pages/BasketPage/internal/PageButtons'))
const PaymentIcons = lazy(() => import('@pages/BasketPage/internal/PaymentIcons'))
const TitleAndEmptyBasket = lazy(() => import('@pages/BasketPage/internal/TitleAndEmptyBasket'))

const DeliveryMessage = lazy(() => import('@components/DeliveryMessage'))
const RpiContent = lazy(() => import('@components/RpiContent'))

const Basket = observer((props: BasketContainerProps) => {
  const queryParams = useQueryParams()
  const reviewModeOverride = queryParams.has('reviewMode') && getValue('TEALIUM_ENVIRONMENT') !== 'prod'
  const { basketId, basket, reviewMode = reviewModeOverride, showBorder, showPackageHeaderUnderline } = props
  const { basketStore } = useStore()
  const { isBusiness = true, isUpgradeOrder, packages = [] } = basketStore.basket || {}
  useBasket({ basketId, basket, reviewMode })
  useFlags()

  const showDeliveryMessage = !isUpgradeOrder && isDeliveryAvailable(packages)
  const showDoubledTotalCost = !isBusiness && getABTestFeatureValue('showDoubledTotalCost')
  const redHybridPackageIncluded = basketStore?.packages?.some((item: BasketV2.ModelPackage) => isRedHybridPackage(item))

  return (
    <>
      <Suspense fallback={null}>
        {!reviewMode && <CrossSellNotification />}
        {!reviewMode && <TitleAndEmptyBasket />}
        {showDoubledTotalCost && <BasketTotalCost hideExVatRows />}
      </Suspense>
      <Suspense fallback={<BasketContentLoader />}>
        {!reviewMode && basketStore.isLoading && <BasketContentLoader />}
        {!reviewMode && showDeliveryMessage && <DeliveryMessage />}
        <BasketContents showBorder={showBorder} showPackageHeaderUnderline={showPackageHeaderUnderline} />
        {!reviewMode && <VoucherCodeEntry />}
        {redHybridPackageIncluded ? <RedHybridTotalCost /> : <BasketTotalCost />}
      </Suspense>
      <Suspense fallback={null}>
        {!reviewMode && basketStore.hasPayMonthlyPackage && !getABTestFeatureValue('tcsBelowCTA') && <RpiContent />}
        {!reviewMode && <PageButtons />}
        {!reviewMode && <PaymentIcons />}
        {!reviewMode && basketStore.hasPayMonthlyPackage && getABTestFeatureValue('tcsBelowCTA') && <RpiContent />}
      </Suspense>
    </>
  )
})

export default Basket
