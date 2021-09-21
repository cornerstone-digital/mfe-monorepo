import AnalyticsUtil from '@utilities/Analytics'
import { Analytics } from '@vfuk/lib-web-analytics'
import { AnalyticsConfigType } from '@pages/BasketPage/analytics/helpers/getBasketAnalytics/getBasket.types'

jest.mock('@vfuk/lib-web-analytics')

describe('Analytics', () => {
  describe('initialiseAnalytics', () => {
    it('should call initialite method', () => {
      const mockInitialite = jest.fn().mockResolvedValue(true)
      Analytics.prototype.initialize = mockInitialite
      AnalyticsUtil.initialiseAnalytics()

      expect(mockInitialite).toHaveBeenCalled()
    })
  })

  describe('updateConfig', () => {
    const mockConfig = { pageConfig: { cartId: 'test-id' }, eventsConfig: { basketPage: {} } } as AnalyticsConfigType
    it('should console error if called without initialize', () => {
      jest.spyOn(console, 'error').mockImplementation(() => {})
      AnalyticsUtil.updateConfig(mockConfig)

      expect(console.error).toHaveBeenCalledWith('Analytics library not initialised. Please check UTAG has been successfully loaded.')
    })

    it('should call update methods on analytics', async () => {
      window.utag = 'test'
      const mockUpdatePageConfig = jest.fn()
      const mockUpdateEventsConfig = jest.fn()
      Analytics.prototype.updatePageConfig = mockUpdatePageConfig
      Analytics.prototype.updateEventsConfig = mockUpdateEventsConfig
      Analytics.prototype.initialize = jest.fn().mockResolvedValue(true)

      await AnalyticsUtil.initialiseAnalytics()
      AnalyticsUtil.updateConfig(mockConfig)

      expect(mockUpdatePageConfig).toHaveBeenCalledWith({ cartId: 'test-id' })
      expect(mockUpdateEventsConfig).toHaveBeenCalledWith({ basketPage: {} })
      delete window.utag
    })
  })

  describe('pageView', () => {
    it('should call view method', () => {
      const mockView = jest.fn()
      Analytics.prototype.view = mockView
      AnalyticsUtil.pageView('test-event', { eventParam: 'test' }, { pluginParam: 'test' })
      expect(mockView).toBeCalledWith('test-event', { eventParam: 'test' }, { pluginParam: 'test' })
    })
  })

  describe('trackLink', () => {
    it('should call link method', () => {
      const mockLink = jest.fn()
      Analytics.prototype.link = mockLink
      AnalyticsUtil.trackLink('test-event', { eventParam: 'test' }, { pluginParam: 'test' })
      expect(mockLink).toBeCalledWith('test-event', { eventParam: 'test' }, { pluginParam: 'test' })
    })
  })
})
