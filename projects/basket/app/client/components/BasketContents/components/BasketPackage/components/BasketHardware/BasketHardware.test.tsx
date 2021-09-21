import BasketTransformer from '@shared/helpers/basketTransformer/BasketTransformer'
import AnalyticsUtil from '@utilities/Analytics'
import contentService from '@web-cms-core/services/contentService'

import BasketHardware from './BasketHardware'
import mockHardware1 from './mocks/hardware1.mock.json'
import mockHardware4 from './mocks/hardware4.mock.json'
import mockHardware5 from './mocks/hardware5.mock.json'
import mockPageContent from '@shared/config/content/BasketPageContent.json'

import { BasketHardwareProps } from './BasketHardware.types'
import BasketPackageContext from '@components/BasketContents/components/BasketPackage/context'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import renderWithProviders from '@helpers/renderWithProviders'
import * as getABTestFeatureValue from '@helpers/getABTestFeatureValue'
import { useStore } from '@store'

AnalyticsUtil.trackLink = jest.fn()
contentService.getAssetModel = jest.fn().mockResolvedValue(mockPageContent)
const pageContent = mockPageContent[0]?.basket as BasketPageContent.Basket

function mockStore(isBusiness = false): any {
  return {
    basketStore: {
      pageContent,
      basket: { isBusiness },
    },
  }
}

jest.mock('@helpers/getABTestFeatureValue', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue(false),
}))

jest.mock('@store', () => ({
  useStore: jest.fn().mockImplementation(() => mockStore()),
}))

const mockedUseStore = useStore as jest.Mock<any>

const mockHardwarePropsPartial = {
  isPairedWatch: false,
  contractLength: '',
}

const mockHardwareProps1: BasketHardwareProps = {
  hardware: BasketTransformer.transformBasket(mockHardware1),
  ...mockHardwarePropsPartial,
}
const mockHardwareProps4: BasketHardwareProps = { hardware: BasketTransformer.transformBasket(mockHardware4), ...mockHardwarePropsPartial }
const mockHardwareProps5: BasketHardwareProps = { hardware: BasketTransformer.transformBasket(mockHardware5), ...mockHardwarePropsPartial }

function generateProps(overrideProps: object = {}): BasketHardwareProps {
  return { hardware: BasketTransformer.transformBasket({ ...mockHardware5, ...overrideProps }), ...mockHardwarePropsPartial }
}

