import { flowResult, isObservable } from 'mobx'

import mockBasketResponse from '@basketMocks/basket.mock.json'
import mockBasketResponseWithWatchUpgrade from '@basketMocks/basketWithWatchUpgrade.json'
import mockBingoBasketResponse from '@basketMocks/basket.bingo.mock.json'
import mockAccessoryBasketResponse from '@basketMocks/basketWithAccessoryPackage.mock.json'

import basketService from '@web-shop-core/services/basketService'
import basketServiceHelpers from '@web-shop-core/services/basketService/helpers'
import contentService from '@web-cms-core/services/contentService'
import getCookie from '@web-shop-core/helpers/getCookie'
import setCookie from '@web-shop-core/helpers/setCookie'

import AnalyticsUtil from '@utilities/Analytics'
import BasketStore from './BasketStore'
import { createRootStore } from '../RootStore'

import { ValidationErrorCode } from '@constants'
import { BasketPackageService, BasketHardwareWithHeaderStatus } from '@pages/BasketPage/BasketPage.types'

jest.mock('@store/configureMobx', () => ({
  configureMobx: jest.fn().mockImplementation(() => {}),
}))

jest.mock('@utilities/Analytics', () => ({
  trackLink: jest.fn(),
  updateConfig: jest.fn(),
  pageView: jest.fn(),
}))

jest.mock('@web-shop-core/services/basketService', () => ({
  get: jest.fn().mockResolvedValue(mockBasketResponse),
  empty: jest.fn().mockResolvedValue('OK'),
  validateBasket: jest.fn().mockResolvedValue('OK'),
  patchBasket: jest.fn().mockResolvedValue('OK'),
  addVoucher: jest.fn().mockResolvedValue('OK'),
  removeVoucher: jest.fn().mockResolvedValue('OK'),
  addProduct: jest.fn().mockResolvedValue('OK'),
  removeProduct: jest.fn().mockResolvedValue('OK'),
  addPackage: jest.fn().mockResolvedValue('OK'),
  removePackage: jest.fn().mockResolvedValue('OK'),
  updatePackage: jest.fn().mockResolvedValue('OK'),
}))
jest.mock('@web-shop-core/services/basketService/helpers', () => ({
  createPackage: jest.fn().mockReturnValue({}),
}))

jest.mock('@web-cms-core/services/contentService', () => ({
  getAssetModel: jest.fn().mockResolvedValue([{ basket: {} }]),
}))

jest.mock('@helpers/isFlagEnabled', () =>
  jest.fn().mockImplementation(() => {
    return true
  }),
)

jest.mock('@web-shop-core/helpers/getCookie', () => jest.fn())
jest.mock('@web-shop-core/helpers/setCookie', () => jest.fn())

const defaultBasketId = 'some-basket-id'
const defaultQueryMap = {}
const defaultRootStore = createRootStore()

function createBasketStore(basketId = defaultBasketId, queryMap = defaultQueryMap, rootStore = defaultRootStore) {
  return new BasketStore(basketId, queryMap, rootStore)
}

