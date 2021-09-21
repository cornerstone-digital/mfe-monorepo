import Paragraph from '@web-core/components/atoms/Paragraph'
import { GridColumn, GridRow } from '@vfuk/core-grid'

import formatCurrency from '@web-shop-core/helpers/formatCurrency'

import BasketItem from '@components/BasketItem'

import { BasketFooterProps } from './BasketFooter.types'

import { StyledGrid } from './BasketFooter.styled'

const BasketFooter = (props: BasketFooterProps) => {
  const { bingoFooterMessage, isSmallBusiness, isBingoMessageVisible, isBusiness, monthlyPrice, totalCostTitle, upfrontPrice } = props
  return (
    <>
      <BasketItem
        upfrontPrice={formatCurrency(upfrontPrice, true)}
        monthlyPrice={formatCurrency(monthlyPrice, true)}
        title={totalCostTitle}
        isTotalCost
        isBusiness={isBusiness}
      />
      {isBingoMessageVisible && !isSmallBusiness && bingoFooterMessage && (
        <StyledGrid>
          <GridRow noGutters>
            <GridColumn colMd={6}>
              <Paragraph marginTop={1} fontSize="xs">
                {bingoFooterMessage}
              </Paragraph>
            </GridColumn>
          </GridRow>
        </StyledGrid>
      )}
    </>
  )
}

export default BasketFooter
