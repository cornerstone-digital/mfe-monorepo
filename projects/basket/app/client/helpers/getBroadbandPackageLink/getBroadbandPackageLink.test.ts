import getBroadbandPackageLink from './getBroadbandPackageLink'

describe('broadband link', () => {
  it('returns /broadband for consumer category', () => {
    const result = getBroadbandPackageLink(false)
    expect(result).toEqual('/broadband')
  })

  it('returns /business/business-connectivity/broadband-and-phone for business category', () => {
    const result = getBroadbandPackageLink(true)
    expect(result).toEqual('/business/business-connectivity/broadband-and-phone')
  })

  it('returns /broadband/deals/select-plan for consumer category when includeSelectPlan is true', () => {
    const result = getBroadbandPackageLink(false, true)
    expect(result).toEqual('/broadband/deals/select-plan')
  })

  it('returns /business/business-connectivity/select-broadband-plan for business category when includeSelectPlan is true', () => {
    const result = getBroadbandPackageLink(true, true)
    expect(result).toEqual('/business/business-connectivity/select-broadband-plan')
  })
})
