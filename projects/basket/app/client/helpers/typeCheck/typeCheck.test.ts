import {
  hasAccessoryAddon,
  hasBingo,
  hasBroadband,
  hasDataDevice,
  hasHandset,
  hasWatch,
  isAccessory,
  isActiveSubscription,
  isBingo,
  isBroadband,
  isBusiness,
  isEHandset,
  isPayg,
  isPaym,
  hasPayg,
  hasPaym,
  hasDataSimo,
  hasSimo,
  hasMobileBroadband,
  isSimCard,
  isSimTypeEsim,
  isSimTypeHybrid,
  isSimTypePhysical,
  isSimo,
  isUpgradeJourney,
  isWatchSimo,
  hasAccessoryDiscount,
  hasBasketAnyDiscount,
  isDataDevice,
  isDataSimo,
  isFixedLineService,
  isInsuranceService,
  isBasicSimo,
  isBonusData,
  isSuperWifi,
  isAccessoryPackage,
  isRedHybridPackage,
  isRedHybridServiceProduct,
  hasSimTypePhysical,
} from './typeCheck'
import transformUtils from '@shared/helpers/transformUtils/transformUtils'
import { BASKET_CONSTS, DiscountType } from '@constants'

import basketHardwareEHandset from './mocks/basketHardwareEHandsetPhone.mock.json'
import basketHardwareHandset from './mocks/basketHardwareHandsetPhone.mock.json'
import basketHardwareWatch from './mocks/basketHardwareWatch.mock.json'

describe('hasHandset', () => {
  it('should return true when device has productClass eHandset and productSubClass is handset', () => {
    const hardwares: BasketV2.Hardware[] = transformUtils.removeNulls(basketHardwareEHandset)
    expect(hasHandset(hardwares)).toBe(true)
  })

  it('should return true when device has productClass handset', () => {
    const hardwares: BasketV2.Hardware[] = transformUtils.removeNulls(basketHardwareHandset)
    expect(hasHandset(hardwares)).toBe(true)
  })

  it('should return false when device has productClass ehandset and subProductClass watch', () => {
    const hardwares: BasketV2.Hardware[] = transformUtils.removeNulls(basketHardwareWatch)
    expect(hasHandset(hardwares)).toBe(false)
  })
})

describe('isEHandset', () => {
  it('should return true when device has productClass ehandset and productSubClass is handset', () => {
    const hardware: BasketV2.Hardware = {
      productClass: 'ehandset',
      productSubClass: 'handset',
    }
    expect(isEHandset(hardware)).toBe(true)
  })

  it('should return false when device productClass is not ehandset', () => {
    const hardware: BasketV2.Hardware = {
      productClass: 'not-ehandset',
      productSubClass: 'handset',
    }
    expect(isEHandset(hardware)).toBe(false)
  })

  it('should return false when device productSubClass is not handset', () => {
    const hardware: BasketV2.Hardware = {
      productClass: 'ehandset',
      productSubClass: 'not-handset',
    }
    expect(isEHandset(hardware)).toBe(false)
  })
})

describe('isSimCard', () => {
  it('should return true when a hardware productClass is a SIM', () => {
    const hardware: BasketV2.Hardware = {
      productClass: 'Sim card',
    }
    expect(isSimCard(hardware)).toBe(true)
  })
  it('should return false when a hardware productClass is not a SIM', () => {
    const hardware: BasketV2.Hardware = {
      productClass: 'something else',
    }
    expect(isSimCard(hardware)).toBe(false)
  })
})

describe('hasSimTypePhysical()', () => {
  it('should return true', () => {
    const hardwares: BasketV2.Hardware[] = [{ simType: 'PHYSICAL' }]
    expect(hasSimTypePhysical(hardwares)).toBe(true)
  })

  it('should return false', () => {
    const hardwares: BasketV2.Hardware[] = [{ simType: 'HYBRID' }]
    expect(hasSimTypePhysical(hardwares)).toBe(false)
  })
})

