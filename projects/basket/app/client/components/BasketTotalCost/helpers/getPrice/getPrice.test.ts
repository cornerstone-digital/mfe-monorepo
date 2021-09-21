import getMonthlyPrice from './getPrice'

describe('getMonthlyPrice', () => {
  const monthlyPrice: BasketV2.Price = {
    gross: '9.99',
    net: '7.85',
    vat: '2.50',
  }

  it('should return monthly price when no discounts provided', () => {
    expect(getMonthlyPrice(monthlyPrice)).toEqual({
      gross: monthlyPrice.gross,
      net: monthlyPrice.net,
      vat: monthlyPrice.vat,
    })
  })

  it('should return discount price when provided', () => {
    const discountPrice: BasketV2.Price = {
      gross: '7.99',
      net: '4.85',
      vat: '1.50',
    }

    expect(getMonthlyPrice(monthlyPrice, discountPrice)).toEqual({
      gross: discountPrice.gross,
      net: discountPrice.net,
      vat: discountPrice.vat,
    })
  })
})
