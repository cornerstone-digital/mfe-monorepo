import qs from 'qs'
import getCookie from '@web-shop-core/helpers/getCookie'

/**
 * Retrieves basketId either from query string, or cookie.
 * Query string has a higher precedence.
 */
export function getBasketId(): string {
  const { basketId: qsBasketId } = qs.parse(window.location.search, { ignoreQueryPrefix: true })
  const cookieBasketId: string = getCookie('basketId')
  const basketId = (qsBasketId as string | undefined) || cookieBasketId

  if (!basketId) {
    throw Error('Basket ID could not be derived neither from query string, neither from "basketId" cookie!')
  }

  return basketId
}