describe('hasWatch', () => {
  it('should return true when hardware list constains a watch', () => {
    const hardwares: BasketV2.Hardware[] = [
      {
        productClass: 'ehandset',
        productSubClass: 'watch',
      },
    ]
    expect(hasWatch(hardwares)).toBe(true)
  })

  it('should return false when hardware list productclass is not ehandset', () => {
    const hardwares: BasketV2.Hardware[] = [
      {
        productClass: 'not-ehandset',
        productSubClass: 'watch',
      },
    ]
    expect(hasWatch(hardwares)).toBe(false)
  })

  it('should return false when hardware list productSubClass is not watch', () => {
    const hardwares: BasketV2.Hardware[] = [
      {
        productClass: 'ehandset',
        productSubClass: 'notwatch',
      },
    ]
    expect(hasWatch(hardwares)).toBe(false)
  })
})

describe('isBroadband', () => {
  const { PLAN_TYPE_BROADBAND_FTTH, PLAN_TYPE_BROADBAND_FTTC, PLAN_TYPE_BROADBAND_FTTP } = BASKET_CONSTS

  it.each([PLAN_TYPE_BROADBAND_FTTH, PLAN_TYPE_BROADBAND_FTTC, PLAN_TYPE_BROADBAND_FTTP])(
    'should return true for valid broadband planTypes',
    planType => {
      expect(isBroadband(planType)).toBe(true)
    },
  )

  it('should return false when planType does not includes broadband', () => {
    expect(isBroadband('SIMO')).toBe(false)
  })
})

describe('hasDataDevice', () => {
  it('should return true when productClass is DATA_DEVICE', () => {
    const hardwares: BasketV2.Hardware[] = [
      {
        productClass: 'DATA_DEVICE',
      },
    ]
    expect(hasDataDevice(hardwares)).toBe(true)
  })

  it('should return false when productClass is not DATA_DEVICE', () => {
    const hardwares: BasketV2.Hardware[] = [
      {
        productClass: 'ehandset',
      },
    ]
    expect(hasDataDevice(hardwares)).toBe(false)
    expect(hasDataDevice()).toBe(false)
  })
})

describe('isPaym', () => {
  it('should return false when bundle is undefined', () => {
    expect(isPaym()).toBe(false)
  })

  it('should return false when paymentType is undefined', () => {
    expect(isPaym({})).toBe(false)
  })

  it('should return false when paymentType is not postpaid', () => {
    const bundle: BasketV2.Bundle = {
      paymentType: 'prepaid',
    }
    expect(isPaym(bundle)).toBe(false)
  })

  it('should return true when paymentType is postpaid', () => {
    const bundle: BasketV2.Bundle = {
      paymentType: 'postpaid',
    }
    expect(isPaym(bundle)).toBe(true)
  })
})

describe('isPayg', () => {
  it('should return false when bundle is undefined', () => {
    expect(isPayg()).toBe(false)
  })

  it('should return false when paymentType is undefined', () => {
    expect(isPayg({})).toBe(false)
  })

  it('should return false when paymentType is not prepaid', () => {
    const bundle: BasketV2.Bundle = {
      paymentType: 'postpaid',
    }
    expect(isPayg(bundle)).toBe(false)
  })

  it('should return true when paymentType is prepaid', () => {
    const bundle: BasketV2.Bundle = {
      paymentType: 'prepaid',
    }
    expect(isPayg(bundle)).toBe(true)
  })
})

describe('isAccessory', () => {
  it('should return true when device has productClass accessory', () => {
    const hardware: BasketV2.Hardware = {
      productClass: 'accessories',
    }
    expect(isAccessory(hardware)).toBe(true)
  })

  it('should return false when device productClass is not accessory', () => {
    const hardware: BasketV2.Hardware = {
      productClass: 'ehandset',
    }
    expect(isAccessory(hardware)).toBe(false)
  })
})

