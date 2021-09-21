import { fireEvent, waitFor } from '@testing-library/react'

import BasketModal from './BasketModal'
import * as storeHooks from '@store'
import renderWithProviders from '@helpers/renderWithProviders'

const defaultBasketStore = {
  basket: { isBusiness: false },
  handleEmptyBasket: jest.fn(),
  onVoucherConfirm: jest.fn(),
  confirmRemovePackage: jest.fn(),
} as any

jest.mock('@store', () => ({
  useStore: jest.fn().mockReturnValue(() => ({})),
}))

describe('BasketModal', () => {
  // We should use fake timers as lib-web-core's <Modal /> component is impure and schedules work on mount.
  // Tests would be flaky otherwise: https://testing-library.com/docs/using-fake-timers/
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
    jest.clearAllMocks()
  })

  it.each`
    modalName             | expectedHeader
    ${'removePackage'}    | ${'Delete package'}
    ${'emptyBasket'}      | ${'Are you sure?'}
    ${'switchVoucher'}    | ${'Add voucher'}
    ${'continueShopping'} | ${'What are you shopping for?'}
    ${'removeCombi'}      | ${'Removing this bundle'}
  `('should have "$expectedHeader" heading text when $modalName modal', async ({ modalName, expectedHeader }) => {
    const mockStore = { pageUiStore: { isModalVisible: true, modalName }, basketStore: defaultBasketStore } as storeHooks.RootStoreType
    jest.spyOn(storeHooks, 'useStore').mockImplementation(() => mockStore)
    const { container } = renderWithProviders(<BasketModal />)
    await waitFor(() => {
      expect(container.querySelector('h1')).toHaveTextContent(expectedHeader)
    })
  })

  // prettier-ignore
  it.each([
    // Format: [modalName, expectedMessage]
    [
      'removePackage',
      `Are you sure you'd like to delete this package from your basket? This will empty your basket, and can't be undone.`,
    ],
    [
      'emptyBasket',
      `You're about to remove everything in your basket. You'll have to shop again if you wish to get these items back.`,
    ],
    [
      'switchVoucher',
      `Are you sure you want to replace the promotional voucher?`,
    ],
    [
      'removeCombi',
      `Are you sure you'd like to remove this bundle from your basket? You won't be able to undo this action. You'll miss out on your great discount currently applied to your basket for having Broadband and Pay Monthly together. If there is another package in your basket to keep the discount, we'll automatically apply it for you though.`,
    ],
  ])('should have correct message when %s modal', (modalName, expectedMessage) => {
    const mockStore = { pageUiStore: { isModalVisible: true, modalName }, basketStore: defaultBasketStore } as any
    jest.spyOn(storeHooks, 'useStore').mockImplementation(() => mockStore)
    const { getByText } = renderWithProviders(<BasketModal />)
    expect(getByText(expectedMessage)).toBeInTheDocument()
  })

  describe('cancel button', () => {
    it('should call hide modal handler when button is visible and clicked', async () => {
      const handlerFn = jest.fn()
      const mockStore = {
        pageUiStore: { isModalVisible: true, modalName: 'removePackage', hideModal: handlerFn },
        basketStore: defaultBasketStore,
      } as any
      jest.spyOn(storeHooks, 'useStore').mockImplementation(() => mockStore)
      const { getByText } = renderWithProviders(<BasketModal />)
      await waitFor(() => {
        const cancelButton = getByText('Cancel')
        expect(cancelButton).toBeInTheDocument()
        fireEvent.click(cancelButton)
      })
      expect(handlerFn).toHaveBeenCalledTimes(1)
    })

    it.each`
      modalName             | hasCancelButton
      ${'removePackage'}    | ${true}
      ${'emptyBasket'}      | ${true}
      ${'switchVoucher'}    | ${true}
      ${'removeCombi'}      | ${true}
      ${'continueShopping'} | ${false}
    `('should be $hasCancelButton when $modalName modal', ({ modalName, hasCancelButton }) => {
      const mockStore = { pageUiStore: { isModalVisible: true, modalName }, basketStore: defaultBasketStore } as any
      jest.spyOn(storeHooks, 'useStore').mockImplementation(() => mockStore)
      const { queryByText } = renderWithProviders(<BasketModal />)
      if (hasCancelButton) {
        expect(queryByText('Cancel')).toBeInTheDocument()
      } else {
        expect(queryByText('Cancel')).not.toBeInTheDocument()
      }
    })

    it.each(['removePackage', 'emptyBasket', 'switchVoucher', 'removeCombi'])(
      `should call hide modal handler when clicked and it's %s modal`,
      async modalName => {
        const handlerFn = jest.fn()
        const mockStore = { pageUiStore: { isModalVisible: true, modalName, hideModal: handlerFn }, basketStore: defaultBasketStore } as any
        jest.spyOn(storeHooks, 'useStore').mockImplementation(() => mockStore)
        const { getByText } = renderWithProviders(<BasketModal />)
        await waitFor(() => {
          const cancelButton = getByText('Cancel')
          fireEvent.click(cancelButton)
        })
        expect(handlerFn).toHaveBeenCalledTimes(1)
      },
    )
  })

  it('should call assigned handler when provided button is clicked', () => {
    const handlerFn = jest.fn()
    const mockStore = {
      pageUiStore: { isModalVisible: true, modalName: 'removePackage' },
      basketStore: { ...defaultBasketStore, handleEmptyBasket: handlerFn },
    } as any
    jest.spyOn(storeHooks, 'useStore').mockImplementation(() => mockStore)
    const { container } = renderWithProviders(<BasketModal />)
    const button = container.querySelector('[aria-label="Delete package"]') as HTMLButtonElement

    expect(button).toBeInTheDocument()
    button.click()
    expect(handlerFn).toHaveBeenCalledTimes(1)
  })

  it.each`
    modalName          | buttonText           | handlerName
    ${'removePackage'} | ${'Delete package'}  | ${'handleEmptyBasket'}
    ${'emptyBasket'}   | ${'Empty basket'}    | ${'handleEmptyBasket'}
    ${'switchVoucher'} | ${'Replace voucher'} | ${'onVoucherConfirm'}
    ${'removeCombi'}   | ${'Remove bundle'}   | ${'confirmRemovePackage'}
  `(
    `should have "$buttonText" button when it's $modalName modal, and call "$handlerName" handler when the button is clicked`,
    async ({ modalName, buttonText, handlerName }) => {
      const handlerFn = jest.fn()
      const handler = { [handlerName]: handlerFn }

      const mockStore = { pageUiStore: { isModalVisible: true, modalName }, basketStore: { ...defaultBasketStore, ...handler } } as any
      jest.spyOn(storeHooks, 'useStore').mockImplementation(() => mockStore)

      const { container } = renderWithProviders(<BasketModal />)
      await waitFor(() => {
        const button = container.querySelector(`[aria-label="${buttonText}"]`) as HTMLButtonElement
        fireEvent.click(button)
      })
      expect(handlerFn).toHaveBeenCalledTimes(1)
    },
  )

  it('should be visible when isModalVisible is true', async () => {
    const mockStore = {
      pageUiStore: { isModalVisible: true, modalName: 'removePackage' },
      basketStore: defaultBasketStore,
    } as storeHooks.RootStoreType
    jest.spyOn(storeHooks, 'useStore').mockImplementation(() => mockStore)
    const { container } = renderWithProviders(<BasketModal />)
    await waitFor(() => {
      expect(container.querySelector('dialog')).toBeInTheDocument()
    })
  })

  it('should not be visible when isModalVisible is false', async () => {
    const mockStore = {
      pageUiStore: { isModalVisible: false, modalName: 'removePackage' },
      basketStore: defaultBasketStore,
    } as storeHooks.RootStoreType
    jest.spyOn(storeHooks, 'useStore').mockImplementation(() => mockStore)
    const { container } = renderWithProviders(<BasketModal />)
    await waitFor(() => {
      expect(container.querySelector('dialog')).not.toBeInTheDocument()
    })
  })

  describe(`continue shopping modal`, () => {
    enum ClientType {
      Business = 'business',
      Private = 'private',
    }

    it('should render correct modal title', () => {
      const mockStore = {
        pageUiStore: { isModalVisible: true, modalName: 'continueShopping' },
        basketStore: { basket: { isBusiness: false } },
      } as any
      jest.spyOn(storeHooks, 'useStore').mockImplementation(() => mockStore)

      const { queryByText } = renderWithProviders(<BasketModal />)

      queryByText('What are you shopping for?')
    })

    it.each`
      linkText           | clientType             | hasPayMonthlyPackage | href
      ${'SIM only'}      | ${ClientType.Business} | ${true}              | ${'/business/business-sim-only?continueShopping=true'}
      ${'SIM only'}      | ${ClientType.Private}  | ${true}              | ${'/mobile/best-sim-only-deals?continueShopping=true'}
      ${'Phones'}        | ${ClientType.Business} | ${true}              | ${'/business/business-mobile-phones/pay-monthly-contracts?continueShopping=true'}
      ${'Phones'}        | ${ClientType.Private}  | ${true}              | ${'/mobile/phones/pay-monthly-contracts?continueShopping=true'}
      ${'Phones'}        | ${ClientType.Business} | ${false}             | ${'/business/mobile/phones/pay-as-you-go?continueShopping=true'}
      ${'Phones'}        | ${ClientType.Private}  | ${false}             | ${'/mobile/phones/pay-as-you-go?continueShopping=true'}
      ${'Broadband'}     | ${ClientType.Business} | ${true}              | ${'/business/business-connectivity/broadband-and-phone?continueShopping=true'}
      ${'Broadband'}     | ${ClientType.Private}  | ${true}              | ${'/broadband?continueShopping=true'}
      ${'Data only SIM'} | ${ClientType.Business} | ${true}              | ${'/business/data-only-sim?continueShopping=true'}
      ${'Data only SIM'} | ${ClientType.Private}  | ${true}              | ${'/data-only-sim?continueShopping=true'}
      ${'Tablets'}       | ${ClientType.Business} | ${true}              | ${'/business/mobile-broadband/tablets?continueShopping=true'}
      ${'Tablets'}       | ${ClientType.Private}  | ${true}              | ${'/mobile-broadband/tablets?continueShopping=true'}
      ${'Mobile Wi-Fi'}  | ${ClientType.Business} | ${true}              | ${'/business/mobile-broadband/dongles-and-mobile-wifi?continueShopping=true'}
      ${'Mobile Wi-Fi'}  | ${ClientType.Private}  | ${true}              | ${'/mobile-broadband/dongles-and-mobile-wifi?continueShopping=true'}
      ${'Smartwatches'}  | ${ClientType.Business} | ${true}              | ${'/business/smart-watches-and-wearables?continueShopping=true'}
      ${'Smartwatches'}  | ${ClientType.Private}  | ${true}              | ${'/smart-watches-and-wearables?continueShopping=true'}
    `('should have "$linkText" link with "$href" url when $clientType client', ({ linkText, clientType, href, hasPayMonthlyPackage }) => {
      const mockStore = {
        pageUiStore: { isModalVisible: true, modalName: 'continueShopping' },
        basketStore: { basket: { isBusiness: clientType === ClientType.Business }, hasPayMonthlyPackage },
      } as any
      jest.spyOn(storeHooks, 'useStore').mockImplementation(() => mockStore)

      const { queryByText } = renderWithProviders(<BasketModal />)

      const icon = queryByText(linkText)
      const link = icon?.closest('a')

      expect(link).toHaveAttribute('href', href)
      expect(icon).toBeInTheDocument()
    })
  })
})
