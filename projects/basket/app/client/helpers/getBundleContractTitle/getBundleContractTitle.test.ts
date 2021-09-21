import { BASKET_CONSTS } from '@constants'
import getBundleContractTitle from './getBundleContractTitle'

describe('getBundleContractTitle()', () => {
  it('should return undefined for payg', () => {
    const bundle = { paymentType: 'Prepaid', commitmentPeriod: { value: '10' } }

    expect(getBundleContractTitle('', bundle)).toBeUndefined()
  })

  it('should work correctly for broadband plan', () => {
    const bundle = { commitmentPeriod: { value: '10', uom: 'Months' } }
    const expected = '10-month Broadband Plan'

    expect(getBundleContractTitle(BASKET_CONSTS.PLAN_TYPE_BROADBAND_FTTC, bundle)).toEqual(expected)
    expect(getBundleContractTitle(BASKET_CONSTS.PLAN_TYPE_BROADBAND_FTTH, bundle)).toEqual(expected)
    expect(getBundleContractTitle(BASKET_CONSTS.PLAN_TYPE_BROADBAND_FTTP, bundle)).toEqual(expected)
  })

  it('should return Airtime plan for handset', () => {
    const bundle = {
      commitmentPeriod: { value: '24', uom: 'Months' },
    }

    expect(getBundleContractTitle(BASKET_CONSTS.PLAN_TYPE_HANDSET, bundle, false)).toEqual('24-month Airtime Plan')
  })

  it('should work correctly for device plan', () => {
    const bundle = {
      bundleClass: BASKET_CONSTS.BUNDLE_CLASS_DATA_DEVICE,
      commitmentPeriod: { value: '12', uom: 'Months' },
    }

    expect(getBundleContractTitle('', bundle, false)).toEqual('12-month Device Plan')
  })

  it('should return Connectivity plan for Watch', () => {
    const bundle = {
      commitmentPeriod: { value: '24', uom: 'Months' },
    }

    expect(getBundleContractTitle(BASKET_CONSTS.PLAN_TYPE_HANDSET, bundle, true)).toEqual('24-month Connectivity Plan')
  })

  it('should work correctly for data plan', () => {
    const bundle = {
      bundleClass: BASKET_CONSTS.BUNDLE_CLASS_DATA_SIMO,
      commitmentPeriod: { value: '10', uom: 'Months' },
    }

    expect(getBundleContractTitle('', bundle, true)).toEqual('10-month Data Plan')
  })

  it('should work correctly for watch simo plan', () => {
    const bundle = {
      bundleClass: BASKET_CONSTS.BUNDLE_CLASS_WATCH_SIMO,
      commitmentPeriod: { value: '1', uom: 'Months' },
    }

    expect(getBundleContractTitle(BASKET_CONSTS.PLAN_TYPE_WATCH_SIMO, bundle, true)).toEqual('30-day Connectivity Plan')
  })

  it('should return Plan for small business plans', () => {
    const bundle = {
      commitmentPeriod: { value: '24', uom: 'Months' },
    }

    expect(getBundleContractTitle(BASKET_CONSTS.PLAN_TYPE_HANDSET, bundle, false, true)).toEqual('24-month Plan')
  })
})
