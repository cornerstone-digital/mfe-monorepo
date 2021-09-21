import getABTestFeatureValue from '@helpers/getABTestFeatureValue'

describe('getABTestFeatureValue', () => {
  it('should return false', () => {
    expect(getABTestFeatureValue('')).toEqual(false)
    expect(getABTestFeatureValue('unknownKey')).toEqual(false)
  })

  it('should return true when window object has the key', () => {
    window.vfukTnt = {
      basket: { planBenefitsAB: true, withoutVat: false },
    }
    expect(getABTestFeatureValue('planBenefitsAB')).toEqual(true)
  })

  it('should return true when cookie is set', () => {
    window.document.cookie = 'planBenefitsAB=true'
    expect(getABTestFeatureValue('planBenefitsAB')).toEqual(true)
  })
})
