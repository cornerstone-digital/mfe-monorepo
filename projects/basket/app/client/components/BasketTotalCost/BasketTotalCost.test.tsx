import BasketTotalCost from './BasketTotalCost'
import mockPageContent from '@shared/config/content/BasketPageContent.json'
import defaultMock from '@cypress-root/fixtures/basket/bingo/default/get.json'
import mockWithLimited from '@cypress-root/fixtures/basket/multi-discount/limited-discount/get.json'
import { render, screen, within } from '@testing-library/react'
import BasketTransformer from '@shared/helpers/basketTransformer/BasketTransformer'
import * as storeHooks from '@store'

const mockBasket = BasketTransformer.transformBasket(defaultMock)

function mockStore({ priceDetails = {}, basket = {} } = {}): any {
  return {
    basketStore: {
      basket: {
        ...mockBasket,
        ...basket,
        priceDetails: {
          ...mockBasket.priceDetails,
          ...priceDetails,
        },
      },
      pageContent: mockPageContent[0]?.basket as BasketPageContent.Basket,
    },
  }
}

jest.mock('@store', () => ({
  useStore: jest.fn().mockImplementation(() => mockStore()),
}))

const findHeaderByText = (text: string) => {
  return screen.queryAllByRole((role, node) => {
    return role === 'heading' && node?.textContent === text
  })
}

const findByCellValue = async (testIdValue: string, rowNum: number, value: string) => {
  const basketItemTotals: HTMLElement[] | null = screen.queryAllByTestId((testId: string) => {
    return testId === testIdValue
  })

  return (
    basketItemTotals &&
    within(basketItemTotals[rowNum - 1]).queryAllByText(textContent => {
      return textContent === value
    })
  )
}

const priceProps = {
  oneOffPrice: {
    gross: '11.99',
    net: '9.99',
    vat: '2',
  },
  oneOffDiscountPrice: {
    gross: '10',
    net: '8',
    vat: '2',
  },
  totalMonthlySaving: {
    gross: '2.39',
    net: '1.99',
    vat: '0.40',
  },
  totalOneoffSaving: {
    gross: '2.39',
    net: '1.99',
    vat: '0.40',
  },
}

describe('<BasketTotalCost />', () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })
  test('should render when prices are not discounted', () => {
    render(<BasketTotalCost />)

    expect(screen.queryByText('Total cost')).toBeInTheDocument()
    expect(screen.queryByText('Total discount')).not.toBeInTheDocument()
  })

  describe('should render cost breakdown of Gross/Net in Totals', () => {
    beforeEach(() => {
      jest.spyOn(storeHooks, 'useStore').mockImplementationOnce(() => mockStore({ priceDetails: priceProps }))
      render(<BasketTotalCost />)
    })

    test('with total discounts', async () => {
      const totalDiscountHeader = findHeaderByText('Total discount')
      const discountUpfrontCost = await findByCellValue('upfront-cost', 1, '-£2.39')
      const discountMonthlyCost = await findByCellValue('monthly-cost', 1, '-£2.39')

      expect(totalDiscountHeader.length).toEqual(1)
      expect(discountUpfrontCost[0]).toBeInTheDocument()
      expect(discountMonthlyCost[0]).toBeInTheDocument()
    })

    test('with vat excluded', async () => {
      const totalExVatHeader = findHeaderByText('Ex. VAT')
      const exVatUpfrontCost = await findByCellValue('upfront-cost', 2, '£8')
      const exVatMonthlyCost = await findByCellValue('monthly-cost', 2, '£23.89')

      expect(totalExVatHeader.length).toEqual(1)
      expect(exVatUpfrontCost[0]).toBeInTheDocument()
      expect(exVatMonthlyCost[0]).toBeInTheDocument()
    })

    test('with vat', async () => {
      const totalWithVatHeader = findHeaderByText('Ex. VAT')
      const withVatUpfrontCost = await findByCellValue('upfront-cost', 3, '£2')
      const withVatMonthlyCost = await findByCellValue('monthly-cost', 3, '£4.78')

      expect(totalWithVatHeader.length).toEqual(1)
      expect(withVatUpfrontCost[0]).toBeInTheDocument()
      expect(withVatMonthlyCost[0]).toBeInTheDocument()
    })

    test('with total costs', async () => {
      const totalCostHeader = findHeaderByText('Total cost')
      const totalUpfrontCost = await findByCellValue('upfront-cost', 4, '£10')
      const totalMonthlyCost = await findByCellValue('monthly-cost', 4, '£28.67')

      expect(totalCostHeader.length).toEqual(1)
      expect(totalUpfrontCost[0]).toBeInTheDocument()
      expect(totalMonthlyCost[0]).toBeInTheDocument()
    })
  })

  describe('AB test affecting scenarios', () => {
    test('should only render total cost row if hideExVatRows prop is true', () => {
      render(<BasketTotalCost hideExVatRows={true} />)
      expect(screen.queryByText('Total cost')).toBeInTheDocument()
      expect(screen.queryByText('Total discount')).not.toBeInTheDocument()
      expect(screen.queryByText('Ex. VAT')).not.toBeInTheDocument()
      expect(screen.queryByText('20% VAT')).not.toBeInTheDocument()
    })

    test('should render VAT rows of the component if hideExVatRows prop is false', () => {
      render(<BasketTotalCost hideExVatRows={false} />)
      expect(screen.queryByText('Total cost')).toBeInTheDocument()
      expect(screen.queryByText('Ex. VAT')).toBeInTheDocument()
      expect(screen.queryByText('20% VAT')).toBeInTheDocument()
    })
  })

  test('Should show 0 for 100% discount', async () => {
    const discountedPrices = {
      monthlyPrice: {
        gross: '10',
        net: '8',
        vat: '2',
      },
      monthlyDiscountPrice: {
        gross: '0',
        net: '0',
        vat: '0',
      },
      totalMonthlySaving: {
        gross: '10',
        net: '8',
        vat: '2',
      },
      oneOffPrice: {
        gross: '0',
        net: '0',
        vat: '0',
      },
      oneOffDiscountPrice: {
        gross: '0',
        net: '0',
        vat: '0',
      },
    }

    jest.spyOn(storeHooks, 'useStore').mockImplementationOnce(() => mockStore({ priceDetails: discountedPrices }))
    render(<BasketTotalCost />)

    const totalCostHeader = findHeaderByText('Total cost')
    const totalUpfrontCost = await findByCellValue('upfront-cost', 3, '£0')
    const totalMonthlyCost = await findByCellValue('monthly-cost', 3, '£0')

    expect(totalCostHeader.length).toEqual(1)
    expect(totalUpfrontCost[0]).toBeInTheDocument()
    expect(totalMonthlyCost[0]).toBeInTheDocument()
  })

  test('should show discount asterisk', async () => {
    const mockBasketLocal = BasketTransformer.transformBasket(mockWithLimited)
    jest.spyOn(storeHooks, 'useStore').mockImplementationOnce(() => mockStore({ basket: mockBasketLocal }))

    render(<BasketTotalCost />)

    const monthlyHeading = await findByCellValue('monthly-cost', 3, 'Monthly*')

    expect(monthlyHeading.length).toEqual(1)
  })

  test('should not show discount asterisk by default', async () => {
    render(<BasketTotalCost />)

    const monthlyHeading = await findByCellValue('monthly-cost', 3, 'Monthly*')

    expect(monthlyHeading.length).toEqual(0)
  })
})
