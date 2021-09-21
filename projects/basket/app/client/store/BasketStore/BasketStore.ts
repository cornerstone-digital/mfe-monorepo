import { makeAutoObservable, flow } from 'mobx'
import get from 'lodash/get'
import analyticsHelpers from '@pages/BasketPage/analytics/helpers'
import basketService from '@web-shop-core/services/basketService'
import basketServiceHelpers from '@web-shop-core/services/basketService/helpers'
import contentService from '@web-cms-core/services/contentService'
import getCookie from '@web-shop-core/helpers/getCookie'
import setCookie from '@web-shop-core/helpers/setCookie'
import { sanitizeJson } from '@shared/helpers/transformUtils/transformUtils'
import { hasWatch, isActiveSubscription, isSimCard, isPaym, isAccessoryPackage } from '@helpers/typeCheck'

import AnalyticsUtil from '@utilities/Analytics'
import { ValidationErrorCode } from '@constants'
import {
  BasketStatusError,
  PackageRemoveUndoParams,
  BasketPackage,
  BasketPackageService,
  BasketHardwareWithHeaderStatus,
  HeaderStatusType,
  Flags,
  ProductRequestType,
} from '@pages/BasketPage/BasketPage.types'
import { RootStoreType } from '../RootStore'
import { getActivePackages, getPackageUpdatePayload } from './helpers'
import isFlagEnabled from '@helpers/isFlagEnabled'
import { TransformedBasket } from '@shared/helpers/basketTransformer/BasketTransformer'
import { FeatureFlagConfig } from '@shared/types/global'

export default class BasketStore {
  private journeyType?: string

  basket: TransformedBasket = {}
  pageContent: BasketPageContent.Basket = {} as BasketPageContent.Basket
  isEmptying = false
  isLoading = !!getCookie('basketId') || !!window.location.search
  isValidating = false
  waitingForApiResponse = false
  notification: string = ''
  error?: BasketStatusError
  isContentApiFailed?: boolean
  isBasketApiFailed?: boolean
  packageToRemove: BasketV2.ModelPackage['packageId'] | undefined
  flagData: Flags = {}

  private get pageUiStore() {
    return this.rootStore.pageUiStore
  }

  get packages(): BasketV2.ModelPackage[] {
    return this.basket?.packages || []
  }

  get isEmpty(): boolean {
    return !this.packages?.length && !this.basket.packages?.length
  }

  get hasSmartWatch(): boolean {
    const packages = get(this.basket, 'packages', [])
    const smartWatch = packages.some(item => hasWatch(item.hardwares))
    const smartWatchSimo = packages.some(item => item?.planType?.toLowerCase().includes('watch_simo'))
    return smartWatch || smartWatchSimo
  }

  get pageError(): string {
    const status = this.error?.status?.toString()
    const message = this.error?.data?.errorMessage?.toLowerCase()
    return status || message ? `${status} ${message}` : ''
  }

  get hasPayMonthlyPackage() {
    const packages = this.basket.packages || []
    return packages.find(pack => isPaym(pack?.bundle))
  }

  get flags(): Flags {
    return this.flagData
  }

  get bundleIdentifier(): string {
    const activeBundle = this.basket.activeBundles?.find(isActiveSubscription)
    return get(activeBundle, 'identifier.value')
  }

