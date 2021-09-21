import BasketTransformer from './BasketTransformer'
import basket from '@basketMocks/basket.mock.json'

describe('BasketTransformer', () => {
  it('should transform the basket', () => {
    expect(BasketTransformer.transformBasket(basket, true, { accountSubCategory: 'soleTrader' })).toMatchSnapshot()
  })

  it('should have isSmallBusiness true in case of small business basket', () => {
    expect(BasketTransformer.transformBasket(basket, true, { accountType: 'Small-Business' })).toHaveProperty('isSmallBusiness', true)
  })
})
