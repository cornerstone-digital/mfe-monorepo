import basketService from '@web-shop-core/services/basketService'
import setCookie from '@web-shop-core/helpers/setCookie'

import deepLinking from './deepLinking'

jest.mock('@web-shop-core/helpers/setCookie')

const mockBasket = { basketId: '123' }
const addVoucher = jest.fn()
const updateStatus = jest.fn()

global.history.pushState = jest.fn()
basketService.get = jest.fn(() => mockBasket)
basketService.create = jest.fn(() => mockBasket)
basketService.update = jest.fn()
basketService.addPackage = jest.fn()

it('updates basket with deeplink with no basket', async () => {
  await deepLinking.createDeeplinkBasket({}, { planSkuId: '111214', other: 'hello' }, addVoucher, updateStatus)
  expect(addVoucher).not.toHaveBeenCalled()
  expect(updateStatus).not.toHaveBeenCalled()
  expect(basketService.update).not.toHaveBeenCalled()
  expect(basketService.addPackage).not.toHaveBeenCalled()
  expect(setCookie).toHaveBeenCalled()
  expect(basketService.create).toHaveBeenCalled()
  expect(basketService.get).toHaveBeenCalled()

  basketService.create.mockClear()
  basketService.update.mockClear()
  setCookie.mockClear()
})

it('updates basket with deeplink with existing basket', async () => {
  await deepLinking.createDeeplinkBasket({}, { planSkuId: '111214', awinaffid: '222' }, addVoucher, updateStatus, '123')
  expect(setCookie).not.toHaveBeenCalled()
  expect(updateStatus).not.toHaveBeenCalled()
  expect(basketService.create).not.toHaveBeenCalled()
  expect(addVoucher).toHaveBeenCalled()
  expect(basketService.update).toHaveBeenCalled()
  expect(basketService.addPackage).toHaveBeenCalled()
  expect(basketService.get).toHaveBeenCalled()
})

it('filters the query parameters', async () => {
  const queryParams = {
    planSkuId: 'notok',
    deviceSkuId: 'notok',
    extrasSkuId: 'notok',
    segment: 'notok',
    other: 'ok',
  }
  await deepLinking.createDeeplinkBasket({}, queryParams, addVoucher, updateStatus, '123')

  expect(global.history.pushState).toHaveBeenCalledWith({}, '', '/basket?other=ok')
})

it('builds a query string', () => {
  const params = {
    someParam1: 'abc',
    someParam2: 'def',
  }
  const queryString = deepLinking.buildQueryString(params)

  expect(queryString).toEqual('?someParam1=abc&someParam2=def')
})

it('builds a query string without encoding', () => {
  const params = {
    valueWithSpecialChar: '/test/value',
  }
  const queryString = deepLinking.buildQueryString(params)

  expect(queryString).toEqual('?valueWithSpecialChar=/test/value')
})

it('persists the query string to history', () => {
  const queryString = '?other=hello'
  document.title = 'test'
  deepLinking.saveQueryStringToHistory(queryString)

  expect(global.history.pushState).toHaveBeenCalledWith({}, 'test', '/basket?other=hello')
})

it('creates business basket if business segment is passed', async () => {
  await deepLinking.createDeeplinkBasket({}, { planSkuId: '111214', segment: 'business' }, addVoucher, updateStatus, '123')
  expect(basketService.addPackage).toHaveBeenCalledWith(expect.objectContaining({ accountCategory: 'Business' }))
})

it('defaults account Category to consumer if no segment is passed', async () => {
  await deepLinking.createDeeplinkBasket({}, { planSkuId: '111214' }, addVoucher, updateStatus, '123')
  expect(basketService.addPackage).toHaveBeenCalledWith(expect.objectContaining({ accountCategory: 'Consumer' }))
})

it('Sanitizes segment if its invalid', async () => {
  await deepLinking.createDeeplinkBasket({}, { planSkuId: '111214', segment: 'thisisinvalid' }, addVoucher, updateStatus, '123')
  expect(basketService.addPackage).toHaveBeenCalledWith(expect.objectContaining({ accountCategory: 'Consumer' }))
})