  get isCheckoutDisabled(): boolean {
    const errorCode = get(this.error, 'data.errorCode', '')
    return [
      ValidationErrorCode.BASKET_PHONE_CAP,
      ValidationErrorCode.BASKET_WATCH_CAP,
      ValidationErrorCode.BASKET_LOAN_CAP,
      ValidationErrorCode.MAXIMUM_ALLOWED_LOANS,
      ValidationErrorCode.MAXIMUM_LOANS_FOR_CTN,
      ValidationErrorCode.MAXIMUM_CTNS_WITH_CONCURRENT_LOANS,
      ValidationErrorCode.REPAYMENT_ISSUES,
      ValidationErrorCode.MAXIMUM_LENDING_LIMIT,
      ValidationErrorCode.AIRTIME_DEVICE_MISMATCH,
      ValidationErrorCode.TRADEIN_QUOTE_EXP,
      ValidationErrorCode.LOAN_INVALID_UPFRONT_COST,
      ValidationErrorCode.LOAN_INVALID_DURATION,
      ValidationErrorCode.SUBCATEGORY_LOAN_NONLOAN_MIX_HANDSET,
      ValidationErrorCode.SUBCATEGORY_LOAN_NON_LOAN_MIX_WATCH,
      ValidationErrorCode.SUBCATEGORY_SOLETRADER_INELIGIBLE_LOAN_PHONE,
      ValidationErrorCode.SUBCATEGORY_SOLETRADER_INELIGIBLE_LOAN_WATCH,
      ValidationErrorCode.SUBCATEGORY_SMALLBUSINESS_INELIGIBLE_HANDSET,
      ValidationErrorCode.MAX_SB_PLANS_EXCEEDED,
    ].includes(errorCode)
  }

  get isBannerHidden(): boolean {
    const { packages } = this.basket
    const isCombi = (bundle?: BasketV2.Bundle): boolean => {
      const offerGroup = bundle?.priceDetails?.merchandisingPromotions?.offerGroup || ''
      return offerGroup?.toLowerCase() === 'combi offers' || offerGroup?.toLowerCase() === 'combined combi'
    }
    return packages ? packages.some(item => isCombi(item.bundle)) : false
  }

  get hasBingoPackage(): boolean {
    return !!this.packages?.some(pack => pack?.hardwares?.some(hardware => hardware?.priceDetails?.devicePaymentPlan))
  }

  get rpiContent(): string {
    const message = `Each April your plan price will increase by an amount equal to the
    RPI rate published in March of the year. We'll publish this rate on our website.`
    return String(get(this.pageContent, 'vf_Modules.messages.content.rpi.bodyText', '')) || message
  }

  get rpiWithoutVatContent(): string {
    const message = `Each April your plan price will increase by an amount equal to the
    RPI rate published in March of the year. We'll publish this rate on our website.`
    return String(get(this.pageContent, 'vf_Modules.messages.content.RPI_withoutVAT.bodyText', '')) || message
  }

  get smallBusinessBasketFooterContent(): string {
    const message = `Each April your plan price will increase by an amount equal to the
    RPI rate published in March of the year. We'll publish this rate on our website.`
    return String(get(this.pageContent, 'vf_Modules.messages.content.SMALL_BUSINESS_BASKET_FOOTER.bodyText', '')) || message
  }

  getPackageById(packages: BasketV2.ModelPackage[], packageId: BasketV2.ModelPackage['packageId']) {
    return packages.find(foundPackage => foundPackage.packageId === packageId) || {}
  }

  getPackage(
    packageId: BasketV2.ModelPackage['packageId'],
  ): {
    packageItem: BasketPackage
    packageIndex: number
  } {
    const packageIndex = this.packages.findIndex(item => item?.packageId === packageId)
    const packageItem = this.packages?.[packageIndex] || {}
    return { packageItem, packageIndex }
  }

  constructor(public basketId: string, public readonly queryMap: any, private readonly rootStore: RootStoreType) {
    makeAutoObservable<BasketStore>(this)
  }

  setBasketId(id: string) {
    this.basketId = id
  }

  setError(error?: unknown) {
    this.error = error as BasketStatusError
  }

  setFlagData(flagData: FeatureFlagConfig) {
    this.flagData = flagData.flags.reduce((acc: Flags, flag) => {
      const flagFromUI = isFlagEnabled(flag.key, this.queryMap, flagData)
      acc[flag.key] = flagFromUI !== undefined ? flagFromUI : flag.enabled
      return acc
    }, {})
  }

