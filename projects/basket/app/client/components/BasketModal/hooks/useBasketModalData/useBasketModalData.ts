import { BasketModalData, BasketModalDataList } from '@components/BasketModal/BasketModal.types'
import { useStore } from '@store'
import { flowResult } from 'mobx'

const useBasketModalData = (modalName: string): BasketModalData => {
  const { basketStore } = useStore()
  const handleEmptyBasket = flowResult((...args: Parameters<typeof basketStore.handleEmptyBasket>) =>
    basketStore.handleEmptyBasket(...args),
  )
  const onVoucherConfirm = flowResult((...args: Parameters<typeof basketStore.onVoucherConfirm>) => basketStore.onVoucherConfirm(...args))
  const confirmRemovePackage = flowResult((...args: Parameters<typeof basketStore.confirmRemovePackage>) =>
    basketStore.confirmRemovePackage(...args),
  )
  const modalData: BasketModalDataList = {
    removePackage: {
      headingText: 'Delete package',
      text: "Are you sure you'd like to delete this package from your basket? This will empty your basket, and can't be undone.",
      secondaryButton: {
        appearance: 'primary',
        text: 'Delete package',
        onClick: handleEmptyBasket,
        htmlAttributes: {
          dataAttributes: {
            'data-selector': 'delete-package-button',
          },
        },
      },
    },
    emptyBasket: {
      headingText: 'Are you sure?',
      text: "You're about to remove everything in your basket. You'll have to shop again if you wish to get these items back.",
      secondaryButton: {
        appearance: 'primary',
        text: 'Empty basket',
        onClick: handleEmptyBasket,
        htmlAttributes: {
          dataAttributes: {
            'data-selector': 'confirm-empty-basket-button',
          },
        },
      },
    },
    switchVoucher: {
      headingText: 'Add voucher',
      text: 'Are you sure you want to replace the promotional voucher?',
      secondaryButton: {
        appearance: 'primary',
        text: 'Replace voucher',
        onClick: onVoucherConfirm,
        htmlAttributes: {
          dataAttributes: {
            'data-selector': 'replace-voucher-button',
          },
        },
      },
    },
    removeCombi: {
      headingText: 'Removing this bundle',
      text: `Are you sure you'd like to remove this bundle from your basket?\nYou won't be able to undo this action.\n\nYou'll miss out on your great discount currently applied to your basket for having Broadband and Pay Monthly together. If there is another package in your basket to keep the discount, we'll automatically apply it for you though.`,
      secondaryButton: {
        appearance: 'primary',
        text: 'Remove bundle',
        onClick: confirmRemovePackage,
        htmlAttributes: {
          dataAttributes: {
            'data-selector': 'remove-combi-confirm-button',
          },
        },
      },
    },
  }

  return modalData[modalName]
}

export default useBasketModalData
