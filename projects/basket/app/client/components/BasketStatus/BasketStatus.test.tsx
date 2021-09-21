import BasketStatus from './BasketStatus'
import { BasketStatusProps } from './BasketStatus.types'
import mockPageContent from '@shared/config/content/BasketPageContent.json'
import { fireEvent, render, screen } from '@testing-library/react'
import * as generateChangePackageLink from '@helpers/generateChangePackageLink'
import getErrorDetails from './helpers/getErrorDetails'
import AnalyticsUtil from '@utilities/Analytics'
import * as storeHooks from '@store'
import BasketStore from '@store/BasketStore'
import { ValidationErrorCode } from '@constants'

const defaultPageContent: BasketPageContent.Basket = mockPageContent[0]?.basket as BasketPageContent.Basket

jest.mock('@utilities/Analytics')
AnalyticsUtil.trackLink = jest.fn()

const defaultMockStore = {
  basket: {
    packages: ['test-package1', 'test-package2'],
  },
  pageContent: defaultPageContent,
}

function mockStore(store: Partial<BasketStore> = {}): any {
  return {
    basketStore: {
      ...defaultMockStore,
      ...store,
    },
  }
}

jest.mock('@store', () => ({
  useStore: jest.fn().mockImplementation(() => mockStore()),
}))

jest.mock('@helpers/generateChangePackageLink', () => ({
  __esModule: true,
  default: jest.fn(),
}))

jest.mock('./helpers/getErrorDetails', () => {
  const original = jest.requireActual('./helpers/getErrorDetails')
  return {
    __esModule: true,
    default: jest.fn(original.default),
  }
})

jest.mock('mobx-react-lite', () => ({
  observer: (param: any) => param,
}))

const defaultProps: BasketStatusProps = {
  worker: { postMessage: jest.fn() },
}

