import { BASKET_CONSTS } from '@constants'
import getBroadbandInfo from './getBroadbandInfo'
import mockPageContent from '@shared/config/content/BasketPageContent.json'

describe('getBroadbandInfo', () => {
  test('should set increaseMessage if planType is broadband', () => {
    const message =
      mockPageContent[0]?.basket.vf_Modules?.hbb_portfolio_refresh?.content?.hbb_portfolio_refresh_outofcontract_price_rise?.bodyText
    expect(getBroadbandInfo(BASKET_CONSTS.PLAN_TYPE_BROADBAND_FTTP, mockPageContent[0]?.basket as BasketPageContent.Basket)).toEqual({
      increaseMessage: message,
    })
  })

  test('should set address to broadbandInfo if address is given', () => {
    const broadbandInfo = getBroadbandInfo(
      BASKET_CONSTS.PLAN_TYPE_SIMO,
      mockPageContent[0]?.basket as BasketPageContent.Basket,
      'mock-address',
    )
    expect(broadbandInfo).toEqual({ address: 'mock-address' })
  })

  test('should set increaseMessage if planType is broadband without pageContent', () => {
    expect(getBroadbandInfo(BASKET_CONSTS.PLAN_TYPE_BROADBAND_FTTP)).toEqual({ increaseMessage: '' })
  })

  test('should not set increaseMessage if planType is not broadband', () => {
    expect(getBroadbandInfo(BASKET_CONSTS.PLAN_TYPE_SIMO, mockPageContent[0]?.basket as BasketPageContent.Basket)).toEqual({})
  })
})
