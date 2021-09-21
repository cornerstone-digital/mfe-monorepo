import { UserState } from '@pages/BasketPage/BasketPage.types'
import getCookie from '@web-shop-core/helpers/getCookie'

const isBusinessCustomer = (userState: UserState = {}): boolean => {
  const customerSegment = getCookie('customerSegment')

  return (
    customerSegment?.toLowerCase() === 'business' ||
    !!(userState.accountSubCategory && ['soleTrader', 'smallBusiness'].includes(userState.accountSubCategory))
  )
}

export default isBusinessCustomer
