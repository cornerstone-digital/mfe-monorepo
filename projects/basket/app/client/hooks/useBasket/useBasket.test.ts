import { waitFor } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'

import * as setCookie from '@web-shop-core/helpers/setCookie'
import basketService from '@web-shop-core/services/basketService'

import useBasket from './useBasket'
import deepLinking from '@helpers/deepLinking'
import BasketTransformer from '@shared/helpers/basketTransformer/BasketTransformer'
import * as storeHooks from '@store'
import AnalyticsUtil from '@utilities/Analytics'

const getMockStore = (basketStore?: any) => {
  return {
    basketStore: {
      basket: {},
      loadBasketContent: jest.fn().mockResolvedValue(true),
      loadBasket: jest.fn().mockResolvedValue(true),
      setBasket: jest.fn(),
      setIsLoading: jest.fn(),
      setBasketId: jest.fn(),
      queryMap: {},
      ...basketStore,
    },
    pageUiStore: {
      scrollTop: jest.fn(),
    },
  }
}

jest.mock('@store', () => ({
  useStore: jest.fn().mockReturnValue(getMockStore()),
}))

jest.mock('@helpers/deepLinking', () => ({
  createDeeplinkBasket: jest.fn().mockResolvedValue({}),
}))

jest.mock('@pages/BasketPage/analytics/helpers', () => ({
  getBasketAnalytics: jest.fn().mockReturnValue({}),
}))

jest.mock('@web-shop-core/helpers/setCookie', () => ({
  __esModule: true,
  default: jest.fn(),
}))

jest.mock('@web-shop-core/helpers/getCookie', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue('consumer'),
}))

AnalyticsUtil.initialiseAnalytics = jest.fn().mockResolvedValue(true)
AnalyticsUtil.updateConfig = jest.fn()
AnalyticsUtil.pageView = jest.fn().mockResolvedValue(true)
BasketTransformer.transformBasket = jest.fn().mockImplementation(basketData => basketData)

