import { getBasketId } from '@helpers/getBasketId'
import { getQueryMap } from '@helpers/getQueryMap'
import { runInAction } from 'mobx'
import BasketStore from '@store/BasketStore'
import PageUiStore from '@store/PageUiStore'
import { configureMobx } from '@store/configureMobx'

/**
 * Holds references to all domain stores.
 * Use it to access app stores and state.
 */
class RootStore {
  basketStore: BasketStore
  pageUiStore: PageUiStore

  constructor(basketId: string, queryMap: any) {
    this.basketStore = new BasketStore(basketId, queryMap, this)
    this.pageUiStore = new PageUiStore(this)
  }
}

export function createRootStore(): RootStore {
  configureMobx()

  // TODO #269661:
  //  basketId retrieval and exception case redirect logic should be done in the app loader/init function - yet to be implemented.
  const basketId: string = (() => {
    try {
      return getBasketId()
    } catch (e) {
      return ''
    }
  })()

  const queryMap = getQueryMap()

  return runInAction(() => {
    return new RootStore(basketId, queryMap)
  })
}

export type RootStoreType = InstanceType<typeof RootStore>
