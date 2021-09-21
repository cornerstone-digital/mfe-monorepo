import { screen, queryByAttribute, fireEvent } from '@testing-library/react'

import BasketPackage from './BasketPackage'
import package1Props from './mocks/package1.mock.json'
import package2Props from './mocks/package2.mock.json'
import package3Props from './mocks/package3.mock.json'
import package4Props from './mocks/package4.mock.json'
import package5Props from './mocks/package5.mock.json'
import package6Props from './mocks/package6.mock.json'
import package7Props from './mocks/package7.mock.json'
import packageAccessoryMock from './mocks/acessory-package.mock.json'

import pageContent from '@shared/config/content/BasketPageContent.json'
import transformUtils from '@shared/helpers/transformUtils/transformUtils'
import { BasketPackageProps, PackageWithHeaderStatus } from './BasketPackage.types'
import renderWithProviders from '@helpers/renderWithProviders'
import * as storeHooks from '@store'
import { TransformedBasket } from '@shared/helpers/basketTransformer/BasketTransformer'
import BasketStore from '@store/BasketStore'

const basketPageContent: BasketPageContent.Basket = pageContent[0]?.basket as BasketPageContent.Basket

function mockStore(basket: Partial<TransformedBasket> = {}, basketStore: Partial<BasketStore> = {}): any {
  return {
    basketStore: {
      basket: {
        basketId: '123',
        ...basket,
      },
      ...basketStore,
      pageContent: basketPageContent,
    },
  }
}

jest.mock('@store', () => ({
  useStore: jest.fn().mockImplementation(() => mockStore()),
}))

jest.mock('@web-cms-core/services/contentService', () => ({
  getAssetModel: jest.fn().mockImplementation(() => {}),
}))

const simoPackage: BasketPackageProps = transformUtils.removeNulls(package1Props)
const businessPackage: BasketPackageProps = transformUtils.removeNulls(package3Props)
const combiPackage: BasketPackageProps = transformUtils.removeNulls(package2Props)
const smartwatchPackage: BasketPackageProps = transformUtils.removeNulls(package4Props)
const simoUpgradePackage: BasketPackageProps = transformUtils.removeNulls(package5Props)
const contractOptionPackage: BasketPackageProps = transformUtils.removeNulls(package6Props)
const tradeInPackage: BasketPackageProps = transformUtils.removeNulls(package7Props)
const accessoryPackage: BasketPackageProps = transformUtils.removeNulls(packageAccessoryMock)

const basketPackageRenderer = (props: BasketPackageProps) => {
  return renderWithProviders(<BasketPackage {...props} />)
}

