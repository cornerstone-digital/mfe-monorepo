import { GridColumn, GridRow } from '@vfuk/core-grid'
import Heading from '@web-core/components/atoms/Heading'

import CostCell from '../CostCell'
import FormattedDiscount from '../FormattedDiscount'
import CostRowContext from '@components/BasketTotalCost/context'

import styles from './CostRow.scss'
import { CostRowProps } from './CostRow.types'

import getABTestFeatureValue from '@helpers/getABTestFeatureValue'

const CostRow = ({
  title,
  oneOff,
  monthly,
  showDiscount = false,
  showTotal = false,
  isTotalDiscountRow = false,
  isUpgrade = false,
  showDiscountAsterix = false,
}: CostRowProps) => {
  const labelSize = showTotal ? 4 : 5
  const fontWeight = showTotal ? 'bold' : 'normal'

  const isBackgroundWhite = oneOff === '0' && getABTestFeatureValue('hideUpfrontZeros')

  return (
    <CostRowContext.Provider value={{ showDiscount, showTotal, isUpgrade, isTotalDiscountRow, showDiscountAsterix }}>
      <GridRow noGutters className={styles['cost-row']}>
        <GridColumn col={4} colMd={7} colLg={6} className={styles.header}>
          <Heading level={labelSize} size={labelSize} marginBottom={0} fontWeight={fontWeight}>
            <FormattedDiscount text={title} />
          </Heading>
        </GridColumn>
        <GridColumn col={8} colMd={5} colLg={6}>
          <GridRow noGutters className={styles['price-row']}>
            <GridColumn col={6} className={isBackgroundWhite ? '' : styles['upfront-cost-cell-column']}>
              <div className={styles['basket-item-totals']} data-testid="upfront-cost">
                <CostCell main={oneOff} prefix="Upfront" />
              </div>
            </GridColumn>
            <GridColumn className={styles['monthly-column']} col={6}>
              <div className={styles['basket-item-totals']} data-testid="monthly-cost">
                <CostCell main={monthly} prefix="Monthly" />
              </div>
            </GridColumn>
          </GridRow>
        </GridColumn>
      </GridRow>
    </CostRowContext.Provider>
  )
}

export default CostRow
