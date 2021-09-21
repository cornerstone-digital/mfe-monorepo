import getItemType from './getItemType'

describe('getItemType', () => {
  it.each`
    changeLink                                                                                                               | itemType
    ${''}                                                                                                                    | ${''}
    ${'/mobile/phones/pay-monthly-contracts/apple/iphone-8?packageId=be93962c-7744-48a4-b249-23b90667a9d1&changePassSkuId='} | ${'handset'}
    ${'/mobile/phones/pay-monthly-contracts/apple/iphone-8#plans'}                                                           | ${'airtime'}
    ${'/broadband/deals/select-plan?packageId=72cc729b-2b00-4caf-b181-02b1c757f6a2&changePassSkuId=112785'}                  | ${'broadband'}
    ${'https://www.vodafone.co.uk/shop/bundles-and-sims/sim-only-deals/basics/b'}                                            | ${'sim-only-basics'}
    ${'/smart-watches-and-wearables/'}                                                                                       | ${'smart-watch'}
    ${'/data-only-sim'}                                                                                                      | ${'data-only-sim'}
    ${'/mobile/best-sim-only-deals'}                                                                                         | ${'sim-only'}
    ${'/mobile-broadband/pay-monthly-contracts/'}                                                                            | ${'data-device'}
  `('should return $itemType if $changeLink is provided', ({ changeLink, itemType }) => {
    expect(getItemType(changeLink)).toBe(itemType)
  })
})
