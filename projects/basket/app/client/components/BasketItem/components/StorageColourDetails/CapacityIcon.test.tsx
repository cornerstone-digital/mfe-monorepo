import React from 'react'
import { screen } from '@testing-library/react'
import renderWithProviders from '@helpers/renderWithProviders'
import CapacityIcon from './CapacityIcon'
import BasketItemContext from '@components/BasketItem/context'

describe('<CapacityIcon/>', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })
  test('should not be visible when there is no capacity', () => {
    jest.spyOn(React, 'useContext').mockImplementation(() => ({}))

    const { container } = renderWithProviders(<CapacityIcon />)

    expect(container.firstChild).toBeNull()
  })
  test('should not be visible when there is no valid capacity', () => {
    jest.spyOn(React, 'useContext').mockImplementation(() => ({
      capacity: '71 GB',
    }))

    const { container } = renderWithProviders(<CapacityIcon />)

    expect(container.firstChild).toBeNull()
  })
  test('should render as expected', () => {
    renderWithProviders(
      <BasketItemContext.Provider value={{ capacity: '4 GB' }}>
        <CapacityIcon />
      </BasketItemContext.Provider>,
    )

    const image = screen.getByRole('img')

    expect(image.getAttribute('src')).toContain('/capacity-icons/4_GB.svg')
    expect(image).toHaveAttribute('alt', '4 GB')
  })
})
