import replaceContentParams from '@helpers/replaceContentParams'
import PaymentTableBodyRow from '../PaymentTableBodyRow'
import { PaymentHardwareTableProps } from './PaymentHardwareTable.types'

const PaymentHardwareTable = (props: PaymentHardwareTableProps) => {
  const { bingoContent, containerClassName, deviceCosts, hardwareName, postValueLabel } = props
  const {
    aprRepresentative,
    duration,
    interestRate,
    upFrontPrice,
    monthlyPrice,
    totalHandsetCredit,
    totalHandsetPrice,
    creditor,
  } = deviceCosts
  const {
    basket_label_your_device_plan: devicePlanHeader,
    basket_label_total_phone_cost: totalPhoneCostLabel,
    basket_label_upfront_cost: upfrontCostLabel,
    basket_label_interest_rate: interestRateLabel,
    basket_label_apr: aprLabel,
    basket_label_total_credit_amount: totalCreditLabel,
    basket_label_length_of_contract: contractLengthLabel,
    basket_label_monthly_cost: monthlyCostLabel,
    basket_label_creditor: creditorLabel,
  } = bingoContent

  return (
    <table className={containerClassName}>
      <thead>
        <tr>
          <th colSpan={2}>{replaceContentParams(devicePlanHeader?.bodyText, { '{param}': hardwareName })}</th>
        </tr>
      </thead>
      <tbody>
        <PaymentTableBodyRow
          text={replaceContentParams(totalPhoneCostLabel?.bodyText, { '{param}': hardwareName })}
          value={totalHandsetPrice}
          label={postValueLabel}
        />
        <PaymentTableBodyRow text={upfrontCostLabel?.bodyText} value={upFrontPrice} label={postValueLabel} />
        <PaymentTableBodyRow text={interestRateLabel?.bodyText} value={interestRate} />
        <PaymentTableBodyRow text={totalCreditLabel?.bodyText} value={totalHandsetCredit} label={postValueLabel} />
        <PaymentTableBodyRow text={aprLabel?.bodyText} value={aprRepresentative} />
        <PaymentTableBodyRow text={contractLengthLabel?.bodyText} value={`${duration || ''} months`} />
        <PaymentTableBodyRow text={creditorLabel?.bodyText} value={creditor} />
        <PaymentTableBodyRow text={monthlyCostLabel?.bodyText} value={monthlyPrice} label={postValueLabel} />
      </tbody>
    </table>
  )
}

export default PaymentHardwareTable
