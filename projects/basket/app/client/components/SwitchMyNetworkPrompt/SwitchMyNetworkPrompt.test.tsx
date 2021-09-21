import { act, fireEvent, waitFor } from '@testing-library/react'

import pageContent from '@shared/config/content/BasketPageContent.json'

import basketService from '@web-shop-core/services/basketService'
import contentService from '@web-cms-core/services/contentService'

import SwitchMyNetworkPrompt from './SwitchMyNetworkPrompt'
import renderWithProviders from '@helpers/renderWithProviders'

const basketPageContent: BasketPageContent.Basket = pageContent[0]?.basket as BasketPageContent.Basket

const mockStore = (): any => ({ basketStore: { pageContent: basketPageContent } })

jest.mock('@store', () => ({
  useStore: jest.fn().mockImplementation(() => mockStore()),
}))

describe('<SwitchMyNetworkPrompt />', () => {
  beforeEach(() => {
    jest.spyOn(contentService, 'getAssetModel').mockResolvedValue(pageContent)
  })

  afterAll(() => {
    jest.resetAllMocks()
  })

  it('should show terminated text if type is STAC', async () => {
    const { getByText } = renderWithProviders(
      <SwitchMyNetworkPrompt packageId="package-id" basketId="basket-id" onClick={jest.fn()} onUpdateBasket={jest.fn()} isSwitched />,
    )
    await waitFor(() => {
      expect(getByText('Thank you for switching!')).toBeInTheDocument()
      expect(getByText('Your information is saved.')).toBeInTheDocument()
    })
  })

  it('should show initial cms message once toggle is switched off', async () => {
    const { findByText } = renderWithProviders(
      <SwitchMyNetworkPrompt packageId="package-id" basketId="basket-id" onClick={jest.fn()} onUpdateBasket={jest.fn()} />,
    )
    await act(async () => {
      const headingText = basketPageContent.vf_Modules.basket_pac_stac_content.heading
      const result = await findByText(headingText)
      expect(result.textContent).toEqual(headingText)
    })
  })

  it('should call correct functions once toggle is switched off', async () => {
    const onUpdateBasketMock = jest.fn()
    jest.spyOn(basketService, 'removePortabilityInfo').mockResolvedValue({})

    const { getByText, container } = renderWithProviders(
      <SwitchMyNetworkPrompt
        packageId="package-id"
        basketId="basket-id"
        onClick={jest.fn()}
        onUpdateBasket={onUpdateBasketMock}
        isSwitched
      />,
    )
    await waitFor(() => {
      const toggle = container.querySelector('#switch-network-toggle') as HTMLButtonElement
      fireEvent.click(toggle)
    })

    expect(getByText('Are you sure?')).toBeInTheDocument()
    expect(getByText('By switching this toggle off your information for switching network will be lost.')).toBeInTheDocument()
    expect(document.querySelector('dialog')).toBeInTheDocument()

    const confirmButton = getByText('Confirm')
    expect(confirmButton).toBeInTheDocument()
    fireEvent.click(confirmButton)

    await waitFor(() => {
      expect(basketService.removePortabilityInfo).toHaveBeenCalledWith('basket-id', 'package-id')
      expect(onUpdateBasketMock).toHaveBeenCalled()
      expect(document.querySelector('dialog')).not.toBeInTheDocument()
    })
  })

  it('should render expected once confirmation is cancelled', async () => {
    const onUpdateBasketMock = jest.fn()
    jest.spyOn(basketService, 'removePortabilityInfo').mockResolvedValue({})

    const { getByText, container } = renderWithProviders(
      <SwitchMyNetworkPrompt
        packageId="package-id"
        basketId="basket-id"
        onClick={jest.fn()}
        onUpdateBasket={onUpdateBasketMock}
        isSwitched
      />,
    )
    await waitFor(() => {
      const toggle = container.querySelector('#switch-network-toggle') as HTMLButtonElement
      fireEvent.click(toggle)
    })
    expect(document.querySelector('dialog')).toBeInTheDocument()

    const cancelButton = getByText('Cancel')
    expect(cancelButton).toBeInTheDocument()
    fireEvent.click(cancelButton)

    expect(document.querySelector('dialog')).not.toBeInTheDocument()
  })

  it('should call onClick once toggle is clicked', async () => {
    const onClickMock = jest.fn()

    const wrapper = shallow(
      <SwitchMyNetworkPrompt onUpdateBasket={jest.fn()} packageId="package-id" basketId="basket-id" onClick={onClickMock} />,
    )
    wrapper.find('WithTheme(Toggle)').simulate('change')
    expect(onClickMock).toHaveBeenCalled()
  })

  it('should not render toggle for reviewMode', async () => {
    const onUpdateBasketMock = jest.fn()

    const wrapper = shallow(
      <SwitchMyNetworkPrompt
        packageId="package-id"
        basketId="basket-id"
        onClick={jest.fn()}
        onUpdateBasket={onUpdateBasketMock}
        reviewMode
      />,
    )

    expect(wrapper.find('WithTheme(Toggle)')).toHaveLength(0)
  })
})
