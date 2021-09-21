import { DataSpeedStatus } from '@pages/BasketPage/BasketPage.types'
import { screen } from '@testing-library/react'
import BasketItem from './BasketItem'
import { BasketItemProps } from './BasketItem.types'

import mockPageContent from '@shared/config/content/BasketPageContent.json'
import { mockStore } from '@tools/mocks/storeMock'
import renderWithProviders from '@helpers/renderWithProviders'
import * as getABTestFeatureValue from '@helpers/getABTestFeatureValue'
import BasketPackageContext from '@components/BasketContents/components/BasketPackage/context'

const pageContent = mockPageContent[0]?.basket as BasketPageContent.Basket

jest.mock('@utilities/Analytics')

jest.mock('@helpers/getABTestFeatureValue', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue(true),
}))

jest.mock('@helpers/matchesConstCI', () => ({
  __esModule: true,
  default: jest.fn(),
}))

jest.mock('@helpers/typeCheck', () => ({
  __esModule: true,
  isBroadband: jest.fn(),
}))

jest.mock('@store', () => ({
  useStore: jest.fn().mockImplementation(() => mockStore({})),
}))

const requiredProps: OmitOptionals<BasketItemProps> = {
  title: 'header title',
}

describe('BasketItem', () => {
  it('should render without crashing', () => {
    renderWithProviders(<BasketItem {...requiredProps} />)
  })

  describe('header', () => {
    const title = 'header title'

    it('should be visible by default', () => {
      renderWithProviders(<BasketItem title={title} />)
      expect(screen.queryByText(title)).toBeInTheDocument()
    })

    it('should be visible when header is not hidden', () => {
      renderWithProviders(<BasketItem title={title} hideHeader={false} />)
      expect(screen.queryByText(title)).toBeInTheDocument()
    })

    it('should be hidden when header is hidden', () => {
      renderWithProviders(<BasketItem title={title} hideHeader />)
      expect(screen.queryByText(title)).not.toBeInTheDocument()
    })

    it('should have title, subtitle and data speed message when visible', () => {
      const subtitle = 'header subtitle'
      const dataSpeed = { key: 'MAX_2_MBPS' as DataSpeedStatus, message: 'header speed' }
      renderWithProviders(<BasketItem title={title} subTitle={subtitle} dataSpeed={dataSpeed} hideHeader={false} />)
      expect(screen.queryByText(title)).toBeInTheDocument()
      expect(screen.queryByText(subtitle)).toBeInTheDocument()
      expect(screen.queryByText(dataSpeed.message)).toBeInTheDocument()
    })
  })

  describe('costs', () => {
    const totalCosts = {
      monthlyPrice: '10.00',
      upfrontPrice: '12.01',
    }
    const displayedPrice = {
      monthly: '£10',
      upfront: '£12.01',
    }

    it('should not be visible when total cost is hidden and hideCosts is true', () => {
      renderWithProviders(<BasketItem {...requiredProps} {...totalCosts} isTotalCost={false} hideCosts={true} />)
      expect(screen.queryByText(displayedPrice.upfront)).not.toBeInTheDocument()
      expect(screen.queryByText(displayedPrice.monthly)).not.toBeInTheDocument()
    })

    it('should be visible when total cost and breakdown are hidden', () => {
      renderWithProviders(<BasketItem {...requiredProps} {...totalCosts} isTotalCost={false} />)
      expect(screen.queryByText(displayedPrice.upfront)).toBeInTheDocument()
      expect(screen.queryByText(displayedPrice.monthly)).toBeInTheDocument()
    })
  })

  describe('description', () => {
    const descriptions = ['some cool description']

    it('should be visible when the basket item is a watch', () => {
      renderWithProviders(<BasketItem {...requiredProps} description={descriptions} isSmartWatch />)
      expect(screen.queryAllByText(descriptions[0])).toHaveLength(2)
    })
  })

  describe('watch details', () => {
    it('should be visible when the basket item is a watch', () => {
      renderWithProviders(<BasketItem {...requiredProps} isSmartWatch isBundle pageContent={pageContent} />)
      expect(screen.queryAllByText('Connectivity Plan shares data, texts & minutes with your Airtime Plan.')).toHaveLength(2) // 2 because of adaptive design
    })

    it('should be visible when the basket item is a watch simo', () => {
      renderWithProviders(<BasketItem {...requiredProps} isSmartWatchSimo isBundle pageContent={pageContent} />)
      expect(screen.queryAllByText('Connectivity Plan shares data, texts & minutes with your Airtime Plan.')).toHaveLength(2) // 2 because of adaptive design
    })

    it('should not be visible when the basket item is not a watch or a watch simo', () => {
      renderWithProviders(<BasketItem title="some title" isBundle pageContent={pageContent} />)
      expect(screen.queryAllByText('Connectivity Plan shares data, texts & minutes with your Airtime Plan.')).toHaveLength(0)
    })
  })

  describe('product image', () => {
    it('should be visible when image is provided and icon is visible', () => {
      renderWithProviders(<BasketItem title="image title" iconIsVisible image="src" />)
      expect(screen.queryByAltText('image title')).toBeInTheDocument()
    })
  })

  describe('AB tests affecting scenarios', () => {
    const details = {
      colourName: 'White',
      deviceSize: '40mm',
    }
    it('should show storage colour component for small business basket', () => {
      const oldWindow = global.window
      window.sgBreakpoint = 'sm'
      jest.spyOn(getABTestFeatureValue, 'default').mockReturnValue(true)
      renderWithProviders(
        <BasketPackageContext.Provider value={{ isSmallBusiness: true }}>
          <BasketItem
            title={'header title'}
            capacity={'128 GB'}
            colourHexcode={'#FFFFFF'}
            colourName={'White'}
            hideCosts={true}
            isSmartWatch={false}
          />
        </BasketPackageContext.Provider>,
      )
      expect(screen.getByText(details.colourName)).toBeInTheDocument()

      global.window = oldWindow
    })
  })
})
