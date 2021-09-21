import { screen } from '@testing-library/react'
import StorageColourDetails from './StorageColourDetails'
import BasketItemContext, { BasketItemContextProps } from '@components/BasketItem/context'
import renderWithProviders from '@helpers/renderWithProviders'

jest.mock('@helpers/getABTestFeatureValue', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue(true),
}))

function renderStorageColourDetails(context: BasketItemContextProps) {
  return renderWithProviders(
    <BasketItemContext.Provider value={context}>
      <StorageColourDetails />
    </BasketItemContext.Provider>,
  )
}

describe('storage colour details', () => {
  const details = {
    colourName: 'Purple',
    colourHexcode: '#234455',
    capacity: '128 GB',
  }

  it('should have colour icon', () => {
    renderStorageColourDetails(details)
    expect(screen.getByText(details.colourName)).toBeInTheDocument()
  })

  it('should have storage image', () => {
    const { getByAltText } = renderStorageColourDetails(details)
    const image = getByAltText(details.capacity)
    expect(image.getAttribute('src')).toContain('/capacity-icons/128_GB.svg')
  })

  it('should have a background colour', () => {
    const { getByTestId } = renderStorageColourDetails(details)
    expect(getByTestId('colour-box')).toHaveStyle(`background-color: ${details.colourHexcode}`)
  })
})