  loadBasket = flow(function* (this: BasketStore) {
    try {
      const serverBasket = this.basketId ? sanitizeJson(yield basketService.get(this.basketId)) : {}
      this.journeyType = serverBasket.journey?.journeyType
      this.setBasket(serverBasket)
      this.checkBasketForProblems()
    } catch (error) {
      this.updateStatus('general', error)
      this.setIsBasketApiFailed(true)

      const errorMessage = this.error?.data?.errorMessage || this.error?.data?.message || 'There was a problem fetching your basket!'
      const errorCode = this.error?.data?.errorCode || this.error?.status
      const basketAnalyticsConfig = analyticsHelpers.getBasketAnalytics({}, {}, errorMessage)

      AnalyticsUtil.updateConfig(basketAnalyticsConfig)
      AnalyticsUtil.pageView('basketPage.pageError', {
        pageError: `${errorCode}:${errorMessage}`,
      })
    }
  })

  updateBasket = flow(function* (this: BasketStore, clearBasket: boolean = false, showSpinner: boolean = false) {
    if (showSpinner) {
      this.waitingForApiResponse = true
    }

    const originalPackages = clearBasket ? [] : this.packages
    const updatedBasket = clearBasket ? {} : yield basketService.get(this.basketId)
    this.clearStatus()

    const updatedPackages = originalPackages?.map(originalPackage => {
      const newPackage = this.getPackageById(updatedBasket.packages, originalPackage.packageId)
      const { bundle = {}, hardwares, priceDetails, combiPackageId = '', services } = newPackage
      const { merchandisingMedia, priceDetails: bundlePriceDetails, portability } = bundle || {}

      // 1. Spread in original package
      // 2. Update specific values with values from the NEW package
      // 3. Spread in original bundle
      // 4. Update specific values with values from the NEW bundle
      const updatedPackage: BasketV2.ModelPackage = {
        ...originalPackage,
        priceDetails,
        combiPackageId,
        bundle: {
          ...originalPackage.bundle,
          merchandisingMedia,
          priceDetails: bundlePriceDetails,
          portability,
        },
      }

      if (services?.length && originalPackage.services?.length) {
        updatedPackage.services = this.updatePackageLineIds(services, originalPackage.services)
      }

      if (hardwares?.length && originalPackage.hardwares?.length) {
        updatedPackage.hardwares = this.updatePackageLineIds(hardwares, originalPackage.hardwares)
      }

      return updatedPackage
    })

    this.basket = updatedBasket
    this.basket.packages = updatedPackages
    this.waitingForApiResponse = false
    // Bind 'this' to the flow() method directly, otherwise 'this' will not point to the BasketStore component
    // inside the parameter of the generator funcion in the parameter of the flow()
  }).bind(this)

  // Updates product packageLineIds. If the packagelineId wasn't updated, the following removal would fail.
  // This is because the OLD packageLineId will no longer be valid as it's been removed.
  updatePackageLineIds(
    newProducts: (BasketV2.Hardware | BasketV2.Service)[],
    oldProducts: (BasketV2.Hardware | BasketV2.Service)[],
  ): BasketV2.Hardware[] | BasketV2.Service[] {
    return oldProducts?.map(oldProduct => {
      if (isSimCard(oldProduct)) {
        const updatedSim = newProducts?.find(isSimCard) || {}
        return { ...oldProduct, ...updatedSim }
      }
      const updatedProduct = newProducts?.find(i => i.skuId === oldProduct.skuId) || {}
      const thisPackageLineId = updatedProduct.packageLineId || oldProduct.packageLineId

      return { ...oldProduct, packageLineId: thisPackageLineId }
    })
  }

  checkBasketForProblems(basket: TransformedBasket = this.basket) {
    if (basket.packages) {
      const { creditVetId, availableNumberOfConnections, availableRecurringChargeLimit } = basket.vetOutcome || {}
      const orderIsDeclined = creditVetId === 'D'
      const tooManyPackages = parseInt(availableNumberOfConnections || '') < basket.packages.length
      const abandondedBasket = basket.basketId && basket.basketId !== getCookie('basketId')

      if (orderIsDeclined) {
        window.location.replace('/en/checkout-credit-fail.html')
      }

      if (tooManyPackages) {
        this.updateStatus('tooManyPackages', undefined, basket)
      }

      if (this.hasUnacceptableRecurringCharge(availableRecurringChargeLimit, basket.priceDetails)) {
        this.updateStatus('unacceptibleRecurringCost')
      }

      // TODO #269661: We don't have to verify this, just to sync query basketId with its cookie representation
      if (abandondedBasket) {
        setCookie('basketId', basket.basketId)
      }
    }
  }

