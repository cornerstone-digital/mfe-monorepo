import { observer } from 'mobx-react-lite'
import { useStore } from '@store'

import mapBroadbandPlanType from '@helpers/mapBroadbandPlanType'
import { isBroadband, isBusiness } from '@helpers/typeCheck'
import AnalyticsUtil from '@utilities/Analytics'

import Button from '@web-core/components/atoms/Button'

import styles from '@pages/BasketPage/BasketPage.scss'
import { BasketPackage } from '@pages/BasketPage/BasketPage.types'

const PageButtons = observer(() => {
  const {
    basketStore,
    pageUiStore: { toggleModal },
  } = useStore()
  const { isUpgradeOrder, packages } = basketStore.basket

  const handleCheckout = async () => {
    basketStore.setIsValidating(true)
    try {
      await basketStore.validateBasket()
      setCheckoutUrl()
    } catch (error) {
      triggerAnalyticErrorEvent((error as any)?.data)
      console.warn('Failed to go to checkout.')
      basketStore.updateStatus('basketIsInvalid', error)
    } finally {
      basketStore.setIsValidating(false)
    }
  }

  const triggerAnalyticErrorEvent = (error: BasketV2.ErrorResponse) => {
    const errorCode = error?.errorCode || ''
    const errorMessage = error?.errorMessage || ''

    AnalyticsUtil.trackLink('basketPage.inlineComponentError', {
      eventLabel: 'Go to checkout',
      newBasket: basketStore.basket,
      pageError: errorMessage,
      eventAction: errorCode,
    })
  }

  const setCheckoutUrl = () => {
    const filteredBroadband = packages?.filter((item: BasketPackage) => isBroadband(item.planType) && item.headerStatus !== 'removed')
    const hasBusiness = filteredBroadband?.some((item: BasketPackage) => isBusiness(item.accountCategory))

    if (filteredBroadband?.length) {
      const mappedPlan = mapBroadbandPlanType(filteredBroadband)
      if (hasBusiness) {
        window.location.assign(`/business/business-connectivity/configure?installationType=${mappedPlan}`)
      } else {
        window.location.assign(`/broadband/deals/configure?installationType=${mappedPlan}`)
      }
    } else {
      window.location.assign('/secure-checkout')
    }
  }

  return (
    <div className={`${styles.buttons} margin-top-4`}>
      {!isUpgradeOrder && !basketStore.isCheckoutDisabled && (
        <Button appearance="secondary" marginRight={1} onClick={() => toggleModal('continueShopping')} selector="continue-shopping-button">
          Continue shopping
        </Button>
      )}
      <Button
        marginLeft={1}
        disabled={basketStore.isCheckoutDisabled}
        onClick={handleCheckout}
        loading={basketStore.isValidating}
        selector="checkout-button"
      >
        Go to checkout
      </Button>
    </div>
  )
})

export default PageButtons
