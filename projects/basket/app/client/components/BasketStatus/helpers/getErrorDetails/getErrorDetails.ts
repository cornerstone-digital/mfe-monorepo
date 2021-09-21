import { BasketStatusError } from '@pages/BasketPage/BasketPage.types'
import formatCurrency from '@web-core/helpers/formatCurrency'
import getErrorMessage from '../getErrorMessage'

const default_cta = 'Please try again or contact customer support.'

const getVoucherErrorMessage = (error?: BasketStatusError) => {
  const status = error?.status || ''
  const errorCode = error?.data?.errorCode || ''
  const errorMessage = error?.data?.errorMessage || ''
  const codeMessages: { [key: string]: string } = {
    '400': 'The voucher code you entered is not valid.',
    '409': 'The voucher code you entered is not compatible with the items in your basket.',
    '500': 'Something went wrong.',
  }
  let message = ''
  if (status) {
    message = codeMessages[status]
  } else if (errorCode === 'Err_Vou_002') {
    message = codeMessages['400']
  } else if (errorMessage) {
    message = errorMessage
  }
  return `Could not add voucher. ${message} ${default_cta}`
}

const getErrorDetails = (
  notification?: string,
  error?: BasketStatusError,
  vetOutcome?: BasketV2.VetOutcome,
  packageLength?: number,
): { message?: string; title?: string } => {
  const errorMessage = getErrorMessage(error, default_cta)
  const { availableNumberOfConnections, availableRecurringChargeLimit = '' } = vetOutcome || {}

  switch (notification) {
    case 'tooManyPackages':
      return {
        title: 'You have too many packages in your basket.',
        message: `Unfortunately after running a credit check, we were unable to let you purchase this many packages at once. You cannot have more than ${availableNumberOfConnections}. Please remove ${
          packageLength || 0 - parseInt(String(availableNumberOfConnections), 10)
        } package(s) from your basket.`,
      }
    case 'unacceptibleRecurringCost':
      return {
        title: 'You must reduce the monthly cost of your basket.',
        message: `Unfortunately our credit check has indicated that your limit is £${formatCurrency(
          availableRecurringChargeLimit,
        )}. Please select which package(s) to remove from your basket in order to checkout.`,
      }
    case 'couldNotAddVoucher':
      return {
        message: getVoucherErrorMessage(error),
      }
    case 'couldNotRemoveVoucher':
      return {
        message: `Could not remove voucher. ${errorMessage}`,
      }
    case 'couldNotEmptyBasket':
      return {
        message: `There was an error emptying your basket. ${errorMessage}`,
      }
    case 'basketIsInvalid':
      return {
        message: errorMessage,
      }
    case 'couldNotAddPackage':
      return {
        message: `Failed to add this package. ${errorMessage}`,
      }
    case 'couldNotRemovePackage':
      return {
        message: `Failed to remove this package. ${errorMessage}`,
      }
    case 'couldNotAddExtra':
      return {
        message: `Failed to add this product. ${errorMessage}`,
      }
    case 'couldNotRemoveExtra':
      return {
        message: `Failed to remove this product. ${errorMessage}`,
      }
    case 'couldNotUndo':
      return {
        message: `Failed to undo this action. ${errorMessage}`,
      }
    case 'general':
      return {
        message: `There was a problem fetching your basket. ${errorMessage}`,
      }
    default:
      return {}
  }
}

export default getErrorDetails
