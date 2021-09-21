import { render, waitFor } from '@testing-library/react'
import * as storeHooks from '@store'
import PageButtons from './PageButtons'
import AnalyticsUtil from '@utilities/Analytics'

import combiBasketResponse from '@basketMocks/combiBasket.mock.json'
import combiBasketBusinessCategoryResponse from '@basketMocks/combiBasketBusinessAccount.mock.json'

afterEach(() => {
  jest.clearAllMocks()
  jest.restoreAllMocks()
})

function mockStore({
  setIsValidating = jest.fn(),
  validateBasket = jest.fn(),
  isUpgradeOrder = true,
  isCheckoutDisabled = false,
  isValidating = false,
  basket = {},
  toggleModal = jest.fn(),
  updateStatus = jest.fn(),
} = {}): any {
  return {
    basketStore: {
      setIsValidating,
      validateBasket,
      basket: {
        ...basket,
        isUpgradeOrder,
      },
      isCheckoutDisabled,
      isValidating,
      updateStatus,
    },
    pageUiStore: {
      toggleModal,
    },
  }
}

AnalyticsUtil.trackLink = jest.fn()
jest.mock('@store', () => ({
  useStore: jest.fn().mockImplementation(() => mockStore()),
}))

describe('PageButtons', () => {
  describe('"Go to checkout" button', () => {
    it('should render with default settings', () => {
      const { getByText } = render(<PageButtons />)
      const checkoutButton = getByText('Go to checkout')
      expect(checkoutButton).toBeInTheDocument()
      expect(checkoutButton).toHaveAttribute('aria-disabled', 'false')
    })
    it('should be disabled if isCheckoutDisabled is true', () => {
      jest.spyOn(storeHooks, 'useStore').mockImplementation(() => mockStore({ isCheckoutDisabled: true }))
      const { getByText } = render(<PageButtons />)
      expect(getByText('Go to checkout')).toHaveAttribute('aria-disabled', 'true')
    })
    it('should have loading style if isValidating is true', () => {
      jest.spyOn(storeHooks, 'useStore').mockImplementation(() => mockStore({ isValidating: true }))
      const { getByText } = render(<PageButtons />)
      expect(getByText('Go to checkout')).toHaveClass('has-icon-left')
    })
    it('should call validate methods on basketStore', () => {
      const spyIsValidating = jest.fn()
      const spyValidate = jest.fn()
      jest
        .spyOn(storeHooks, 'useStore')
        .mockImplementation(() => mockStore({ setIsValidating: spyIsValidating, validateBasket: spyValidate }))
      const oldWindow = global.window
      Object.defineProperty(window, 'location', {
        value: {
          assign: jest.fn(),
        },
      })
      const { getByText } = render(<PageButtons />)
      getByText('Go to checkout').closest('button')?.click()
      expect(spyIsValidating).toBeCalled()
      expect(spyValidate).toBeCalled()
      global.window = oldWindow
    })
    it('should redirect to secure checkout by default', async () => {
      jest.spyOn(storeHooks, 'useStore').mockImplementation(() => mockStore())
      const oldWindow = global.window
      Object.defineProperty(window, 'location', {
        value: {
          assign: jest.fn(),
        },
      })
      const { getByText } = render(<PageButtons />)
      await getByText('Go to checkout').closest('button')?.click()

      expect(global.window.location.assign).toHaveBeenCalledWith('/secure-checkout')

      global.window = oldWindow
    })
    it('should redirect to broadband installation if package is broadband', async () => {
      jest.spyOn(storeHooks, 'useStore').mockImplementation(() => mockStore({ basket: combiBasketResponse }))
      const oldWindow = global.window
      Object.defineProperty(window, 'location', {
        value: {
          assign: jest.fn(),
        },
      })
      const { getByText } = render(<PageButtons />)
      await getByText('Go to checkout').closest('button')?.click()

      expect(global.window.location.assign).toHaveBeenCalledWith('/broadband/deals/configure?installationType=superfast')

      global.window = oldWindow
    })

    it('should redirect to business connectivity if there is a broadband package and also the account category is business', async () => {
      jest.spyOn(storeHooks, 'useStore').mockImplementation(() => mockStore({ basket: combiBasketBusinessCategoryResponse }))
      const oldWindow = global.window
      Object.defineProperty(window, 'location', {
        value: {
          assign: jest.fn(),
        },
      })
      const { getByText } = render(<PageButtons />)
      await getByText('Go to checkout').closest('button')?.click()

      expect(global.window.location.assign).toHaveBeenCalledWith('/business/business-connectivity/configure?installationType=business')

      global.window = oldWindow
    })
    it('should trigger analytics error event in case of error', async () => {
      const mockError = {
        data: {
          errorMessage: 'test message',
          errorCode: 'test code',
        },
      }
      const mockUpdateStatus = jest.fn()
      jest
        .spyOn(storeHooks, 'useStore')
        .mockImplementation(() => mockStore({ validateBasket: jest.fn().mockRejectedValue(mockError), updateStatus: mockUpdateStatus }))
      const { getByText } = render(<PageButtons />)
      jest.spyOn(console, 'warn').mockImplementation(() => {})
      getByText('Go to checkout').closest('button')?.click()
      await waitFor(() => {
        expect(console.warn).toHaveBeenCalledWith('Failed to go to checkout.')
      })
      expect(mockUpdateStatus).toBeCalledWith('basketIsInvalid', mockError)
      expect(AnalyticsUtil.trackLink).toBeCalledWith('basketPage.inlineComponentError', {
        eventLabel: 'Go to checkout',
        newBasket: { isUpgradeOrder: true },
        pageError: 'test message',
        eventAction: 'test code',
      })
    })
    it('should trigger analytics error event with empty string by default', async () => {
      const mockError = {
        data: {},
      }
      jest.spyOn(storeHooks, 'useStore').mockImplementation(() => mockStore({ validateBasket: jest.fn().mockRejectedValue(mockError) }))
      const { getByText } = render(<PageButtons />)
      jest.spyOn(console, 'warn').mockImplementation(() => {})
      getByText('Go to checkout').closest('button')?.click()
      await waitFor(() => {
        expect(console.warn).toHaveBeenCalledWith('Failed to go to checkout.')
      })
      expect(AnalyticsUtil.trackLink).toBeCalledWith('basketPage.inlineComponentError', {
        eventLabel: 'Go to checkout',
        newBasket: { isUpgradeOrder: true },
        pageError: '',
        eventAction: '',
      })
    })
  })
  describe('"Continue shopping" button', () => {
    it('should not render by default', () => {
      const { queryByText } = render(<PageButtons />)
      expect(queryByText('Continue shopping')).not.toBeInTheDocument()
    })
    it('should render if isUpgradeOrder and isCheckoutDisabled is false', () => {
      jest.spyOn(storeHooks, 'useStore').mockImplementation(() => mockStore({ isUpgradeOrder: false }))
      const { getByText } = render(<PageButtons />)
      expect(getByText('Continue shopping')).toBeInTheDocument()
    })
    it('should call toggleModal on pageUiStore', () => {
      const spyFn = jest.fn()
      jest.spyOn(storeHooks, 'useStore').mockImplementation(() => mockStore({ isUpgradeOrder: false, toggleModal: spyFn }))
      const { getByText } = render(<PageButtons />)
      getByText('Continue shopping').closest('button')?.click()
      expect(spyFn).toBeCalled()
    })
  })
})
