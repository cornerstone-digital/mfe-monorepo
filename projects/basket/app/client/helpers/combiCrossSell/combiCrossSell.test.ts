import combiCrossSell from './combiCrossSell'

const priceProposalSimo: BasketV2.PriceProposal[] = [
  {
    promotionType: 'CROSS_SELL',
    productDetail: {
      category: 'FTR6',
    },
  },
]

const priceProposalBroadband: BasketV2.PriceProposal[] = [
  {
    promotionType: 'CROSS_SELL',
    productDetail: {
      category: 'SIMO_18',
    },
  },
]

describe('getCombiUpgradeType', () => {
  it('returns simo', () => {
    expect(combiCrossSell.getCombiUpgradeType(priceProposalSimo)).toEqual('broadband')
  })

  it('returns broadband', () => {
    expect(combiCrossSell.getCombiUpgradeType(priceProposalBroadband)).toEqual('simo')
  })
})

describe('getCombiUpgradeParams', () => {
  it('returns broadband if the package added is SIMO', () => {
    const result = combiCrossSell.getCombiUpgradeParams(priceProposalSimo)
    expect(result?.label).toEqual('Pro Broadband')
  })

  it('returns sim if the package added is broadband', () => {
    const result = combiCrossSell.getCombiUpgradeParams(priceProposalBroadband)
    expect(result?.label).toEqual('SIM Only')
  })

  it('returns /broadband path if isBusiness equals false', () => {
    const result = combiCrossSell.getCombiUpgradeParams(priceProposalSimo)
    expect(result?.link).toEqual('/broadband?continueShopping=true')
  })
})
