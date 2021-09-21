import { BASKET_CONSTS, DiscountType } from '@constants'
import { getPackageDiscountDescriptions, getPackageDiscountAmounts } from './helpers'

describe('PackageDiscounts => helpers', () => {
  const packageItem: BasketV2.ModelPackage = {
    bundle: {
      priceDetails: {
        totalMonthlySavingsAmount: {
          uom: '£',
          net: 12.5,
          vat: 2.5,
          gross: 15,
        },
        listOfMerchandisingPromotion: [
          {
            label: 'first discount',
          },
          {
            label: 'second discount',
          },
          {
            label: '',
          },
        ],
      },
    },
    hardwares: [
      {
        productClass: BASKET_CONSTS.PRODUCT_CLASS_ACCESSORY,
        priceDetails: {
          oneOffPrice: {
            gross: '9',
            net: '7.50',
            vat: '1.50',
          },
          merchandisingPromotions: {
            label: 'third discount',
            mpType: DiscountType.ACCESSORY_DISCOUNT,
          },
        },
      },
      {
        productClass: BASKET_CONSTS.PRODUCT_CLASS_HANDSET,
        priceDetails: {
          oneOffPrice: {
            gross: '9',
            net: '7.50',
            vat: '1.50',
          },
        },
      },
    ],
  }

  describe('getPackageDiscountDescriptions()', () => {
    it('should return empty array', () => {
      const packageDetail = {
        bundle: {},
        hardwares: [
          {
            productClass: BASKET_CONSTS.PRODUCT_CLASS_DATA_DEVICE,
            priceDetails: {},
          },
        ],
      }
      expect(getPackageDiscountDescriptions(packageDetail)).toEqual([])
    })
    it('should return descriptions', () => {
      const expected = ['first discount', 'second discount', 'third discount']
      expect(getPackageDiscountDescriptions(packageItem)).toEqual(expected)
    })
  })

  describe('getPackageDiscountAmounts()', () => {
    it('should return net amounts', () => {
      expect(getPackageDiscountAmounts(packageItem, 'net')).toEqual({
        totalMonthlySavingsAmount: 12.5,
        totalUpfrontDiscountAmount: 7.5,
      })
    })

    it('should return gross amounts', () => {
      expect(getPackageDiscountAmounts(packageItem, 'gross')).toEqual({
        totalMonthlySavingsAmount: 15,
        totalUpfrontDiscountAmount: 9,
      })
    })

    it('should return zero amounts', () => {
      const packageDetail: BasketV2.ModelPackage = {
        bundle: {
          priceDetails: {
            totalMonthlySavingsAmount: {},
          },
        },
        hardwares: [
          {
            productClass: BASKET_CONSTS.PRODUCT_CLASS_ACCESSORY,
            priceDetails: {
              merchandisingPromotions: {
                label: 'third discount',
                mpType: DiscountType.ACCESSORY_DISCOUNT,
              },
            },
          },
          {
            productClass: BASKET_CONSTS.PRODUCT_CLASS_DATA_DEVICE,
            priceDetails: {},
          },
        ],
      }
      expect(getPackageDiscountAmounts(packageDetail, 'gross')).toEqual({
        totalMonthlySavingsAmount: 0,
        totalUpfrontDiscountAmount: 0,
      })
    })
  })
})
