import { FC } from 'react'
import classNames from 'classnames'

import { Grid, GridColumn, GridRow } from '@vfuk/core-grid'
import { ThemedSandwich } from '@web-core/components/atoms/Sandwich'
import Icon from '@web-core/components/atoms/Icon'
import ItemHighlights from '@components/ItemHighlights'
import BasketItemHeader from '@components/BasketItemHeader'
import Heading from '@web-core/components/atoms/Heading'

import { BASKET_CONSTS, DiscountId, TACTICAL_TRADEIN_TEXT } from '@constants'

import formatCurrency from '@web-core/helpers/formatCurrency'
import getPackageFooterMessages from '@helpers/getPackageFooterMessages'

import { isAirtime, isBusiness as isBusinessPackage } from '@helpers/typeCheck'
import { getPackageDiscountDescriptions, getPackageDiscountAmounts } from './helpers'

import { PackageDiscountsProps } from './PackageDiscounts.types'

import styles from './PackageDiscounts.scss'
import getPrice from '@helpers/getPrice'

import sandwichOverrideStyle from './PDSandwichOverrideStyle.scss'

import * as Styled from './PackageDiscounts.styled'

import getABTestFeatureValue from '@helpers/getABTestFeatureValue'

const PackageDiscounts: FC<PackageDiscountsProps> = props => {
  const { hasTradeIn, modelPackage, pageContent, isBusiness, isUpgrade, reviewMode } = props
  const packages = Array.isArray(modelPackage) ? modelPackage : ([modelPackage] as BasketV2.ModelPackage[])

  const showDiscountFooter = !!getPackageFooterMessages(packages, pageContent)[BASKET_CONSTS.MP_TYPE_LIMITED_TIME]
  const descriptions: string[] = []
  const discountHeader = hasTradeIn ? 'Your discount' : 'Discount'

  // Bundle upfront discounts don't really exist although we shown them in the UI.  Discussion to be had
  // whether to remove it from the UI altogether.
  let totalUpfrontDiscountAmount = 0
  let totalMonthlySavingsAmount = 0
  let hasSmartwatchDiscount = false
  let showTacticalTradeInText = false

  const isDiscountGreaterThanMonthly = (discount: number, monthly: number) => {
    return monthly - discount <= 0
  }

  // it might be more than one packages for a combi package.
  packages.forEach(packageItem => {
    if (
      hasSmartwatchDiscount === false &&
      isBusinessPackage(packageItem?.accountCategory) &&
      packageItem?.bundle?.priceDetails?.listOfMerchandisingPromotion?.some(
        promotion => promotion.discountId === DiscountId.SMARTWATCH_CONNECTIVITY,
      )
    ) {
      hasSmartwatchDiscount = true
    }
    const packageDiscountDescriptions = getPackageDiscountDescriptions(packageItem)

    if (!packageDiscountDescriptions.length) {
      return
    }
    descriptions.push(...packageDiscountDescriptions)

    const packageDiscountAmounts = getPackageDiscountAmounts(packageItem, isBusiness ? 'net' : 'gross')
    totalMonthlySavingsAmount += packageDiscountAmounts.totalMonthlySavingsAmount
    totalUpfrontDiscountAmount += packageDiscountAmounts.totalUpfrontDiscountAmount

    const isAirtimePlan = isAirtime(packageItem)
    const hasTradeInOfferCode = Boolean(packageItem.tradeInOfferCode && packageItem.tradeInOfferCode.length > 0)

    if (isAirtimePlan && hasTradeInOfferCode) {
      showTacticalTradeInText = isDiscountGreaterThanMonthly(
        packageDiscountAmounts.totalMonthlySavingsAmount,
        Number(getPrice(packageItem?.bundle?.priceDetails?.monthlyPrice, isBusiness)),
      )
    }
  })

  const getBasketItemHeaderColor = () => {
    if (hasTradeIn) {
      return
    }
    return isUpgrade ? 'blue' : 'brand'
  }

  const renderDescription = () => {
    return <ItemHighlights items={descriptions} color={isUpgrade ? 'blue' : 'brand'} />
  }

  const renderTacticalDiscountText = () => {
    if (!showTacticalTradeInText) {
      return null
    }
    return <Styled.TacticalDiscountWrapper>{TACTICAL_TRADEIN_TEXT}</Styled.TacticalDiscountWrapper>
  }

  const getFormattedAmount = (amount: number) => {
    return `${amount > 0 ? '-£' : '£'}${formatCurrency(Math.abs(amount))}`
  }

  if (!totalMonthlySavingsAmount && !totalUpfrontDiscountAmount) {
    return null
  }

  const discountSuffix = hasSmartwatchDiscount && !reviewMode ? ' †' : ''

  const containerClasses = classNames(styles.container, {
    [styles.withTradeIn]: Boolean(hasTradeIn),
  })

  const isDiscountZero = totalUpfrontDiscountAmount <= 0 && getABTestFeatureValue('hideUpfrontZeros')

  return (
    <div className={containerClasses}>
      <Grid className={styles['no-gutters']}>
        <GridRow noGutters>
          <GridColumn col={6} colMd={7} colLg={6} className={styles.header}>
            {hasTradeIn && (
              <Heading
                level={4}
                size={4}
                margin={0}
                marginBottom={2}
                fontWeight="bold"
                appearance={isUpgrade ? 'upgrade' : 'brand'}
                text="Your savings"
              />
            )}
            <BasketItemHeader title={`${discountHeader} ${discountSuffix}`} titleColor={getBasketItemHeaderColor()} />
          </GridColumn>
        </GridRow>
        <GridRow noGutters className={styles['item-body']}>
          <GridColumn col={4} colMd={2} colLg={2} className={styles['icon-column-wrapper']}>
            <Icon name="offer-badge-percent" appearance={isUpgrade ? 'secondary-1' : 'brand'} size={5} />
          </GridColumn>
          <GridColumn className={styles.description} col={12} colMd={5} colLg={4}>
            <div>{renderDescription()}</div>
          </GridColumn>
          <GridColumn col={8} colMd={5} colLg={6}>
            <Grid>
              <GridRow noGutters>
                <GridColumn col={6}>
                  {!isDiscountZero && (
                    <ThemedSandwich
                      prefix="Upfront"
                      main={getFormattedAmount(totalUpfrontDiscountAmount)}
                      appearance={isUpgrade ? 'blue' : 'brand'}
                      dangerouslyMergeStyles={sandwichOverrideStyle}
                      suffix={isBusiness && totalUpfrontDiscountAmount ? '(ex VAT)' : ''}
                    />
                  )}
                </GridColumn>
                <GridColumn col={6}>
                  <ThemedSandwich
                    prefix={`Monthly${totalMonthlySavingsAmount && showDiscountFooter ? '*' : ''}`}
                    main={getFormattedAmount(totalMonthlySavingsAmount)}
                    appearance={isUpgrade ? 'blue' : 'brand'}
                    dangerouslyMergeStyles={sandwichOverrideStyle}
                    suffix={isBusiness && totalMonthlySavingsAmount ? '(ex VAT)' : ''}
                  />
                </GridColumn>
              </GridRow>
            </Grid>
          </GridColumn>
        </GridRow>
        <GridRow className={styles['visible-only-mobile']} noGutters>
          <GridColumn marginTop={2} marginBottom={2}>
            <div>{renderDescription()}</div>
          </GridColumn>
        </GridRow>
        <GridRow noGutters>
          <GridColumn colMd={6}>
            <div>{renderTacticalDiscountText()}</div>
          </GridColumn>
        </GridRow>
      </Grid>
    </div>
  )
}

export default PackageDiscounts