describe('isAccessoryPackage', () => {
  it('should return true if the planType is "ACCESSORIES"', () => {
    expect(isAccessoryPackage({ planType: 'handset' })).toBe(false)
    expect(isAccessoryPackage({ planType: 'Accessories' })).toBe(true)
  })
})

describe('isBusiness', () => {
  it('should return true when accountCategory is business', () => {
    expect(isBusiness('Business')).toBe(true)
  })

  it('should return false when accountCategory is not business', () => {
    expect(isBusiness('Consumer')).toBe(false)
  })
})

describe('isSimTypePhysical', () => {
  it('should return true when hardware simType is PHYSICAL', () => {
    const hardware: BasketV2.Hardware = { simType: 'PHYSICAL' }
    expect(isSimTypePhysical(hardware)).toBe(true)
  })

  it('should return false when hardware simType is not PHYSICAL', () => {
    const hardware: BasketV2.Hardware = { simType: 'HYBRID' }
    expect(isSimTypePhysical(hardware)).toBe(false)
  })
})

describe('isSimTypeEsim', () => {
  it('should return true when hardware simType is PHYSICAL', () => {
    const hardware: BasketV2.Hardware = { simType: 'ESIMONLY' }
    expect(isSimTypeEsim(hardware)).toBe(true)
  })

  it('should return false when hardware simType is not PHYSICAL', () => {
    const hardware: BasketV2.Hardware = { simType: 'HYBRID' }
    expect(isSimTypeEsim(hardware)).toBe(false)
  })
})

describe('isSimTypeHybrid', () => {
  it('should return true when hardware simType is PHYSICAL', () => {
    const hardware: BasketV2.Hardware = { simType: 'HYBRID' }
    expect(isSimTypeHybrid(hardware)).toBe(true)
  })

  it('should return false when hardware simType is not PHYSICAL', () => {
    const hardware: BasketV2.Hardware = { simType: 'PHYSICAL' }
    expect(isSimTypeHybrid(hardware)).toBe(false)
  })
})

describe('isSimo', () => {
  it('should return true when bundleClass is SIMO ', () => {
    const bundle: BasketV2.ModelPackage['bundle'] = { bundleClass: 'SIMO' }
    expect(isSimo(bundle)).toBe(true)
  })

  it('should return false when bundleClass is not SIMO', () => {
    const bundle: BasketV2.ModelPackage['bundle'] = { bundleClass: 'HANDSET' }
    expect(isSimo(bundle)).toBe(false)
  })
})

describe('isBasicSimo', () => {
  it('should return false when bundleClass is not SIMO', () => {
    const bundle: BasketV2.ModelPackage['bundle'] = { bundleClass: 'HANDSET', bundleType: 'BASICS PLAN' }
    expect(isBasicSimo(bundle)).toBe(false)
  })

  it('should return true when SIMO bundleType is BASICS PLAN', () => {
    const bundle: BasketV2.ModelPackage['bundle'] = { bundleClass: 'SIMO', bundleType: 'BASICS PLAN' }
    expect(isBasicSimo(bundle)).toBe(true)
  })

  it('should return false when SIMO bundleType is not BASICS PLAN', () => {
    const bundle: BasketV2.ModelPackage['bundle'] = { bundleClass: 'SIMO', bundleType: 'NOT BASICS PLAN' }
    expect(isBasicSimo(bundle)).toBe(false)
  })
})

describe('isWatchSimo', () => {
  it('should return true when bundleClass is WATCH_SIMO', () => {
    const bundle: BasketV2.ModelPackage['bundle'] = { bundleClass: 'WATCH_SIMO' }
    expect(isWatchSimo(bundle)).toBe(true)
  })

  it('should return false when bundleClass is not WATCH_SIMO', () => {
    const bundle: BasketV2.ModelPackage['bundle'] = { bundleClass: 'HANDSET' }
    expect(isWatchSimo(bundle)).toBe(false)
  })
})

