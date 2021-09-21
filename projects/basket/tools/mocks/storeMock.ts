import mockPageContent from '@shared/config/content/BasketPageContent.json'

const defaultPageContent: BasketPageContent.Basket = mockPageContent[0]?.basket as BasketPageContent.Basket

const defaultBasketContent = {
  basketId: 'basket-123',
  isUpgrade: false,
  deliveryInfo: {
    deliveryType: 'Premium',
    price: {
      gross: '10',
      net: '8',
    },
  },
}

export function mockStore(basket?: Partial<BasketV2.Basket>, pageContent?: BasketPageContent.Basket): any {
  return {
    basketStore: {
      basket: { ...(basket || defaultBasketContent) },
      pageContent: { ...(pageContent || defaultPageContent) },
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