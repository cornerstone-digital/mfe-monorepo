import { useEffect } from 'react'
import { toJS } from 'mobx'

import getCookie from '@web-shop-core/helpers/getCookie'
import setCookie from '@web-shop-core/helpers/setCookie'
import basketService from '@web-shop-core/services/basketService'

import analyticsHelpers from '@pages/BasketPage/analytics/helpers'
import { BasketContainerProps } from '@containers/BasketContainer/BasketContainer.types'

import deepLinking from '@helpers/deepLinking'
import BasketTransformer, { TransformedBasket } from '@shared/helpers/basketTransformer/BasketTransformer'
import { useStore } from '@store'
import AnalyticsUtil from '@utilities/Analytics'
import { getState } from '@web-shop-core/state/states/UserState'

const useBasket = ({ basketId, basket, reviewMode = false }: BasketContainerProps) => {
  const { basketStore, pageUiStore } = useStore()
  const userState = getState()

  const fetchBasket = async () => {
    await AnalyticsUtil.initialiseAnalytics(reviewMode)

    if (reviewMode) {
      basketStore.loadBasketContent()
    } else {
      await basketStore.loadBasketContent()
    }

    let basketData: TransformedBasket
    if (!reviewMode && Object.keys(basketStore.queryMap).length) {
      await basketStore.loadBasket()
      basketData = await deepLinking.createDeeplinkBasket(
        basketStore.basket,
        basketStore.queryMap,
        basketStore.addVoucher,
        basketStore.updateStatus,
        basketStore.basketId,
      )
      if (basketData.basketId) {
        basketStore.setBasketId(basketData.basketId)
      }
    } else {
      basketData = basket
        ? basket
        : basketStore.basket.basketId
        ? basketStore.basket
        : await basketService.get(basketId || basketStore.basketId)
    }

    pageUiStore.scrollTop()

    const basketAnalyticsConfig = analyticsHelpers.getBasketAnalytics(toJS(basketData), userState, basketStore.pageError, reviewMode)
    AnalyticsUtil.updateConfig(basketAnalyticsConfig)
    if (!reviewMode) {
      if (basketStore.isContentApiFailed) {
        const errorMessage = basketStore?.error?.data?.errorMessage || 'Content api is failed!'
        const errorCode = basketStore?.error?.data?.errorCode || basketStore?.error?.status

        AnalyticsUtil.pageView('basketPage.pageError', {
          pageError: `${errorCode}:${errorMessage}`,
        })
      } else if (!basketStore.isBasketApiFailed) {
        await AnalyticsUtil.pageView('basketPage.pageLoad')
      }
    }

    if (basketData.packages) {
      const accountCategory = basketData.packages[0]?.accountCategory || getCookie('customerSegment')?.toLowerCase()
      const segmentType = accountCategory?.toLowerCase() === 'business' ? 'business' : 'consumer'
      setCookie('customerSegment', segmentType)
    }

    basketStore.setBasket(BasketTransformer.transformBasket(basketData, reviewMode, userState))
    basketStore.setIsLoading(false)
  }

  useEffect(() => {
    fetchBasket()
  }, [basketId, basket, reviewMode])
}

export default useBasket
