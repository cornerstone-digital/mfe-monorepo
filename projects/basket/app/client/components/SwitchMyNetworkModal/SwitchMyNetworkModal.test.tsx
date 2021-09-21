import { fireEvent, waitFor } from '@testing-library/react'

import basketService from '@web-shop-core/services/basketService'
import AnalyticsUtil from '@utilities/Analytics'

import SwitchMyNetworkModal from './SwitchMyNetworkModal'
import renderWithProviders from '@helpers/renderWithProviders'

jest.mock('../../utilities/Analytics')
jest.mock('@web-shop-core/services/basketService')
jest.mock('@vfuk/core-modal')

AnalyticsUtil.trackLink = jest.fn()
basketService.submitPortabilityInfo = jest.fn()

const mockBasketId = 'mock-basket-id'
const mockPackageId = 'mock-package-id'

const props = {
  basket: { basketId: mockBasketId },
  packageId: 'package-id',
  portability: {},
  pageError: '',
  reviewMode: false,
  isOpen: true,
  onExit: jest.fn(),
  onContinue: jest.fn(),
  onUpdateBasket: jest.fn(),
}

describe('<SwitchMyNetworkModal />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  it('should render without exploding', () => {
    const wrapper = shallow(<SwitchMyNetworkModal {...props} />)
    expect(snapshot(wrapper)).toMatchSnapshot()
  })

  describe('Modal', () => {
    it('should be visible if isOpen is true', async () => {
      const { getByText } = renderWithProviders(<SwitchMyNetworkModal {...props} />)
      await waitFor(() => {
        expect(getByText('Switch My Network')).toBeInTheDocument()
      })
    })
    it('should not be visible if isOpen is false', async () => {
      const { queryByText, container } = renderWithProviders(<SwitchMyNetworkModal {...props} isOpen={false} />)
      await waitFor(() => {
        expect(container.childNodes.length).toBe(0)
        expect(queryByText('Switch My Network')).not.toBeInTheDocument()
      })
    })
  })

  it('should display default modal title', () => {
    const { getByText } = renderWithProviders(<SwitchMyNetworkModal {...props} />)
    expect(getByText('Switch My Network')).toBeInTheDocument()
  })

  it('should display modal title regarding late delivery', () => {
    const { getByText } = renderWithProviders(<SwitchMyNetworkModal {...props} hasLateDelivery />)
    expect(getByText('Choose a different transfer date')).toBeInTheDocument()
  })

  it('should display modal title regarding unknown delivery', () => {
    const { getByText } = renderWithProviders(<SwitchMyNetworkModal {...props} hasUnknownDelivery />)
    expect(getByText("We can't guarantee that transfer date")).toBeInTheDocument()
  })

  it('should display <ContinueWithoutSwitching /> if it has late delivery', () => {
    const wrapper = shallow(<SwitchMyNetworkModal {...props} hasLateDelivery />)
    expect(wrapper.find('ContinueWithoutSwitching')).toHaveLength(1)
  })

  it('should display <ContinueWithoutSwitching /> if it has unknown delivery', () => {
    const wrapper = shallow(<SwitchMyNetworkModal {...props} hasUnknownDelivery />)
    expect(wrapper.find('ContinueWithoutSwitching')).toHaveLength(1)
  })

  describe('handleExit', () => {
    it('should call onExit when clicking on close button', async () => {
      const onExitSpy = jest.fn()
      const { container } = renderWithProviders(<SwitchMyNetworkModal {...props} isOpen onExit={onExitSpy} />)
      const button = container.querySelector("button[aria-label='close']") as HTMLButtonElement
      await waitFor(() => {
        expect(button).toBeInTheDocument()
      })
      fireEvent.click(button)
      expect(onExitSpy).toBeCalled()
    })
  })

  describe('handleSave', () => {
    it('should call corresponding service when form is saved', () => {
      const wrapper = shallow(<SwitchMyNetworkModal {...props} packageId={mockPackageId} />)
      wrapper.find('SwitchMyNetworkForm').prop('onSave')()
      expect(basketService.submitPortabilityInfo).toBeCalledWith(mockBasketId, mockPackageId, {})
    })

    it('should call onUpdateBasket if provided', async () => {
      const mockOnUpdateBasket = jest.fn(() => Promise.resolve())
      const wrapper = shallow(<SwitchMyNetworkModal {...props} onUpdateBasket={mockOnUpdateBasket} reviewMode />)
      await wrapper.find('SwitchMyNetworkForm').prop('onSave')()
      expect(mockOnUpdateBasket).toBeCalled()
    })

    it('should call analytics if onUpdateBasket is provided and reviewMode is false', async () => {
      const mockOnUpdateBasket = jest.fn(() => Promise.resolve())
      const wrapper = shallow(<SwitchMyNetworkModal {...props} onUpdateBasket={mockOnUpdateBasket} />)
      await wrapper.find('SwitchMyNetworkForm').prop('onSave')()
      expect(basketService.submitPortabilityInfo).toBeCalled()
    })
  })

  describe('handleRemove', () => {
    it('should call corresponding service when removing form', async () => {
      const wrapper = shallow(<SwitchMyNetworkModal {...props} packageId={mockPackageId} />)
      await wrapper.find('SwitchMyNetworkForm').prop('onRemove')()
      expect(basketService.removePortabilityInfo).toBeCalledWith(mockBasketId, mockPackageId)
    })

    it('should call onUpdateBasket if provided', async () => {
      const mockOnUpdateBasket = jest.fn(() => Promise.resolve())
      const wrapper = shallow(<SwitchMyNetworkModal {...props} onUpdateBasket={mockOnUpdateBasket} />)
      await wrapper.find('SwitchMyNetworkForm').prop('onRemove')()
      expect(mockOnUpdateBasket).toBeCalled()
    })
  })

  describe('handleContinue', () => {
    it('should call handleRemove if attemptRemoval is true', async () => {
      const wrapper = shallow(<SwitchMyNetworkModal {...props} hasLateDelivery packageId={mockPackageId} />)
      await wrapper.find('ContinueWithoutSwitching').prop('onContinue')(true)
      expect(basketService.removePortabilityInfo).toBeCalledWith(mockBasketId, mockPackageId)
    })
  })
})