describe('<BasketStatus />', () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  describe('when button is visible and clicked', () => {
    const oldWindow = global.window
    beforeEach(() => {
      Object.defineProperty(window, 'location', {
        value: {
          assign: jest.fn(),
        },
      })
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    afterAll(() => {
      global.window = oldWindow
    })

    it.each`
      errorCode                      | notificationCtaUrl | cta
      ${'AIRTIME_DEVICE_MISMATCH'}   | ${'/test-apple'}   | ${'See Airtime plans'}
      ${'LOAN_INVALID_UPFRONT_COST'} | ${'/test-upfront'} | ${'Change my upfront cost'}
    `('should redirect to proper path', ({ errorCode, notificationCtaUrl, cta }) => {
      jest.spyOn(generateChangePackageLink, 'default').mockImplementation(() => notificationCtaUrl)
      jest
        .spyOn(storeHooks, 'useStore')
        .mockImplementation(() => mockStore({ notification: 'basketIsInvalid', error: { data: { errorCode, errorMessage: 'test' } } }))
      const { container, getByText } = render(<BasketStatus {...defaultProps} />)
      expect(getByText(cta)).toBeInTheDocument()
      expect(container.querySelector('.error')).toBeInTheDocument()
      const button = container.querySelectorAll('button')
      expect(button).toHaveLength(1)
      fireEvent.click(button[0])
      expect(global.window.location.assign).toHaveBeenCalledWith(notificationCtaUrl)
    })

    it.each`
      errorCode                                                 | analyticsEventName
      ${ValidationErrorCode.MAXIMUM_ALLOWED_LOANS}              | ${'basketPage.ctaErrMaxLoans'}
      ${ValidationErrorCode.MAXIMUM_CTNS_WITH_CONCURRENT_LOANS} | ${'basketPage.ctaErrConcurrentLoans'}
      ${ValidationErrorCode.MAXIMUM_LOANS_FOR_CTN}              | ${'basketPage.ctaErrConcurrentLoans'}
      ${ValidationErrorCode.REPAYMENT_ISSUES}                   | ${'basketPage.ctaErrRepaymentIssues'}
      ${ValidationErrorCode.MAXIMUM_LENDING_LIMIT}              | ${'basketPage.ctaErrMaxLendingLimit'}
    `('should call analytics with proper parameters', async ({ errorCode, analyticsEventName }) => {
      jest.spyOn(generateChangePackageLink, 'default').mockImplementation(() => 'test-cta')
      jest
        .spyOn(storeHooks, 'useStore')
        .mockImplementation(() => mockStore({ notification: 'basketIsInvalid', error: { data: { errorCode, errorMessage: 'test' } } }))
      const { container } = render(<BasketStatus {...defaultProps} />)
      const button = container.querySelectorAll('button')
      fireEvent.click(button[0])

      expect(AnalyticsUtil.trackLink).toHaveBeenCalledWith(analyticsEventName, { newBasket: defaultMockStore.basket, pageError: undefined })
    })

    it.each`
      errorMessage              | resultUrl
      ${'test samsung message'} | ${'/mobile/phones/pay-monthly-contracts/samsung'}
      ${'test apple message'}   | ${'/mobile/phones/pay-monthly-contracts/apple'}
      ${'test message'}         | ${''}
    `('should redirect to proper path for validation error', ({ errorMessage, resultUrl }) => {
      const error = {
        data: {
          errorCode: 'VALIDATION_ERROR',
          errorMessage: 'test',
          validationDetails: [{ errorCode: 'MissingHandsetForWatch', errorMessage }],
        },
      }
      jest.spyOn(storeHooks, 'useStore').mockImplementation(() => mockStore({ notification: 'general', error }))
      const { container, getByText } = render(<BasketStatus {...defaultProps} />)
      expect(getByText('See compatible phones')).toBeInTheDocument()
      const button = container.querySelectorAll('button')
      fireEvent.click(button[0])
      if (resultUrl) {
        expect(global.window.location.assign).toHaveBeenCalledWith(resultUrl)
      } else {
        expect(global.window.location.assign).not.toHaveBeenCalled()
      }
    })
  })

  it('sets error category to system', () => {
    jest
      .spyOn(storeHooks, 'useStore')
      .mockImplementation(() => mockStore({ notification: 'general', error: { data: { errorCode: 'SYS_ERR_DEF', errorMessage: 'test' } } }))
    render(<BasketStatus {...defaultProps} />)
    expect(defaultProps.worker.postMessage).toHaveBeenCalledWith({
      error: {
        error_category: 'system',
        error_code: 'SYS_ERR_DEF',
        error_short_description: 'test',
      },
    })
  })

  it('uses content API for title & message if there is an error to map to', () => {
    jest
      .spyOn(storeHooks, 'useStore')
      .mockImplementation(() => mockStore({ notification: 'general', error: { data: { errorCode: 'Err_Vou_002', errorMessage: 'test' } } }))
    const { container } = render(<BasketStatus {...defaultProps} />)
    expect(screen.getByText('Uh-oh, something went wrong.')).toBeInTheDocument()
    expect(
      screen.getByText(
        'The promotional code you entered has already been redeemed, or is currently being applied to another basket you’ve created. Please check and try again or contact customer support.',
      ),
    ).toBeInTheDocument()
    expect(document.querySelector('button')).not.toBeInTheDocument()
    expect(getErrorDetails).toHaveBeenCalledWith('general', { data: { errorCode: 'Err_Vou_002', errorMessage: 'test' } }, undefined, 2)
    expect(container.querySelector('.info')).toBeInTheDocument()
    expect(defaultProps.worker.postMessage).toHaveBeenCalledWith({
      error: {
        error_category: 'business',
        error_code: 'Err_Vou_002',
        error_short_description: 'test',
      },
    })
  })

  it('handles missing fields in the error content', () => {
    jest
      .spyOn(storeHooks, 'useStore')
      .mockImplementation(() =>
        mockStore({ notification: 'general', error: { data: { errorCode: 'BSKT_INVALID_1', errorMessage: 'test' } } }),
      )
    const { container } = render(<BasketStatus {...defaultProps} />)
    expect(screen.getByText('Uh-oh, something went wrong.')).toBeInTheDocument()
    expect(screen.getByText('There was a problem fetching your basket. Please try again or contact customer support.')).toBeInTheDocument()
    expect(container.querySelector('button')).not.toBeInTheDocument()
    expect(getErrorDetails).toHaveBeenCalledWith('general', { data: { errorCode: 'BSKT_INVALID_1', errorMessage: 'test' } }, undefined, 2)
    expect(container.querySelector('.error')).toBeInTheDocument()
    expect(defaultProps.worker.postMessage).toHaveBeenCalledWith({
      error: {
        error_category: 'business',
        error_code: 'BSKT_INVALID_1',
        error_short_description: 'test',
      },
    })
  })

  it('supports default status', () => {
    jest.spyOn(storeHooks, 'useStore').mockImplementation(() => mockStore({ notification: 'test notification' }))
    const { container } = render(<BasketStatus {...defaultProps} />)
    expect(screen.getByText('Uh-oh, something went wrong.')).toBeInTheDocument()
    expect(screen.getByText('Something went wrong. Please try again, or contact customer support.')).toBeInTheDocument()
    expect(document.querySelector('button')).not.toBeInTheDocument()
    expect(getErrorDetails).toHaveBeenCalledWith('test notification', undefined, undefined, 2)
    expect(container.querySelector('.error')).toBeInTheDocument()
    expect(defaultProps.worker.postMessage).toHaveBeenCalledWith({
      error: {
        error_category: 'business',
        error_code: '',
        error_short_description: '',
      },
    })
  })

  it('supports clearing of status', () => {
    jest
      .spyOn(storeHooks, 'useStore')
      .mockImplementation(() =>
        mockStore({ notification: 'clear', error: { data: { errorCode: 'BSKT_INVALID_1', errorMessage: 'test' } } }),
      )
    const { container } = render(<BasketStatus {...defaultProps} />)
    expect(getErrorDetails).not.toHaveBeenCalled()
    expect(defaultProps.worker.postMessage).not.toHaveBeenCalled()
    expect(container.querySelectorAll('div')).toHaveLength(0)
  })

  it('should update message if prop was changed', () => {
    jest
      .spyOn(storeHooks, 'useStore')
      .mockImplementation(() =>
        mockStore({ notification: 'test notification', error: { data: { errorCode: 'BSKT_INVALID_1', errorMessage: 'test' } } }),
      )
    const { rerender } = render(<BasketStatus {...defaultProps} />)
    expect(screen.getByText('Something went wrong. Please try again, or contact customer support.')).toBeInTheDocument()
    jest
      .spyOn(storeHooks, 'useStore')
      .mockImplementation(() =>
        mockStore({ notification: 'general', error: { data: { errorCode: 'BSKT_INVALID_1', errorMessage: 'test' } } }),
      )
    rerender(<BasketStatus {...defaultProps} />)
    expect(screen.getByText('Uh-oh, something went wrong.')).toBeInTheDocument()
    expect(screen.getByText('There was a problem fetching your basket. Please try again or contact customer support.')).toBeInTheDocument()
  })
})