  private hasUnacceptableRecurringCharge(availableRecurringChargeLimit = '', priceDetails: BasketV2.PackagePriceDetails = {}) {
    const monthlyPrice = priceDetails.monthlyPrice || {}
    const monthlyDiscountPrice = priceDetails.monthlyDiscountPrice || {}
    const actualPrice = parseFloat(monthlyDiscountPrice.gross || monthlyPrice.gross || '0')

    if (availableRecurringChargeLimit === '') {
      return false
    }

    return actualPrice > parseFloat(availableRecurringChargeLimit)
  }

  loadBasketContent = flow(function* (this: BasketStore) {
    try {
      const content = yield contentService.getAssetModel('basket')
      this.setPageContent(content[0].basket)
    } catch (error) {
      this.setIsContentApiFailed(true)
      this.setError(error)
      console.warn('Failed to fetch page content.')
    }
  })

  handleEmptyBasket = flow(function* (this: BasketStore) {
    this.isEmptying = true
    try {
      yield basketService.empty(this.basketId)
      AnalyticsUtil.trackLink('basketPage.emptyBasketCta', {
        newBasket: this.basket,
        pageError: this.pageError,
      })
      yield this.updateBasket(true)
    } catch (error) {
      this.updateStatus('couldNotEmptyBasket', error)
      AnalyticsUtil.trackLink('basketPage.inlineComponentError', {
        eventLabel: 'Empty basket',
        newBasket: this.basket,
        pageError: this.error?.data?.errorMessage || this.pageError,
        eventAction: this.error?.data?.errorCode || 'text',
      })
    } finally {
      this.isEmptying = false
    }

    setTimeout(this.pageUiStore.scrollTop, 100)
    this.pageUiStore.setIsModalVisible(false)
  })

  validateBasket = flow(function* (this: BasketStore) {
    try {
      yield basketService.validateBasket(this.basketId)
    } catch (error) {
      this.updateStatus('basketIsInvalid', error)
      throw error
    }
  })

  updatePackageStatus = (packageId: BasketV2.ModelPackage['packageId'], headerStatus: string) => {
    const { packageItem, packageIndex } = this.getPackage(packageId)
    packageItem.headerStatus = headerStatus
    this.packages.splice(packageIndex, 1, packageItem)
  }

  updateTradeInStatus = (packageId: BasketV2.ModelPackage['packageId'], headerStatus: HeaderStatusType) => {
    const { packageItem, packageIndex } = this.getPackage(packageId)
    packageItem.tradeInHeaderStatus = headerStatus
    this.packages.splice(packageIndex, 1, packageItem)
  }

  updatePackage = async (packageId: BasketV2.ModelPackage['packageId'], newPackage: BasketV2.ModelPackage) => {
    const { packageItem, packageIndex } = this.getPackage(packageId)
    const { services = [], ...restOfNewPackage } = newPackage
    const mergedServices = services.map(service => {
      const matchingService: BasketPackageService | undefined = packageItem.services?.find(oldService => oldService.skuId === service.skuId)

      return { ...service, headerStatus: matchingService?.headerStatus }
    })
    const mergedPackage = {
      ...restOfNewPackage,
      headerStatus: packageItem.headerStatus,
      services: mergedServices,
      planType: this.packages?.[packageIndex].planType,
    }
    this.packages.splice(packageIndex, 1, mergedPackage)
    this.basket.packages = this.packages
  }

  updateStatus = (notification: string, error?: unknown, basket: TransformedBasket = this.basket) => {
    const { errorMessage } = (error as BasketStatusError)?.data || {}
    if (error || notification === 'clear') {
      this.setError(error)
    }
    this.setNotification(notification)
    this.setBasket(basket)
    if (notification && errorMessage) {
      setTimeout(this.pageUiStore.scrollTop, 100)
    }
  }

  clearStatus = () => {
    this.updateStatus('clear')
  }

