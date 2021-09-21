import { Analytics } from '@vfuk/lib-web-analytics'
import cloneDeep from 'lodash/cloneDeep'
import { AnalyticsConfigType } from '@pages/BasketPage/analytics/helpers/getBasketAnalytics/getBasket.types'

import getAnalyticsConfig from './getAnalyticsConfig'

class AnalyticsUtil {
  private analytics: Analytics = new Analytics()

  private initialised: boolean = false

  public async initialiseAnalytics(reviewMode: boolean = false) {
    if (typeof window !== 'undefined' && !this.initialised) {
      try {
        const analyticsConfig = getAnalyticsConfig(reviewMode)
        await this.analytics.initialize(analyticsConfig)
        this.initialised = true
      } catch (e) {
        console.log('Error', e)
      }
    }
  }

  public updateConfig(config: AnalyticsConfigType) {
    const utagLoaded: boolean = typeof window !== 'undefined' && window.utag
    if (!this.initialised || !utagLoaded) {
      console.error('Analytics library not initialised. Please check UTAG has been successfully loaded.')
      return
    }
    this.analytics.updatePageConfig(config.pageConfig)
    this.analytics.updateEventsConfig(config.eventsConfig)
  }

  public pageView(eventKey: string, eventParams?: { [key: string]: any }, pluginParams?: { [key: string]: any }) {
    return this.analytics.view(eventKey, eventParams, pluginParams)
  }

  public trackLink(eventKey: string, eventParams?: { [key: string]: any }, pluginParams?: { [key: string]: any }) {
    const snapshotEventParams = cloneDeep(eventParams)

    return this.analytics.link(eventKey, snapshotEventParams, pluginParams)
  }
}

export default new AnalyticsUtil()
