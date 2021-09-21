import formatCurrency from '@web-shop-core/helpers/formatCurrency'
import PaymentTableBodyRow from '../PaymentTableBodyRow'
import { PaymentTotalTableProps } from './PaymentTotalTable.types'

const PaymentTotalTable = (props: PaymentTotalTableProps) => {
  const { bingoContent, containerClassName, upfrontCost, monthlyTotal, postValueLabel } = props
  const {
    basket_label_total_package_cost: totalCostHeader,
    basket_label_total_monthly_cost: totalMonthlyLabel,
    basket_label_upfront_cost: upfrontCostLabel,
  } = bingoContent

  return (
    <table className={containerClassName}>
      <thead>
        <tr>
          <th colSpan={2}>{totalCostHeader?.bodyText}</th>
        </tr>
      </thead>
      <tbody>
        <PaymentTableBodyRow text={upfrontCostLabel?.bodyText} value={formatCurrency(upfrontCost)} label={postValueLabel} />
        <PaymentTableBodyRow text={totalMonthlyLabel?.bodyText} value={formatCurrency(monthlyTotal)} label={postValueLabel} />
      </tbody>
    </table>
  )
}

export default PaymentTotalTable
