import { render } from '@testing-library/react'
import { PaymentTotalTableProps } from './PaymentTotalTable.types'

import mockPageContent from '@shared/config/content/BasketPageContent.json'
import PaymentTotalTable from './PaymentTotalTable'

const mockProps: PaymentTotalTableProps = {
  bingoContent: mockPageContent[0]?.basket?.vf_Modules?.messages?.content as BasketPageContent.HbbPortfolioRefreshContent,
  containerClassName: 'test-class',
  upfrontCost: '50.0',
  monthlyTotal: '28.5',
  postValueLabel: '',
}

describe('total table', () => {
  it('should render formatted costs', () => {
    const { getByText } = render(<PaymentTotalTable {...mockProps} />)
    expect(getByText('£50')).toBeInTheDocument()
    expect(getByText('£28.50')).toBeInTheDocument()
  })

  it('should render postValueLabel if provided', () => {
    const { getAllByText } = render(<PaymentTotalTable {...mockProps} postValueLabel="(ex VAT)" />)
    expect(getAllByText('(ex VAT)')).toHaveLength(2)
  })

  it('should render labels from pageContent', () => {
    const { getByText } = render(<PaymentTotalTable {...mockProps} />)
    expect(getByText(mockProps.bingoContent.basket_label_total_package_cost?.bodyText!)).toBeInTheDocument()
    expect(getByText(mockProps.bingoContent.basket_label_upfront_cost?.bodyText!)).toBeInTheDocument()
    expect(getByText(mockProps.bingoContent.basket_label_total_monthly_cost?.bodyText!)).toBeInTheDocument()
  })
})
