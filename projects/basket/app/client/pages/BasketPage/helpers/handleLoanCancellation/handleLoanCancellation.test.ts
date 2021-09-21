import handleLoanCancellation from './handleLoanCancellation'
import mockPageContent from '@shared/config/content/BasketPageContent.json'

describe('handleLoanCancellation', () => {
  test('should not throw error if sessionStorage has no loanCancellationInfo item', () => {
    jest.spyOn(window.sessionStorage.__proto__, 'getItem')
    expect(handleLoanCancellation).not.toThrow()
    expect(window.sessionStorage.getItem).toBeCalled()
  })

  test('should throw error if sessionStorage has loanCancellationInfo item', () => {
    jest.spyOn(window.sessionStorage.__proto__, 'getItem').mockImplementationOnce(() => `{"numberOfLoans":1,"loanDeclinedType":"phone"}`)
    expect(handleLoanCancellation).toThrow()
  })

  test('should throw error if sessionStorage has invalid loanCancellationInfo item', () => {
    jest.spyOn(window.sessionStorage.__proto__, 'getItem').mockImplementationOnce(() => `invalid item`)
    expect(handleLoanCancellation).toThrow()
  })

  it.each`
    numberOfLoans | loanDeclinedType | output
    ${'2'}        | ${'phone'}       | ${'LOAN_DECLINE_CHECKOUT_HANDSET_WATCH'}
    ${'1'}        | ${'phone'}       | ${'LOAN_DECLINE_CHECKOUT_HANDSET_ONLY'}
    ${'2'}        | ${'watch'}       | ${'LOAN_DECLINE_CHECKOUT_WATCH_HANDSET'}
    ${'1'}        | ${'watch'}       | ${'LOAN_DECLINE_CHECKOUT_WATCH_ONLY'}
  `(
    'should return $output if numberOfLoans if $numberOfLoans and loanDeclinedType is $loanDeclinedType',
    ({ numberOfLoans, loanDeclinedType, output }) => {
      jest
        .spyOn(window.sessionStorage.__proto__, 'getItem')
        .mockImplementationOnce(() => `{"numberOfLoans":"${numberOfLoans}","loanDeclinedType":"${loanDeclinedType}"}`)
      let thrownError
      try {
        handleLoanCancellation(mockPageContent[0].basket.vf_Modules.notifications.content as BasketPageContent.HbbPortfolioRefreshContent)
      } catch (error) {
        thrownError = error
      }
      expect(thrownError).toEqual({ data: { errorCode: output } })
    },
  )
})
