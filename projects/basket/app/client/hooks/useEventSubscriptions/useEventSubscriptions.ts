/* eslint-disable max-len */
// import { useStore } from '@store'
// import EventBus from '@shared/utils/eventBus'
// import { useEffect } from 'react'
// import { flowResult } from 'mobx'

// const useEventSubscriptions = () => {
//   const { basketStore, pageUiStore } = useStore()
//   const subscriptions: { [key: string]: any } = {}

//   useEffect(() => {
//     subscriptions['toggleModal'] = EventBus.subscribe('toggleModal', pageUiStore.toggleModal)
//     subscriptions['onUpdateBasket'] = EventBus.subscribe(
//       'onUpdateBasket',
//       flowResult((...args: Parameters<typeof basketStore.updateBasket>) => basketStore.updateBasket(...args)),
//     )
//     subscriptions['onRemovePackage'] = EventBus.subscribe(
//       'onRemovePackage',
//       flowResult((...args: Parameters<typeof basketStore.onRemovePackage>) => basketStore.onRemovePackage(...args)),
//     )
//     subscriptions['onUndoRemovePackage'] = EventBus.subscribe(
//       'onUndoRemovePackage',
//       flowResult((...args: Parameters<typeof basketStore.onUndoRemovePackage>) => basketStore.onUndoRemovePackage(...args)),
//     )
//     subscriptions['onRemoveAddOn'] = EventBus.subscribe(
//       'onRemoveAddOn',
//       flowResult((...args: Parameters<typeof basketStore.onRemoveAddOn>) => basketStore.onRemoveAddOn(...args)),
//     )
//     subscriptions['onUndoRemoveAddOn'] = EventBus.subscribe(
//       'onUndoRemoveAddOn',
//       flowResult((...args: Parameters<typeof basketStore.onUndoRemoveAddOn>) => basketStore.onUndoRemoveAddOn(...args)),
//     )
//     subscriptions['onRemovePackageTradeIn'] = EventBus.subscribe(
//       'onRemovePackageTradeIn',
//       flowResult((...args: Parameters<typeof basketStore.onRemovePackageTradeIn>) => basketStore.onRemovePackageTradeIn(...args)),
//     )
//     subscriptions['onUndoRemovePackageTradeIn'] = EventBus.subscribe(
//       'onUndoRemovePackageTradeIn',
//       flowResult((...args: Parameters<typeof basketStore.onUndoRemovePackageTradeIn>) => basketStore.onUndoRemovePackageTradeIn(...args)),
//     )
//     subscriptions['updateStatus'] = EventBus.subscribe(
//       'updateStatus',
//       flowResult((...args: Parameters<typeof basketStore.updateStatus>) => basketStore.updateStatus(...args)),
//     )

//     return () => {
//       Object.keys(subscriptions).forEach(key => {
//         subscriptions[key].unsubscribe()
//       })
//     }
//   }, [])
// }

// export default useEventSubscriptions
