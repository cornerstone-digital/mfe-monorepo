import getFinancialBreakdown from './getFinancialBreakdown'
import mockPaymentPlan from '../../mocks/paymentPlan.mock.json'

describe('getFinancialBreakdown', () => {
  it.each`
    airtimePrice | priceKey
    ${undefined} | ${'net'}
    ${'14.99'}   | ${'net'}
    ${undefined} | ${'gross'}
    ${'14.99'}   | ${'gross'}
  `('should correctly format data with $priceKey prices with $airtimePrice airtime price', ({ airtimePrice, priceKey }) => {
    expect(getFinancialBreakdown(mockPaymentPlan, airtimePrice, priceKey)).toMatchSnapshot()
  })
})
