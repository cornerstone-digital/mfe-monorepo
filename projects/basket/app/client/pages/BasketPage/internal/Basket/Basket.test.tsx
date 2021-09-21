import { render, waitFor } from '@testing-library/react'
import Basket from './Basket'

import * as storeHooks from '@store'

jest.mock('@components/BasketContentLoader', () => {
  const mockBasketContentLoader = () => <div>BasketContentLoader</div>
  return {
    __esModule: true,
    default: mockBasketContentLoader,
  }
})
jest.mock('@components/CrossSellNotification', () => {
  const mockCrossSellNotification = () => <div>CrossSellNotification</div>
  return {
    __esModule: true,
    default: mockCrossSellNotification,
  }
})
jest.mock('@components/BasketContents', () => {
  const mockBasketContents = () => <div>BasketContents</div>
  return {
    __esModule: true,
    default: mockBasketContents,
  }
})
jest.mock('@components/BasketTotalCost', () => {
  const mockBasketTotalCost = () => <div>BasketTotalCost</div>
  return {
    __esModule: true,
    default: mockBasketTotalCost,
  }
})
jest.mock('@components/VoucherCodeEntry', () => {
  const mockVoucherCodeEntry = () => <div>VoucherCodeEntry</div>
  return {
    __esModule: true,
    default: mockVoucherCodeEntry,
  }
})
jest.mock('@pages/BasketPage/internal/PageButtons', () => {
  const mockPageButtons = () => <div>PageButtons</div>
  return {
    __esModule: true,
    default: mockPageButtons,
  }
})
jest.mock('@pages/BasketPage/internal/PaymentIcons', () => {
  const mockPaymentIcons = () => <div>PaymentIcons</div>
  return {
    __esModule: true,
    default: mockPaymentIcons,
  }
})
jest.mock('@pages/BasketPage/internal/TitleAndEmptyBasket', () => {
  const mockTitleAndEmptyBasket = () => <div>TitleAndEmptyBasket</div>
  return {
    __esModule: true,
    default: mockTitleAndEmptyBasket,
  }
})
jest.mock('@components/DeliveryMessage', () => {
  const mockDeliveryMessage = () => <div>DeliveryMessage</div>
  return {
    __esModule: true,
    default: mockDeliveryMessage,
  }
})
jest.mock('@components/RpiContent', () => {
  const mockRpiContent = () => <div>RpiContent</div>
  return {
    __esModule: true,
    default: mockRpiContent,
  }
})

jest.mock('@store', () => ({
  useStore: jest.fn().mockImplementation(() => ({ basketStore: {} })),
}))

jest.mock('@hooks/useBasket', () => ({
  __esModule: true,
  default: jest.fn(),
}))

jest.mock('@hooks/useFlags', () => ({
  __esModule: true,
  default: jest.fn(),
}))

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn().mockReturnValue({
    pathname: '/another-route',
    search: '',
    hash: '',
    state: null,
    key: '5nvxpbdafa',
  }),
}))

describe('Basket', () => {
  it('should render only BasketContents and BasketTotalCost if reviewMode', async () => {
    const { container, getByText } = render(<Basket reviewMode />)
    await waitFor(() => {
      expect(container.childNodes).toHaveLength(2)
      expect(getByText('BasketContents')).toBeInTheDocument()
      expect(getByText('BasketTotalCost')).toBeInTheDocument()
    })
  })

  it('should render everything if reviewMode is false', async () => {
    const { container, getByText } = render(<Basket />)
    await waitFor(() => {
      expect(container.childNodes).toHaveLength(7)
      expect(getByText('BasketContents')).toBeInTheDocument()
      expect(getByText('BasketTotalCost')).toBeInTheDocument()
      expect(getByText('CrossSellNotification')).toBeInTheDocument()
      expect(getByText('TitleAndEmptyBasket')).toBeInTheDocument()
      expect(getByText('VoucherCodeEntry')).toBeInTheDocument()
      expect(getByText('PageButtons')).toBeInTheDocument()
      expect(getByText('PaymentIcons')).toBeInTheDocument()
    })
  })

  it('should render RpiContent if basket has paymonthly package', async () => {
    const mockBasket = { basketStore: { hasPayMonthlyPackage: true } } as any
    jest.spyOn(storeHooks, 'useStore').mockReturnValueOnce(mockBasket)
    const { getByText } = render(<Basket />)
    await waitFor(() => {
      expect(getByText('RpiContent')).toBeInTheDocument()
    })
  })

  it('should render BasketContentLoader if loading', async () => {
    const mockBasket = { basketStore: { isLoading: true } } as any
    jest.spyOn(storeHooks, 'useStore').mockReturnValueOnce(mockBasket)
    const { getByText } = render(<Basket />)
    await waitFor(() => {
      expect(getByText('BasketContentLoader')).toBeInTheDocument()
    })
  })
})