describe('BasketHardware', () => {
  describe('payment plan available', () => {
    test('should close payment example when modal close button is clicked', async () => {
      const { queryByText, container, getAllByText } = renderWithProviders(
        <BasketPackageContext.Provider value={{}}>
          <BasketHardware {...mockHardwareProps5} />,
        </BasketPackageContext.Provider>,
      )

      // Closed by default
      expect(queryByText('7-month contract')).not.toBeInTheDocument()

      const button = getAllByText('See finance breakdown')[0]
      fireEvent.click(button)
      expect(queryByText('7-month contract')).toBeInTheDocument()

      const closeButton = container.querySelector('[aria-label="close"]') as HTMLButtonElement
      fireEvent.click(closeButton)
      await waitFor(() => {
        expect(queryByText('7-month contract')).not.toBeInTheDocument()
      })
    })

    test('should have airtime description', () => {
      const airtimeDescription = 'test description'
      const bundle: BasketV2.Bundle = { displayName: airtimeDescription }
      const { getByText, getAllByText } = renderWithProviders(
        <BasketPackageContext.Provider value={{ thisPackage: { bundle } }}>
          <BasketHardware {...mockHardwareProps5} />,
        </BasketPackageContext.Provider>,
      )

      const button = getAllByText('See finance breakdown')[0]
      fireEvent.click(button)

      expect(getByText(airtimeDescription)).toBeInTheDocument()
    })

    test('should have airtime price', () => {
      const bundle: BasketV2.Bundle = { priceDetails: { monthlyDiscountPrice: { gross: '123', net: '8' } } }
      const { getByText, getAllByText } = renderWithProviders(
        <BasketPackageContext.Provider value={{ thisPackage: { bundle } }}>
          <BasketHardware {...mockHardwareProps5} />,
        </BasketPackageContext.Provider>,
      )

      const button = getAllByText('See finance breakdown')[0]
      fireEvent.click(button)

      expect(getByText('£123')).toBeInTheDocument()
    })

    test('should NOT show device payment plan button for Small Businesses', async () => {
      renderWithProviders(
        <BasketPackageContext.Provider value={{ phonePaired: '0', isSmallBusiness: true }}>
          <BasketHardware {...mockHardwareProps5} />
        </BasketPackageContext.Provider>,
      )
      const items = await screen.queryAllByText('See finance breakdown')
      expect(items).toHaveLength(0)
    })

    test('should show device payment plan button for non Small Businesses', async () => {
      renderWithProviders(
        <BasketPackageContext.Provider value={{ phonePaired: '0', isSmallBusiness: false }}>
          <BasketHardware {...mockHardwareProps5} />
        </BasketPackageContext.Provider>,
      )
      const items = await screen.queryAllByText('See finance breakdown')
      expect(items).toHaveLength(2)
    })

    test('should have device payment plan', () => {
      const wrapper = shallow(<BasketHardware {...mockHardwareProps5} />)
      const devicePaymentPlan = mockHardwareProps5.hardware.priceDetails?.devicePaymentPlan
      expect(wrapper.find('DevicePaymentExample').prop('devicePaymentPlan')).toEqual(devicePaymentPlan)
    })

    test('should have net price when business', () => {
      mockedUseStore.mockImplementation(() => mockStore(true))

      const { getByText } = renderWithProviders(<BasketHardware {...mockHardwareProps5} />)
      const devicePriceNet = mockHardwareProps5.hardware.priceDetails?.devicePaymentPlan?.upFrontPrice?.net || ''
      expect(getByText(`£${devicePriceNet}`)).toBeInTheDocument()
    })
  })

  describe('item', () => {
    test('should have title', () => {
      const wrapper = shallow(<BasketHardware {...mockHardwareProps1} />)
      const basket = wrapper.find('BasketItem')

      expect(basket.prop('title')).toEqual(mockHardwareProps1.hardware.displayName)
    })

    describe('subtitle', () => {
      test('should be a watch plan when item is a watch', () => {
        const bundle = { commitmentPeriod: { value: '6' } }

        const { getByText } = renderWithProviders(
          <BasketPackageContext.Provider value={{ thisPackage: { bundle } }}>
            <BasketHardware {...mockHardwareProps4} />
          </BasketPackageContext.Provider>,
        )
        expect(getByText(`6-month Watch Plan`)).toBeInTheDocument()
      })

      test('should be a phone plan when item is a phone', () => {
        const wrapper = shallow(<BasketHardware {...mockHardwareProps5} />)
        const basket = wrapper.find('BasketItem')
        expect(basket.prop('subTitle')).toEqual('7-month Phone Plan')
      })

      test('should be empty when no bundle contract duration', () => {
        const wrapper = shallow(<BasketHardware {...mockHardwareProps4} />)
        const basket = wrapper.find('BasketItem')
        expect(basket.prop('subTitle')).toBe(undefined)
      })

      test('should be empty when no contract duration', () => {
        const mockProps = generateProps({ contractOptions: null })
        const wrapper = shallow(<BasketHardware {...mockProps} />)
        const basket = wrapper.find('BasketItem')
        expect(basket.prop('subTitle')).toBe(undefined)
      })

      test('should be empty when item has no handset', () => {
        const mockProps = generateProps({ productClass: null })
        const wrapper = shallow(<BasketHardware {...mockProps} />)
        const basket = wrapper.find('BasketItem')
        expect(basket.prop('subTitle')).toBe(undefined)
      })

      test('should be empty when watch is not paired', () => {
        const wrapper = shallow(<BasketHardware {...mockHardwareProps5} isPairedWatch />)
        const basket = wrapper.find('BasketItem')
        expect(basket.prop('subTitle')).toBe(undefined)
      })
    })

    test('should have image', () => {
      const wrapper = shallow(<BasketHardware {...mockHardwareProps5} />)
      expect(wrapper.find('BasketItem').prop('image')).toMatch(
        /\/images\/desktop\/Apple_iPhone_11_max_new_midnight_green-grid-product-front.png/,
      )
    })

    test('should have device payment plan upfront price', () => {
      mockedUseStore.mockImplementation(() => mockStore())
      const wrapper = shallow(<BasketHardware {...mockHardwareProps5} />)
      expect(wrapper.find('BasketItem').prop('upfrontPrice')).toBe(mockHardware5.priceDetails?.devicePaymentPlan?.upFrontPrice.gross)
    })

    test('should have device payment plan monthly price', () => {
      mockedUseStore.mockImplementation(() => mockStore())
      const wrapper = shallow(<BasketHardware {...mockHardwareProps5} />)
      expect(wrapper.find('BasketItem').prop('monthlyPrice')).toBe(mockHardware5.priceDetails?.devicePaymentPlan?.monthlyPrice.gross)
    })

    test('should have net price when business', () => {
      mockedUseStore.mockImplementation(() => mockStore(true))
      const wrapper = shallow(<BasketHardware {...mockHardwareProps5} />)
      expect(wrapper.find('BasketItem').prop('monthlyPrice')).toBe(mockHardware5.priceDetails?.devicePaymentPlan?.monthlyPrice.net)
    })

    test('should not have header when item is a paired watch', () => {
      const wrapper = shallow(<BasketHardware {...mockHardwareProps5} isPairedWatch />)
      expect(wrapper.find('BasketItem').prop('hideHeader')).toBe(true)
    })
  })

  describe('description', () => {
    it('should not have representative APR', () => {
      const wrapper = shallow(<BasketHardware {...mockHardwareProps5} />)
      expect(wrapper.text().includes('Representative 0.0% APR')).toBe(false)
    })
    it('should not have device payment plan description', () => {
      const wrapper = shallow(<BasketHardware {...mockHardwareProps5} />)
      expect(wrapper.text().includes('On a 7-month phone credit agreement')).toBe(false)
    })
    it('should toggle payment example when clicked', async () => {
      const { container, getAllByText, queryByText } = renderWithProviders(<BasketHardware {...mockHardwareProps5} />)
      const button = getAllByText('See finance breakdown')[0]
      expect(container.querySelector('dialog')).toBe(null)
      fireEvent.click(button)
      expect(AnalyticsUtil.trackLink).toBeCalledWith('basketPage.seeFinanceBreakdownHandset', {
        newBasket: { isBusiness: false },
        packageId: undefined,
      })
      expect(queryByText('7-month contract')).toBeInTheDocument()

      fireEvent.click(button)
      await waitFor(() => {
        expect(queryByText('7-month contract')).not.toBeInTheDocument()
      })
    })
  })
  describe('ABtest affect scenarios', () => {
    test('should have shortDisplayName title', () => {
      jest.spyOn(getABTestFeatureValue, 'default').mockReturnValue(true)
      const wrapper = shallow(<BasketHardware {...mockHardwareProps1} />)
      const basket = wrapper.find('BasketItem')
      expect(basket.prop('title')).toEqual(mockHardwareProps1.hardware.shortDisplayName)
    })
  })
})
