import { makeAutoObservable } from 'mobx'
import AnalyticsUtil from '@utilities/Analytics'

import { RootStoreType } from '../RootStore'

export default class PageUiStore {
  modalName: string = ''
  isModalVisible: boolean = false
  voucherCode: string = ''
  disableActions: boolean = false
  timeout?: NodeJS.Timeout

  constructor(private readonly rootStore: RootStoreType) {
    makeAutoObservable<PageUiStore>(this, { scrollTop: false })
  }

  private get basketStore() {
    return this.rootStore.basketStore
  }

  scrollTop = () => {
    if (window && window.scrollTo) {
      window.scrollTo(0, 0)
    }
  }

  setIsModalVisible = (newState: boolean) => {
    this.isModalVisible = newState
  }

  setModalName = (newState: string) => {
    this.modalName = newState
  }

  setVoucherCode = (newState: string) => {
    this.voucherCode = newState
  }

  setDisableActions = (newState: boolean) => {
    this.disableActions = newState
  }

  toggleModal = (name: string) => {
    if (name === 'continueShopping') {
      AnalyticsUtil.trackLink('basketPage.continueShoppingCta', {
        newBasket: this.basketStore.basket,
        pageError: this.basketStore.pageError,
      })
    }

    this.setIsModalVisible(!!name)
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
    this.timeout = setTimeout(
      () => {
        this.setModalName(name)
      },
      name ? 0 : 500,
    )
  }

  hideModal = () => {
    this.toggleModal('')
  }
}
