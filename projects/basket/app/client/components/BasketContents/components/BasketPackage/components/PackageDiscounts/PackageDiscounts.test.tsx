import PackageDiscounts from './PackageDiscounts'

import transformUtils from '@shared/helpers/transformUtils/transformUtils'
import renderWithProviders from '@helpers/renderWithProviders'
import { BASKET_CONSTS, TACTICAL_TRADEIN_TEXT } from '@constants'

import * as getABTestFeatureValue from '@helpers/getABTestFeatureValue'
import { screen } from '@testing-library/react'

import packageDiscounts from './mocks/packageDiscounts.mock.json'
import packageDiscountsWithUpfrontDiscount from './mocks/packageDiscountsWithUpfrontDiscount.mock.json'
import packageDiscountsWith350Discount from './mocks/packageDiscountsWith350Discount.mock.json'
import packageDiscountsWithSmartWatchDiscount from './mocks/packageDiscountsWithSmartWatchDiscount.mock.json'
import combiPackageDiscount from './mocks/combiPackageDiscounts.mock.json'
import mockPageContent from '@shared/config/content/BasketPageContent.json'
import tacticalTradeInDiscountMock from './mocks/packageDiscountsTacticalTradeIn.mock.json'
import tacticalTradeInDiscountMockLessThanMonthly from './mocks/packageDiscountsTacticalTradeInLessThanMonthly.mock.json'

const pageContent: BasketPageContent.Basket = mockPageContent[0]?.basket as BasketPageContent.Basket
const mockPackageDiscounts = { ...transformUtils.removeNulls(packageDiscounts) }
const mockPackageDiscountsWith350Discount = { ...transformUtils.removeNulls(packageDiscountsWith350Discount) }
const mockPackageDiscountsWithUpfrontDiscount = { ...transformUtils.removeNulls(packageDiscountsWithUpfrontDiscount) }
const mockPackageDiscountsWithSmartWatchDiscount = { ...transformUtils.removeNulls(packageDiscountsWithSmartWatchDiscount) }
const mockCombiPackageDiscount = { ...transformUtils.removeNulls(combiPackageDiscount) }
const mockTacticalTradeInDiscount = { ...transformUtils.removeNulls(tacticalTradeInDiscountMock) }
const mockTacticalTradeInDiscountLessThanMonthly = { ...transformUtils.removeNulls(tacticalTradeInDiscountMockLessThanMonthly) }

jest.mock('@helpers/getABTestFeatureValue', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue(false),
}))

