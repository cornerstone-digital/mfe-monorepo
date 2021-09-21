import Heading from '@web-core/components/atoms/Heading'

import getABTestFeatureValue from '@helpers/getABTestFeatureValue'
import Sandwich from '@web-core/components/atoms/Sandwich'
import formatCurrency from '@web-shop-core/helpers/formatCurrency'

import FormattedDiscount from '../FormattedDiscount'
import * as Styled from './CostCell.styled'
import { useContext } from 'react'
import CostRowContext from '@components/BasketTotalCost/context'

export interface CostCellProps {
  main?: string | number
  prefix: string
}

const CostCell = (props: CostCellProps): JSX.Element => {
  const { main = '', prefix } = props
  const { showDiscount, showTotal, showDiscountAsterix } = useContext(CostRowContext)
  const costSize = showTotal ? 3 : 4
  const fontWeight = showTotal ? 'bold' : 'normal'
  const cost = <FormattedDiscount text={formatCurrency(main)} isCost={!showDiscount || main > 0} />

  const upfrontZeroCostHidden = main === '0'

  if (showTotal && (!upfrontZeroCostHidden || !getABTestFeatureValue('hideUpfrontZeros'))) {
    return <Sandwich main={cost} prefix={`${prefix}${prefix === 'Monthly' && showDiscountAsterix ? '*' : ''}`} marginBottom={0} />
  }
  if (upfrontZeroCostHidden && getABTestFeatureValue('hideUpfrontZeros')) {
    return <Styled.UpfrontCostZeroSrOnly>£0</Styled.UpfrontCostZeroSrOnly>
  }

  return (
    <Heading level={costSize} size={costSize} marginBottom={0} fontWeight={fontWeight} align="center">
      {cost}
    </Heading>
  )
}

export default CostCell
