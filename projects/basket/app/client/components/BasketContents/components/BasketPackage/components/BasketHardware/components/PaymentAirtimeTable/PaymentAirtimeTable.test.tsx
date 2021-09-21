import { render } from '@testing-library/react'
import { PaymentAirtimeTableProps } from './PaymentAirtimeTable.types'

import mockPageContent from '@shared/config/content/BasketPageContent.json'
import PaymentAirtimeTable from './PaymentAirtimeTable'

const mockProps: PaymentAirtimeTableProps = {
  bingoContent: mockPageContent[0]?.basket?.vf_Modules?.messages?.content as BasketPageContent.HbbPortfolioRefreshContent,
  containerClassName: 'test-class',
  hardwareName: 'Airtime',
  postValueLabel: '',
}

describe('total table', () => {
  it('should render formatted costs', () => {
    const { getByText } = render(<PaymentAirtimeTable {...mockProps} />)
    expect(getByText('£0')).toBeInTheDocument()
  })

  it('should render postValueLabel if provided', () => {
    const { getAllByText } = render(<PaymentAirtimeTable {...mockProps} postValueLabel="(ex VAT)" />)
    expect(getAllByText('(ex VAT)')).toHaveLength(1)
  })

  it('should have a formatted plan header for watch plan', () => {
    const { getByText } = render(<PaymentAirtimeTable {...mockProps} />)
    expect(getByText('Your Airtime Plan')).toBeInTheDocument()
  })

  it('should have a formatted plan header for watch plan', () => {
    const { getByText } = render(<PaymentAirtimeTable {...mockProps} hardwareName="Connectivity" />)
    expect(getByText('Your Connectivity Plan')).toBeInTheDocument()
  })

  it('should render labels from pageContent', () => {
    const { getByText } = render(<PaymentAirtimeTable {...mockProps} />)
    expect(getByText(mockProps.bingoContent.basket_label_plan_type?.bodyText!)).toBeInTheDocument()
    expect(getByText(mockProps.bingoContent.basket_label_monthly_cost?.bodyText!)).toBeInTheDocument()
  })

  it('should render airtime description and price if provided', () => {
    const { getByText } = render(<PaymentAirtimeTable {...mockProps} airtimePrice="11.50" airtimeDescription="test-description" />)
    expect(getByText('test-description')).toBeInTheDocument()
    expect(getByText('£11.50')).toBeInTheDocument()
  })
})
