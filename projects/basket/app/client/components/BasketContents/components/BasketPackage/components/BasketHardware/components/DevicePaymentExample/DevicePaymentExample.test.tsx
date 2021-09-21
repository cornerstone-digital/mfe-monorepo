import DevicePaymentExample from './DevicePaymentExample'
import mockPaymentPlan from './mocks/paymentPlan.mock.json'
import mockPageContent from '@shared/config/content/BasketPageContent.json'
import contentService from '@web-cms-core/services/contentService'
import { DevicePaymentExampleProps } from './DevicePaymentExample.types'
import renderWithProviders from '@helpers/renderWithProviders'
import getFinancialBreakdown from './helpers/getFinancialBreakdown'
import { screen, waitFor } from '@testing-library/react'

contentService.getAssetModel = jest.fn().mockResolvedValue(mockPageContent)

const pageContent = mockPageContent[0]?.basket as BasketPageContent.Basket

function mockStore(): any {
  return {
    basketStore: {
      pageContent,
    },
  }
}

jest.mock('@store', () => ({
  useStore: jest.fn().mockImplementation(() => mockStore()),
}))

const mockProps: DevicePaymentExampleProps = {
  devicePaymentPlan: mockPaymentPlan,
  airtimeDescription: 'hello world',
  airtimePrice: '50',
  onRequestClose: jest.fn(),
}

describe('DevicePaymentExample', () => {
  it('should not render is isOpen prop set to false', async () => {
    const { container } = renderWithProviders(<DevicePaymentExample {...mockProps} />)
    expect(container.firstChild).toBeNull()
  })

  it.each`
    priceKey   | isBusiness
    ${'gross'} | ${false}
    ${'net'}   | ${true}
  `(`should render correctly when isBusiness is $isBusiness `, async ({ priceKey, isBusiness }) => {
    if (isBusiness) mockProps.isBusiness = true

    renderWithProviders(<DevicePaymentExample {...mockProps} isOpen />)

    const financialBreakdown = getFinancialBreakdown(mockProps.devicePaymentPlan, mockProps.airtimePrice, priceKey)

    // Device Costs
    await waitFor(() => {
      expect(screen.queryAllByText(financialBreakdown.deviceCosts.upFrontPrice)).toHaveLength(2)
    })
    expect(screen.queryAllByText(financialBreakdown.deviceCosts.monthlyPrice)).toHaveLength(1)
    expect(screen.queryAllByText(financialBreakdown.deviceCosts.totalHandsetPrice)).toHaveLength(1)
    expect(screen.queryAllByText(financialBreakdown.deviceCosts.totalHandsetCredit)).toHaveLength(1)

    // Airtime Costs
    expect(screen.queryAllByText(financialBreakdown.airtimeCosts.monthlyCost)).toHaveLength(1)

    // Ex-VAT shown
    if (isBusiness) {
      expect(screen.queryAllByText('(ex VAT)')).toHaveLength(7)
    } else {
      expect(screen.queryAllByText('(ex VAT)')).toHaveLength(0)
    }

    // Totals
    expect(screen.queryAllByText(financialBreakdown.total.upfrontCost)).toHaveLength(2)
    expect(screen.queryAllByText(financialBreakdown.total.monthlyTotal)).toHaveLength(1)

    // Contract duration
    expect(screen.queryAllByText(`${financialBreakdown.deviceCosts.duration}-month contract`)).toHaveLength(1)

    // Interest Rate
    expect(screen.queryAllByText(financialBreakdown.deviceCosts.interestRate)).toHaveLength(2)
  })

  it('should have a footer and header label when basket modal footer and header label is available', async () => {
    renderWithProviders(<DevicePaymentExample {...mockProps} isOpen />)
    await waitFor(() => {
      expect(screen.getByText('Interest-free Financing')).toBeInTheDocument()
    })
    expect(screen.getByText('Authorised and regulated by the Financial Conduct Authority', { exact: false })).toBeInTheDocument()
  })
})
