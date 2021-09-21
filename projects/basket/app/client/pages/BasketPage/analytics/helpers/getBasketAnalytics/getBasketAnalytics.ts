import { toJS } from 'mobx'
import getAnalyticsConfig from '@utilities/Analytics/getAnalyticsConfig'

import getProductAnalyticData from '../getProductAnalyticData'
import { BasketCta, PackageCta, CouponCta, AddOnCta, NetworkCta, ChangPackageeCta, NotificationError } from './getBasket.types'

import { hasAccessoryAddon } from '@helpers/typeCheck'
import getPackageByHardwareSkuId from '@helpers/getPackageByHardwareSkuId'
import getABTestFeatureValue from '@helpers/getABTestFeatureValue'
import { UserState } from '@pages/BasketPage/BasketPage.types'

const getBasketAnalytics = (basket: BasketV2.Basket, userState: UserState, error?: string, reviewMode = false) => {
  const { accountCategory: visitorAccountCategory, subscriptionIdHash: visitorIdAssetActive } = userState
  const pageType = reviewMode ? 'checkout' : 'basket'
  const pageSubSubSection = basket.packages?.length ? `${pageType} full` : `${pageType} empty`
  const accountCategory = basket.packages?.length ? basket.packages[0].accountCategory?.toLowerCase() : ''
  const accountType = visitorAccountCategory?.toLowerCase() === 'business' ? 'business' : 'consumer'
  const segmentType = accountCategory || accountType
  const purchaseType = basket.journey?.journeyType?.toLowerCase()
  const cartId = basket.basketId
  const couponCode = basket.voucherCode?.toLowerCase()
  const analyticsConfig = getAnalyticsConfig(reviewMode)

  const pageConfig = {
    ...analyticsConfig.pageConfig,
    pageSubSubSection,
    purchaseType,
    cartId,
    visitorCustomerType: segmentType,
    visitorIdAssetActive,
    transactionCouponCode: couponCode,
    pageError: error,
  }

  const createBasketCtaHandler = (eventName: string, eventLabel: string, eventAction: string = 'button') => {
    return ({ newBasket, pageError }: BasketCta) => ({
      eventName,
      eventAction,
      eventLabel: `${pageType}>${eventLabel}`,
      ...getProductAnalyticData(toJS(newBasket)),
      pageError,
      pageType,
    })
  }

  const changePackageCtaHandler = (eventName: string, eventLabel: string, eventAction: string = 'text') => {
    return ({ newBasket, packageId, pageError, itemType }: ChangPackageeCta) => {
      const trailing = getABTestFeatureValue('changeLinkAB') ? `>${itemType}` : ''

      return {
        eventName,
        eventAction,
        eventLabel: `${pageType}>${eventLabel}${trailing}`,
        ...getProductAnalyticData(toJS(newBasket), packageId),
        pageError,
        pageType,
      }
    }
  }

  const createPackageCtaHandler = (eventName: string, eventLabel: string, eventAction: string = 'text') => {
    return ({ newBasket, packageId, pageError }: PackageCta) => ({
      eventName,
      eventAction,
      eventLabel: `${pageType}>${eventLabel}`,
      ...getProductAnalyticData(toJS(newBasket), packageId),
      pageError,
      pageType,
    })
  }

  const eventsConfig = {
    ...analyticsConfig.eventsConfig,
    basketPage: {
      pageLoad: () => ({
        eventName: 'cart_view',
        ...getProductAnalyticData(toJS(basket)),
        pageType,
      }),
      pageError: ({ pageError }: NotificationError) => {
        return {
          ...getProductAnalyticData(toJS(basket)),
          eventName: ['cart_view', 'page_error'],
          eventAction: '',
          eventLabel: '',
          pageName: `uk>shop>${pageType}>page error`,
          pageType,
          pageError,
        }
      },
      inlineComponentError: ({ eventAction, eventLabel, newBasket, pageError }: NotificationError) => {
        return {
          ...getProductAnalyticData(toJS(newBasket)),
          eventName: 'inline_component_error',
          eventAction,
          eventLabel,
          pageError,
          pageType,
        }
      },
      emptyBasketCta: createBasketCtaHandler('cart_empty', 'empty basket'),
      removePackageCta: createPackageCtaHandler('cart_remove_package', 'remove package'),
      undoRemovePackageCta: ({ newBasket, packageId, pageError }: PackageCta) => ({
        eventName: 'cart_undo_remove_package',
        eventAction: 'text',
        eventLabel: `${pageType}>undo remove package`,
        ...getProductAnalyticData(toJS(newBasket), packageId),
        pageError,
        pageType,
      }),
      changePackageCta: changePackageCtaHandler('cart_change_package', 'change'),
      basketUpdateSuccess: createBasketCtaHandler('cart_update_success', 'promo code>update basket success'),
      basketUpdateFailed: ({ newBasket, transactionCouponCode, pageError }: CouponCta) => ({
        eventName: 'cart_update_failed',
        eventAction: 'button',
        eventLabel: `${pageType}>promo code>update basket failed`,
        ...getProductAnalyticData(toJS(newBasket)),
        transactionCouponCode,
        pageError,
        pageType,
      }),
      removeTradeinCta: ({ newBasket, packageId, pageError }: PackageCta) => {
        return {
          eventName: 'cart_remove_trade_in',
          eventAction: 'text',
          eventLabel: `${pageType}>remove your trade in`,
          ...getProductAnalyticData(toJS(newBasket), packageId),
          pageError,
          pageType,
        }
      },
      undoRemoveTradeinCta: ({ newBasket, packageId, pageError }: PackageCta) => {
        return {
          eventName: 'cart_undo_cart_remove_trade_in',
          eventAction: 'text',
          eventLabel: `${pageType}>undo remove your trade in`,
          ...getProductAnalyticData(toJS(newBasket), packageId),
          pageError,
          pageType,
        }
      },
      seeMoreTradeinCta: ({ newBasket, packageId, pageError }: PackageCta) => {
        const eventLabel = reviewMode ? 'checkout>review order>trade in info' : `basket>see more>trade in`

        return {
          eventName: 'cart_see_more_trade_in',
          eventAction: 'text',
          eventLabel,
          ...getProductAnalyticData(toJS(newBasket), packageId),
          pageError,
          pageType,
        }
      },
      removeAddonCta: ({ newBasket, addonId, pageError }: AddOnCta) => {
        const packageItem = getPackageByHardwareSkuId(newBasket.packages, addonId)
        const packageHasAccessory = packageItem?.hardwares && hasAccessoryAddon(packageItem.hardwares)

        return {
          eventName: 'cart_remove',
          eventAction: 'text',
          eventLabel: `${pageType}>remove ${packageHasAccessory ? 'accessory' : 'add on'}`,
          ...getProductAnalyticData(toJS(newBasket), '', addonId, packageHasAccessory),
          pageError,
          pageType,
        }
      },
      undoRemoveAddonCta: ({ newBasket, addonId, pageError }: AddOnCta) => {
        const packageItem = getPackageByHardwareSkuId(newBasket.packages, addonId)
        const packageHasAccessory = packageItem?.hardwares && hasAccessoryAddon(packageItem.hardwares)

        return {
          eventName: 'cart_undo_cart_remove',
          eventAction: 'text',
          eventLabel: `${pageType}>undo remove ${packageHasAccessory ? 'accessory' : 'add on'}`,
          ...getProductAnalyticData(toJS(newBasket), '', addonId, packageHasAccessory),
          pageError,
          pageType,
        }
      },
      switchNetworkStart: createPackageCtaHandler('cart_switch_network_start', 'switch network start'),
      switchNetworkSuccess: ({ codeType, newBasket, packageId, pageError }: NetworkCta) => ({
        eventName: 'cart_switch_network_applied',
        eventAction: 'button',
        eventLabel: `${pageType}>switch network applied`,
        ...getProductAnalyticData(toJS(newBasket), packageId, ''),
        productPackageNetworkSwitchType: codeType,
        pageError,
        pageType,
      }),
      switchNetworkFailed: ({ codeType, newBasket, packageId, pageError }: NetworkCta) => ({
        eventName: 'cart_switch_network_failed',
        eventAction: 'button',
        eventLabel: `${pageType}>switch network failed`,
        ...getProductAnalyticData(toJS(newBasket), packageId, ''),
        productPackageNetworkSwitchType: codeType,
        pageError,
        pageType,
      }),
      continueShoppingCta: createBasketCtaHandler('cart_continue_shopping', 'continue shopping'),
      // seeAllBenefitsCta: createBasketCtaHandler('see_all_benefts', 'see all benefits'),
      whatIsAneSimCTA: createBasketCtaHandler('what_is_an_esim', 'what is an esim'),
      updateBasketView: ({ newBasket, pageError }: BasketCta) => ({
        eventName: 'cart_contents_updated',
        ...getProductAnalyticData(toJS(newBasket)),
        eventAction: '',
        eventLabel: '',
        pageError,
        pageType,
      }),
      seeFinanceBreakdownWatch: createPackageCtaHandler('cart_see_finance_breakdown_watch', 'see finance breakdown>watch'),
      seeFinanceBreakdownHandset: createPackageCtaHandler('cart_see_finance_breakdown_handset', 'see finance breakdown>handset'),
      dataSpeed2Mbps: createPackageCtaHandler('cart_speed_maximum_download_2mbps', 'speed maximum download>2 mbps'),
      dataSpeed10Mbps: createPackageCtaHandler('cart_speed_maximum_download_10mbps', 'speed maximum download>10 mbps'),
      dataSpeedFastest: createPackageCtaHandler('cart_speed_maximum_download_fastest', 'speed maximum download>fastest'),
      ctaErrMaxLoans: createBasketCtaHandler('maximum_loans_payoff_device_plan', 'maximum loans>payoff device plan'),
      ctaErrConcurrentLoans: createBasketCtaHandler(
        'maximum_concurrent_loans_payoff_device_plan',
        'maximum concurrent loans>payoff device plan',
      ),
      ctaErrRepaymentIssues: createBasketCtaHandler('repayment_issues_log_into_account', 'repayment issues>log into account'),
      ctaErrMaxLendingLimit: createBasketCtaHandler('maximum_lending_limit_payoff_device_plan', 'maximum lending limit>payoff device plan'),
    },
  }

  return {
    pageConfig,
    eventsConfig,
  }
}

export default getBasketAnalytics
