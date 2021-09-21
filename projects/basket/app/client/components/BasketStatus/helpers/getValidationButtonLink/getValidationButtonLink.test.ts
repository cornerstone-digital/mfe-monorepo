import getValidationButtonLink from './getValidationButtonLink'

describe('getValidationButtonLink', () => {
  it.each`
    input                                                                      | output
    ${[{ errorCode: 'MissingHandsetForWatch', errorMessage: 'test Apple' }]}   | ${'/mobile/phones/pay-monthly-contracts/apple'}
    ${[{ errorCode: 'MissingHandsetForWatch', errorMessage: 'test Samsung' }]} | ${'/mobile/phones/pay-monthly-contracts/samsung'}
    ${[{ errorCode: 'MissingHandsetForWatch', errorMessage: 'test apple' }]}   | ${'/mobile/phones/pay-monthly-contracts/apple'}
    ${[{ errorCode: 'MissingHandsetForWatch', errorMessage: 'test samsung' }]} | ${'/mobile/phones/pay-monthly-contracts/samsung'}
    ${[{ errorCode: '', errorMessage: 'test handset' }]}                       | ${''}
    ${[]}                                                                      | ${''}
    ${undefined}                                                               | ${''}
  `('should return with proper link', ({ input, output }) => {
    expect(getValidationButtonLink(input)).toBe(output)
  })
})