describe('<BasketPackage />', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('renders handset correctly', () => {
    jest.spyOn(storeHooks, 'useStore').mockImplementationOnce(() => mockStore())
    const { asFragment } = basketPackageRenderer(simoPackage)

    expect(screen.getByText('Package 1')).toBeInTheDocument()
    expect(screen.getByText('Samsung Galaxy S8 64GB Orchid Grey')).toBeInTheDocument()
    expect(screen.getByText('8GB Red Entertainment plan')).toBeInTheDocument()
    expect(screen.getByText('Add Ons')).toBeInTheDocument()
    expect(screen.getByText('Loss, theft, damage and breakdown cover')).toBeInTheDocument()
    expect(screen.getByText('Subtotal')).toBeInTheDocument()
    expect(screen.getAllByText('£51').length).toBe(2)

    expect(asFragment()).toMatchSnapshot()
    expect(
      screen.getAllByRole('button', {
        name: /Change/i,
      }),
    ).toHaveLength(1)

    expect(
      screen.getAllByRole('button', {
        name: /Remove/i,
      }),
    ).toHaveLength(2)

    expect(screen.getByAltText('Samsung Galaxy S8 64GB Orchid Grey')).toBeDefined()

    expect(screen.getByText('Samsung Galaxy S8 64GB Orchid Grey')).toBeInTheDocument()
  })

  it('renders correctly with isUpgrade true', () => {
    jest.spyOn(storeHooks, 'useStore').mockImplementation(() => mockStore({ isUpgradeOrder: true }))
    const { asFragment, container } = basketPackageRenderer({ ...simoPackage })

    const getByClass = queryByAttribute.bind(null, 'class')

    expect(
      getByClass(container, 'paragraph xs undefined vfuk-BasketItemHeader__sub-title vfuk-BasketItemHeader__is-upgraded  '),
    ).toBeDefined()
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders business correctly', () => {
    jest.spyOn(storeHooks, 'useStore').mockImplementation(() => mockStore({ isBusiness: true }))

    const { asFragment } = basketPackageRenderer(businessPackage)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders combi correctly', () => {
    basketPackageRenderer(combiPackage)

    expect(screen.getByText('Package Total')).toBeInTheDocument()
    expect(screen.getByText('£64')).toBeInTheDocument()
    expect(screen.getByText('Package 1')).toBeInTheDocument()
    expect(screen.getAllByText('£0').length).toBe(4)
    expect(screen.getByText('18-month Broadband Plan')).toBeInTheDocument()
    expect(screen.getByText('TEST USE ONLY Superfast 1 Home Broadband & Phone - FTR6 18m')).toBeInTheDocument()
  })

  it('renders smartwatch correctly', () => {
    basketPackageRenderer(smartwatchPackage)

    expect(screen.getByText('Apple iPhone 11 64GB Black')).toBeInTheDocument()
    expect(screen.getAllByText('24-month Watch Plan').length).toBe(2)
    expect(screen.getAllByText('Apple Watch Series 6 (GPS+4G) Cellular 44mm Aluminium Blue').length).toBe(2)
  })

  it('renders a hidden field with journeyLink for SIMO Upgrades', async () => {
    jest.spyOn(storeHooks, 'useStore').mockImplementation(() => mockStore({ isUpgradeOrder: true }))
    const { asFragment, container } = basketPackageRenderer({ ...simoUpgradePackage })
    const getById = queryByAttribute.bind(null, 'id')

    expect(await screen.getAllByText('eSIM').length).toBe(1)
    expect(screen.getAllByText('What is an eSIM?').length).toBe(2)
    expect(getById(container, 'journeyId')).toHaveAttribute(
      'value',
      'https://www.vodafone.co.uk/mobile/best-sim-only-deals?planId=112341&login=true',
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('passes contract options in basketParams', () => {
    jest.spyOn(storeHooks, 'useStore').mockImplementation(() => mockStore({ isUpgradeOrder: true }))
    const { asFragment } = basketPackageRenderer(contractOptionPackage)

    expect(screen.getAllByText('24-month Watch Plan').length).toBe(2)
    expect(screen.getAllByText('24-month Airtime Plan').length).toBe(1)
    expect(screen.getAllByText('3-month free trial of Secure Net').length).toBe(2)
    expect(asFragment()).toMatchSnapshot()
  })

  it('render Accessory package basic scenario', () => {
    jest.spyOn(storeHooks, 'useStore').mockImplementation(() => mockStore({ isUpgradeOrder: true }))
    const { asFragment } = basketPackageRenderer(accessoryPackage)

    expect(screen.getAllByText('XQISIT Wireless Charger 10W Black').length).toBe(1)
    expect(screen.getAllByText('Apple EarPods Lightning White').length).toBe(1)
    expect(screen.getAllByText('InvisibleShield Glass Elite+ Clear').length).toBe(1)

    expect(asFragment()).toMatchSnapshot()
  })

  describe('renderTradeIn', () => {
    it('should render details', () => {
      jest.spyOn(storeHooks, 'useStore').mockImplementation(() => mockStore())
      const { getByText } = basketPackageRenderer(tradeInPackage)
      expect(getByText('Your guaranteed trade-in')).toBeInTheDocument()
    })

    it('should call onRemovePackageTradeIn if removed', () => {
      const spyRemove = jest.fn()
      jest.spyOn(storeHooks, 'useStore').mockImplementation(() => mockStore({}, { onRemovePackageTradeIn: spyRemove }))
      const { getAllByText } = basketPackageRenderer(tradeInPackage)

      const removeButton = getAllByText('Remove')[2]
      fireEvent.click(removeButton)

      expect(spyRemove).toHaveBeenCalledWith('fee83b9d-d084-4ae3-a198-9ff630665159')
    })

    it('should call onUndoRemovePackageTradeIn if retrieved', () => {
      const spyUndoRemove = jest.fn()
      jest.spyOn(storeHooks, 'useStore').mockImplementation(() => mockStore({}, { onUndoRemovePackageTradeIn: spyUndoRemove }))
      const undoTradeInPackage: PackageWithHeaderStatus = { ...tradeInPackage.thisPackage, tradeInHeaderStatus: 'removed' }
      const { getByText } = basketPackageRenderer({ ...tradeInPackage, thisPackage: undoTradeInPackage })

      const removeButton = getByText('Undo')
      fireEvent.click(removeButton)

      expect(spyUndoRemove).toHaveBeenCalledWith('fee83b9d-d084-4ae3-a198-9ff630665159')
    })
  })
})
