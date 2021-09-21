import * as typeCheckers from '@helpers/typeCheck'
import * as getABTestFeatureValue from '@helpers/getABTestFeatureValue'
import * as storeHooks from '@store/index'

import renderWithProviders from '@helpers/renderWithProviders'

import TitleAndEmptyBasket from './'

jest.mock('@helpers/typeCheck', () => ({
  hasBroadband: jest.fn().mockImplementation(() => false),
}))

jest.mock('@helpers/getABTestFeatureValue', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue(false),
}))

beforeEach(() => {
  jest.clearAllMocks()
})

afterEach(() => {
  jest.clearAllMocks()
  jest.restoreAllMocks()
})

const mockToggleModal = jest.fn()

function mockStore({ isUpgradeOrder = false, hasSmartWatch = false, bundleIdentifier = '', packages = [] } = {}): any {
  return {
    basketStore: {
      basket: { isUpgradeOrder },
      hasSmartWatch,
      bundleIdentifier,
      packages,
    },
    pageUiStore: {
      toggleModal: mockToggleModal,
    },
  }
}

jest.mock('@store', () => ({
  useStore: jest.fn().mockImplementation(() => mockStore()),
}))

describe('TitleAndEmptyBasket', () => {
  it('should render with Empty basket button and with "Your items" title by default', () => {
    const { getByText } = renderWithProviders(<TitleAndEmptyBasket />)
    expect(getByText('Empty basket')).toBeInTheDocument()
    expect(getByText('Your items')).toBeInTheDocument()
  })

  describe('upgrade order', () => {
    it('should render with "Your upgrade order" title', () => {
      jest.spyOn(storeHooks, 'useStore').mockImplementation(() => mockStore({ isUpgradeOrder: true }))
      const { getByText } = renderWithProviders(<TitleAndEmptyBasket />)
      expect(getByText('Your upgrade order')).toBeInTheDocument()
    })

    it('should display phone number if provided', () => {
      jest.spyOn(storeHooks, 'useStore').mockImplementation(() => mockStore({ bundleIdentifier: '447000000025', isUpgradeOrder: true }))
      const { getByText } = renderWithProviders(<TitleAndEmptyBasket />)
      expect(getByText('For number 447000000025')).toBeInTheDocument()
    })

    it('should not display phone number if basket has smart watch', () => {
      jest
        .spyOn(storeHooks, 'useStore')
        .mockImplementation(() => mockStore({ bundleIdentifier: '447000000025', isUpgradeOrder: true, hasSmartWatch: true }))
      const { queryByText } = renderWithProviders(<TitleAndEmptyBasket />)
      expect(queryByText('For number 447000000025')).not.toBeInTheDocument()
    })

    it('should display account number if basket has broadband package', () => {
      jest.spyOn(storeHooks, 'useStore').mockImplementation(() => mockStore({ bundleIdentifier: 'VFC1843258', isUpgradeOrder: true }))
      jest.spyOn(typeCheckers, 'hasBroadband').mockImplementation(() => true)
      const { getByText } = renderWithProviders(<TitleAndEmptyBasket />)
      expect(getByText('For account number VFC1843258')).toBeInTheDocument()
    })
  })

  it('should call toggleModal prop if button is clicked', () => {
    const { container } = renderWithProviders(<TitleAndEmptyBasket />)
    container.querySelector('button')?.click()
    expect(mockToggleModal).toHaveBeenCalled()
  })

  describe('ABtest affect scenarios', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should render changed styles to the container when test value is true', () => {
      jest.spyOn(getABTestFeatureValue, 'default').mockReturnValue(true)
      const { container } = renderWithProviders(<TitleAndEmptyBasket />)
      expect(container.querySelector('.grid-ab')).toBeInTheDocument()
    })

    it('should render default styles to the container when test value is false', () => {
      jest.spyOn(getABTestFeatureValue, 'default').mockReturnValue(false)
      const { container } = renderWithProviders(<TitleAndEmptyBasket />)
      expect(container.querySelector('.grid')).toBeInTheDocument()
      expect(container.querySelector('.grid-ab')).not.toBeInTheDocument()
    })
  })
})