describe('isUpgradeJourney', () => {
  it('should return true when journeyType is upgrade', () => {
    expect(isUpgradeJourney('Upgrade')).toBe(true)
  })

  it('should return false when journeyType is not upgrade', () => {
    expect(isUpgradeJourney('Acquisition')).toBe(false)
  })
})

describe('isRedHybridPackage()', () => {
  it('shoul return true', () => {
    const packageItem: BasketV2.ModelPackage = {
      planType: 'RED_HYBRID_ONLINE',
      bundle: {
        bundleClass: 'simo',
      },
    }
    expect(isRedHybridPackage(packageItem)).toBe(true)
  })
})

describe('hasAccessoryAddon', () => {
  it('should return true when has any accessory', () => {
    const hardwares: BasketV2.Hardware[] = [{ productClass: 'accessories' }]
    expect(hasAccessoryAddon(hardwares)).toBe(true)
  })

  it('should return false when does not have any accessory', () => {
    const hardwares: BasketV2.Hardware[] = [{ productClass: 'ehandset' }]
    expect(hasAccessoryAddon(hardwares)).toBe(false)
  })
})

describe('isBingo', () => {
  it('should return true when package planType is bingo', () => {
    const pkg: BasketV2.ModelPackage = { planType: 'bingo' }
    expect(isBingo(pkg)).toBe(true)
  })

  it('should return false when package planType is not bingo', () => {
    const pkg: BasketV2.ModelPackage = { planType: 'ehandset' }
    expect(isBingo(pkg)).toBe(false)
  })
})

describe('isDataDevice', () => {
  it('should return true when bundleClass is DATA_DEVICE', () => {
    const bundle: BasketV2.ModelPackage['bundle'] = { bundleClass: 'DATA_DEVICE' }
    expect(isDataDevice(bundle)).toBe(true)
  })

  it('should return false when bundleClass is not DATA_DEVICE', () => {
    const bundle: BasketV2.ModelPackage['bundle'] = { bundleClass: 'HANDSET' }
    expect(isDataDevice(bundle)).toBe(false)
  })
})

describe('isDataSimo', () => {
  it('should return true when bundleClass is DATA_SIMO', () => {
    const bundle: BasketV2.ModelPackage['bundle'] = { bundleClass: 'DATA_SIMO' }
    expect(isDataSimo(bundle)).toBe(true)
  })

  it('should return false when bundleClass is not DATA_SIMO', () => {
    const bundle: BasketV2.ModelPackage['bundle'] = { bundleClass: 'HANDSET' }
    expect(isDataSimo(bundle)).toBe(false)
  })
})

describe('isFixedLineService', () => {
  it('should return true when productClass is Fixed Line', () => {
    const service: BasketV2.Service = { productClass: 'Fixed Line' }
    expect(isFixedLineService(service)).toBe(true)
  })

  it('should return false when productClass is not Fixed Line', () => {
    const service: BasketV2.Service = { productClass: 'International Call Add On' }
    expect(isFixedLineService(service)).toBe(false)
  })
})

describe('isBonusData', () => {
  it('should return true when productClass is Bonus Data Bundle', () => {
    const service: BasketV2.Service = { productClass: 'Bonus Data Bundle' }
    expect(isBonusData(service)).toBe(true)
  })

  it('should return false when productClass is not Bonus Data Bundle', () => {
    const service: BasketV2.Service = { productClass: 'International Call Add On' }
    expect(isBonusData(service)).toBe(false)
  })
})

describe('isSuperWifi', () => {
  it('should return true when productClass is Super Wi-Fi', () => {
    const service: BasketV2.Service = { productClass: 'Super Wi-Fi' }
    expect(isSuperWifi(service)).toBe(true)
  })

  it('should return false when productClass is not Super Wi-Fi', () => {
    const service: BasketV2.Service = { productClass: 'International Call Add On' }
    expect(isSuperWifi(service)).toBe(false)
  })
})