  setPageContent = (pageContent: BasketPageContent.Basket) => {
    this.pageContent = pageContent
    this.setIsContentApiFailed(false)
  }

  setNotification = (notifications: string) => {
    this.notification = notifications
  }

  setIsEmptying = (newState: boolean) => {
    this.isEmptying = newState
  }

  setIsLoading = (newState: boolean) => {
    this.isLoading = newState
  }

  setIsContentApiFailed = (newValue: boolean) => {
    this.isContentApiFailed = newValue
  }

  setIsBasketApiFailed = (newValue: boolean) => {
    this.isBasketApiFailed = newValue
  }

  setIsValidating = (newState: boolean) => {
    this.isValidating = newState
  }

  setBasket = (basket: TransformedBasket) => {
    this.basket = basket
  }

  setPackages = (packages: BasketV2.ModelPackage[] | undefined) => {
    this.basket.packages = packages || []
  }

  setPackageToRemove = (newState: BasketV2.ModelPackage['packageId'] | undefined) => {
    this.packageToRemove = newState
  }

  onRemovePackageTradeIn = flow(function* (this: BasketStore, packageId: BasketV2.ModelPackage['packageId']) {
    AnalyticsUtil.trackLink('basketPage.removeTradeinCta', {
      newBasket: this.basket,
      packageId,
      pageError: this.pageError,
    })
    const payload = {
      ...getPackageUpdatePayload(this.getPackage(packageId)?.packageItem),
      tradeInCredit: undefined,
    }
    yield this.updatePackageTradeIn(packageId, payload, 'removing', 'removed', 'present')
  })

  onUndoRemovePackageTradeIn = flow(function* (this: BasketStore, packageId: BasketV2.ModelPackage['packageId']) {
    const packageItem = this.getPackage(packageId)?.packageItem
    AnalyticsUtil.trackLink('basketPage.undoRemoveTradeinCta', {
      newBasket: this.basket,
      packageId,
      pageError: this.pageError,
    })

    const payload = getPackageUpdatePayload(packageItem)
    if (payload) {
      yield this.updatePackageTradeIn(packageId, payload, 'retrieving', 'present', 'removed')
    }
  })

  async updatePackageTradeIn(
    packageId: BasketV2.ModelPackage['packageId'],
    payload: BasketV2.UpdatePackage,
    initialState: HeaderStatusType,
    finalState: HeaderStatusType,
    errorState: HeaderStatusType,
  ) {
    try {
      if (this.pageUiStore.disableActions) return
      this.updateTradeInStatus(packageId, initialState)
      this.pageUiStore.setDisableActions(true)
      await basketService.updatePackage(this.basketId, packageId, payload)
      this.updateTradeInStatus(packageId, finalState)
    } catch (error) {
      this.updateTradeInStatus(packageId, errorState)
      this.updateStatus('couldNotRemovePackage', error)

      AnalyticsUtil.trackLink('basketPage.inlineComponentError', {
        eventLabel: initialState === 'removing' ? 'Remove trade-in' : 'Undo trade-in removal',
        newBasket: this.basket,
        pageError: this.error?.data?.errorMessage || this.pageError,
        eventAction: this.error?.data?.errorCode || 'text',
      })
    } finally {
      this.pageUiStore.setDisableActions(false)
    }
  }

