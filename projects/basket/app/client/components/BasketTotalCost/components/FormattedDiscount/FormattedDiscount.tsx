import CostRowContext from '@components/BasketTotalCost/context'
import { useContext } from 'react'
import styles from './FormattedDiscount.scss'

export interface FormattedDiscountProps {
  isCost?: boolean
  text: string
}

const FormattedDiscount = (props: FormattedDiscountProps): JSX.Element => {
  const { text, isCost } = props
  const { showDiscount, isUpgrade, isTotalDiscountRow, showDiscountAsterix } = useContext(CostRowContext)
  const discountText = `${text}${isTotalDiscountRow && showDiscountAsterix ? '*' : ''}`
  return showDiscount ? (
    <span className={styles[isUpgrade ? 'discount-upgrade' : 'discount']} data-testid="discount-format">
      {isCost ? '-' : ''}
      {discountText}
    </span>
  ) : (
    <>{text}</>
  )
}

export default FormattedDiscount
