import { getNodeText } from '@testing-library/react'
import transformUtils from '@shared/helpers/transformUtils/transformUtils'
import { PackageItemListProps } from './PackageItemList.types'

import PackageItemList from './PackageItemList'
import handsetPaymMock from './mocks/handsetPaym.mock.json'
import handsetPaygMock from './mocks/handsetPayg.mock.json'
import simOnlyMock from './mocks/simOnly.mock.json'
import smartWatchMock from './mocks/smartWatch.mock.json'
import packageItems1 from './mocks/itemList1.mock.json'
import packageItems2 from './mocks/itemList2.mock.json'
import packageItems3 from './mocks/itemList3.mock.json'
import packageItems4 from './mocks/itemList4.mock.json'
import hbbUpgradeMock from './mocks/hbbUpgrade.mock.json'
import hbbUpgradeNoHardwareMock from './mocks/hbbUpgradeNoHardware.mock.json'
import redHybridBundleMock from './mocks/redHybrid.mock.json'
import pageContent from '@shared/config/content/BasketPageContent.json'
import renderWithProviders from '@helpers/renderWithProviders'
import BasketPackageContext from '../../context'
import { mockStore } from '@tools/mocks/storeMock'

const mockPackageItemListPropsPartial = {
  basket: {},
  basketId: '',
  isUpgrade: false,
  isBusiness: false,
  onUpdateBasket: () => {},
}
const redHybridBundleItems: PackageItemListProps = {
  ...mockPackageItemListPropsPartial,
  ...transformUtils.removeNulls(redHybridBundleMock),
}
const mockPackageItems1: PackageItemListProps = { ...mockPackageItemListPropsPartial, ...transformUtils.removeNulls(packageItems1) }
const mockPackageItems2: PackageItemListProps = { ...mockPackageItemListPropsPartial, ...transformUtils.removeNulls(packageItems2) }
const mockPackageItems3: PackageItemListProps = { ...mockPackageItemListPropsPartial, ...transformUtils.removeNulls(packageItems3) }
const mockPackageItems4: PackageItemListProps = { ...mockPackageItemListPropsPartial, ...transformUtils.removeNulls(packageItems4) }
const handsetPaymMockItems: PackageItemListProps = { ...mockPackageItemListPropsPartial, ...transformUtils.removeNulls(handsetPaymMock) }
const handsetPaygMockItems: PackageItemListProps = { ...mockPackageItemListPropsPartial, ...transformUtils.removeNulls(handsetPaygMock) }
const simOnlyMockItems: PackageItemListProps = { ...mockPackageItemListPropsPartial, ...transformUtils.removeNulls(simOnlyMock) }
const watchMockItems: PackageItemListProps = { ...mockPackageItemListPropsPartial, ...transformUtils.removeNulls(smartWatchMock) }
const hbbUpgradeMockItems: PackageItemListProps = { ...mockPackageItemListPropsPartial, ...transformUtils.removeNulls(hbbUpgradeMock) }
const hbbUpgradeNoHardwareMockItems: PackageItemListProps = {
  ...mockPackageItemListPropsPartial,
  ...transformUtils.removeNulls(hbbUpgradeNoHardwareMock),
}

const basketPageContent = pageContent[0].basket as BasketPageContent.Basket

jest.mock('@store', () => ({
  useStore: jest.fn().mockImplementation(() =>
    mockStore({
      basketId: 'basket-123',
    }),
  ),
}))

