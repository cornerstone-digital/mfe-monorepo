import getErrorDetails from './getErrorDetails'

describe('getErrorDetails', () => {
  it.each`
    notification                   | message
    ${'tooManyPackages'}           | ${'Unfortunately after running a credit check, we were unable to let you purchase this many packages at once.'}
    ${'unacceptibleRecurringCost'} | ${'Please select which package(s) to remove from your basket in order to checkout.'}
    ${'couldNotRemoveVoucher'}     | ${'Could not remove voucher.'}
    ${'couldNotEmptyBasket'}       | ${'There was an error emptying your basket.'}
    ${'basketIsInvalid'}           | ${'Please try again or contact customer support.'}
    ${'couldNotAddPackage'}        | ${'Failed to add this package.'}
    ${'couldNotRemovePackage'}     | ${'Failed to remove this package.'}
    ${'couldNotAddExtra'}          | ${'Failed to add this product.'}
    ${'couldNotRemoveExtra'}       | ${'Failed to remove this product.'}
    ${'couldNotUndo'}              | ${'Failed to undo this action.'}
    ${'general'}                   | ${'There was a problem fetching your basket.'}
  `('should return with proper error message', ({ notification, message }) => {
    expect(getErrorDetails(notification).message).toContain(message)
  })

  it.each`
    notification                   | title
    ${'tooManyPackages'}           | ${'You have too many packages in your basket.'}
    ${'unacceptibleRecurringCost'} | ${'You must reduce the monthly cost of your basket.'}
  `('should return with proper error title', ({ notification, title }) => {
    expect(getErrorDetails(notification).title).toContain(title)
  })

  it.each`
    error                                                                               | message
    ${{ status: '400', data: { errorCode: '', errorMessage: 'test message' } }}         | ${'The voucher code you entered is not valid.'}
    ${{ status: '409', data: { errorCode: '', errorMessage: 'test message' } }}         | ${'The voucher code you entered is not compatible with the items in your basket.'}
    ${{ status: '500', data: { errorCode: '', errorMessage: 'test message' } }}         | ${'Something went wrong.'}
    ${{ status: '', data: { errorCode: 'Err_Vou_002', errorMessage: 'test message' } }} | ${'The voucher code you entered is not valid.'}
    ${{ status: '', data: { errorCode: '', errorMessage: 'test message' } }}            | ${'test message'}
  `('should return with proper voucher error message', ({ error, message }) => {
    const notification = 'couldNotAddVoucher'
    const result = `Could not add voucher. ${message} Please try again or contact customer support.`
    expect(getErrorDetails(notification, error).message).toContain(result)
  })
})
