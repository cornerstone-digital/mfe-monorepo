import * as storeHooks from '@store'
import { render } from '@testing-library/react'
import RpiContent from './RpiContent'
import * as getABTestFeatureValue from '@helpers/getABTestFeatureValue'
import renderWithProviders from '@helpers/renderWithProviders'

jest.mock('@store', () => ({
  useStore: jest.fn().mockImplementation(() => ({ basketStore: { basket: {} } })),
}))

const defaultABtestMockReturnValue = false
jest.mock('@helpers/getABTestFeatureValue', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue(defaultABtestMockReturnValue),
}))

jest.mock('@helpers/getPackageFooterMessages', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue(['test message 1', 'test message 2']),
}))

describe('RpiContent', () => {
  const mockRpiContent = 'test rpi content'
  const mockRpiWithoutVatContent = 'test rpi without VAT content'
  const mockSmallBusinessBasketFooterContent = 'test rpi small business footer content'

  it('should render rpiContent in case of Business customer', () => {
    const mockBasket = {
      basketStore: {
        basket: { packages: [{ accountCategory: 'Business' }] },
        rpiContent: mockRpiContent,
        rpiWithoutVatContent: mockRpiWithoutVatContent,
      },
    } as any
    jest.spyOn(storeHooks, 'useStore').mockImplementationOnce(() => mockBasket)

    const { getByText, queryByText } = render(<RpiContent />)
    expect(getByText(mockRpiContent)).toBeInTheDocument()
    expect(queryByText(mockRpiWithoutVatContent)).not.toBeInTheDocument()
  })

  it('should render rpiContent in case of non business customer', () => {
    const mockBasket = {
      basketStore: {
        basket: { packages: [{ accountCategory: 'Consumer' }] },
        rpiContent: mockRpiContent,
        rpiWithoutVatContent: mockRpiWithoutVatContent,
      },
    } as any
    jest.spyOn(storeHooks, 'useStore').mockImplementationOnce(() => mockBasket)

    const { getByText, queryByText } = render(<RpiContent />)
    expect(getByText(mockRpiContent)).toBeInTheDocument()
    expect(queryByText(mockRpiWithoutVatContent)).not.toBeInTheDocument()
  })

  it('should render small business footer content in case of small business customer', () => {
    const mockBasket = {
      basketStore: {
        basket: { packages: [{ accountCategory: 'Business', accountSubCategory: 'smallBusiness' }] },
        rpiContent: mockRpiContent,
        rpiWithoutVatContent: mockRpiWithoutVatContent,
        smallBusinessBasketFooterContent: mockSmallBusinessBasketFooterContent,
      },
    } as any
    jest.spyOn(storeHooks, 'useStore').mockImplementationOnce(() => mockBasket)

    const { getByText, queryByText } = render(<RpiContent />)
    expect(getByText(mockSmallBusinessBasketFooterContent)).toBeInTheDocument()
    expect(queryByText(mockRpiWithoutVatContent)).not.toBeInTheDocument()
    expect(queryByText(mockRpiContent)).not.toBeInTheDocument()
  })

  it('should render footerMessages if provided', () => {
    const mockBasket = { basketStore: { basket: {} } } as any
    jest.spyOn(storeHooks, 'useStore').mockImplementationOnce(() => mockBasket)

    const { getByText } = render(<RpiContent />)
    expect(getByText('test message 1')).toBeInTheDocument()
    expect(getByText('test message 2')).toBeInTheDocument()
  })

  describe('ABtest affect scenarios', () => {
    afterEach(() => {
      jest.spyOn(getABTestFeatureValue, 'default').mockReturnValue(defaultABtestMockReturnValue)
    })

    it('should render changed styles to the container when test value is true', () => {
      jest.spyOn(getABTestFeatureValue, 'default').mockReturnValue(true)
      const { container } = renderWithProviders(<RpiContent />)
      expect(container.querySelector('.wrapper')).toBeInTheDocument()
      expect(container.querySelector('.bg-light1')).not.toBeInTheDocument()
    })

    it('should render default styles to the container when test value is false', () => {
      const { container } = renderWithProviders(<RpiContent />)
      expect(container.querySelector('.wrapper')).not.toBeInTheDocument()
      expect(container.querySelector('.bg-light1')).toBeInTheDocument()
    })
  })
})
