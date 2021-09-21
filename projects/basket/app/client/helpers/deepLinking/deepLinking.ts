import qs, { ParsedQs } from 'qs'

import basketService from '@web-shop-core/services/basketService'
import setCookie from '@web-shop-core/helpers/setCookie'

import matchesConstCI from '@helpers/matchesConstCI'

import { BasketParams, Consts } from './deepLinking.types'
import { BASKET_CONSTS } from '@constants'
import { TransformedBasket } from '@shared/helpers/basketTransformer/BasketTransformer'
import BasketStore from '@store/BasketStore'

/**
 * buildQueryString
 * @param queryParams
 */
const buildQueryString = (queryParams: ParsedQs): string => {
  return qs.stringify(queryParams, {
    addQueryPrefix: true,
    encode: false,
    arrayFormat: 'repeat',
  })
}

/**
 * saveQueryStringToHistory
 * @description Persists query strings in URL after refresh
 * @param queryString
 */
const saveQueryStringToHistory = (queryString: string): void => {
  window.history.pushState({}, document.title, `/basket${queryString}`)
}

/**
 * updateBasket
 * @param awinaffid
 * @param basketId
 */
const updateBasket = async (awinaffid: ParsedQs['awinaffid'], basketId: string) => {
  if (awinaffid) {
    await basketService.update(basketId, { affiliateFlag: true })
  }
}

/**
 * createDeeplinkBasket
 * @param basketId
 * @param basket
 * @param queryMap
 * @param addVoucher
 * @param updateStatus
 */
const createDeeplinkBasket = async (
  basket: TransformedBasket,
  queryMap: ParsedQs,
  addVoucher: BasketStore['addVoucher'],
  updateStatus: BasketStore['updateStatus'],
  basketId?: string,
) => {
  const { planSkuId, deviceSkuId, extrasSkuId, segment, ...filterQueryParams } = queryMap

  const {
    voucherCode,
    awinaffid, // Affiliate Window ID
  } = filterQueryParams

  let extrasArray: string[] | ParsedQs[] = []
  const segmentString = segment as string
  // sanitise segment
  const accountCategory = matchesConstCI(BASKET_CONSTS.ACCOUNT_CATEGORY_BUSINESS, segmentString) ? Consts.BUSINESS : Consts.CONSUMER

  if (Array.isArray(extrasSkuId)) {
    extrasArray = extrasSkuId
  } else {
    extrasArray = extrasSkuId && typeof extrasSkuId === 'string' ? extrasSkuId.split(',') : []
  }

  if (planSkuId) {
    const basketParams: BasketParams = {
      basketId,
      bundleId: planSkuId,
      deviceId: deviceSkuId,
      extrasId: extrasArray.length > 1 ? extrasArray : extrasSkuId,
      voucherCode,
      packageType: Consts.ACQUISITION,
      accountCategory,
      affiliateFlag: !!awinaffid,
    }

    try {
      if (!basketId) {
        basket = await basketService.create(basketParams)
        basketId = basket.basketId
        setCookie(Consts.BASKET_ID_COOKIE, basketId, { maxAge: 1200000 }) // 20 minutes
      } else {
        await basketService.addPackage(basketParams)
        await addVoucher(basketId, voucherCode as string)
        await updateBasket(awinaffid, basketId)
      }

      basket = await basketService.get(basketId)
    } catch (error) {
      updateStatus(Consts.ERROR_GENERAL, error)
    }
  }

  saveQueryStringToHistory(buildQueryString(filterQueryParams))

  return basket
}

export default { createDeeplinkBasket, buildQueryString, saveQueryStringToHistory }
