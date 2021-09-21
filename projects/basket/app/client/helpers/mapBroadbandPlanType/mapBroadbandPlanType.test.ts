import mapBroadbandPlanType from './mapBroadbandPlanType'

const consumerFTTC = [
  {
    accountCategory: 'CONSUMER',
    planType: 'BroadBand:FTTC',
  },
  {
    accountCategory: 'CONSUMER',
    planType: 'BroadBand:FTTH',
  },
  {
    accountCategory: 'BUSINESS',
    planType: 'BroadBand:FTTC',
  },
]

describe('mapBroadbandPlanType', () => {
  test('given a test package, it should return the mapped plantype of superfast', () => {
    const result = mapBroadbandPlanType(consumerFTTC)
    expect(result).toEqual(['superfast', 'gigafast', 'business'])
  })

  test('should return with consumer if accountCategory or planType is unknown', () => {
    const mockData = [{ accountCategory: 'CONSUMER' }, { planType: 'BroadBand:FTTH' }, {}]
    const result = mapBroadbandPlanType(mockData)
    expect(result).toEqual(['consumer', 'consumer', 'consumer'])
  })
})
