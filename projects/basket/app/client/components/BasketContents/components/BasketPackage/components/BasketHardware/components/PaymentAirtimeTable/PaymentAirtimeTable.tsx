import replaceContentParams from '@helpers/replaceContentParams'
import PaymentTableBodyRow from '../PaymentTableBodyRow'
import { PaymentAirtimeTableProps } from './PaymentAirtimeTable.types'
import formatCurrency from '@web-shop-core/helpers/formatCurrency'

const PaymentAirtimeTable = (props: PaymentAirtimeTableProps) => {
  const { airtimePrice, airtimeDescription, bingoContent, containerClassName, hardwareName, postValueLabel } = props
  const {
    basket_label_your_airtime_plan: airtimePlanHeader,
    basket_label_plan_type: planTypeLabel,
    basket_label_monthly_cost: monthlyCostLabel,
  } = bingoContent

  return (
    <table className={containerClassName}>
      <thead>
        <tr>
          <th colSpan={2}>{replaceContentParams(airtimePlanHeader?.bodyText, { '{param}': hardwareName })}</th>
        </tr>
      </thead>
      <tbody>
        <PaymentTableBodyRow text={planTypeLabel?.bodyText} value={airtimeDescription} />
        <PaymentTableBodyRow text={monthlyCostLabel?.bodyText} value={formatCurrency(airtimePrice)} label={postValueLabel} />
      </tbody>
    </table>
  )
}

export default PaymentAirtimeTable
