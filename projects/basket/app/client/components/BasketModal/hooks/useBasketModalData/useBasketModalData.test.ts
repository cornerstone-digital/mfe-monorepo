import useBasketModalData from './useBasketModalData'

const handlers = {
  handleEmptyBasket: jest.fn().mockReturnValue('handleEmptyBasket'),
  onVoucherConfirm: jest.fn().mockReturnValue('onVoucherConfirm'),
  confirmRemovePackage: jest.fn().mockReturnValue('confirmRemovePackage'),
}

function mockStore(): any {
  return {
    basketStore: {
      handleEmptyBasket: handlers.handleEmptyBasket,
      onVoucherConfirm: handlers.onVoucherConfirm,
      confirmRemovePackage: handlers.confirmRemovePackage,
    },
  }
}

jest.mock('@store', () => ({
  useStore: jest.fn().mockImplementation(mockStore),
}))

describe('useBasketModalData', () => {
  it.each`
    modalName          | headingText               | text                                                                  | buttonText           | handler
    ${'removePackage'} | ${'Delete package'}       | ${"Are you sure you'd like to delete this package from your basket?"} | ${'Delete package'}  | ${'handleEmptyBasket'}
    ${'emptyBasket'}   | ${'Are you sure?'}        | ${"You're about to remove everything in your basket."}                | ${'Empty basket'}    | ${'handleEmptyBasket'}
    ${'switchVoucher'} | ${'Add voucher'}          | ${'Are you sure you want to replace the promotional voucher?'}        | ${'Replace voucher'} | ${'onVoucherConfirm'}
    ${'removeCombi'}   | ${'Removing this bundle'} | ${"Are you sure you'd like to remove this bundle from your basket?"}  | ${'Remove bundle'}   | ${'confirmRemovePackage'}
  `(
    'should return with proper object values if retrieving data for $modalName',
    ({ modalName, headingText, text, buttonText, handler }) => {
      const data = useBasketModalData(modalName)
      expect(data.headingText).toBe(headingText)
      expect(data.text).toContain(text)
      expect(data.secondaryButton).toHaveProperty('text', buttonText)

      const retValue = data.secondaryButton.onClick && data.secondaryButton.onClick({} as any)
      expect(retValue).toBe(handler)
    },
  )
})
