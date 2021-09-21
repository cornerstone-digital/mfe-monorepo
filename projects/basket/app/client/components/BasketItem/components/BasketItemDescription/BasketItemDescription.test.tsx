import { screen } from '@testing-library/react'
import * as getABTestFeatureValue from '@helpers/getABTestFeatureValue'

import BasketItemDescription from './'
import BasketItemContext, { BasketItemContextProps } from '@components/BasketItem/context'
import { BasketItemProps } from '@components/BasketItem/BasketItem.types'
import { mockStore } from '@tools/mocks/storeMock'
import renderWithProviders from '@helpers/renderWithProviders'

jest.mock('@helpers/getABTestFeatureValue', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue(true),
}))

jest.mock('@store', () => ({
  useStore: jest.fn().mockImplementation(() => mockStore({})),
}))

function renderDescription(context: BasketItemContextProps) {
  return renderWithProviders(
    <BasketItemContext.Provider value={context}>
      <BasketItemDescription />
    </BasketItemContext.Provider>,
  )
}

describe('description', () => {
  const descriptions = ['some cool description']

  it('should be shown twice when the basket item is not a watch or a watch simo', () => {
    renderDescription({ description: descriptions, isSmartWatch: false, isSmartWatchSimo: false })
    expect(screen.queryByText(descriptions[0])).toBeInTheDocument()
  })

  it('should have broadband info when basket item is a broadband', () => {
    const broadbandInfo: BasketItemProps['broadbandInfo'] = {
      increaseMessage: 'increase msg',
      address: 'address',
    }
    renderDescription({ description: descriptions, broadbandInfo: broadbandInfo, isBroadband: true })
    expect(screen.queryByText(broadbandInfo.increaseMessage!)).toBeInTheDocument()
    expect(screen.queryByText(broadbandInfo.address!)).toBeInTheDocument()
  })

  it('should display "See all benefits" button when isSimo and isBoundle is true and planBenefitsAB is true', () => {
    renderDescription({ description: descriptions, isSimo: true, isHandset: true })
    expect(screen.queryByText('See all benefits')).toBeInTheDocument()
  })

  it('should display "See all benefits" button when isSimo is false and isBoundle is true and planBenefitsAB is true', () => {
    renderDescription({ description: descriptions, isSimo: false, isHandset: true })
    expect(screen.queryByText('See all benefits')).toBeInTheDocument()
  })

  it('should not display "See all benefits" button when isSimo is false and isBoundle is false and planBenefitsAB is true', () => {
    renderDescription({ description: descriptions, isSimo: false, isHandset: false })
    expect(screen.queryByText('See all benefits')).not.toBeInTheDocument()
  })

  it('should not display "See all benefits" button when isSimo is true and isBoundle is true and planBenefitsAB is false', () => {
    jest.spyOn(getABTestFeatureValue, 'default').mockImplementationOnce(() => false)
    renderDescription({ description: descriptions, isSmartWatch: false, isSmartWatchSimo: false })
    expect(screen.queryByText('See all benefits')).not.toBeInTheDocument()
  })

  it('should see storage and colour details when the showStorageColourIcons AB test is true', () => {
    const oldWindow = global.window
    window.sgBreakpoint = 'md'
    const details = {
      colourName: 'White',
    }
    renderDescription({ description: descriptions, isBroadband: false, capacity: '128 GB', colourHexcode: '#FFFFFF', colourName: 'White' })
    expect(screen.getByText(details.colourName)).toBeInTheDocument()

    global.window = oldWindow
  })

  it('should see size and colour details for smartwatches when the showStorageColourIcons AB test is true', () => {
    const oldWindow = global.window
    window.sgBreakpoint = 'md'
    const details = {
      colourName: 'White',
      deviceSize: '40mm',
    }
    const { getByAltText } = renderDescription({
      description: descriptions,
      isBroadband: false,
      capacity: '128 GB',
      colourHexcode: '#FFFFFF',
      colourName: 'White',
      deviceSize: '40mm',
      isSmartWatch: true,
    })

    const image = getByAltText(details.deviceSize)
    expect(image.getAttribute('src')).toContain('/watch-size-icons/40mm.svg')

    global.window = oldWindow
  })
})
