import SwitchMyNetwork from './SwitchMyNetwork'
import AnalyticsUtil from '@utilities/Analytics'
import renderWithProviders from '@helpers/renderWithProviders'
import { fireEvent } from '@testing-library/dom'
import mockPageContent from '@shared/config/content/BasketPageContent.json'

const pageContent: BasketPageContent.Basket = mockPageContent[0]?.basket as BasketPageContent.Basket
function mockStore(): any {
  return {
    basketStore: { pageContent },
  }
}

jest.mock('@store', () => ({
  useStore: jest.fn().mockImplementation(mockStore),
}))
jest.mock('@utilities/Analytics')
AnalyticsUtil.trackLink = jest.fn()

describe('SwitchMyNetwork', () => {
  it('should render prompt and modal closed by default', () => {
    const { container, queryByText } = renderWithProviders(<SwitchMyNetwork basket={{ basketId: 'test-id' }} onUpdateBasket={jest.fn()} />)
    expect(container.querySelector('#switch-network-toggle')).toBeInTheDocument()
    expect(container.querySelector('dialog')).toBeNull()
    expect(queryByText('Switch My Network')).toBeNull()
  })

  it('should call trackLink if opened', () => {
    const handleUpdateBasket = jest.fn()
    const { container, queryByText } = renderWithProviders(
      <SwitchMyNetwork basket={{ basketId: 'test-id' }} onUpdateBasket={handleUpdateBasket} />,
    )
    const toggle = container.querySelector('#switch-network-toggle') as HTMLButtonElement
    expect(queryByText('Switch My Network')).toBeNull()

    fireEvent.click(toggle)

    expect(AnalyticsUtil.trackLink).toBeCalledWith('basketPage.switchNetworkStart', {
      newBasket: { basketId: 'test-id' },
      packageId: undefined,
      pageError: undefined,
    })
    expect(container.querySelector('dialog')).toBeInTheDocument()
    expect(queryByText('Switch My Network')).toBeInTheDocument()
  })
})
