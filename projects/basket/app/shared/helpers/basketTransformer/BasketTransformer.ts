import getCookie from '@web-shop-core/helpers/getCookie'
import get from 'lodash/get'

import { sanitizeJson } from '@shared/helpers/transformUtils/transformUtils'
import sortByObjectProperty from '@helpers/sortByObjectProperty'
import { isUpgradeJourney } from '@helpers/typeCheck'
import { UserState } from '@pages/BasketPage/BasketPage.types'
import matchesConstCI from '@helpers/matchesConstCI'
import { BASKET_CONSTS } from '@constants'

export interface TransformedBasket extends BasketV2.Basket {
  isBusiness?: boolean
  isReviewMode?: boolean
  isUpgradeOrder?: boolean
  isBannerHidden?: boolean
  isSmallBusiness?: boolean
}

const sortBySequence = <T extends object>(a: T, b: T) => {
  return sortByObjectProperty('sequence' as keyof T, a, b)
}

class BasketTransformer {
  private basket: TransformedBasket = {}

  private getIsBannerHidden(basket: TransformedBasket): boolean {
    const { packages } = basket
    const isCombi = (bundle?: BasketV2.Bundle): boolean => {
      const offerGroup = get(bundle, 'priceDetails.merchandisingPromotions.offerGroup', '')
      return offerGroup?.toLowerCase() === 'combi offers' || offerGroup?.toLowerCase() === 'combined combi'
    }
    return packages ? packages.some(item => isCombi(item.bundle)) : false
  }

  private getIsBusiness(userState: UserState) {
    const customerSegment = getCookie('customerSegment')
    return customerSegment?.toLowerCase() === 'business' || userState?.accountSubCategory?.toLowerCase() === 'sole-trader'
  }

  private getIsSmallBusiness(userState: UserState) {
    return matchesConstCI(BASKET_CONSTS.ACCOUNT_TYPE_SMALLBUSINESS, userState.accountType)
  }

  public transformBasket(rawBasket: any, reviewMode?: boolean, userState: UserState = {}): TransformedBasket {
    const basket: TransformedBasket = sanitizeJson(rawBasket)

    basket.isReviewMode = reviewMode
    basket.isBusiness = this.getIsBusiness(userState)
    basket.isBannerHidden = this.getIsBannerHidden(basket)
    basket.isSmallBusiness = this.getIsSmallBusiness(userState)

    if (basket.packages) {
      basket.packages.sort(sortBySequence)
    }
    basket.isUpgradeOrder = isUpgradeJourney(basket.journey?.journeyType)

    this.basket = basket

    return this.basket
  }
}

export default new BasketTransformer()
