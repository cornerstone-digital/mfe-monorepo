import { act, fireEvent, render } from '@testing-library/react'
import ContinueWithoutSwitching from './ContinueWithoutSwitching'

describe('<ContinueWithoutSwitching />', () => {
  it('should render default content', () => {
    const { getByText } = render(<ContinueWithoutSwitching phoneNumber="0712345678" />)
    expect(getByText('Mobile number')).toBeInTheDocument()
    expect(getByText('Continue Without Switching')).toBeInTheDocument()
  })

  it('should render with corresponding description if "hasLateDelovery" is true', () => {
    const { getByText } = render(<ContinueWithoutSwitching phoneNumber="0712345678" hasLateDelivery />)
    expect(getByText('You can change your network service to Vodafone later, via the website.')).toBeInTheDocument()
    expect(
      getByText(`The date you've chosen to move to Vodafone is before your device's delivery date — please choose a later one.`),
    ).toBeInTheDocument()
  })

  it('should render with corresponding description if "hasUnknownDelivery" is true', () => {
    const { getByText } = render(<ContinueWithoutSwitching phoneNumber="0712345678" hasUnknownDelivery />)
    expect(
      getByText(
        `As you've chosen a device or product that's on pre-order or a back order, it may take us longer than requested to bring you over to us.`,
      ),
    ).toBeInTheDocument()
  })

  it.only('renders a notification when there is an errorMessage in state', () => {})

  it('calls onContinue if it is passed as a prop when handleContinue is executed', async () => {
    const spyOnContinue = jest.fn()
    const { container } = render(<ContinueWithoutSwitching phoneNumber="0712345678" onContinue={spyOnContinue} hasUnknownDelivery />)
    const continueButton = container.querySelector('button') as HTMLButtonElement
    await act(async () => {
      fireEvent.click(continueButton)
    })
    expect(spyOnContinue).toHaveBeenCalled()
  })

  it('sets an errorMessage in the state when there is an error calling onContinue', async () => {
    const spyOnContinue = jest.fn(() => Promise.reject('FAKE ERROR'))
    const warnSpy = jest.spyOn(global.console, 'warn').mockImplementation()

    const { container, getByText } = render(
      <ContinueWithoutSwitching phoneNumber="0712345678" onContinue={spyOnContinue} hasUnknownDelivery />,
    )
    const continueButton = container.querySelector('button') as HTMLButtonElement
    await act(async () => {
      fireEvent.click(continueButton)
    })
    expect(spyOnContinue).toBeCalled()
    expect(
      getByText(`Uh-oh, something went wrong when trying to remove your code. Once you've completed your order, please contact us.`),
    ).toBeInTheDocument()
    expect(console.warn).toBeCalledWith('Failed to remove details from basket.')
    expect(getByText('Continue Anyway')).toBeInTheDocument()
    warnSpy.mockRestore()
  })

  it('renders "Choose a new transfer date" and "Return to basket" if "hasLateDelivery" is true', () => {
    const { getByText } = render(<ContinueWithoutSwitching phoneNumber="0712345678" hasLateDelivery />)
    expect(getByText('Return to basket:')).toBeInTheDocument()
    expect(getByText('Choose a new transfer date')).toBeInTheDocument()
  })
})