describe('isInsuranceService', () => {
  it('should return true when productClass is Insurance', () => {
    const service: BasketV2.Service = { productClass: 'Insurance' }
    expect(isInsuranceService(service)).toBe(true)
  })

  it('should return false when productClass is not Insurance', () => {
    const service: BasketV2.Service = { productClass: 'International Call Add On' }
    expect(isInsuranceService(service)).toBe(false)
  })
})

describe('isRedHybridServiceProduct()', () => {
  it('should return true', () => {
    const service: BasketV2.Service = { productClass: 'Hybrid Bundles' }
    expect(isRedHybridServiceProduct(service)).toBe(true)
  })
})

describe('hasBingo', () => {
  it('should return true when package has package with planType bingo', () => {
    const hardwares: BasketV2.Basket['packages'] = [{ planType: 'bingo' }]
    expect(hasBingo(hardwares)).toBe(true)
  })

  it('should return false when when package does not have package with planType bingo', () => {
    const hardwares: BasketV2.Basket['packages'] = [{ planType: 'ehandset' }]
    expect(hasBingo(hardwares)).toBe(false)
  })
})

describe('hasPaym', () => {
  it('should return false when there is no packages', () => {
    expect(hasPaym([])).toBe(false)
  })

  it('should return true when it has package with postpaid payment type', () => {
    const packages: BasketV2.Basket['packages'] = [
      {
        bundle: {
          paymentType: BASKET_CONSTS.PAYMENT_POSTPAID,
        },
      },
    ]
    expect(hasPaym(packages)).toBe(true)
  })

  it('should return true when it has no package with postpaid payment type', () => {
    const packages: BasketV2.Basket['packages'] = [
      {
        bundle: {
          paymentType: 'test',
        },
      },
    ]
    expect(hasPaym(packages)).toBe(false)
  })
})

describe('hasPayg', () => {
  it('should return false when there is no packages', () => {
    expect(hasPayg([])).toBe(false)
  })

  it('should return true when it has package with prepaid payment type', () => {
    const packages: BasketV2.Basket['packages'] = [
      {
        bundle: {
          paymentType: BASKET_CONSTS.BUNDLE_PAYMENT_TYPE_PRE,
        },
      },
    ]
    expect(hasPayg(packages)).toBe(true)
  })

  it('should return false when it has no package with postpaid payment type', () => {
    const packages: BasketV2.Basket['packages'] = [
      {
        bundle: {
          paymentType: 'test',
        },
      },
    ]
    expect(hasPayg(packages)).toBe(false)
  })
})

describe('hasBroadband', () => {
  const { PLAN_TYPE_BROADBAND_FTTH, PLAN_TYPE_BROADBAND_FTTC, PLAN_TYPE_BROADBAND_FTTP } = BASKET_CONSTS

  it.each([PLAN_TYPE_BROADBAND_FTTH, PLAN_TYPE_BROADBAND_FTTC, PLAN_TYPE_BROADBAND_FTTP])(
    'should return true when planType includes valid broadband',
    planType => {
      const packages: BasketV2.Basket['packages'] = [{ planType }]
      expect(hasBroadband(packages)).toBe(true)
    },
  )

  it('should return false when planType does not include broadband', () => {
    const packages: BasketV2.Basket['packages'] = [{ planType: 'SIMO' }, { planType: 'HANDSET' }]
    expect(hasBroadband(packages)).toBe(false)
  })
})

describe('isActiveSubscription', () => {
  it.each([
    [true, true],
    [false, false],
  ])('should return %s when isActiveSubscription is %s', (value, expected) => {
    const activeBundle: BasketV2.ActiveBundle = {
      isActiveSubscription: value,
    }
    expect(isActiveSubscription(activeBundle)).toBe(expected)
  })
})

