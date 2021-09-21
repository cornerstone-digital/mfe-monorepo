import getPrice from './getPrice'

const price = {
  gross: '10',
  net: '8',
  vat: '2',
}

describe('getPrice', () => {
  it('returns expected price', () => {
    expect(getPrice(price, false)).toBe(price.gross)
  })

  it('returns expected price for business', () => {
    expect(getPrice(price, true)).toBe(price.net)
  })

  it('falls back to a string of 0', () => {
    expect(getPrice({}, false)).toBe('0')
  })
})
