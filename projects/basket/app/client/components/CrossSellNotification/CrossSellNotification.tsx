import { observer } from 'mobx-react-lite'

import PromotionNotification from '@web-shop-core/components/molecules/PromotionNotification'

import combiCrossSell from '@helpers/combiCrossSell'
import { useStore } from '@store'

const CrossSellNotification = observer(() => {
  const { basketStore } = useStore()

  const { priceProposal, isUpgradeOrder, isBusiness, isBannerHidden } = basketStore.basket

  if (!priceProposal || isUpgradeOrder || isBusiness || isBannerHidden) return null

  const combiUpgradeParams = combiCrossSell.getCombiUpgradeParams(priceProposal)

  if (!combiUpgradeParams) return null

  const combiPriceProposal = (priceProposal || []).find(proposal => (proposal.promotionType || '').toLowerCase() === 'cross_sell')
  const savingsMessage = combiPriceProposal && (combiPriceProposal.saving?.exact?.message || '')

  return (
    <div className="margin-top-4">
      <PromotionNotification
        appearance="dark"
        title="Build your Vodafone Together deal"
        button={{
          text: `Add ${combiUpgradeParams.label}`,
          url: combiUpgradeParams.link,
          isExternal: true,
        }}
        // The img tag is prefixing the images pointing to assets
        img={combiUpgradeParams.modalImage}
      >
        <p>{savingsMessage}</p>
      </PromotionNotification>
    </div>
  )
})

export default CrossSellNotification
