import { useState } from 'react'

import SwitchMyNetworkModal from '@components/SwitchMyNetworkModal'
import SwitchMyNetworkPrompt from '@components/SwitchMyNetworkPrompt'

import AnalyticsUtil from '@utilities/Analytics'

import { SwitchMyNetworkProps } from './SwitchMyNetwork.types'

const SwitchMyNetwork = (props: SwitchMyNetworkProps): JSX.Element | null => {
  const { basket, packageId, onUpdateBasket, pageError, portability = {}, reviewMode } = props
  const { basketId = '' } = basket
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const toggleForm = (): void => {
    if (!isOpen && !reviewMode) {
      AnalyticsUtil.trackLink('basketPage.switchNetworkStart', {
        newBasket: basket,
        packageId: packageId,
        pageError: pageError,
      })
    }
    setIsOpen(!isOpen)
  }

  return (
    <>
      <SwitchMyNetworkPrompt
        reviewMode={reviewMode}
        basketId={basketId}
        packageId={packageId}
        isSwitched={!!portability?.msisdn && !!portability?.validPortDate}
        onClick={toggleForm}
        onUpdateBasket={onUpdateBasket}
      />
      <SwitchMyNetworkModal
        basket={basket}
        packageId={packageId}
        isOpen={isOpen}
        portability={portability}
        pageError={pageError}
        reviewMode={reviewMode}
        onExit={toggleForm}
        onUpdateBasket={onUpdateBasket}
      />
    </>
  )
}

export default SwitchMyNetwork
