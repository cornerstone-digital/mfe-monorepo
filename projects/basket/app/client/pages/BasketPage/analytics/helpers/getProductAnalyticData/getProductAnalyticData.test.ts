import simoMockJson from '@basketMocks/basketWithSimo.mock.json'
import planBenefitsJson from '@basketMocks/basketWithBingoPlanBenefits.mock.json'
import tradeinMockJson from '@basketMocks/basketWithTradeIn.mock.json'
import TransformUtils from '@shared/helpers/transformUtils/transformUtils'

import getProductAnalyticData from './getProductAnalyticData'

const simoMock = TransformUtils.removeNulls(simoMockJson)
const bingoMock = TransformUtils.removeNulls(planBenefitsJson)
const tradeinMock = TransformUtils.removeNulls(tradeinMockJson)

describe('getProductAnalytic data', () => {
  it('returns simo product analytic data', () => {
    const data = getProductAnalyticData(simoMock)
    expect(data).toMatchSnapshot()
  })

  it('returns bingo product analytic data', () => {
    const data = getProductAnalyticData(bingoMock)
    expect(data).toMatchSnapshot()
  })

  it('returns analytic data with tradein', () => {
    const data = getProductAnalyticData(tradeinMock) as any
    expect(data.tradeInAmount).toEqual([251.99, 10.41])
    expect(data.tradeInDevice).toEqual(['Apple iPhone XS 64GB', 'Apple iPhone XS 64GB'])
    expect(data.tradeInDuration).toEqual([1, 24])
    expect(data.tradeInType).toEqual(['bacs', 'monthly credit'])
    expect(data.quoteId).toEqual(['1111111111', '222222222'])
  })
})