describe('PackageItemList', () => {
  it.skip('renders without crashing', () => {
    const mockItems = [
      mockPackageItems1,
      mockPackageItems2,
      mockPackageItems3,
      mockPackageItems4,
      handsetPaymMockItems,
      handsetPaygMockItems,
      simOnlyMockItems,
      watchMockItems,
    ]
    mockItems.forEach(props => {
      renderWithProviders(<PackageItemList {...props} />)
    })
  })

  describe('total costs', () => {
    it('should have formatted total upfront price', () => {
      const { getByText } = renderWithProviders(<PackageItemList {...mockPackageItems2} upfrontPrice="121.00" monthlyPrice="44.50" />)
      expect(getByText('£121')).toBeInTheDocument()
    })
    it('should have formatted total monthly price', () => {
      const { getByText } = renderWithProviders(<PackageItemList {...mockPackageItems2} upfrontPrice="121.00" monthlyPrice="44.50" />)
      expect(getByText(/£44\.5/)).toBeInTheDocument()
    })
    it('should have "Watch total" title when a watch is paired', () => {
      const { getByText } = renderWithProviders(<PackageItemList {...mockPackageItems2} isPairedWatch />)
      expect(getByText('Watch total')).toBeInTheDocument()
    })
    it('should have "Phone total" title when its a watch package and a single model package', () => {
      const { getByText } = renderWithProviders(<PackageItemList {...mockPackageItems2} hasWatchPackage />)
      expect(getByText('Phone total')).toBeInTheDocument()
    })
    it('should have "Subtotal" title when its a combi package', () => {
      const { getByText } = renderWithProviders(<PackageItemList {...mockPackageItems4} />)
      expect(getByText('Subtotal')).toBeInTheDocument()
    })

    it('should have a bingo subtotal footer for "Watch plan" when package hardware has watch', () => {
      const { container } = renderWithProviders(<PackageItemList {...watchMockItems} pageContent={basketPageContent} />)
      expect(getNodeText(container.querySelector('.paragraph.xs.margin-top-1') as HTMLElement)).toContain('Watch Plan')
    })
    it('should have a bingo subtotal footer for "Phone plan" when package hardware do not have a watch', () => {
      const { container } = renderWithProviders(<PackageItemList {...handsetPaymMockItems} pageContent={basketPageContent} />)
      expect(getNodeText(container.querySelector('.paragraph.xs.margin-top-1') as HTMLElement)).toContain('Phone Plan')
    })
    it('should not have bingo subtotal footer when package has no handset or watch', () => {
      const { container } = renderWithProviders(<PackageItemList {...simOnlyMockItems} pageContent={basketPageContent} />)
      expect(container.querySelectorAll('.paragraph.xs.margin-top-1')!).toHaveLength(0)
    })
    it('should have a bingo subtotal footer when there are multiple packages', () => {
      const { container } = renderWithProviders(<PackageItemList {...mockPackageItems1} pageContent={basketPageContent} />)
      expect(container.querySelectorAll('.paragraph.xs.margin-top-1')!).toHaveLength(1)
    })
    it('should have a bingo subtotal footer when there is single package', () => {
      const { container } = renderWithProviders(<PackageItemList {...handsetPaymMockItems} pageContent={basketPageContent} />)
      expect(container.querySelectorAll('.paragraph.xs.margin-top-1')!).toHaveLength(1)
    })
    it('should not have a bingo subtotal footer for Small Business', () => {
      const { container } = renderWithProviders(
        <BasketPackageContext.Provider value={{ isSmallBusiness: true }}>
          <PackageItemList {...handsetPaymMockItems} pageContent={basketPageContent} />)
        </BasketPackageContext.Provider>,
      )
      expect(container.querySelectorAll('.paragraph.xs.margin-top-1')!).toHaveLength(0)
    })
  })

  describe('item', () => {
    describe('hardware', () => {
      it('should not be present when item hardware is sim', () => {
        const { queryByText } = renderWithProviders(<PackageItemList {...mockPackageItems1} pageContent={basketPageContent} />)
        expect(queryByText('Blank White Triple Format SIM')).toBeNull()
        expect(queryByText('Samsung Galaxy S8 64GB Orchid Grey')).toBeInTheDocument()
      })
      it('should not be present when item hardware is broadband', () => {
        const { queryByText } = renderWithProviders(<PackageItemList {...hbbUpgradeMockItems} pageContent={basketPageContent} />)
        expect(queryByText('Super Wi-Fi Point')).toBeNull()
        expect(queryByText('Apple TV 32GB')).toBeNull()
        expect(queryByText('Vodafone K5161H white')).toBeNull()
      })
      it('should have gross airtime price for private customer', () => {
        const { getByText } = renderWithProviders(<PackageItemList {...mockPackageItems2} pageContent={basketPageContent} />)
        expect(getByText('£28')).toBeInTheDocument()
      })
      it('should have net airtime price for business customer', () => {
        const { getByText, getAllByText } = renderWithProviders(
          <PackageItemList {...mockPackageItems2} pageContent={basketPageContent} isBusiness />,
        )
        expect(getByText('£23.33')).toBeInTheDocument()
        expect(getAllByText('(ex VAT)')).toHaveLength(2)
      })
      it('should have contract length', () => {
        const { getByText } = renderWithProviders(<PackageItemList {...hbbUpgradeMockItems} pageContent={basketPageContent} />)
        expect(getByText('24-month Broadband Plan')).toBeInTheDocument()
      })
    })

    describe('bundle', () => {
      it('should be present bundle is provided', async () => {
        const { getByText } = renderWithProviders(<PackageItemList {...mockPackageItems1} pageContent={basketPageContent} />)
        expect(getByText('8GB Red Entertainment plan')).toBeInTheDocument()
      })
    })

    describe('included items', () => {
      it('should not be present when package is not broadband', () => {
        const { queryByText } = renderWithProviders(<PackageItemList {...mockPackageItems2} />)
        expect(queryByText('Included with')).not.toBeInTheDocument()
      })
      describe('package is broadband', () => {
        it('should have "Included with $bundleName" title', () => {
          const { getByText } = renderWithProviders(<PackageItemList {...hbbUpgradeMockItems} pageContent={basketPageContent} />)
          expect(getByText('Included with Pro Superfast 1 Xtra')).toBeInTheDocument()
        })
        it('should have delivery info', () => {
          const { getByText } = renderWithProviders(<PackageItemList {...hbbUpgradeMockItems} pageContent={basketPageContent} />)
          expect(getByText(`${basketPageContent?.vf_Modules?.basket_router_delivery_information?.subTitle}`)).toBeInTheDocument()
        })
        it('should not show hardware panel if no hardware items are present', () => {
          const { queryByText } = renderWithProviders(
            <PackageItemList {...hbbUpgradeNoHardwareMockItems} pageContent={basketPageContent} />,
          )
          expect(queryByText('Included with')).not.toBeInTheDocument()
          expect(queryByText(`${basketPageContent?.vf_Modules?.basket_router_delivery_information?.subTitle}`)).not.toBeInTheDocument()
        })
      })
    })

    describe('network switch', () => {
      it.todo('should not be present when its an upgrade')
      it.todo('should not be present when its a broadband')
      it.todo('should not be present when in review mode')
      it.todo('should not be present when in review mode')
      it.todo('should close when prompt is clicked')
      it.todo('should close when saved')
      it.todo('should close when "transfer later" is clicked')
    })

    describe('red hybrid', () => {
      it('should show red hybrid bundle as expected', () => {
        const { queryByText } = renderWithProviders(<PackageItemList {...redHybridBundleItems} pageContent={basketPageContent} />)
        expect(queryByText('£10')).toBeInTheDocument()
        expect(queryByText('5 GB data')).toBeInTheDocument()
        expect(queryByText('With unlimited calls and texts')).toBeInTheDocument()
        expect(queryByText('30-day subscription')).toBeInTheDocument()
        expect(queryByText('VeryMe Rewards')).toBeInTheDocument()
      })
    })
  })
})
