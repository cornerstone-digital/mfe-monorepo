import React from 'react'
import { screen } from '@testing-library/react'
import renderWithProviders from '@helpers/renderWithProviders'
import SizeIcon from './SizeIcon'
import BasketItemContext from '@components/BasketItem/context'

describe('<SizeIcon/>', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })
  test('should not be visible when there is no size', () => {
    jest.spyOn(React, 'useContext').mockImplementation(() => ({}))

    const { container } = renderWithProviders(<SizeIcon />)

    expect(container.firstChild).toBeNull()
  })
  test('should not be visible when there is no valid size', () => {
    jest.spyOn(React, 'useContext').mockImplementation(() => ({
      deviceSize: '32mm',
    }))

    const { container } = renderWithProviders(<SizeIcon />)

    expect(container.firstChild).toBeNull()
  })
  test('should render as expected', () => {
    renderWithProviders(
      <BasketItemContext.Provider value={{ deviceSize: '40mm' }}>
        <SizeIcon />
      </BasketItemContext.Provider>,
    )

    const image = screen.getByRole('img')

    expect(image.getAttribute('src')).toContain('/watch-size-icons/40mm.svg')
    expect(image).toHaveAttribute('alt', '40mm')
  })
})
