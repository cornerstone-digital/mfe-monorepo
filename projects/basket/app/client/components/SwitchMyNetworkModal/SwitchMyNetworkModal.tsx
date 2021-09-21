import Paragraph from '@web-core/components/atoms/Paragraph'

import Modal from '@vfuk/core-modal'
import Heading from '@web-core/components/atoms/Heading'
import basketService from '@web-shop-core/services/basketService'

import AnalyticsUtil from '@utilities/Analytics'

import FindOutMore from './components/FindOutMore'
import PacStacExplained from './components/PacStacExplained'
import SwitchMyNetworkForm from './components/SwitchMyNetworkForm'
import ContinueWithoutSwitching from './components/ContinueWithoutSwitching'

import { SwitchMyNetworkModalProps } from './SwitchMyNetworkModal.types'

import styles from './SwitchMyNetworkModal.scss'

const SwitchMyNetworkModal = (props: SwitchMyNetworkModalProps) => {
  const {
    hasLateDelivery,
    hasUnknownDelivery,
    packageId,
    onUpdateBasket,
    reviewMode,
    basket,
    pageError,
    isOpen,
    onExit,
    portability,
    deliveryDate,
  } = props
  const { basketId = '' } = basket

  const title = hasLateDelivery
    ? 'Choose a different transfer date'
    : hasUnknownDelivery
    ? `We can't guarantee that transfer date`
    : 'Switch My Network'
  const showContinueWithoutSwitching = hasLateDelivery || hasUnknownDelivery

  const handleSave = async (portabilityInfo: BasketV2.Portability = {}) => {
    await basketService.submitPortabilityInfo(basketId, packageId, portabilityInfo)

    if (onUpdateBasket) {
      await onUpdateBasket()

      if (!reviewMode) {
        const codeType = portabilityInfo.codeType && portabilityInfo.codeType.toLowerCase()
        AnalyticsUtil.trackLink('basketPage.switchNetworkSuccess', {
          newBasket: basket,
          packageId,
          codeType,
          pageError,
        })
      }
    }
  }

  const handleRemove = async () => {
    await basketService.removePortabilityInfo(basketId, packageId)

    if (onUpdateBasket) {
      await onUpdateBasket()
    }
  }

  const handleContinue = async (attemptRemoval?: boolean) => {
    if (attemptRemoval) {
      await handleRemove()
    }
  }

  return (
    <Modal isOpen={!!isOpen} srName={title} onCloseCb={onExit} size={2}>
      <>
        <Heading level={3} size={3}>
          {title}
        </Heading>
        <div className={styles['wrapper']}>
          {showContinueWithoutSwitching ? (
            <ContinueWithoutSwitching
              onContinue={handleContinue}
              phoneNumber={portability?.msisdn}
              date={deliveryDate}
              hasLateDelivery={hasLateDelivery}
              hasUnknownDelivery={hasUnknownDelivery}
            />
          ) : (
            <>
              <Paragraph>
                You can bring your current mobile number with you when you switch to Vodafone, or get a new number. This can be done now, or
                after you&apos;ve finished your purchase.
              </Paragraph>
              <Paragraph>Enter a PAC or STAC code and choose a date to get started.</Paragraph>
              <PacStacExplained />
              <SwitchMyNetworkForm
                basket={basket}
                onExit={onExit}
                onSave={handleSave}
                onRemove={handleRemove}
                portability={portability}
                packageId={packageId}
                reviewMode={reviewMode}
              />
              <FindOutMore />
            </>
          )}
        </div>
      </>
    </Modal>
  )
}

export default SwitchMyNetworkModal
