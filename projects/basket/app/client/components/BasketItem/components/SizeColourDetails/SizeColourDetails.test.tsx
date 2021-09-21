import { screen } from '@testing-library/react'
import SizeColourDetails from './SizeColourDetails'
import BasketItemContext, { BasketItemContextProps } from '@components/BasketItem/context'
import renderWithProviders from '@helpers/renderWithProviders'

jest.mock('@helpers/getABTestFeatureValue', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue(true),
}))

function renderSizeColourDetails(context: BasketItemContextProps) {
  return renderWithProviders(
    <BasketItemContext.Provider value={context}>
      <SizeColourDetails />
    </BasketItemContext.Provider>,
  )
}

describe('size colour details', () => {
  const details = {
    colourName: 'Purple',
    colourHexcode: '#234455',
    deviceSize: '40mm',
  }

  it('should have colour icon', () => {
    renderSizeColourDetails(details)
    expect(screen.getByText(details.colourName)).toBeInTheDocument()
  })

  it('should have size image', () => {
    const { getByAltText } = renderSizeColourDetails(details)
    const image = getByAltText(details.deviceSize)
    expect(image.getAttribute('src')).toContain('/watch-size-icons/40mm.svg')
  })

  it('should have a background colour', () => {
    const { getByTestId } = renderSizeColourDetails(details)
    expect(getByTestId('colour-box')).toHaveStyle(`background-color: ${details.colourHexcode}`)
  })
})
