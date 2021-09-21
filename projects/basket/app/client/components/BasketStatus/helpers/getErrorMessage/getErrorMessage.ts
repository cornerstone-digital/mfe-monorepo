import { BasketStatusError } from '@pages/BasketPage/BasketPage.types'

const getErrorMessage = (error?: BasketStatusError, defaultMessage?: string) => {
  const errorCode = error?.data?.errorCode || ''
  switch (errorCode) {
    case 'VALIDATION_ERROR': {
      const validationDetails = error?.data?.validationDetails || ''
      if (validationDetails && validationDetails[0].errorCode === 'MissingHandsetForWatch') {
        return validationDetails[0].errorMessage || defaultMessage
      }
      return error?.data?.errorMessage || defaultMessage
    }
    case 'LOAN_INVALID_UPFRONT_COST':
    case 'LOAN_INVALID_DURATION':
    case 'AIRTIME_DEVICE_MISMATCH':
    case 'LOAN_DECLINE_CHECKOUT_WATCH_HANDSET':
    case 'LOAN_DECLINE_CHECKOUT_HANDSET_ONLY':
    case 'LOAN_DECLINE_CHECKOUT_HANDSET_WATCH':
    case 'LOAN_DECLINE_CHECKOUT_WATCH_ONLY':
    case 'BSKT_INVALID_INPUT_037':
    case 'BSKT_INVALID_INPUT_042':
      return error?.data?.errorMessage || defaultMessage
    default:
      return defaultMessage
  }
}

export default getErrorMessage
