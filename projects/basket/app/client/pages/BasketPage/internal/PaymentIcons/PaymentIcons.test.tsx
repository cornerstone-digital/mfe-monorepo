import { render } from '@testing-library/react'

import PaymentIcons from '.'

describe('<PaymentIcons />', () => {
  it(`Renders correctly`, () => {
    const { getByText } = render(<PaymentIcons />)
    expect(getByText('Pay Securely with')).toBeInTheDocument()
  })

  it(`Shows payment icons image`, () => {
    const { getByAltText } = render(<PaymentIcons />)
    const image = getByAltText('VISA, Mastercard, VISA Electron, Maestro')
    expect(image).toHaveAttribute('src', '/basket/assets/secure-payment-icons.svg')
  })
})
