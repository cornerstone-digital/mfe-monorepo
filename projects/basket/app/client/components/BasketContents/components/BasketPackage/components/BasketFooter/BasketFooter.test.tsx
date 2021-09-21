import { render } from '@testing-library/react'
import BasketFooter from './BasketFooter'
import { BasketFooterProps } from './BasketFooter.types'

describe('BasketFooter', () => {
  test('should render with default values', () => {
    const { getByText, getAllByText } = render(<BasketFooter />)
    expect(getByText('Upfront')).toBeInTheDocument()
    expect(getByText('Monthly')).toBeInTheDocument()
    expect(getAllByText('£0')).toHaveLength(2)
  })

  test('should render prices in proper format', () => {
    const props: BasketFooterProps = {
      monthlyPrice: '10.0',
      upfrontPrice: '8.1',
      totalCostTitle: 'Phone total',
    }
    const { getByText } = render(<BasketFooter {...props} />)

    expect(getByText('Phone total')).toBeInTheDocument()
    expect(getByText('£8.10')).toBeInTheDocument()
    expect(getByText('£10')).toBeInTheDocument()
  })

  test('should render prices in proper format with business package', () => {
    const props: BasketFooterProps = {
      monthlyPrice: '10.0',
      upfrontPrice: '8.1',
      totalCostTitle: 'Phone total',
      isBusiness: true,
    }
    const { getAllByText, getByText } = render(<BasketFooter {...props} />)

    expect(getByText('Phone total')).toBeInTheDocument()
    expect(getByText('£8.10')).toBeInTheDocument()
    expect(getByText('£10')).toBeInTheDocument()
    expect(getAllByText('(ex VAT)')).toHaveLength(2)
  })

  test('should render bingo footer message if provided and isBingoMessageVisible is true', () => {
    const props: BasketFooterProps = {
      isBingoMessageVisible: true,
      bingoFooterMessage: 'Test bingo footer message',
    }
    const { getByText } = render(<BasketFooter {...props} />)

    expect(getByText('Test bingo footer message')).toBeInTheDocument()
  })

  test('should not render bingo footer message if provided but isSmallBusiness is true', () => {
    const props: BasketFooterProps = {
      isBingoMessageVisible: true,
      bingoFooterMessage: 'Test bingo footer message',
      isSmallBusiness: true,
    }
    const { queryAllByText } = render(<BasketFooter {...props} />)

    expect(queryAllByText('Test bingo footer message')).toHaveLength(0)
  })
})