describe('BasketStore', () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  it('should be observable', () => {
    expect(isObservable(createBasketStore())).toEqual(true)
  })

  describe('setBasketId', () => {
    it('should allow to set the basketId', () => {
      const basketStore = createBasketStore()
      basketStore.setBasketId('some-basket-id-that-looks-legit')
      expect(basketStore.basketId).toEqual(`some-basket-id-that-looks-legit`)
    })
  })

  describe('isBannerHidden', () => {
    it('should return false given no packages', () => {
      const basketStore = createBasketStore()
      expect(basketStore.isBannerHidden).toEqual(false)
    })

    it('should return false if package has offer that is no combi', async () => {
      const basketStore = createBasketStore()
      mockBasketResponse.packages[0].bundle.priceDetails.merchandisingPromotions = { offerGroup: 'Some other offer' }
      await flowResult(basketStore.loadBasket())
      expect(basketStore.isBannerHidden).toBe(false)
    })

    it('should return true if any package has combi offer', async () => {
      const basketStore = createBasketStore()
      mockBasketResponse.packages[0].bundle.priceDetails.merchandisingPromotions = { offerGroup: 'Combi Offers' }
      await flowResult(basketStore.loadBasket())
      expect(basketStore.isBannerHidden).toBe(true)
    })
  })

  describe('packages', () => {
    it('should return basket packages', async () => {
      const basketStore = createBasketStore()
      await basketStore.loadBasket()

      expect(basketStore.packages).toEqual(mockBasketResponse.packages)
    })

    it('should return an empty array if there are no basket packages', async () => {
      const basketStore = createBasketStore()

      expect(basketStore.packages).toEqual([])
    })

    it('should have isLoading true by default if cookie is set', async () => {
      getCookie.mockReturnValue('basketId')
      const innerBasket = createBasketStore()
      expect(innerBasket.isLoading).toEqual(true)
      getCookie.mockReset()
    })

    it('should have isLoading false if no cookie is set', async () => {
      const innerBasket = createBasketStore()
      expect(innerBasket.isLoading).toEqual(false)
    })
  })

  describe('isEmpty', () => {
    it('should be true when there are no packages', () => {
      const basketStore = createBasketStore()
      expect(basketStore.isEmpty).toEqual(true)
    })

    it('should be false when there are packages', async () => {
      const basketStore = createBasketStore()
      await basketStore.loadBasket()
      expect(basketStore.isEmpty).toEqual(false)
    })
  })

  describe('hasSmartWatch', () => {
    it('should be true when basket has watch item', async () => {
      basketService.get.mockResolvedValueOnce(mockBasketResponseWithWatchUpgrade)
      const basketStore = createBasketStore()
      await basketStore.loadBasket()
      expect(basketStore.hasSmartWatch).toEqual(true)
    })

    it('should be false when when basket has no watch item', async () => {
      const basketStore = createBasketStore()
      await basketStore.loadBasket()
      expect(basketStore.hasSmartWatch).toEqual(false)
    })
  })

  describe('pageError', () => {
    it('should be empty when no error', () => {
      const basketStore = createBasketStore()
      expect(basketStore.pageError).toEqual('')
    })

    it('should be error status when it is set', () => {
      const basketStore = createBasketStore()
      const status = 'Some cool error status'
      const errorMessage = ''
      const errorCode = ValidationErrorCode.MAXIMUM_LENDING_LIMIT
      basketStore.setError({ status, data: { errorMessage, errorCode } })
      expect(basketStore.pageError).toEqual(`${status} `)
    })

    it('should be error message when it is set, and error status is not', () => {
      const basketStore = createBasketStore()
      const status = ''
      const errorMessage = 'Some cool error message'
      const errorCode = ValidationErrorCode.MAXIMUM_LENDING_LIMIT
      basketStore.setError({ status, data: { errorMessage, errorCode } })
      expect(basketStore.pageError).toEqual(` ${errorMessage.toLowerCase()}`)
    })

    it('should be error and status when both status and message are set', () => {
      const basketStore = createBasketStore()
      const status = 'Some cool error status'
      const errorMessage = 'Some cool error message'
      const errorCode = ValidationErrorCode.MAXIMUM_LENDING_LIMIT
      basketStore.setError({ status, data: { errorMessage, errorCode } })
      expect(basketStore.pageError).toEqual(`${status} ${errorMessage.toLowerCase()}`)
    })
  })

  describe('hasPayMonthlyPackage', () => {
    it('should return a pay monthly package', async () => {
      const basketStore = createBasketStore()
      await basketStore.loadBasket()

      expect(basketStore.hasPayMonthlyPackage).toEqual(basketStore.packages[0])
    })

    it('should return undefined when basket has no packages', () => {
      const basketStore = createBasketStore()

      expect(basketStore.hasPayMonthlyPackage).toEqual(undefined)
    })
  })

  describe('flags', () => {
    it('should return an object of flags', () => {
      const basketStore = createBasketStore()
      expect(Object.keys(basketStore.flags)).toEqual([])
    })
  })

  describe('checkBasketForProblems', () => {
    it('should not update the status if the credit limit is not met', async () => {
      const highCreditVetOutcome = {
        outcomeCode: 'A',
        availableRecurringChargeLimit: '14000',
        availableNumberOfConnections: '2',
        creditVetId: '1000002364',
      }
      const response = { ...mockBasketResponse, vetOutcome: highCreditVetOutcome }
      basketService.get.mockResolvedValueOnce(response)
      const basketStore = createBasketStore()
      await basketStore.loadBasket()
      basketStore.checkBasketForProblems()

      expect(basketStore.notification).toEqual('')
    })

    it('should update the status if the credit limit is met', async () => {
      const lowCreditVetOutcome = {
        outcomeCode: 'A',
        availableRecurringChargeLimit: '10',
        availableNumberOfConnections: '2',
        creditVetId: '1000002364',
      }
      const response = { ...mockBasketResponse, vetOutcome: lowCreditVetOutcome }
      basketService.get.mockResolvedValueOnce(response)
      const basketStore = createBasketStore()
      await basketStore.loadBasket()
      basketStore.checkBasketForProblems()

      expect(basketStore.notification).toEqual('unacceptibleRecurringCost')
    })
  })

  describe('bundleIdentifier', () => {
    it('should return undefined if there is no given identifier', async () => {
      const basketStore = createBasketStore()
      await basketStore.loadBasket()

      expect(basketStore.bundleIdentifier).toEqual(undefined)
    })

    it('should return identifier from active subscription if given', async () => {
      basketService.get.mockResolvedValueOnce(mockBasketResponseWithWatchUpgrade)

      const basketStore = createBasketStore()
      await basketStore.loadBasket()

      expect(basketStore.bundleIdentifier).toEqual(mockBasketResponseWithWatchUpgrade.activeBundles[0].identifier.value)
    })
  })

  describe('isCheckoutDisabled', () => {
    it('should return false given no basket error', () => {
      const basketStore = createBasketStore()

      expect(basketStore.isCheckoutDisabled).toEqual(false)
    })

    it('should return true given a breaking basket error', () => {
      const basketStore = createBasketStore()
      basketStore.setError({ data: { errorCode: ValidationErrorCode.BASKET_PHONE_CAP, errorMessage: '' } })

      expect(basketStore.isCheckoutDisabled).toEqual(true)
    })

    it('should return true given a trade in expired error', () => {
      const basketStore = createBasketStore()
      basketStore.setError({ data: { errorCode: ValidationErrorCode.TRADEIN_QUOTE_EXP, errorMessage: '' } })

      expect(basketStore.isCheckoutDisabled).toEqual(true)
    })

    it('should return true given a SME ineligible loan phone', () => {
      const basketStore = createBasketStore()
      basketStore.setError({ data: { errorCode: ValidationErrorCode.SUBCATEGORY_SOLETRADER_INELIGIBLE_LOAN_PHONE, errorMessage: '' } })

      expect(basketStore.isCheckoutDisabled).toEqual(true)
    })
  })

  describe('hasBingoPackage', () => {
    it('should return false given no packages', () => {
      const basketStore = createBasketStore()

      expect(basketStore.hasBingoPackage).toEqual(false)
    })

    it('should return false given no bingo packages', async () => {
      const basketStore = createBasketStore()
      await basketStore.loadBasket()

      expect(basketStore.hasBingoPackage).toEqual(false)
    })

    it('should return true given bingo packages', async () => {
      basketService.get.mockResolvedValueOnce(mockBingoBasketResponse)
      const basketStore = createBasketStore()
      await basketStore.loadBasket()

      expect(basketStore.hasBingoPackage).toEqual(true)
    })
  })

  describe('rpiContent', () => {
    it.each`
      contentType
      ${'rpiContent'}
      ${'rpiWithoutVatContent'}
      ${'smallBusinessBasketFooterContent'}
    `('should return a default value when given no $contentType', async ({ contentType }: { contentType: keyof BasketStore }) => {
      const basketStore = createBasketStore()
      await basketStore.loadBasket()

      expect(basketStore[contentType]).toEqual(`Each April your plan price will increase by an amount equal to the
    RPI rate published in March of the year. We'll publish this rate on our website.`)
    })

    it.each`
      contentType                           | contentKey
      ${'rpiContent'}                       | ${'rpi'}
      ${'rpiWithoutVatContent'}             | ${'RPI_withoutVAT'}
      ${'smallBusinessBasketFooterContent'} | ${'SMALL_BUSINESS_BASKET_FOOTER'}
    `(
      'should return %s content when given page content',
      async ({
        contentType,
        contentKey,
      }: {
        contentType: keyof BasketStore
        contentKey: 'SMALL_BUSINESS_BASKET_FOOTER' | 'rpi' | 'RPI_withoutVAT'
      }) => {
        const basketStore = createBasketStore()
        await basketStore.loadBasket()
        const bodyText = `${contentKey} without vat body text`
        basketStore.setPageContent({ vf_Modules: { messages: { content: { [contentKey]: { bodyText } } } } } as any)

        expect(basketStore[contentType]).toEqual(bodyText)
      },
    )
  })

  describe('rpiWithoutVatContent', () => {
    it('should return a default value when given no page content', async () => {
      const basketStore = createBasketStore()
      await basketStore.loadBasket()
      expect(basketStore.rpiWithoutVatContent).toEqual(`Each April your plan price will increase by an amount equal to the
    RPI rate published in March of the year. We'll publish this rate on our website.`)
    })
    it('should return rpi content when given page content', async () => {
      const basketStore = createBasketStore()
      await basketStore.loadBasket()
      const bodyText = 'rpi body text'
      basketStore.setPageContent({ vf_Modules: { messages: { content: { RPI_withoutVAT: { bodyText } } } } } as BasketPageContent.Basket)

      expect(basketStore.rpiWithoutVatContent).toEqual(bodyText)
    })
  })

  describe('getPackageById', () => {
    it('should return a package found by id', async () => {
      const basketStore = createBasketStore()
      await basketStore.loadBasket()

      expect(basketStore.getPackageById(basketStore.packages, basketStore.packages[0].packageId)).toEqual(basketStore.packages[0])
    })

    it('should return an empty object when no matching package is found', async () => {
      const basketStore = createBasketStore()
      await basketStore.loadBasket()

      expect(basketStore.getPackageById(basketStore.packages, 'invalid-package-id')).toEqual({})
    })
  })

  describe('getPackage', () => {
    it('should return a package found by id', async () => {
      const basketStore = createBasketStore()
      await basketStore.loadBasket()

      const packageIndex = 0
      const targetPackage = basketStore.packages[packageIndex]
      const packageId = targetPackage.packageId

      expect(basketStore.getPackage(packageId)).toEqual({
        packageItem: targetPackage,
        packageIndex: 0,
      })
    })

    it('should return empty object if no package found by packageId', async () => {
      const basketStore = createBasketStore()
      await basketStore.loadBasket()

      expect(basketStore.getPackage('testid')).toEqual({
        packageItem: {},
        packageIndex: -1,
      })
    })
  })

  describe('setError', () => {
    it('should set store error', () => {
      const basketStore = createBasketStore()
      const newError = { data: { errorCode: ValidationErrorCode.BASKET_LOAN_CAP, errorMessage: 'message' } }

      basketStore.setError(newError)
      expect(basketStore.error).toEqual(newError)
    })
  })

  describe('setFlagData', () => {
    it('should set store error', () => {
      const basketStore = createBasketStore()
      const flags = { 'test-flag': true }
      const flagData = { enabled: true, flags: [{ key: 'test-flag', enabled: true, flags: [] }] }

      basketStore.setFlagData(flagData)
      expect(basketStore.flagData).toEqual(flags)
    })
  })

  describe('loadBasket', () => {
    it('should load basket from service', async () => {
      const basketStore = createBasketStore()
      await basketStore.loadBasket()

      expect(basketService.get).toHaveBeenCalledWith(defaultBasketId)
      expect(basketStore.basket).toEqual(mockBasketResponse)
    })

    it('should handle error', async () => {
      const error = { status: 400 }
      basketService.get.mockImplementationOnce(() => {
        throw error
      })
      const basketStore = createBasketStore()
      await basketStore.loadBasket()

      expect(basketStore.error).toEqual(error)
      expect(AnalyticsUtil.updateConfig).toBeCalled()
      expect(AnalyticsUtil.pageView).toBeCalledWith('basketPage.pageError', { pageError: '400:There was a problem fetching your basket!' })
    })
  })

  describe('updateBasket', () => {
    it('clears basket', async () => {
      const basketStore = createBasketStore()
      await basketStore.loadBasket()
      await basketStore.updateBasket(true)

      expect(basketStore.basket).toEqual({ packages: [] })
    })

    it('updates basket', async () => {
      const basketStore = createBasketStore()
      await basketStore.loadBasket()
      await basketStore.updateBasket()

      expect(basketService.get).toHaveBeenCalledTimes(2)
    })

    it('sets store to waiting state if set to show spinner', async () => {
      const basketStore = createBasketStore()
      const loadPromise = basketStore.updateBasket(undefined, true)
      expect(basketStore.waitingForApiResponse).toEqual(true)

      await loadPromise
      expect(basketStore.waitingForApiResponse).toEqual(false)
    })
  })

  describe('checkBasketForProblems', () => {
    it('should handle basket with declined order', async () => {
      const oldWindow = global.window
      global.window = Object.create(window)
      Object.defineProperty(window, 'location', {
        value: {
          replace: jest.fn(),
        },
      })
      const basketStore = createBasketStore()
      await basketStore.loadBasket()

      basketStore.basket.vetOutcome = { creditVetId: 'D' }
      basketStore.checkBasketForProblems()
      expect(global.window.location.replace).toHaveBeenCalledWith('/en/checkout-credit-fail.html')

      global.window = oldWindow
    })

    it('should handle basket with too many packages', async () => {
      const basketStore = createBasketStore()
      const updateStatusSpy = jest.spyOn(basketStore, 'updateStatus')
      await basketStore.loadBasket()
      basketStore.setBasket({ ...basketStore.basket, vetOutcome: { availableNumberOfConnections: '1' }, packages: Array(10) })

      basketStore.checkBasketForProblems()
      expect(updateStatusSpy).toHaveBeenCalledWith('tooManyPackages', undefined, basketStore.basket)
    })

    it('should handle basket that has unacceptable recurring charge', async () => {
      const basketStore = createBasketStore()
      await basketStore.loadBasket()
      const updateStatusSpy = jest.spyOn(basketStore, 'updateStatus')
      basketStore.basket.vetOutcome = { availableRecurringChargeLimit: '1' }
      basketStore.checkBasketForProblems()
      expect(updateStatusSpy).toHaveBeenCalledWith('unacceptibleRecurringCost')
    })

    it('should handle an abandoned basket', async () => {
      getCookie.mockReturnValue('')
      const basketStore = createBasketStore()
      await basketStore.loadBasket()

      basketStore.checkBasketForProblems()
      expect(setCookie).toHaveBeenCalledWith('basketId', basketStore.basket.basketId)
    })
  })

  describe('loadBasketContent', () => {
    it('should load basket from service', async () => {
      const basketStore = createBasketStore()
      await basketStore.loadBasketContent()

      expect(contentService.getAssetModel).toHaveBeenCalledWith('basket')
      expect(basketStore.pageContent).toEqual({})
    })

    it('should warn if load basket from service was not successful', async () => {
      const warnSpy = jest.spyOn(global.console, 'warn').mockImplementation()
      jest.spyOn(contentService, 'getAssetModel').mockRejectedValue({})

      const basketStore = createBasketStore()
      await basketStore.loadBasketContent()
      expect(console.warn).toBeCalledWith('Failed to fetch page content.')
      warnSpy.mockRestore()
    })
  })

  describe('handleEmptyBasket', () => {
    it('calls the empty endpoint in the service', async () => {
      const basketStore = createBasketStore()
      const updateBasketSpy = jest.spyOn(basketStore, 'updateBasket')
      await flowResult(basketStore.handleEmptyBasket())
      expect(basketService.empty).toHaveBeenCalled()
      expect(updateBasketSpy).toHaveBeenCalledWith(true)
    })

    it('triggers the right emptyBasketCTA analytics', async () => {
      const basketStore = createBasketStore()
      await flowResult(basketStore.handleEmptyBasket())
      expect(AnalyticsUtil.trackLink).toHaveBeenCalledWith('basketPage.emptyBasketCta', expect.objectContaining({}))
    })

    it('updates the basket status if service fails', async () => {
      const basketStore = createBasketStore()
      const err = new Error('something went wrong')
      basketService.empty.mockRejectedValueOnce(err)

      const updateBasketSpy = jest.spyOn(basketStore, 'updateBasket')
      const updateStatusSpy = jest.spyOn(basketStore, 'updateStatus')

      await flowResult(basketStore.handleEmptyBasket())

      expect(updateBasketSpy).not.toHaveBeenCalled()
      expect(updateStatusSpy).toHaveBeenCalledWith('couldNotEmptyBasket', err)
      expect(AnalyticsUtil.trackLink).toBeCalledWith('basketPage.inlineComponentError', {
        eventAction: 'text',
        eventLabel: 'Empty basket',
        newBasket: {},
        pageError: '',
      })
    })
  })

  describe('setters', () => {
    it('can setPackages', async () => {
      const basketStore = createBasketStore()
      await flowResult(basketStore.loadBasket())
      expect(basketStore.packages).toHaveLength(2)
      basketStore.setPackages([])
      expect(basketStore.packages).toHaveLength(0)
    })

    it('can setIsEmptying', () => {
      const basketStore = createBasketStore()
      expect(basketStore.isEmptying).toBe(false)
      basketStore.setIsEmptying(true)
      expect(basketStore.isEmptying).toBe(true)
    })

    it('can setIsLoading', () => {
      const basketStore = createBasketStore()
      expect(basketStore.isLoading).toBe(false)
      basketStore.setIsLoading(true)
      expect(basketStore.isLoading).toBe(true)
    })

    it('can setIsValidating', () => {
      const basketStore = createBasketStore()
      expect(basketStore.isValidating).toBe(false)
      basketStore.setIsValidating(true)
      expect(basketStore.isValidating).toBe(true)
    })
  })

  describe('validate basket', () => {
    it('uses the service', async () => {
      const basketStore = createBasketStore()
      await flowResult(basketStore.validateBasket())

      expect(basketService.validateBasket).toHaveBeenCalledWith('some-basket-id')
    })

    it('updates the status if the endpoint fails', async () => {
      const basketStore = createBasketStore()
      const updateStatusSpy = jest.spyOn(basketStore, 'updateStatus')
      const error = {
        data: {
          errorMessage: 'NOT OK',
          errorCode: 'testcode',
        },
      }

      basketService.validateBasket = jest.fn().mockRejectedValue(error)
      try {
        await flowResult(basketStore.validateBasket())
      } catch (e) {
        console.log(e)
      }
      expect(updateStatusSpy).toHaveBeenCalledWith('basketIsInvalid', error)
    })
  })

  describe('onVoucherSubmit', () => {
    it('toggles the modal to switch voucher in PageUiStore if there is one in the store', async () => {
      const basketStore = createBasketStore()
      const basket = basketStore.basket
      const toggleModalSpy = jest.spyOn(defaultRootStore.pageUiStore, 'toggleModal')

      basket.voucherCode = 'some-code'
      basketStore.setBasket(basket)
      basketStore.addVoucher('some-code')

      await flowResult(basketStore.onVoucherSubmit('abcd'))

      expect(toggleModalSpy).toHaveBeenCalledWith('switchVoucher')
    })

    it('calls onVoucherConfirm if there is no voucher in the store', async () => {
      const basketStore = createBasketStore()
      const onVoucherSubmitSpy = jest.spyOn(basketStore, 'onVoucherConfirm')

      await flowResult(basketStore.onVoucherSubmit('abcd'))

      expect(onVoucherSubmitSpy).toHaveBeenCalled()
    })
  })

  describe('add voucher', () => {
    it('does not call the service if no basketId or voucherCode is provided', () => {
      const basketStore = createBasketStore()
      basketStore.addVoucher()
      basketStore.addVoucher('12345')
      expect(basketService.addVoucher).not.toHaveBeenCalledWith()
    })

    it('calls the service if basketId and voucher are provided', () => {
      const basketStore = createBasketStore()
      basketStore.addVoucher('123456', 'some-voucher')
      expect(basketService.addVoucher).toHaveBeenCalledWith('123456', 'some-voucher')
    })

    it('updates the status to couldNotAddVoucher and triggers analytics if the service fails', async () => {
      const err = new Error('something went wrong')
      basketService.addVoucher.mockRejectedValueOnce(err)
      const basketStore = createBasketStore()
      const result = await flowResult(basketStore.addVoucher('123456', 'some-voucher'))

      expect(result).toBe(false)
      expect(basketStore.notification).toBe('couldNotAddVoucher')
      expect(AnalyticsUtil.trackLink).toHaveBeenCalledWith(
        'basketPage.basketUpdateFailed',
        expect.objectContaining({ transactionCouponCode: 'some-voucher' }),
      )

      //Restore original mock value
      basketService.addVoucher = jest.fn().mockResolvedValue('OK')
    })
  })

  describe('onVoucherConfirm', () => {
    it('removes existing voucher if it already exists', async () => {
      const basketStore = createBasketStore()
      basketStore.setBasket({ ...basketStore.basket, voucherCode: 'some-voucher' })
      defaultRootStore.pageUiStore.setVoucherCode('some-other-voucher')

      await flowResult(basketStore.onVoucherConfirm())
      expect(basketService.removeVoucher).toHaveBeenCalledWith('some-basket-id', 'some-voucher')
    })

    it('adds the voucher using addVoucher and analytics track link', async () => {
      const basketStore = createBasketStore()
      const addVoucherSpy = jest.spyOn(basketStore, 'addVoucher')
      basketStore.setBasket({ ...basketStore.basket, voucherCode: '' })
      defaultRootStore.pageUiStore.setVoucherCode('some-other-voucher')

      await flowResult(basketStore.onVoucherConfirm())

      expect(addVoucherSpy).toHaveBeenCalledWith('some-basket-id', 'some-other-voucher')
      expect(AnalyticsUtil.trackLink).toHaveBeenCalledWith('basketPage.basketUpdateSuccess', expect.objectContaining({}))
    })

    it('cleans the voucher code and hides the modal once accepted', async () => {
      const basketStore = createBasketStore()
      const setVoucherCodeSpy = jest.spyOn(defaultRootStore.pageUiStore, 'setVoucherCode')
      const hideModalSpy = jest.spyOn(defaultRootStore.pageUiStore, 'hideModal')
      await flowResult(basketStore.onVoucherConfirm())

      expect(setVoucherCodeSpy).toHaveBeenCalledWith('')
      expect(hideModalSpy).toHaveBeenCalledWith()
    })
  })

  describe('updateAddOnStatus', () => {
    it('updates services and hardwares accordingly', async () => {
      const basketStore = createBasketStore()
      await flowResult(basketStore.loadBasket())
      basketStore.updateAddOnStatus(mockBasketResponse.packages[0].packageId, '086532', 'present')
      basketStore.updateAddOnStatus(mockBasketResponse.packages[0].packageId, '110461', 'present')

      if (
        basketStore.basket.packages === undefined ||
        basketStore.basket.packages[0].hardwares === undefined ||
        basketStore.basket.packages[0].services === undefined
      ) {
        throw 'Bad mock'
      }

      const firstHw = <BasketHardwareWithHeaderStatus>basketStore.basket.packages[0].hardwares[0]
      const firstSvc = <BasketPackageService>basketStore.basket.packages[0].services[0]
      expect(firstHw.headerStatus).toBe('present')
      expect(firstSvc.headerStatus).toBe('present')
    })
  })

  describe('onRemoveAddOn', () => {
    it('calls updateAddOnStatus, removeProduct and trackLink ', async () => {
      const basketStore = createBasketStore()
      const updateAddOnStatusSpy = jest.spyOn(basketStore, 'updateAddOnStatus')
      await basketStore.loadBasket()
      await flowResult(basketStore.onRemoveAddOn('aaa', 'bbb', 'ccc'))

      expect(updateAddOnStatusSpy).toHaveBeenCalledWith('aaa', 'ccc', 'removing')
      expect(updateAddOnStatusSpy).toHaveBeenCalledWith('aaa', 'ccc', 'removed')

      expect(basketService.removeProduct).toHaveBeenCalledWith('some-basket-id', 'aaa', 'bbb')
      expect(AnalyticsUtil.trackLink).toHaveBeenCalledWith('basketPage.removeAddonCta', expect.objectContaining({ addonId: 'ccc' }))
    })

    it('updates status and sets addOn as removed if service fails', async () => {
      const err = new Error('something went wrong')
      basketService.removeProduct.mockRejectedValueOnce(err)

      const basketStore = createBasketStore()
      const updateStatusSpy = jest.spyOn(basketStore, 'updateStatus')
      const updateAddOnStatusSpy = jest.spyOn(basketStore, 'updateAddOnStatus')

      await basketStore.loadBasket()
      await flowResult(basketStore.onRemoveAddOn('aaa', 'bbb', 'ccc'))

      expect(updateAddOnStatusSpy).toHaveBeenCalledWith('aaa', 'ccc', 'present')
      expect(updateStatusSpy).toHaveBeenCalledWith('couldNotAddExtra', err)
      expect(AnalyticsUtil.trackLink).toBeCalledTimes(2)

      //Restore mock
      basketService.removeProduct = jest.fn().mockResolvedValue('OK')
    })

    it('calls updatePackageDetail for an accessory package', async () => {
      const packageId = mockAccessoryBasketResponse.packages[0].packageId
      const basketStore = createBasketStore()
      basketService.get.mockResolvedValueOnce(mockAccessoryBasketResponse)
      const updateAddOnStatusSpy = jest.spyOn(basketStore, 'updateAddOnStatus')
      const updatePackageDetailSpy = jest.spyOn(basketStore, 'updatePackageDetail')
      await basketStore.loadBasket()
      await flowResult(basketStore.onRemoveAddOn(packageId, 'bbb', 'ccc'))

      expect(updateAddOnStatusSpy).toHaveBeenCalledWith(packageId, 'ccc', 'removing')
      expect(updateAddOnStatusSpy).toHaveBeenCalledWith(packageId, 'ccc', 'removed')
      expect(updatePackageDetailSpy).toHaveBeenCalledTimes(1)

      expect(basketService.removeProduct).toHaveBeenCalledWith('some-basket-id', packageId, 'bbb')
      expect(AnalyticsUtil.trackLink).toHaveBeenCalledWith('basketPage.removeAddonCta', expect.objectContaining({ addonId: 'ccc' }))
    })

    it('calls removeUpgradeAddon in case of upgrade order', async () => {
      const packageId = mockAccessoryBasketResponse.packages[0].packageId
      const basketStore = createBasketStore()
      const spyRemoveUpgradeAddon = jest.spyOn(basketStore, 'removeUpgradeAddon')

      await basketStore.loadBasket()
      basketStore.basket.isUpgradeOrder = true
      await flowResult(basketStore.onRemoveAddOn(packageId, 'bbb', 'ccc'))

      expect(spyRemoveUpgradeAddon).toHaveBeenCalledWith(packageId, 'ccc')
    })

    it('should do nothing if action is disabled', async () => {
      const packageId = mockAccessoryBasketResponse.packages[0].packageId
      defaultRootStore.pageUiStore.setDisableActions(true)
      const basketStore = createBasketStore()
      const updateAddOnStatusSpy = jest.spyOn(basketStore, 'updateAddOnStatus')

      await basketStore.loadBasket()
      await flowResult(basketStore.onRemoveAddOn(packageId, 'bbb', 'ccc'))

      expect(updateAddOnStatusSpy).not.toHaveBeenCalled()
      defaultRootStore.pageUiStore.setDisableActions(false)
    })
  })

  describe('onUndoRemoveAddOn', () => {
    it('calls updateAddOnStatus, addProduct and trackLink ', async () => {
      const basketStore = createBasketStore()
      const updateAddOnStatusSpy = jest.spyOn(basketStore, 'updateAddOnStatus')
      await basketStore.loadBasket()
      await flowResult(basketStore.onUndoRemoveAddOn('aaa', 'bbb', 'ccc'))

      expect(updateAddOnStatusSpy).toHaveBeenCalledWith('aaa', 'bbb', 'retrieving')
      expect(updateAddOnStatusSpy).toHaveBeenCalledWith('aaa', 'bbb', 'present')

      expect(basketService.addProduct).toHaveBeenCalledWith('some-basket-id', 'aaa', {
        products: [{ action: 'ADD', productType: 'ccc', skuId: 'bbb' }],
      })
      expect(AnalyticsUtil.trackLink).toHaveBeenCalledWith('basketPage.undoRemoveAddonCta', expect.objectContaining({ addonId: 'bbb' }))
    })

    it('updates status and sets addOn as removed if service fails', async () => {
      const err = new Error('something went wrong')
      basketService.addProduct.mockRejectedValueOnce(err)

      const basketStore = createBasketStore()
      const updateStatusSpy = jest.spyOn(basketStore, 'updateStatus')
      const updateAddOnStatusSpy = jest.spyOn(basketStore, 'updateAddOnStatus')

      await basketStore.loadBasket()
      await flowResult(basketStore.onUndoRemoveAddOn('aaa', 'bbb', 'ccc'))

      expect(updateAddOnStatusSpy).toHaveBeenCalledWith('aaa', 'bbb', 'removed')
      expect(updateStatusSpy).toHaveBeenCalledWith('couldNotUndo', err)
      expect(AnalyticsUtil.trackLink).toBeCalledTimes(1)

      //Restore mock
      basketService.addProduct = jest.fn().mockResolvedValue('OK')
    })

    it('should do nothing if action is disabled', async () => {
      defaultRootStore.pageUiStore.setDisableActions(true)
      const basketStore = createBasketStore()
      const updateAddOnStatusSpy = jest.spyOn(basketStore, 'updateAddOnStatus')

      await basketStore.loadBasket()
      await flowResult(basketStore.onUndoRemoveAddOn('aaa', 'bbb', 'ccc'))

      expect(updateAddOnStatusSpy).not.toHaveBeenCalled()
      defaultRootStore.pageUiStore.setDisableActions(false)
    })
  })

  describe('onUndoRemovePackage', () => {
    it('calls the service addPackage', async () => {
      basketService.get.mockResolvedValueOnce(mockBasketResponse)
      const basketStore = createBasketStore()
      await basketStore.loadBasket()
      await flowResult(basketStore.onUndoRemovePackage(basketStore.packages[0].packageId, {}, []))

      expect(basketService.addPackage).toHaveBeenCalledWith({
        requestBody: {
          tradeInCredit: basketStore.packages[0].tradeInCredit,
          tradeInOfferCode: basketStore.packages[0].tradeInOfferCode,
        },
      })
    })

    it('passes contract options to addPackage', async () => {
      basketServiceHelpers.createPackage.mockImplementationOnce(() => ({ hardwares: [{}] }))

      const basketStore = createBasketStore()
      const contractOptions = { customerType: 'Consumer' }
      await flowResult(basketStore.onUndoRemovePackage('aaa', { contractOptions }, []))

      expect(basketService.addPackage).toHaveBeenCalledWith(
        expect.objectContaining({
          requestBody: {
            hardwares: [
              {
                contractOptions,
              },
            ],
          },
        }),
      )
    })

    it('patches basket for each of the watch ids passed', async () => {
      const basketStore = createBasketStore()
      await flowResult(basketStore.onUndoRemovePackage('aaa', {}, ['1', '2']))

      expect(basketService.patchBasket).toHaveBeenCalledWith('1', expect.objectContaining({}))
      expect(basketService.patchBasket).toHaveBeenCalledWith('2', expect.objectContaining({}))
      expect(basketService.get).toHaveBeenCalledWith('some-basket-id')
    })

    it('patches basket for watch which is being removed', async () => {
      basketService.get.mockResolvedValueOnce(mockBasketResponseWithWatchUpgrade)
      const basketStore = createBasketStore()
      const { packageId } = mockBasketResponseWithWatchUpgrade.packages[0]
      const spyUpdatePackage = jest.spyOn(basketStore, 'updatePackage').mockResolvedValueOnce()
      const spyUpdateBasket = jest.spyOn(basketStore, 'updateBasket')
      await flowResult(basketStore.onUndoRemovePackage('aaa', { packageId }, ['1', packageId, '3']))

      expect(basketService.patchBasket).toHaveBeenCalledWith(packageId, expect.objectContaining({}))
      expect(basketService.patchBasket).not.toHaveBeenCalledWith('1', expect.objectContaining({}))
      expect(basketService.patchBasket).not.toHaveBeenCalledWith('3', expect.objectContaining({}))
      expect(basketService.get).toHaveBeenCalledWith('some-basket-id')

      expect(spyUpdatePackage).toHaveBeenCalled()
      expect(spyUpdateBasket).toHaveBeenCalled()
      expect(AnalyticsUtil.trackLink).toHaveBeenCalledWith('basketPage.undoRemovePackageCta', expect.objectContaining({ packageId }))
    })

    it('should do nothing if action is disabled', async () => {
      defaultRootStore.pageUiStore.setDisableActions(true)
      const basketStore = createBasketStore()
      const spyFn = jest.spyOn(basketStore, 'updatePackageStatus')
      await flowResult(basketStore.onUndoRemovePackage('testid', {}, ['1', '2']))

      expect(spyFn).not.toHaveBeenCalled()
      expect(basketService.addPackage).not.toHaveBeenCalled()
      defaultRootStore.pageUiStore.setDisableActions(false)
    })
  })

  describe('onRemovePackage', () => {
    it('updates the package status and sends analytics tracking and validation', async () => {
      const packageId = mockBasketResponse.packages[0].packageId
      const basketStore = createBasketStore()
      const updatePackageStatusSpy = jest.spyOn(basketStore, 'updatePackageStatus')
      const updateBasketSpy = jest.spyOn(basketStore, 'updateBasket')
      await flowResult(basketStore.onRemovePackage(packageId))

      expect(updatePackageStatusSpy).toHaveBeenCalledWith(packageId, 'removing')
      expect(updatePackageStatusSpy).toHaveBeenCalledWith(packageId, 'removed')
      expect(updateBasketSpy).toHaveBeenCalled()
      expect(basketService.removePackage).toHaveBeenCalledWith('some-basket-id', packageId)

      expect(AnalyticsUtil.trackLink).toHaveBeenCalledWith('basketPage.removePackageCta', expect.objectContaining({ packageId }))
    })

    it('should trigger modal open if removing combi package', async () => {
      const packageId = mockBasketResponse.packages[0].packageId
      const basketStore = createBasketStore()
      const toggleModalSpy = jest.spyOn(defaultRootStore.pageUiStore, 'toggleModal')
      await basketStore.loadBasket()
      basketStore.basket.packages![0].combiPackageId = 'combi-id'
      await flowResult(basketStore.onRemovePackage(packageId))

      expect(toggleModalSpy).toHaveBeenCalledWith('removeCombi')
    })

    it('remove package fails', async () => {
      basketService.removePackage = jest.fn().mockRejectedValue('NOT OK')

      const packageId = mockBasketResponse.packages[0].packageId
      const basketStore = createBasketStore()
      const updateStatusSpy = jest.spyOn(basketStore, 'updateStatus')
      const updatePackageStatusSpy = jest.spyOn(basketStore, 'updatePackageStatus')
      const updateBasketSpy = jest.spyOn(basketStore, 'updateBasket')
      await flowResult(basketStore.onRemovePackage(packageId))

      expect(updatePackageStatusSpy).toHaveBeenCalledWith(packageId, 'removing')
      expect(updatePackageStatusSpy).not.toHaveBeenCalledWith(packageId, 'removed')
      expect(updateBasketSpy).toHaveBeenCalled()
      expect(updateStatusSpy).toHaveBeenCalledWith('couldNotRemovePackage', 'NOT OK')

      //reset mock value
      basketService.removePackage = jest.fn().mockResolvedValue('OK')
    })
  })

  describe('confirmRemovePackage', () => {
    it('should do nothing if action is disabled', async () => {
      defaultRootStore.pageUiStore.setDisableActions(true)
      const basketStore = createBasketStore()
      const spyFn = jest.spyOn(basketStore, 'updatePackageStatus')

      await basketStore.loadBasket()
      await basketStore.confirmRemovePackage()

      expect(spyFn).not.toHaveBeenCalled()
      defaultRootStore.pageUiStore.setDisableActions(false)
    })

    it('should trigger modal open if last package', async () => {
      basketService.get.mockResolvedValueOnce(mockBingoBasketResponse)
      const basketStore = createBasketStore()
      const toggleModalSpy = jest.spyOn(defaultRootStore.pageUiStore, 'toggleModal')
      const spyFn = jest.spyOn(basketStore, 'updatePackageStatus')

      await basketStore.loadBasket()
      await basketStore.confirmRemovePackage()

      expect(toggleModalSpy).toHaveBeenCalledWith('removePackage')
      expect(spyFn).not.toHaveBeenCalled()
    })

    it('should call correspoding methods if removeCombi modal is opened', async () => {
      jest.useFakeTimers()
      jest.spyOn(defaultRootStore.pageUiStore, 'scrollTop').mockImplementationOnce(() => {})
      const basketStore = createBasketStore()
      const spySetIsEmptying = jest.spyOn(basketStore, 'setIsEmptying')
      const spySetIsLoading = jest.spyOn(basketStore, 'setIsLoading')
      const spySetPackages = jest.spyOn(basketStore, 'setPackages')

      await basketStore.loadBasket()
      defaultRootStore.pageUiStore.setModalName('removeCombi')
      await basketStore.confirmRemovePackage()

      expect(spySetIsEmptying).toHaveBeenCalledWith(false)
      expect(spySetIsLoading).toHaveBeenCalledWith(true)
      expect(spySetPackages).toHaveBeenCalled()

      jest.advanceTimersByTime(500)

      expect(defaultRootStore.pageUiStore.scrollTop).toHaveBeenCalled()
      expect(spySetIsLoading).toHaveBeenCalledWith(false)
      defaultRootStore.pageUiStore.setModalName('')
    })
  })

  describe('onRemovePackageTradeIn', () => {
    it('updates tradein package status as removed', async () => {
      const packageId = mockBasketResponse.packages[0].packageId
      const basketStore = createBasketStore()
      await basketStore.loadBasket()

      await flowResult(basketStore.onRemovePackageTradeIn(packageId))
      expect(AnalyticsUtil.trackLink).toHaveBeenCalledWith('basketPage.removeTradeinCta', expect.objectContaining({}))
      expect(basketStore.getPackage(packageId).packageItem.tradeInHeaderStatus).toBe('removed')
      expect(basketService.updatePackage).toHaveBeenCalledWith(
        'some-basket-id',
        packageId,
        expect.objectContaining({ tradeInCredit: undefined }),
      )
    })

    it('updates tradein package status as present if endpoind fails', async () => {
      const packageId = mockBasketResponse.packages[0].packageId
      const basketStore = createBasketStore()
      await basketStore.loadBasket()
      basketService.updatePackage.mockImplementationOnce(() => {
        throw {}
      })

      await flowResult(basketStore.onRemovePackageTradeIn(packageId))

      expect(basketStore.getPackage(packageId).packageItem.tradeInHeaderStatus).toBe('present')
      expect(basketService.updatePackage).toHaveBeenCalled() //('some-basket-id')
    })
  })

  describe('onUndoRemovePackageTradeIn', () => {
    it('updates tradein package status as present', async () => {
      const packageId = mockBasketResponse.packages[0].packageId
      const basketStore = createBasketStore()
      await basketStore.loadBasket()
      basketService.updatePackage.mockImplementationOnce(true)
      await flowResult(basketStore.onUndoRemovePackageTradeIn(packageId))
      expect(AnalyticsUtil.trackLink).toHaveBeenCalledWith('basketPage.undoRemoveTradeinCta', expect.objectContaining({}))
      expect(basketStore.getPackage(packageId).packageItem.tradeInHeaderStatus).toBe('removed')
      expect(basketService.updatePackage).toHaveBeenCalledWith(
        'some-basket-id',
        packageId,
        expect.objectContaining({ tradeInCredit: mockBasketResponse.packages[0].tradeInCredit }),
      )
    })

    it('updates tradein package status as removed if endpoind fails', async () => {
      const packageId = mockBasketResponse.packages[0].packageId
      const basketStore = createBasketStore()
      await basketStore.loadBasket()
      basketService.updatePackage.mockImplementationOnce(() => {
        throw {}
      })

      await flowResult(basketStore.onRemovePackageTradeIn(packageId))
      const tradeInHeaderStatus = basketStore.getPackage(packageId).packageItem.tradeInHeaderStatus
      expect(tradeInHeaderStatus).toBe('present')
      expect(basketService.updatePackage).toHaveBeenCalled()
    })
  })

  describe('updatePackage', () => {
    it('should update package with corresponding packageId', async () => {
      const basketStore = createBasketStore()
      await basketStore.loadBasket()
      const updatedPackage = {
        ...mockBasketResponse.packages[0],
        voucherCode: 'testVoucher',
      } as BasketV2.ModelPackage

      basketStore.updatePackage('fee83b9d-d084-4ae3-a198-9ff630665159', updatedPackage)
      expect(basketStore.basket.packages![0].voucherCode).toEqual('testVoucher')
    })
  })

  describe('updatePackageTradeIn', () => {
    it('should do nothing if action is disabled', async () => {
      defaultRootStore.pageUiStore.setDisableActions(true)
      const basketStore = createBasketStore()
      const spyFn = jest.spyOn(basketStore, 'updateTradeInStatus')

      await basketStore.updatePackageTradeIn('testid', {}, 'present', 'removed', 'removing')

      expect(spyFn).not.toHaveBeenCalled()
      expect(basketService.updatePackage).not.toHaveBeenCalled()
      defaultRootStore.pageUiStore.setDisableActions(false)
    })
  })

  describe('removeUpgradeAddon', () => {
    it('should do nothing if order is not upgrade', async () => {
      const basketStore = createBasketStore()

      await basketStore.loadBasket()
      await basketStore.removeUpgradeAddon('basket-id', '111111')

      expect(basketService.addProduct).not.toHaveBeenCalled()
    })

    it('should call basketService addProduct in case of upgrade order', async () => {
      basketService.get.mockResolvedValueOnce(mockBasketResponseWithWatchUpgrade)
      const basketStore = createBasketStore()

      await basketStore.loadBasket()
      basketStore.basket.isUpgradeOrder = true
      await basketStore.removeUpgradeAddon('package-id', '111111')

      expect(basketService.addProduct).toHaveBeenCalledWith('some-basket-id', 'package-id', {
        products: [{ action: 'DELETE', productType: 'SERVICE', skuId: '111111' }],
      })
    })
  })

  describe('handleRemoveVoucher', () => {
    it('should update status and call analytics upon receiving error', async () => {
      const mockError = {
        data: {
          errorMessage: 'test message',
          errorCode: 'test code',
        },
      }
      jest.spyOn(basketService, 'removeVoucher').mockRejectedValueOnce(mockError)
      const basketStore = createBasketStore()
      const spyUpdateStatus = jest.spyOn(basketStore, 'updateStatus')
      await basketStore.loadBasket()

      await flowResult(basketStore.handleRemoveVoucher())

      expect(spyUpdateStatus).toHaveBeenCalledWith('couldNotRemoveVoucher', mockError)
      expect(AnalyticsUtil.trackLink).toHaveBeenCalledWith(
        'basketPage.inlineComponentError',
        expect.objectContaining({
          eventLabel: 'Undo removal voucher',
          pageError: mockError.data.errorMessage,
          eventAction: mockError.data.errorCode,
        }),
      )
    })
  })
})
