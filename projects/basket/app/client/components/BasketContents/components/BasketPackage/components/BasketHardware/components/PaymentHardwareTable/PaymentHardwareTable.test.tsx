import { render } from '@testing-library/react'
import { PaymentHardwareTableProps } from './PaymentHardwareTable.types'
import mockPaymentPlan from '../DevicePaymentExample/mocks/paymentPlan.mock.json'

import mockPageContent from '@shared/config/content/BasketPageContent.json'
import PaymentHardwareTable from './PaymentHardwareTable'
import getFinancialBreakdown from '../DevicePaymentExample/helpers/getFinancialBreakdown'

const mockBreakdown = getFinancialBreakdown(mockPaymentPlan, '11.99', 'net')

const mockProps: PaymentHardwareTableProps = {
  bingoContent: mockPageContent[0]?.basket?.vf_Modules?.messages?.content as BasketPageContent.HbbPortfolioRefreshContent,
  deviceCosts: mockBreakdown.deviceCosts,
  hardwareName: 'Phone',
  priceKey: 'net',
  containerClassName: 'test-class',
  postValueLabel: '',
}

describe('total table', () => {
  it('should render postValueLabel if provided', () => {
    const { getAllByText } = render(<PaymentHardwareTable {...mockProps} postValueLabel="(ex VAT)" />)
    expect(getAllByText('(ex VAT)')).toHaveLength(4)
  })

  it('should have a formatted plan header for phone plan', () => {
    const { getByText } = render(<PaymentHardwareTable {...mockProps} />)
    expect(getByText('Your Phone Plan')).toBeInTheDocument()
  })

  it('should have a formatted plan header for watch plan', () => {
    const { getByText } = render(<PaymentHardwareTable {...mockProps} hardwareName="Watch" />)
    expect(getByText('Your Watch Plan')).toBeInTheDocument()
  })

  it('should have a total cost row with formatted total price', () => {
    const { getByText } = render(<PaymentHardwareTable {...mockProps} />)
    expect(getByText('£1100')).toBeInTheDocument()
  })

  it('should have an upfornt cost row with formatted upfront price', () => {
    const { getByText } = render(<PaymentHardwareTable {...mockProps} />)
    const upFrontCostText = mockProps.bingoContent.basket_label_upfront_cost?.bodyText
    expect(getByText(upFrontCostText!)).toBeInTheDocument()
    expect(getByText('£127.50')).toBeInTheDocument()
  })

  it('should have an interest rate row with an interest rate', () => {
    const { getAllByText, getByText } = render(<PaymentHardwareTable {...mockProps} />)
    const interestRateText = mockProps.bingoContent.basket_label_interest_rate?.bodyText
    expect(getByText(interestRateText!)).toBeInTheDocument()
    expect(getAllByText('0%')).toHaveLength(2)
  })

  it('should have a total credit row with formatted handset credit price', () => {
    const { getByText } = render(<PaymentHardwareTable {...mockProps} />)
    const totalCreditText = mockProps.bingoContent.basket_label_total_credit_amount?.bodyText
    expect(getByText(totalCreditText!)).toBeInTheDocument()
    expect(getByText('£972.50')).toBeInTheDocument()
  })

  it('should have a contract length row with contract duration', () => {
    const { getByText } = render(<PaymentHardwareTable {...mockProps} />)
    const contractLengthText = mockProps.bingoContent.basket_label_length_of_contract?.bodyText
    const contractLength = parseInt(mockPaymentPlan.duration.value)
    expect(getByText(contractLengthText!)).toBeInTheDocument()
    expect(getByText(`${contractLength} months`)).toBeInTheDocument()
  })

  it('should have a creditor row with vodafone company', () => {
    const { getByText } = render(<PaymentHardwareTable {...mockProps} />)
    const creditor = mockProps.bingoContent.basket_label_creditor?.bodyText
    expect(getByText(creditor!)).toBeInTheDocument()
  })

  it('should have a monthly cost row with formatted monthly price', () => {
    const { getByText } = render(<PaymentHardwareTable {...mockProps} />)
    const monthlyCostText = mockProps.bingoContent.basket_label_monthly_cost?.bodyText
    expect(getByText(monthlyCostText!)).toBeInTheDocument()
    expect(getByText('£138.93')).toBeInTheDocument()
  })
})
