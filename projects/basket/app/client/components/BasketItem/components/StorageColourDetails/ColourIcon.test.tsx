import React from 'react'
import { screen } from '@testing-library/react'
import renderWithProviders from '@helpers/renderWithProviders'
import ColourIcon from './ColourIcon'
import BasketItemContext from '@components/BasketItem/context'

describe('<ColourIcon/>', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })
  test('should not be visible when there is no colour', () => {
    jest.spyOn(React, 'useContext').mockImplementation(() => ({}))

    const { container } = renderWithProviders(<ColourIcon />)

    expect(container.firstChild).toBeNull()
  })
  test('should render as expected with colour', () => {
    const { getByText } = renderWithProviders(
      <BasketItemContext.Provider value={{ colourHexcode: '#000000', colourName: 'Black' }}>
        <ColourIcon />
      </BasketItemContext.Provider>,
    )

    expect(getByText('Black')).toBeInTheDocument()

    expect(screen.getByTestId('colour-box')).toHaveStyle(`background-color: #000000`)
  })
})
