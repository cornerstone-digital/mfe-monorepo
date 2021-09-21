import getPackageFooterMessages from './getPackageFooterMessages'
import mockPageContent from '@shared/config/content/BasketPageContent.json'
import basketPackagesWithoutLimitedTime from './mocks/basketPackagesWithoutLimitedTime.mock.json'
import basketPackagesWithLimitedTime from './mocks/basketPackagesWithLimitedTime.mock.json'

describe('getPackageFooterMessages', () => {
  it('should return limited_time message', () => {
    const pageContent: BasketPageContent.Basket = mockPageContent[0]?.basket as BasketPageContent.Basket
    //@ts-ignore
    const results = getPackageFooterMessages(basketPackagesWithLimitedTime, pageContent)
    expect(results).toEqual({ limited_time: '*Includes time-limited discounts. The price you pay will increase during your contract.' })
  })

  it('should return empty object', () => {
    const pageContent: BasketPageContent.Basket = mockPageContent[0]?.basket as BasketPageContent.Basket
    //@ts-ignore
    const results = getPackageFooterMessages(basketPackagesWithoutLimitedTime, pageContent)
    expect(results).toEqual({})
  })
})
