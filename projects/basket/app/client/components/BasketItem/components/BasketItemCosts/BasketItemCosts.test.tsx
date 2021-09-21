import BasketItemContext, { BasketItemContextProps } from '@components/BasketItem/context'
import * as getABTestFeatureValue from '@helpers/getABTestFeatureValue'
import renderWithProviders from '@helpers/renderWithProviders'
import { screen } from '@testing-library/react'
import BasketItemCosts from './BasketItemCosts'

function renderCosts(context: BasketItemContextProps) {
  return renderWithProviders(
    <BasketItemContext.Provider value={context}>
      <BasketItemCosts />
    </BasketItemContext.Provider>,
  )
}

jest.mock('@helpers/getABTestFeatureValue', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue(false),
}))

describe('total costs', () => {
  const totalCosts = {
    monthlyPrice: '10.00',
    upfrontPrice: '12.01',
  }
  const displayedPrice = {
    monthly: '£10',
    upfront: '£12.01',
  }

  it('should display formatted prices', () => {
    renderCosts(totalCosts)
    expect(screen.getByText(displayedPrice.upfront)).toBeInTheDocument()
    expect(screen.getByText(displayedPrice.monthly)).toBeInTheDocument()
  })

  it('should be £0 by default', () => {
    renderCosts({})
    expect(screen.getAllByText('£0')).toHaveLength(2)
  })

  it('should be visible when total cost and header is visible', () => {
    renderCosts({ ...totalCosts, isTotalCost: true, hideHeader: false })
    expect(screen.getByText(displayedPrice.upfront)).toBeInTheDocument()
    expect(screen.getByText(displayedPrice.monthly)).toBeInTheDocument()
  })

  it('should be visible when total cost and header is hidden ', () => {
    renderCosts({ ...totalCosts, isTotalCost: false, hideHeader: true })
    expect(screen.getByText(displayedPrice.upfront)).toBeInTheDocument()
    expect(screen.getByText(displayedPrice.monthly)).toBeInTheDocument()
  })

  it('should be visible when total cost is hidden and breakdown is visible', () => {
    renderCosts({ ...totalCosts, isTotalCost: false })
    expect(screen.getByText(displayedPrice.upfront)).toBeInTheDocument()
    expect(screen.getByText(displayedPrice.monthly)).toBeInTheDocument()
  })

  it('should not have upfront pricing when presented as a discount banner', () => {
    renderCosts({ ...totalCosts, isDiscountBanner: true })
    expect(screen.queryByText(displayedPrice.upfront)).not.toBeInTheDocument()
  })

  it('should show monthly discount amount when presented as a discount banner', () => {
    renderCosts({ ...totalCosts, isDiscountBanner: true, monthlyDiscountPrice: '4' })
    expect(screen.getByText('-£4')).toBeInTheDocument()
  })

  it('should have discounted price when discounted', () => {
    renderCosts({ ...totalCosts, upfrontDiscountPrice: '3', monthlyDiscountPrice: '4' })
    expect(screen.getByText('£3')).toBeInTheDocument()
    expect(screen.getByText('£4')).toBeInTheDocument()
  })

  it('should have full price with suffix when price is discounted', () => {
    renderCosts({ ...totalCosts, upfrontDiscountPrice: '3', monthlyDiscountPrice: '4' })
    expect(screen.getByText(`was ${displayedPrice.upfront}`)).toBeInTheDocument()
    expect(screen.getByText(`was ${displayedPrice.monthly}`)).toBeInTheDocument()
  })

  it('should have suffix when business basket', () => {
    renderCosts({ ...totalCosts, isBusiness: true })
    expect(screen.getAllByText('(ex VAT)')).toHaveLength(2)
  })

  it('should have correct titles', () => {
    renderCosts(totalCosts)
    expect(screen.getByText('Monthly')).toBeInTheDocument()
    expect(screen.getByText('Upfront')).toBeInTheDocument()
  })
})

describe('ABtest affect scenarios', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const zeroTotalCosts = {
    monthlyPrice: '12.00',
    upfrontPrice: '0.00',
  }

  const totalCosts = {
    monthlyPrice: '12.00',
    upfrontPrice: '10.00',
  }

  const zeroDisplayedPrice = {
    monthly: '£12',
    upfront: '£0',
  }

  const displayedPrice = {
    monthly: '£12',
    upfront: '£10',
  }

  it('should not display upfront cost when upfront cost is 0', () => {
    jest.spyOn(getABTestFeatureValue, 'default').mockReturnValue(true)
    renderCosts(zeroTotalCosts)
    expect(screen.queryByText(zeroDisplayedPrice.upfront)).not.toBeInTheDocument()
    expect(screen.getByText(zeroDisplayedPrice.monthly)).toBeInTheDocument()
  })

  it('should display upfront cost when upfront cost is not 0', () => {
    jest.spyOn(getABTestFeatureValue, 'default').mockReturnValue(true)
    renderCosts(totalCosts)
    expect(screen.getByText(displayedPrice.upfront)).toBeInTheDocument()
    expect(screen.getByText(displayedPrice.monthly)).toBeInTheDocument()
  })
  it('should show storage and colour component in mobile view', () => {
    const oldWindow = global.window
    window.sgBreakpoint = 'sm'
    const details = {
      capacity: '128 GB',
      colourHexcode: '#FFFFFF',
      colourName: 'White',
    }
    jest.spyOn(getABTestFeatureValue, 'default').mockReturnValue(true)
    renderCosts(details)
    expect(screen.getByText(details.colourName)).toBeInTheDocument()

    global.window = oldWindow
  })

  it('should show size and colour component in mobile view for smartwatches', () => {
    const oldWindow = global.window
    window.sgBreakpoint = 'sm'
    const details = {
      deviceSize: '40mm',
      colourName: 'White',
    }
    jest.spyOn(getABTestFeatureValue, 'default').mockReturnValue(true)
    const { getByAltText } = renderCosts({ ...details, isSmartWatch: true })
    const image = getByAltText(details.deviceSize)
    expect(image.getAttribute('src')).toContain('/watch-size-icons/40mm.svg')

    global.window = oldWindow
  })
})
