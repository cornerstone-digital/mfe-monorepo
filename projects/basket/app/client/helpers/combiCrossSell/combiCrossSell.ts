import { ProductDetails, ContinueParamMap } from './combiCrossSell.types'

type CombiUpgradeType = 'broadband' | 'simo'
type CommitmentPeriod = '18' | '24'

/**
 * getCombiUpgradeType
 * @param priceProposals
 */
const getCombiUpgradeType = (priceProposals: BasketV2.PriceProposal[] = []): CombiUpgradeType | undefined => {
  const proposal = [...priceProposals].reverse().find(priceProposal => priceProposal.promotionType?.toLowerCase() === 'cross_sell')

  if (proposal) {
    return proposal.productDetail?.category?.toLowerCase().includes('ftr6') ? 'broadband' : 'simo'
  }
}

/**
 * getCombiUpgradeParams
 * @param priceProposals
 */
const getCombiUpgradeParams = (priceProposals: BasketV2.PriceProposal[]): ProductDetails | undefined => {
  const combiUpgradeType: CombiUpgradeType | undefined = getCombiUpgradeType(priceProposals)
  const commitmentPeriod: CommitmentPeriod = '24'
  const continueParamMap: ContinueParamMap = {
    simo: {
      label: 'SIM Only',
      link: `/mobile/best-sim-only-deals?continueShopping=true&commitmentPeriod=${commitmentPeriod} Months`,
      modalImage: 'together-add-sim-small.jpg',
    },
    broadband: {
      label: 'Pro Broadband',
      link: `/broadband?continueShopping=true`,
      modalImage: 'together-add-broadband-small.jpg',
    },
  }

  return combiUpgradeType && continueParamMap[combiUpgradeType]
}

export default { getCombiUpgradeType, getCombiUpgradeParams }
