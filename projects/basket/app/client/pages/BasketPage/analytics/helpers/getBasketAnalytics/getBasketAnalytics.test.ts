import simoMockJson from '@basketMocks/basketWithSimo.mock.json'
import accessoryMockJson from '@basketMocks/basketWithAccessory.mock.json'

import getBasketAnalytics from './getBasketAnalytics'
import TransformUtils from '@shared/helpers/transformUtils/transformUtils'

const simoMock = TransformUtils.removeNulls(simoMockJson)
const accessoryMock = TransformUtils.removeNulls(accessoryMockJson)

describe('getBasketAnalytics data', () => {
  it('returns simo product analytic data', () => {
    const data = getBasketAnalytics(simoMock, {})
    expect(data).toMatchSnapshot()
  })

  it('returns simo product analytic data if in reviewMode', () => {
    const data = getBasketAnalytics(simoMock, {}, '', true)
    expect(data).toMatchSnapshot()
  })

  it('returns simo product analytic data if accountCategory is business', () => {
    const data = getBasketAnalytics(simoMock, { accountCategory: 'business' }, '', true)
    expect(data).toMatchSnapshot()
  })

  it('returns simo product analytic data with voucher', () => {
    const withVoucherMock = { ...simoMock, voucherCode: 'coolbilly10' }
    const data = getBasketAnalytics(withVoucherMock, {})
    expect(data).toMatchSnapshot()
  })

  it('tests pageLoad method', () => {
    const data = getBasketAnalytics(simoMock, {})
    expect(data.eventsConfig.basketPage.pageLoad()).toMatchSnapshot()
  })

  it('tests emptyBasketCta method', () => {
    const data = getBasketAnalytics(simoMock, {})
    expect(data.eventsConfig.basketPage.emptyBasketCta({ newBasket: simoMock })).toMatchSnapshot()
  })

  it('tests removePackageCta method', () => {
    const data = getBasketAnalytics(simoMock, {})
    expect(data.eventsConfig.basketPage.removePackageCta({ newBasket: simoMock, packageId: '123' })).toMatchSnapshot()
  })

  it('tests undoRemovePackageCta method', () => {
    const data = getBasketAnalytics(simoMock, {})
    expect(data.eventsConfig.basketPage.undoRemovePackageCta({ newBasket: simoMock, packageId: '123' })).toMatchSnapshot()
  })

  it('tests changePackageCta method', () => {
    const data = getBasketAnalytics(simoMock, {})
    expect(data.eventsConfig.basketPage.changePackageCta({ newBasket: simoMock, packageId: '123', itemType: 'simo' })).toMatchSnapshot()
  })

  it('tests basketUpdateSuccess method', () => {
    const data = getBasketAnalytics(simoMock, {})
    expect(data.eventsConfig.basketPage.basketUpdateSuccess({ newBasket: simoMock })).toMatchSnapshot()
  })

  it('tests basketUpdateFailed method', () => {
    const data = getBasketAnalytics(simoMock, {})
    expect(
      data.eventsConfig.basketPage.basketUpdateFailed({ newBasket: simoMock, transactionCouponCode: 'coolbilly10', pageError: '400' }),
    ).toMatchSnapshot()
  })

  it('tests pageError method', () => {
    const data = getBasketAnalytics(simoMock, {})
    expect(
      data.eventsConfig.basketPage.pageError({
        eventAction: 'test event action',
        eventLabel: 'test event label',
        newBasket: {},
        pageError: 'test error',
      }),
    ).toMatchSnapshot()
  })

  it('tests inlineComponentError method', () => {
    const data = getBasketAnalytics(simoMock, {})
    expect(
      data.eventsConfig.basketPage.inlineComponentError({
        eventAction: 'test event action',
        eventLabel: 'test event label',
        newBasket: {},
        pageError: 'test error',
      }),
    ).toMatchSnapshot()
  })

  it('tests removeTradeinCta method', () => {
    const data = getBasketAnalytics(simoMock, {})
    expect(data.eventsConfig.basketPage.removeTradeinCta({ packageId: '12345', newBasket: {}, pageError: 'test error' })).toMatchSnapshot()
  })

  it('tests undoRemoveTradeinCta method', () => {
    const data = getBasketAnalytics(simoMock, {})
    expect(
      data.eventsConfig.basketPage.undoRemoveTradeinCta({ packageId: '12345', newBasket: {}, pageError: 'test error' }),
    ).toMatchSnapshot()
  })

  it('tests seeMoreTradeinCta method', () => {
    const data = getBasketAnalytics(simoMock, {})
    expect(data.eventsConfig.basketPage.seeMoreTradeinCta({ packageId: '12345', newBasket: {}, pageError: 'test error' })).toMatchSnapshot()
  })

  it('tests updateBasketView method', () => {
    const data = getBasketAnalytics(simoMock, {})
    expect(data.eventsConfig.basketPage.updateBasketView({ newBasket: {}, pageError: 'test error' })).toMatchSnapshot()
  })

  it('tests removeAddonCta method', () => {
    const data = getBasketAnalytics(simoMock, {})
    expect(data.eventsConfig.basketPage.removeAddonCta({ newBasket: simoMock, addonId: '123' })).toMatchSnapshot()
  })

  it('tests undoRemoveAddonCta method', () => {
    const data = getBasketAnalytics(simoMock, {})
    expect(data.eventsConfig.basketPage.undoRemoveAddonCta({ newBasket: simoMock, addonId: '123' })).toMatchSnapshot()
  })

  it('tests accessory removeAddonCta method', () => {
    const data = getBasketAnalytics(accessoryMock, {})
    expect(data.eventsConfig.basketPage.removeAddonCta({ newBasket: accessoryMock, addonId: '206299' })).toMatchSnapshot()
  })

  it('tests accessory undoRemoveAddonCta method', () => {
    const data = getBasketAnalytics(accessoryMock, {})
    expect(data.eventsConfig.basketPage.undoRemoveAddonCta({ newBasket: accessoryMock, addonId: '206299' })).toMatchSnapshot()
  })

  it('tests switchNetworkStart method', () => {
    const data = getBasketAnalytics(simoMock, {})
    expect(data.eventsConfig.basketPage.switchNetworkStart({ newBasket: simoMock, packageId: '123' })).toMatchSnapshot()
  })

  it('tests switchNetworkSuccess method', () => {
    const data = getBasketAnalytics(simoMock, {})
    expect(data.eventsConfig.basketPage.switchNetworkSuccess({ newBasket: simoMock, packageId: '123', codeType: 'PAC' })).toMatchSnapshot()
  })

  it('tests switchNetworkFailed method', () => {
    const data = getBasketAnalytics(simoMock, {})
    expect(data.eventsConfig.basketPage.switchNetworkFailed({ newBasket: simoMock, packageId: '123', codeType: 'PAC' })).toMatchSnapshot()
  })

  it('tests continueShoppingCta method', () => {
    const data = getBasketAnalytics(simoMock, {})
    expect(data.eventsConfig.basketPage.continueShoppingCta({ newBasket: simoMock })).toMatchSnapshot()
  })

  it('tests ctaErrRepaymentIssues method', () => {
    const data = getBasketAnalytics(simoMock, {})
    expect(data.eventsConfig.basketPage.ctaErrRepaymentIssues({ newBasket: simoMock })).toMatchSnapshot()
  })

  it('tests ctaErrMaxLendingLimit method', () => {
    const data = getBasketAnalytics(simoMock, {})
    expect(data.eventsConfig.basketPage.ctaErrMaxLendingLimit({ newBasket: simoMock })).toMatchSnapshot()
  })

  it('tests ctaErrConcurrentLoans method', () => {
    const data = getBasketAnalytics(simoMock, {})
    expect(data.eventsConfig.basketPage.ctaErrConcurrentLoans({ newBasket: simoMock })).toMatchSnapshot()
  })

  it('tests ctaErrMaxLoans method', () => {
    const data = getBasketAnalytics(simoMock, {})
    expect(data.eventsConfig.basketPage.ctaErrMaxLoans({ newBasket: simoMock })).toMatchSnapshot()
  })

  it('tests dataSpeed2Mbps method', () => {
    const data = getBasketAnalytics(simoMock, {})
    expect(data.eventsConfig.basketPage.dataSpeed2Mbps({ newBasket: simoMock, packageId: '123' })).toMatchSnapshot()
  })

  it('tests dataSpeed10Mbps method', () => {
    const data = getBasketAnalytics(simoMock, {})
    expect(data.eventsConfig.basketPage.dataSpeed10Mbps({ newBasket: simoMock, packageId: '123' })).toMatchSnapshot()
  })

  it('tests dataSpeedFastest method', () => {
    const data = getBasketAnalytics(simoMock, {})
    expect(data.eventsConfig.basketPage.dataSpeedFastest({ newBasket: simoMock, packageId: '123' })).toMatchSnapshot()
  })

  it('tests seeFinanceBreakdownWatch method', () => {
    const data = getBasketAnalytics(simoMock, {})
    expect(data.eventsConfig.basketPage.seeFinanceBreakdownWatch({ newBasket: simoMock, packageId: '123' })).toMatchSnapshot()
  })

  it('tests seeFinanceBreakdownHandset method', () => {
    const data = getBasketAnalytics(simoMock, {})
    expect(data.eventsConfig.basketPage.seeFinanceBreakdownHandset({ newBasket: simoMock, packageId: '123' })).toMatchSnapshot()
  })
})