  onUndoRemovePackage = flow(function* (
    this: BasketStore,
    packageId: BasketV2.ModelPackage['packageId'],
    basketParams: PackageRemoveUndoParams = {},
    watchPackageIds: (string | undefined)[],
  ) {
    if (this.pageUiStore.disableActions) return

    const currentPackageId = basketParams.packageId || ''
    const watchRemoval = watchPackageIds?.includes(currentPackageId)
    const isUnpairedWatch = currentPackageId === packageId
    const isUnpairedWatchRemoval = watchRemoval && isUnpairedWatch
    this.updatePackageStatus(currentPackageId, 'retrieving')

    try {
      this.pageUiStore.disableActions = true
      const packageObj = basketServiceHelpers.createPackage(basketParams)
      const currentPackage = this.packages.find(item => item.packageId === packageId)

      if (currentPackage?.tradeInCredit) {
        packageObj.tradeInCredit = currentPackage?.tradeInCredit
      }
      if (currentPackage?.tradeInOfferCode) {
        packageObj.tradeInOfferCode = currentPackage?.tradeInOfferCode
      }
      // passing contract options for watch undo to ensure package shape is as expected by the BE
      if (basketParams.contractOptions && packageObj?.hardwares?.length) {
        packageObj.hardwares[0].contractOptions = basketParams.contractOptions
      }
      let updatedPackage = yield basketService.addPackage({
        ...basketParams,
        requestBody: packageObj,
      })

      // watch start
      if (watchPackageIds.length && !isUnpairedWatchRemoval) {
        const isWatchRemoval = watchPackageIds.includes(currentPackageId || '')
        let targetPackageId, updatedHandsetId, updatedWatchIds
        // TODO: simplify logic for combi package watch removal
        if (isWatchRemoval) {
          updatedWatchIds = [updatedPackage.packageId || basketParams.packageId]
          updatedHandsetId = packageId
          targetPackageId = updatedWatchIds[0]
        } else {
          updatedWatchIds = watchPackageIds
          updatedHandsetId = updatedPackage.packageId
          targetPackageId = updatedHandsetId
        }
        const requestBody = {
          packageLinkIdentifier: updatedHandsetId,
          primaryDeviceIdentifier: null,
        }

        yield Promise.all(
          updatedWatchIds.map(async updatedWatchId => {
            return basketService.patchBasket(updatedWatchId, requestBody)
          }),
        )

        const updatedBasket = (yield basketService.get(this.basketId)) || {}
        this.setError()
        updatedPackage = this.getPackageById(updatedBasket.packages, targetPackageId)

        if (!isWatchRemoval) {
          yield Promise.all(
            updatedWatchIds.map(async updatedWatchId => {
              const updatedWatchPackage = this.getPackageById(updatedBasket.packages, updatedWatchId)
              return this.updatePackage(updatedWatchId, updatedWatchPackage)
            }),
          )
        }
      }
      // watch end

      this.updatePackageStatus(currentPackageId, 'present')
      yield this.updatePackage(currentPackageId, updatedPackage)
      yield this.updateBasket()

      AnalyticsUtil.trackLink('basketPage.undoRemovePackageCta', {
        newBasket: this.basket,
        packageId: updatedPackage.packageId,
        pageError: this.pageError,
      })
    } catch (error) {
      this.updatePackageStatus(currentPackageId, 'removed')
      this.updateStatus('couldNotAddPackage', error)

      AnalyticsUtil.trackLink('basketPage.inlineComponentError', {
        eventLabel: 'Undo removal package',
        newBasket: this.basket,
        pageError: this.error?.data?.errorMessage || this.pageError,
        eventAction: this.error?.data?.errorCode || 'text',
      })
    }
    this.pageUiStore.disableActions = false
  })

  removeUpgradeAddon = async (packageId: BasketV2.ModelPackage['packageId'], skuId: BasketV2.Bundle['skuId']) => {
    if (this.basket.isUpgradeOrder) {
      await basketService.addProduct(this.basketId, packageId, {
        products: [
          {
            skuId,
            productType: 'SERVICE',
            action: 'DELETE',
          },
        ],
      })
    }
  }

  addVoucher = flow(function* (
    this: BasketStore,
    basketId?: TransformedBasket['basketId'],
    voucherCode?: TransformedBasket['voucherCode'],
  ) {
    if (basketId && voucherCode) {
      try {
        yield basketService.addVoucher(basketId, voucherCode)
        return true
      } catch (error) {
        this.updateStatus('couldNotAddVoucher', error)
        AnalyticsUtil.trackLink('basketPage.basketUpdateFailed', {
          newBasket: this.basket,
          transactionCouponCode: voucherCode,
          pageError: this.pageError,
        })
        return false
      }
    }
  })

