import renderWithProviders from '@helpers/renderWithProviders'

import DeliveryMessage from './DeliveryMessage'

describe('<DeliveryMessage />', () => {
  it(`Renders correctly`, () => {
    const { getByText } = renderWithProviders(<DeliveryMessage />)
    expect(getByText('Free home delivery tomorrow')).toBeInTheDocument()
    expect(getByText('if ordered before 10pm today (excludes Northern Ireland)')).toBeInTheDocument()
  })

  it('Shows delivery icon wrapper', () => {
    const { container } = renderWithProviders(<DeliveryMessage />)
    const icon = container.getElementsByClassName('message-icon')
    expect(icon).toHaveLength(1)
  })
})