describe('useBasket', () => {
  beforeEach(() => {
    basketService.get = jest.fn().mockResolvedValue({ basketId: '1' })
  })
  afterEach(() => {
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })

  it('should call setIsLoading with false', async () => {
    const spySetIsLoading = jest.fn()
    const mockStore = getMockStore({ setIsLoading: spySetIsLoading }) as any
    jest.spyOn(storeHooks, 'useStore').mockReturnValueOnce(mockStore)
    renderHook(() => useBasket({}))

    await waitFor(() => {
      expect(spySetIsLoading).toHaveBeenCalledWith(false)
    })
  })

  it('should call loadBasketContent by default', async () => {
    jest.spyOn(AnalyticsUtil, 'initialiseAnalytics').mockResolvedValue()
    const mockStore = getMockStore({ loadBasketContent: jest.fn() }) as any
    const loadBasketContentSpy = jest.spyOn(mockStore.basketStore, 'loadBasketContent')

    jest.spyOn(storeHooks, 'useStore').mockReturnValueOnce(mockStore)
    renderHook(() => useBasket({}))

    await waitFor(() => {
      expect(loadBasketContentSpy).toHaveBeenCalled()
    })
  })

  it('should call deepLinking if not in reviewmode and has query provided', async () => {
    const mockStore = getMockStore({ queryMap: { segment: 'value1', query2: 'value2' } }) as any
    jest.spyOn(storeHooks, 'useStore').mockReturnValueOnce(mockStore)
    renderHook(() => useBasket({}))
    await waitFor(() => {
      expect(deepLinking.createDeeplinkBasket).toHaveBeenCalled()
    })
  })

  it('should call setBasketId if creating deeplink basket', async () => {
    const spySetBasketId = jest.fn()
    const mockStore = getMockStore({ setBasketId: spySetBasketId, queryMap: { segment: 'value1', query2: 'value2' } }) as any
    jest.spyOn(storeHooks, 'useStore').mockReturnValueOnce(mockStore)
    jest.spyOn(deepLinking, 'createDeeplinkBasket').mockResolvedValueOnce({ basketId: '123' })
    renderHook(() => useBasket({}))

    await waitFor(() => {
      expect(spySetBasketId).toHaveBeenCalled()
    })
  })

  it('should set basket with basket from basketService if basket is not provided', async () => {
    const spySetBasket = jest.fn()
    const mockStore = getMockStore({ setBasket: spySetBasket }) as any
    jest.spyOn(storeHooks, 'useStore').mockReturnValueOnce(mockStore)
    renderHook(() => useBasket({}))

    await waitFor(() => {
      expect(spySetBasket).toHaveBeenCalledWith({ basketId: '1' })
    })
  })

  it('should not call basketService if basket is provided', async () => {
    const spySetBasket = jest.fn()
    const mockStore = getMockStore({ setBasket: spySetBasket }) as any
    jest.spyOn(storeHooks, 'useStore').mockReturnValueOnce(mockStore)
    renderHook(() => useBasket({ basket: { basketId: '123' } }))

    await waitFor(() => {
      expect(spySetBasket).toHaveBeenCalledWith({ basketId: '123' })
    })
  })

  it('should call analytics with pageload event if reviewMode is false', async () => {
    const mockStore = getMockStore({}) as any
    jest.spyOn(storeHooks, 'useStore').mockReturnValueOnce(mockStore)
    renderHook(() => useBasket({ reviewMode: false }))

    await waitFor(() => {
      expect(AnalyticsUtil.updateConfig).toHaveBeenCalledWith({})
      expect(AnalyticsUtil.pageView).toHaveBeenCalledWith('basketPage.pageLoad')
    })
  })

  it('should call analytics with default pageLoad event if basket is empty', async () => {
    const mockStore = getMockStore() as any
    jest.spyOn(basketService, 'get').mockResolvedValueOnce({})
    jest.spyOn(storeHooks, 'useStore').mockReturnValueOnce(mockStore)
    renderHook(() => useBasket({ reviewMode: false }))

    await waitFor(() => {
      expect(AnalyticsUtil.updateConfig).toHaveBeenCalledWith({})
      expect(AnalyticsUtil.pageView).toHaveBeenCalledWith('basketPage.pageLoad')
    })
  })

  it('should call analytics with default pageError event if basket api load fails', async () => {
    const mockStore = getMockStore({ isBasketApiFailed: true, error: { status: 400 } }) as any
    jest.spyOn(storeHooks, 'useStore').mockReturnValueOnce(mockStore)
    renderHook(() => useBasket({ reviewMode: false }))

    await waitFor(() => {
      expect(AnalyticsUtil.pageView).toHaveBeenCalledTimes(0)
    })
  })

  it('should call analytics with default pageError event if content api load fails', async () => {
    const mockStore = getMockStore({ isContentApiFailed: true, error: { status: 400 } }) as any
    jest.spyOn(storeHooks, 'useStore').mockReturnValueOnce(mockStore)
    renderHook(() => useBasket({ reviewMode: false }))

    await waitFor(() => {
      expect(AnalyticsUtil.updateConfig).toHaveBeenCalledWith({})
      expect(AnalyticsUtil.pageView).toHaveBeenCalledWith('basketPage.pageError', { pageError: '400:Content api is failed!' })
    })
  })

  it('should call analytics with provided pageError event if content api load fails', async () => {
    const mockStore = getMockStore({ isContentApiFailed: true, error: { status: 500, data: { errorMessage: 'some error' } } }) as any
    jest.spyOn(storeHooks, 'useStore').mockReturnValueOnce(mockStore)
    renderHook(() => useBasket({ reviewMode: false }))

    await waitFor(() => {
      expect(AnalyticsUtil.updateConfig).toHaveBeenCalledWith({})
      expect(AnalyticsUtil.pageView).toHaveBeenCalledWith('basketPage.pageError', { pageError: '500:some error' })
    })
  })

  it('should not set customerSegment cookie if basket is not empty', async () => {
    const mockStore = getMockStore({ basket: { packages: [] } }) as any
    const spySetCookie = jest.spyOn(setCookie, 'default')
    jest.spyOn(storeHooks, 'useStore').mockReturnValueOnce(mockStore)
    renderHook(() => useBasket({}))

    await waitFor(() => {
      expect(spySetCookie).not.toHaveBeenCalled()
    })
  })

  it('should set customerSegment cookie if basket is not empty', async () => {
    const mockStore = getMockStore({
      basket: { basketId: 'id-test', packages: [{ packageId: 'test1', accountCategory: 'business' }, { packageId: 'test2' }] },
    }) as any
    const spySetCookie = jest.spyOn(setCookie, 'default')
    jest.spyOn(storeHooks, 'useStore').mockReturnValueOnce(mockStore)
    renderHook(() => useBasket({}))

    await waitFor(() => {
      expect(spySetCookie).toHaveBeenCalledWith('customerSegment', 'business')
    })
  })

  it('should set customerSegment cookie if cookie is already present and basket is empty', async () => {
    const mockStore = getMockStore({ basket: { basketId: 'id-test', packages: [] } }) as any
    const spySetCookie = jest.spyOn(setCookie, 'default')
    jest.spyOn(storeHooks, 'useStore').mockReturnValueOnce(mockStore)
    renderHook(() => useBasket({}))

    await waitFor(() => {
      expect(spySetCookie).toHaveBeenCalledWith('customerSegment', 'consumer')
      expect(AnalyticsUtil.updateConfig).toHaveBeenCalledWith({})
      expect(AnalyticsUtil.pageView).toHaveBeenCalledWith('basketPage.pageLoad')
    })
  })
})
