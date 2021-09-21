import isBusinessCustomer from './isBusinessCustomer'

import getCookie from '@web-shop-core/helpers/getCookie'

jest.mock('@web-shop-core/helpers/getCookie', () => jest.fn())

describe('isBusinessCustomer', () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  it('should return true when cookie prop value is true', () => {
    getCookie.mockReturnValueOnce('business')
    expect(isBusinessCustomer({})).toBe(true)
  })

  it('should return false when cookie prop value is not exists and accountSubCategory is non business type', () => {
    getCookie.mockReturnValueOnce('')
    expect(isBusinessCustomer({})).toBe(false)
  })

  it('should return true when cookie prop value is not exists but accountSubCategory is business type', () => {
    getCookie.mockReturnValueOnce('')
    expect(isBusinessCustomer({ accountSubCategory: 'soleTrader' })).toBe(true)

    getCookie.mockReturnValueOnce('')
    expect(isBusinessCustomer({ accountSubCategory: 'smallBusiness' })).toBe(true)
  })
})
