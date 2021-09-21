import { BASKET_CONSTS } from '@constants'
import getHardwareContractTitle from './getHardwareContractTitle'

describe('getHardwareContractTitle()', () => {
  it('should return undefined for empty contract duration', () => {
    const hardware: BasketV2.Hardware = {
      priceDetails: {
        devicePaymentPlan: {
          duration: {},
        },
      },
    }
    expect(getHardwareContractTitle(hardware, '')).toBeUndefined()
  })

  describe('when package has handset and watch', () => {
    it('should return undefined', () => {
      expect(getHardwareContractTitle({}, '12', true)).toBeUndefined()
    })
  })

  describe('when package has no paired watch ', () => {
    it('should return undefined', () => {
      expect(getHardwareContractTitle({}, '', false)).toBeUndefined()
    })
  })

  it('should return correctly for watch plan', () => {
    const hardware: BasketV2.Hardware = {
      productClass: BASKET_CONSTS.PRODUCT_CLASS_EHANDSET,
      productSubClass: BASKET_CONSTS.PRODUCT_SUB_CLASS_WATCH,
    }
    expect(getHardwareContractTitle(hardware, '10')).toEqual('10-month Watch Plan')
  })

  it('should return undefined for non bingo package', () => {
    const hardware: BasketV2.Hardware = {
      priceDetails: {},
    }
    expect(getHardwareContractTitle(hardware, '12')).toBeUndefined()
  })

  it('should return undefined for non handset package', () => {
    const hardware: BasketV2.Hardware = {
      productClass: BASKET_CONSTS.PLAN_TYPE_DATA_SIMO,
      priceDetails: {
        devicePaymentPlan: {
          duration: { value: '10' },
        },
      },
    }
    expect(getHardwareContractTitle(hardware, '12')).toBeUndefined()
  })

  it('should work correctly for handset package', () => {
    const hardware: BasketV2.Hardware = {
      productClass: BASKET_CONSTS.PRODUCT_CLASS_HANDSET,
      priceDetails: {
        devicePaymentPlan: {
          duration: { value: '10' },
        },
      },
    }
    expect(getHardwareContractTitle(hardware, '12')).toEqual('12-month Phone Plan')
  })

  it('should return Plan for small business packages', () => {
    const hardware: BasketV2.Hardware = {
      productClass: BASKET_CONSTS.PRODUCT_CLASS_HANDSET,
      priceDetails: {
        devicePaymentPlan: {
          duration: { value: '10' },
        },
      },
    }
    expect(getHardwareContractTitle(hardware, '12', false, true)).toEqual('12-month Plan')
  })
})