  onVoucherConfirm = flow(function* (this: BasketStore) {
    const isReplacingExistingVoucher = !!this.basket.voucherCode

    if (isReplacingExistingVoucher) {
      yield this.handleRemoveVoucher()
    }

    const isValidVoucher = yield this.addVoucher(this.basketId, this.pageUiStore.voucherCode)

    if (isValidVoucher) {
      yield this.updateBasket()
      AnalyticsUtil.trackLink('basketPage.basketUpdateSuccess', {
        newBasket: this.basket,
      })
    }

    this.pageUiStore.setVoucherCode('')
    this.pageUiStore.hideModal()
  })

  onVoucherSubmit = flow(function* (this: BasketStore, voucherCode: string) {
    this.pageUiStore.setVoucherCode(voucherCode)

    if (this.basket.voucherCode) {
      this.pageUiStore.toggleModal('switchVoucher')
    } else {
      yield this.onVoucherConfirm()
    }
  })

  handleRemoveVoucher = flow(function* (this: BasketStore) {
    try {
      const { voucherCode } = this.basket
      yield basketService.removeVoucher(this.basketId, voucherCode)
    } catch (error) {
      this.updateStatus('couldNotRemoveVoucher', error)

      AnalyticsUtil.trackLink('basketPage.inlineComponentError', {
        eventLabel: 'Undo removal voucher',
        newBasket: this.basket,
        pageError: this.error?.data?.errorMessage || this.pageError,
        eventAction: this.error?.data?.errorCode || 'button',
      })
    }
    yield this.updateBasket()
  })

  onRemovePackage = flow(function* (this: BasketStore, packageId: BasketV2.ModelPackage['packageId']) {
    const { packageItem } = this.getPackage(packageId)
    this.setPackageToRemove(packageId)
    if (packageItem.combiPackageId) {
      this.pageUiStore.toggleModal('removeCombi')
    } else {
      yield this.confirmRemovePackage()
    }

    yield this.updateBasket()
  })

  confirmRemovePackage = flow(function* (this: BasketStore) {
    const isLastPackage = getActivePackages(this.basket.packages).length === 1
    const analyticBasket = { ...this.basket }
    this.setIsEmptying(this.pageUiStore.modalName === 'removeCombi')
    if (this.pageUiStore.disableActions) return
    if (isLastPackage) {
      this.pageUiStore.toggleModal('removePackage')
      return
    }
    this.updatePackageStatus(this.packageToRemove, 'removing')
    try {
      this.pageUiStore.setDisableActions(true)
      yield this.removePackage(this.packageToRemove)
      this.updatePackageStatus(this.packageToRemove, 'removed')
      yield this.updateBasket()
      this.setError()
      if (this.pageUiStore.modalName === 'removeCombi') {
        this.setIsEmptying(false)
        this.setIsLoading(true)
        this.setPackages(this.packages)
        setTimeout(this.pageUiStore.scrollTop, 100)
        setTimeout(() => this.setIsLoading(false), 500)
      }
    } catch (error) {
      this.updatePackageStatus(this.packageToRemove, 'present')
    }
    AnalyticsUtil.trackLink('basketPage.removePackageCta', {
      newBasket: analyticBasket,
      packageId: this.packageToRemove,
      pageError: this.pageError,
    })
    this.setPackageToRemove(undefined)
    this.pageUiStore.hideModal()
    this.pageUiStore.setDisableActions(false)
  })

  removePackage = flow(function* (this: BasketStore, packageToRemove: BasketV2.ModelPackage['packageId']) {
    try {
      yield basketService.removePackage(this.basketId, packageToRemove)
    } catch (error) {
      this.updateStatus('couldNotRemovePackage', error)

      AnalyticsUtil.trackLink('basketPage.inlineComponentError', {
        eventLabel: 'Remove package',
        newBasket: this.basket,
        pageError: this.error?.data?.errorMessage || this.pageError,
        eventAction: this.error?.data?.errorCode || 'text',
      })
      throw error
    }
  })