describe('PackageDiscounts', () => {
  it('should have "Discount" title', () => {
    renderWithProviders(<PackageDiscounts {...mockPackageDiscounts} />)
    expect(screen.getByText('Discount')).toBeInTheDocument()
  })

  it('should have "Discount †" title when has Smart Watch discount and reviewMode is off', () => {
    renderWithProviders(<PackageDiscounts {...mockPackageDiscountsWithSmartWatchDiscount} reviewMode={false} />)
    expect(screen.getByText('Discount †')).toBeInTheDocument()
  })

  it('should have only "Discount" title when has Smart Watch discount and reviewMode is on', () => {
    renderWithProviders(<PackageDiscounts {...mockPackageDiscountsWithSmartWatchDiscount} reviewMode={true} />)
    expect(screen.getByText('Discount')).toBeInTheDocument()
  })

  it('should have "Your discount" title when hasTradeIn=true', () => {
    renderWithProviders(<PackageDiscounts {...mockPackageDiscounts} hasTradeIn />)
    expect(screen.getByText('Your discount')).toBeInTheDocument()
  })

  it('should have discount descriptions list', () => {
    renderWithProviders(<PackageDiscounts {...mockPackageDiscounts} />)
    expect(screen.getAllByText('6 months half price - introductory offer')).toHaveLength(2)
  })

  describe('upfront discount', () => {
    it('should have a symbol as suffix to Discounts for 113119 discount', () => {
      renderWithProviders(<PackageDiscounts {...mockPackageDiscountsWith350Discount} />)
      expect(screen.getByText('Discount †')).toBeInTheDocument()
    })
  })

  describe('upfront discount', () => {
    it('should have "Upfront" title', () => {
      renderWithProviders(<PackageDiscounts {...mockPackageDiscountsWithUpfrontDiscount} />)
      expect(screen.getByText('Upfront')).toBeInTheDocument()
    })

    it('should have formatted upfront discount amount', () => {
      renderWithProviders(<PackageDiscounts {...mockPackageDiscountsWithUpfrontDiscount} />)
      expect(screen.getByText('£0')).toBeInTheDocument()
    })

    it('should have net price for business customers', () => {
      renderWithProviders(<PackageDiscounts {...mockPackageDiscountsWithUpfrontDiscount} isUpgrade isBusiness />)
      expect(screen.getByText('(ex VAT)')).toBeInTheDocument()
      expect(screen.getByText('-£16.66')).toBeInTheDocument()
    })
  })

  describe('monthly discount', () => {
    it('should have "Monthly" title when there is no discount', () => {
      renderWithProviders(<PackageDiscounts {...mockPackageDiscounts} />)
      expect(screen.getByText('Monthly')).toBeInTheDocument()
    })

    it('should have "Monthly*" title when there is discount', () => {
      const [firstModelPackage, ...restModelPackages] = mockPackageDiscounts.modelPackage as BasketV2.ModelPackage[]
      const modelPackage = [
        {
          ...firstModelPackage,
          bundle: {
            priceDetails: {
              merchandisingPromotions: {
                mpType: BASKET_CONSTS.MP_TYPE_LIMITED_TIME,
              },
            },
          },
        },
        ...restModelPackages,
      ]

      renderWithProviders(<PackageDiscounts modelPackage={modelPackage} pageContent={pageContent} />)
      expect(screen.getByText('Monthly*')).toBeInTheDocument()
    })

    it('should have formatted monthly savings amount', () => {
      renderWithProviders(<PackageDiscounts {...mockPackageDiscounts} />)
      expect(screen.getByText('-£10')).toBeInTheDocument()
    })

    it('should have net price for business customers', () => {
      renderWithProviders(<PackageDiscounts {...mockPackageDiscounts} isUpgrade isBusiness />)
      expect(screen.getByText('(ex VAT)')).toBeInTheDocument()
      expect(screen.getByText('-£8.33')).toBeInTheDocument()
    })
  })

  it('should render without crashing', () => {
    renderWithProviders(<PackageDiscounts {...mockPackageDiscounts} />)
  })

  it('should correctly add up discount prices', () => {
    renderWithProviders(<PackageDiscounts {...mockCombiPackageDiscount} isUpgrade={false} isBusiness={false} />)
    expect(screen.getByText('-£16')).toBeInTheDocument()
  })

  it('should use have ', () => {
    const { getAllByText } = renderWithProviders(<PackageDiscounts {...mockPackageDiscountsWithUpfrontDiscount} />)
    expect(getAllByText('Vodafone Together £3 discount')).toHaveLength(2)
    expect(getAllByText('Double Data - 48GB for 24GB')).toHaveLength(2)
  })

  it('should show Your savings header when hasTradeIn is true', () => {
    renderWithProviders(<PackageDiscounts {...mockCombiPackageDiscount} hasTradeIn />)
    const title = screen.getByText('Your savings')
    expect(title).toBeInTheDocument()
    expect(title).toHaveClass('brand')
  })

  it('should show Your savings header when hasTradeIn is true and pacage is upgrade', () => {
    renderWithProviders(<PackageDiscounts {...mockCombiPackageDiscount} hasTradeIn isUpgrade />)
    const title = screen.getByText('Your savings')
    expect(title).toBeInTheDocument()
    expect(title).toHaveClass('upgrade')
  })

  it('should not show Your savings header when hasTradeIn not true', () => {
    renderWithProviders(<PackageDiscounts {...mockCombiPackageDiscount} />)
    expect(screen.queryByText('Your savings')).not.toBeInTheDocument()
  })

  describe('Tactical trade-in', () => {
    it('should show tactical discount text when trade-in in basket', () => {
      renderWithProviders(<PackageDiscounts {...mockTacticalTradeInDiscount} />)
      expect(screen.queryByText(TACTICAL_TRADEIN_TEXT)).toBeInTheDocument()
    })

    it('should not show tactical discount text when discount is less than monthly price', () => {
      renderWithProviders(<PackageDiscounts {...mockTacticalTradeInDiscountLessThanMonthly} />)
      expect(screen.queryByText(TACTICAL_TRADEIN_TEXT)).not.toBeInTheDocument()
    })

    it('should not show tactical discount text when not a trade-in', () => {
      renderWithProviders(<PackageDiscounts {...mockCombiPackageDiscount} />)
      expect(screen.queryByText(TACTICAL_TRADEIN_TEXT)).not.toBeInTheDocument()
    })
  })
})

describe('ABtest affect scenarios', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('should not see the upfront discount price when upfront cost is zero', () => {
    jest.spyOn(getABTestFeatureValue, 'default').mockReturnValue(true)
    renderWithProviders(<PackageDiscounts {...mockPackageDiscountsWithUpfrontDiscount} />)
    expect(screen.queryByText('£0')).not.toBeInTheDocument()
  })
  it('should see the upfront discount price when upfront cost is zero and the test is off', () => {
    jest.spyOn(getABTestFeatureValue, 'default').mockReturnValue(false)
    renderWithProviders(<PackageDiscounts {...mockPackageDiscountsWithUpfrontDiscount} />)
    expect(screen.getByText('£0')).toBeInTheDocument()
  })
})
