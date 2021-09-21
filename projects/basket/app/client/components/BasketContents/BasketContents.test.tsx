import BasketContents from './BasketContents'
import mockBasket from './mocks/basket.mock.json'
import businessBasket from './mocks/business.basket.mock.json'
import watchBasket from './mocks/watch.basket.mock.json'
import combiAndWatchBasket from './mocks/combiAndWatch.basket.mock.json'
import mockPageContent from '@shared/config/content/BasketPageContent.json'
import transformUtils from '@shared/helpers/transformUtils/transformUtils'
import * as storeHooks from '@store'

const defaultPageContent: BasketPageContent.Basket = mockPageContent[0]?.basket as BasketPageContent.Basket

function mockStore(basket: Partial<BasketV2.Basket> = {}): any {
  return {
    basketStore: {
      basket: {
        basketId: 'basket-123',
        isUpgrade: false,
        deliveryInfo: {
          deliveryType: 'Premium',
          price: {
            gross: '10',
            net: '8',
          },
        },
        ...basket,
      },
      pageContent: defaultPageContent,
      onRemovePackage: jest.fn(),
      onUndoRemovePackage: jest.fn(),
      onRemoveAddOn: jest.fn(),
      onUndoRemoveAddOn: jest.fn(),
      onRemovePackageTradeIn: jest.fn(),
      onUndoRemovePackageTradeIn: jest.fn(),
      onUpdateBasket: jest.fn(),
      updateStatus: jest.fn(),
    },
  }
}

jest.mock('@store', () => ({
  useStore: jest.fn().mockImplementation(() => mockStore()),
}))

const mockBasketProps = transformUtils.removeNulls(mockBasket)
const businessBasketProps = transformUtils.removeNulls(businessBasket)
const watchBasketProps = transformUtils.removeNulls(watchBasket)
const combiAndWatchBasketProps = transformUtils.removeNulls(combiAndWatchBasket)

describe('<BasketContents />', () => {
  describe('Premium delivery', () => {
    it('should render the premium delivery basket item', () => {
      jest.spyOn(storeHooks, 'useStore').mockImplementationOnce(() => mockStore({ ...mockBasketProps }))
      const wrapper = shallow(<BasketContents />)
      expect(wrapper.find('BasketItem').length).toEqual(1)
      expect(wrapper.find('BasketItem').props().upfrontPrice).toEqual('10')
      expect(wrapper.find('BasketItem').props().title).toEqual('Premium delivery')
    })

    it('should not render the premium delivery basket item', () => {
      jest
        .spyOn(storeHooks, 'useStore')
        .mockImplementationOnce(() => mockStore({ ...mockBasketProps, deliveryInfo: { deliveryType: 'Standard' } }))
      const wrapper = shallow(<BasketContents />)
      expect(wrapper.find('BasketItem').length).toEqual(0)
    })
  })

  test('tests business basket', () => {
    jest.spyOn(storeHooks, 'useStore').mockImplementationOnce(() => mockStore({ ...businessBasketProps }))
    const wrapper = shallow(<BasketContents />)
    expect(snapshot(wrapper)).toMatchSnapshot()
  })

  test('renders combi bundle', () => {
    jest.spyOn(storeHooks, 'useStore').mockImplementationOnce(() =>
      mockStore({
        ...combiAndWatchBasketProps,
        basketId: '123',
        combiPackageIds: ['2c8b826d-814a-4174-b987-ed735652c5ba'],
      }),
    )
    const wrapper = shallow(<BasketContents />)
    expect(snapshot(wrapper)).toMatchSnapshot()
  })

  test('doesnt render combi bundle if there is only one matching combi id', () => {
    const modifiedCombiPackages = [combiAndWatchBasketProps.packages[0], combiAndWatchBasketProps.packages[2].combiPackageId]
    jest
      .spyOn(storeHooks, 'useStore')
      .mockImplementationOnce(() =>
        mockStore({ packages: modifiedCombiPackages, basketId: '123', combiPackageIds: ['2c8b826d-814a-4174-b987-ed735652c5ba'] }),
      )
    const wrapper = shallow(<BasketContents />)
    expect(snapshot(wrapper)).toMatchSnapshot()
  })
  describe('isBusiness', () => {
    test('renders the current package if business consumer', () => {
      const bussinessPackage = {
        packages: [
          {
            accountCategory: 'business',
            services: [],
          },
        ],
      }
      jest.spyOn(storeHooks, 'useStore').mockImplementationOnce(() => mockStore({ ...bussinessPackage }))
      const wrapper = shallow(<BasketContents />)
      expect(wrapper.find('BasketItem').prop('isBusiness')).toBe(true)
    })
    test('does not render if no current package', () => {
      jest.spyOn(storeHooks, 'useStore').mockImplementationOnce(() => mockStore({ ...mockBasketProps }))
      const wrapper = shallow(<BasketContents />)
      expect(wrapper.find('BasketItem').prop('isBusiness')).toBe(false)
    })
  })

  describe('Apple Watch', () => {
    test('Should get the phone number paired with', () => {
      jest.spyOn(storeHooks, 'useStore').mockImplementationOnce(() => mockStore({ ...watchBasketProps }))
      const wrapper = shallow(<BasketContents />)
      const basketItemWithWatch = wrapper.children().first()
      expect(basketItemWithWatch.props().phonePaired).toBe('07123456789')
    })
  })

  test('should pass through matchedWatchPackage to combi', () => {
    jest
      .spyOn(storeHooks, 'useStore')
      .mockImplementationOnce(() => mockStore({ ...combiAndWatchBasketProps, combiPackageIds: ['0674726e-8903-4167-8b18-5d9a5fc44f52'] }))
    const wrapper = shallow(<BasketContents />)
    const BasketPackage = wrapper.children().first()
    expect(BasketPackage.props().matchedWatchPackages.length).toBe(1)
  })
})
