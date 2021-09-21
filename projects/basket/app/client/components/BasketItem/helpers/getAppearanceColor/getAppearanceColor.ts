import { BasketItemProps } from '@components/BasketItem/BasketItem.types'

const getAppearanceColor = (
  price: BasketItemProps['upfrontPrice'],
  discountPrice: BasketItemProps['upfrontDiscountPrice'],
  isDiscountBanner?: boolean,
  isFlexiBanner?: boolean,
  isUpgrade?: boolean,
) => {
  if ((discountPrice && parseFloat(discountPrice) < parseFloat(price || '')) || isDiscountBanner) {
    if (isUpgrade || isFlexiBanner) {
      return 'blue'
    }
    return 'brand'
  }
}

export default getAppearanceColor
