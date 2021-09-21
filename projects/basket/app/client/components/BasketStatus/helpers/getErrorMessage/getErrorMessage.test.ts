import getErrorMessage from './getErrorMessage'

describe('getErrorMessage', () => {
  it.each`
    errorCode
    ${'VALIDATION_ERROR'}
    ${'LOAN_INVALID_DURATION'}
    ${'LOAN_INVALID_UPFRONT_COST'}
    ${'AIRTIME_DEVICE_MISMATCH'}
    ${'LOAN_DECLINE_CHECKOUT_WATCH_HANDSET'}
    ${'LOAN_DECLINE_CHECKOUT_HANDSET_ONLY'}
    ${'LOAN_DECLINE_CHECKOUT_HANDSET_WATCH'}
    ${'LOAN_DECLINE_CHECKOUT_WATCH_ONLY'}
    ${'BSKT_INVALID_INPUT_037'}
    ${'BSKT_INVALID_INPUT_042'}
  `('should return with proper error message', ({ errorCode }) => {
    const mockError = { data: { errorCode, errorMessage: 'test error' } }
    expect(getErrorMessage(mockError)).toBe('test error')
  })

  it.each`
    errorCode
    ${'VALIDATION_ERROR'}
    ${'LOAN_INVALID_DURATION'}
    ${'LOAN_INVALID_UPFRONT_COST'}
    ${'AIRTIME_DEVICE_MISMATCH'}
    ${'LOAN_DECLINE_CHECKOUT_WATCH_HANDSET'}
    ${'LOAN_DECLINE_CHECKOUT_HANDSET_ONLY'}
    ${'LOAN_DECLINE_CHECKOUT_HANDSET_WATCH'}
    ${'LOAN_DECLINE_CHECKOUT_WATCH_ONLY'}
    ${'BSKT_INVALID_INPUT_037'}
    ${'BSKT_INVALID_INPUT_042'}
  `('should return default message if no errorMessage was provided', ({ errorCode }) => {
    const mockError = { data: { errorCode, errorMessage: '' } }
    expect(getErrorMessage(mockError, 'default error message')).toBe('default error message')
  })

  test('should return default error message if no errorCode is provided', () => {
    const mockError = { data: { errorCode: '', errorMessage: '' } }
    expect(getErrorMessage(mockError, 'default error message')).toBe('default error message')
  })

  test('should return error message from validation details if provided', () => {
    const mockError = {
      data: {
        errorCode: 'VALIDATION_ERROR',
        errorMessage: '',
        validationDetails: [{ errorCode: 'MissingHandsetForWatch', errorMessage: 'test error message' }],
      },
    }
    expect(getErrorMessage(mockError, 'default error message')).toBe('test error message')
  })
})