  onRemoveAddOn = flow(function* (
    this: BasketStore,
    packageId: BasketV2.ModelPackage['packageId'],
    packageLineId: BasketV2.Bundle['packageLineId'],
    skuId: BasketV2.Bundle['skuId'],
  ) {
    if (this.pageUiStore.disableActions) {
      return
    }
    AnalyticsUtil.trackLink('basketPage.removeAddonCta', {
      newBasket: this.basket,
      addonId: skuId,
      pageError: this.pageError,
    })

    this.updateAddOnStatus(packageId, skuId, 'removing')
    try {
      this.pageUiStore.setDisableActions(true)

      if (this.basket.isUpgradeOrder) {
        yield this.removeUpgradeAddon(packageId, skuId)
      } else {
        yield basketService.removeProduct(this.basketId, packageId, packageLineId)
      }
      this.updateAddOnStatus(packageId, skuId, 'removed')
      yield this.updateBasket()
      const { packageItem, packageIndex } = this.getPackage(packageId)
      if (
        isAccessoryPackage(packageItem) &&
        packageItem?.hardwares?.every((h: BasketHardwareWithHeaderStatus) => h.headerStatus === 'removed')
      ) {
        packageItem.headerStatus = 'removed'
        this.updatePackageDetail(packageItem, packageIndex)
      }
    } catch (error) {
      this.updateAddOnStatus(packageId, skuId, 'present')
      this.updateStatus('couldNotAddExtra', error)

      AnalyticsUtil.trackLink('basketPage.inlineComponentError', {
        eventLabel: 'Remove AddOn',
        newBasket: this.basket,
        pageError: this.error?.data?.errorMessage || this.pageError,
        eventAction: this.error?.data?.errorCode || 'text',
      })
    }
    this.pageUiStore.setDisableActions(false)
  })

  onUndoRemoveAddOn = flow(function* (
    this: BasketStore,
    packageId: BasketV2.ModelPackage['packageId'],
    skuId: BasketV2.Bundle['skuId'],
    productType: string,
  ) {
    if (this.pageUiStore.disableActions) return
    this.updateAddOnStatus(packageId, skuId, 'retrieving')
    try {
      const productRequest: ProductRequestType = {
        products: [
          {
            skuId,
            productType,
            action: 'ADD',
          },
        ],
      }
      this.pageUiStore.disableActions = true
      yield basketService.addProduct(this.basketId, packageId, productRequest)
      this.updateAddOnStatus(packageId, skuId, 'present')
      yield this.updateBasket()
      AnalyticsUtil.trackLink('basketPage.undoRemoveAddonCta', {
        newBasket: this.basket,
        addonId: skuId,
        pageError: this.pageError,
      })
    } catch (error) {
      this.updateAddOnStatus(packageId, skuId, 'removed')
      this.updateStatus('couldNotUndo', error)

      AnalyticsUtil.trackLink('basketPage.inlineComponentError', {
        eventLabel: 'Undo AddOn removal',
        newBasket: this.basket,
        pageError: this.error?.data?.errorMessage || this.pageError,
        eventAction: this.error?.data?.errorCode || 'text',
      })
    }
    this.pageUiStore.disableActions = false
  })

  updateAddOnStatus(packageId: BasketV2.ModelPackage['packageId'], skuId: BasketV2.Bundle['skuId'], value: HeaderStatusType): void {
    const { packageItem, packageIndex } = this.getPackage(packageId)
    const { services = [], hardwares = [] } = packageItem

    packageItem.hardwares = this.updateAddonHeaderStatus(hardwares, skuId, value)
    packageItem.services = this.updateAddonHeaderStatus(services, skuId, value)

    this.packages.splice(packageIndex, 1, packageItem)
    this.basket.packages = this.packages
  }

  updatePackageDetail(packageItem: BasketPackage, packageIndex: number) {
    this.packages.splice(packageIndex, 1, packageItem)
    this.basket.packages = this.packages
  }

  updateAddonHeaderStatus(
    products: (BasketPackageService | BasketHardwareWithHeaderStatus)[],
    skuId: BasketV2.Bundle['skuId'],
    value: HeaderStatusType,
  ): BasketPackageService[] | BasketHardwareWithHeaderStatus[] {
    return products.map(item => {
      if (item.skuId === skuId) item.headerStatus = value

      return item
    })
  }
}
