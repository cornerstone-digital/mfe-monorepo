import { getBasketId } from '@helpers/getBasketId/getBasketId'

describe('getBasketId', () => {
  beforeEach(() => {
    // Reset basketId state after each test
    window.history.replaceState({}, 'Test title', '/')
    Object.defineProperty(window.document, 'cookie', {
      value: '',
      writable: true,
    })
  })

  it('should return basketId from query string', () => {
    const qsBasketId = 'qs-basket-id'
    window.history.replaceState({}, 'Test Title', `?basketId=${qsBasketId}`)

    const expected = qsBasketId
    const actual = getBasketId()
    expect(actual).toEqual(expected)
  })

  it('should return basketId from cookie', () => {
    const cookieBasketId = 'cookie-basket-id'
    window.document.cookie = `basketId=${cookieBasketId}`

    const expected = cookieBasketId
    const actual = getBasketId()
    expect(actual).toEqual(expected)
  })

  it('should return basketId from query string when both cookie and URL basketId are available', () => {
    const qsBasketId = 'qs-basket-id'
    const cookieBasketId = 'cookie-basket-id'
    window.history.replaceState({}, 'Test Title', `?basketId=${qsBasketId}`)
    window.document.cookie = `basketId=${cookieBasketId}`

    const expected = qsBasketId
    const actual = getBasketId()
    expect(actual).toEqual(expected)
  })

  it('should throw when basketId could not be derived', () => {
    expect(getBasketId).toThrowError()
  })
})