describe('hasAccessoryDiscount', () => {
  it('should return false when hardware is not an accessory', () => {
    const hardware: BasketV2.Hardware = {
      productClass: BASKET_CONSTS.PRODUCT_CLASS_DATA_DEVICE,
    }
    expect(hasAccessoryDiscount(hardware)).toBe(false)
  })

  it('should return false when an accessory does not include discount', () => {
    const hardware: BasketV2.Hardware = {
      productClass: BASKET_CONSTS.PRODUCT_CLASS_DATA_DEVICE,
      priceDetails: {
        merchandisingPromotions: undefined,
      },
    }
    expect(hasAccessoryDiscount(hardware)).toBe(false)
  })

  it('should return true when an accessory includes discount', () => {
    const hardware: BasketV2.Hardware = {
      productClass: BASKET_CONSTS.PRODUCT_CLASS_ACCESSORY,
      priceDetails: {
        merchandisingPromotions: {
          mpType: DiscountType.ACCESSORY_DISCOUNT,
          label: 'special discount',
        },
      },
    }
    expect(hasAccessoryDiscount(hardware)).toBe(true)
  })
})

describe('hasBasketAnyDiscount', () => {
  it('should return true when bundle includes discount', () => {
    const packages: BasketV2.Basket['packages'] = [
      {
        bundle: {
          priceDetails: {
            listOfMerchandisingPromotion: [{ label: '50% One Number', description: '50% One Number - Airtime Plan' }],
          },
        },
      },
    ]
    expect(hasBasketAnyDiscount(packages)).toBe(true)
  })

  it('should return true when an accessory includes discount', () => {
    const packages: BasketV2.Basket['packages'] = [
      {
        bundle: {
          priceDetails: {},
        },
        hardwares: [
          {
            productClass: BASKET_CONSTS.PRODUCT_CLASS_ACCESSORY,
            priceDetails: {
              merchandisingPromotions: {
                mpType: DiscountType.ACCESSORY_DISCOUNT,
                label: 'special discount',
              },
            },
          },
        ],
      },
    ]
    expect(hasBasketAnyDiscount(packages)).toBe(true)
  })
})

describe('hasDataSimo', () => {
  it('should return true when bundle class constains a data sim only plan', () => {
    const packages: BasketV2.Basket['packages'] = [
      {
        bundle: {
          bundleClass: 'DATA_SIMO',
        },
      },
    ]
    expect(hasDataSimo(packages)).toBe(true)
  })

  it('should return false when bundle class is not data simo', () => {
    const packages: BasketV2.Basket['packages'] = [
      {
        bundle: {
          bundleClass: 'SIMO',
        },
      },
    ]
    expect(hasDataSimo(packages)).toBe(false)
  })
})

describe('hasSimo', () => {
  it('should return true when bundle class constains a sim only plan', () => {
    const packages: BasketV2.Basket['packages'] = [
      {
        bundle: {
          bundleClass: 'SIMO',
        },
      },
    ]
    expect(hasSimo(packages)).toBe(true)
  })

  it('should return false when bundle class is not data simo', () => {
    const packages: BasketV2.Basket['packages'] = [
      {
        bundle: {
          bundleClass: 'DATA_SIMO',
        },
      },
    ]
    expect(hasSimo(packages)).toBe(false)
  })
})

describe('hasMobileBroadband', () => {
  it('should return true when hardware contains data device product class', () => {
    const packages: BasketV2.ModelPackage[] = [
      {
        hardwares: [
          {
            productClass: 'DATA_DEVICE',
          },
        ],
      },
    ]
    expect(hasMobileBroadband(packages)).toBe(true)
  })

  it('should return false when hardware does not contain data device product class', () => {
    const packages: BasketV2.ModelPackage[] = [
      {
        hardwares: [
          {
            productClass: '',
          },
        ],
      },
    ]
    expect(hasMobileBroadband(packages)).toBe(false)
  })
})
