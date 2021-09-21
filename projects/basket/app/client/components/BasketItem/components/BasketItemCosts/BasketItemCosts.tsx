import { useContext } from 'react'

import { GridColumn, GridRow } from '@vfuk/core-grid'
import Sandwich from '@web-core/components/atoms/Sandwich'

import formatCurrency from '@web-core/helpers/formatCurrency'

import BasketItemContext from '@components/BasketItem/context'
import { BasketItemProps } from '@components/BasketItem/BasketItem.types'
import getAppearanceColor from '@components/BasketItem/helpers/getAppearanceColor'

import getABTestFeatureValue from '@helpers/getABTestFeatureValue'
import StorageColourDetails from '../StorageColourDetails'
import SizeColourDetails from '../SizeColourDetails'
import MatchMedia from '@vfuk/core-match-media'

import styles from '../../BasketItem.scss'

const BasketItemCosts = (): JSX.Element => {
  const {
    isBusiness,
    isDiscountBanner,
    isFlexiBanner = false,
    isUpgrade = false,
    monthlyPrice = '0',
    monthlyDiscountPrice,
    upfrontPrice = '0',
    upfrontDiscountPrice,
    isSmartWatch,
  } = useContext(BasketItemContext)

  const isPriceAvailable = monthlyPrice || monthlyDiscountPrice
  const businessSuffix = isBusiness && isPriceAvailable && isPriceAvailable !== '0' ? '(ex VAT)' : undefined
  const formattedUpfrontPrice = upfrontDiscountPrice ? formatCurrency(upfrontDiscountPrice, true) : formatCurrency(upfrontPrice, true)
  const monthlyPriceMain =
    isDiscountBanner || monthlyDiscountPrice
      ? `${isDiscountBanner ? '-' : ''}${formatCurrency(monthlyDiscountPrice, true)}`
      : formatCurrency(monthlyPrice, true)

  const setSuffix = (price: BasketItemProps['upfrontPrice'], discountPrice: BasketItemProps['upfrontDiscountPrice']) => {
    if (discountPrice && parseFloat(discountPrice) < parseFloat(price || '')) {
      return `was ${formatCurrency(price, true)}`
    }
  }

  const getAppearance = (price: BasketItemProps['upfrontPrice'], discountPrice: BasketItemProps['upfrontDiscountPrice']) => {
    return getAppearanceColor(price, discountPrice, isDiscountBanner, isFlexiBanner, isUpgrade)
  }

  const upfrontZeroCostHidden = parseFloat(upfrontPrice) <= 0 && getABTestFeatureValue('hideUpfrontZeros')

  return (
    <>
      {getABTestFeatureValue('showStorageColourIcons') && (
        <GridRow>
          <GridColumn>
            <MatchMedia breakpoint="sm">{isSmartWatch ? <SizeColourDetails /> : <StorageColourDetails />}</MatchMedia>
          </GridColumn>
        </GridRow>
      )}
      <GridColumn className={styles.column} col={6}>
        {!isDiscountBanner && (
          <div className={styles['basket-item-totals']} data-selector="cost-upfront">
            {!upfrontZeroCostHidden && (
              <Sandwich
                prefix="Upfront"
                main={formattedUpfrontPrice}
                suffix={setSuffix(upfrontPrice, upfrontDiscountPrice)}
                suffix2={businessSuffix}
                appearance={getAppearance(upfrontPrice, upfrontDiscountPrice)}
                suffixAppearance={getAppearance(upfrontPrice, upfrontDiscountPrice)}
              />
            )}
          </div>
        )}
      </GridColumn>
      <GridColumn className={styles.column} col={6}>
        <div className={styles['basket-item-totals']} data-selector="cost-monthly">
          <Sandwich
            prefix="Monthly"
            main={monthlyPriceMain}
            suffix={setSuffix(monthlyPrice, monthlyDiscountPrice)}
            suffix2={businessSuffix}
            appearance={getAppearance(monthlyPrice, monthlyDiscountPrice)}
            suffixAppearance={getAppearance(monthlyPrice, monthlyDiscountPrice)}
          />
        </div>
      </GridColumn>
    </>
  )
}

export default BasketItemCosts
