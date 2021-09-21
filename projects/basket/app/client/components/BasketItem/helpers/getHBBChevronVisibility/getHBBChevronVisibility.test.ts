import { BASKET_CONSTS } from '@constants'
import getHBBChevronVisibility from './getHBBChevronVisibility'

jest.mock('@helpers/getABTestFeatureValue', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue(true),
}))

const getMockBasketWithPackages = (packageId: string, bundleClass?: string) => ({
  packages: [
    {
      packageId,
      bundle: {
        bundleClass,
      },
    },
  ],
})

describe('getHBBChevronVisibility', () => {
  const mockPackageId = '3a1ea657-3ee8-4375-84c8-929f5f14588c'
  describe('should return false', () => {
    test('if basket is empty object', () => {
      const mockBasket = {}
      expect(getHBBChevronVisibility(mockBasket, mockPackageId)).toBe(false)
    })

    test('if no packages provided', () => {
      const mockBasket = { packages: [] }
      expect(getHBBChevronVisibility(mockBasket, mockPackageId)).toBe(false)
    })

    test('if packageId does not match', () => {
      const mockBasket = getMockBasketWithPackages('7f1880c1-363b-4834-b6dc-03267caef97b')
      expect(getHBBChevronVisibility(mockBasket, mockPackageId)).toBe(false)
    })

    test('if package is not the preferred plan type', () => {
      const mockBasket = getMockBasketWithPackages(mockPackageId)
      expect(getHBBChevronVisibility(mockBasket, mockPackageId)).toBe(false)
    })
  })

  describe('should return true', () => {
    it.each`
      packageType      | planType
      ${'broadband'}   | ${BASKET_CONSTS.PLAN_TYPE_BROADBAND_FTTH}
      ${'broadband'}   | ${BASKET_CONSTS.PLAN_TYPE_BROADBAND_FTTC}
      ${'broadband'}   | ${BASKET_CONSTS.PLAN_TYPE_BROADBAND_FTTP}
      ${'simo'}        | ${BASKET_CONSTS.BUNDLE_CLASS_DATA_SIMO}
      ${'data_device'} | ${BASKET_CONSTS.BUNDLE_CLASS_DATA_DEVICE}
    `('if package is $packageType', ({ planType }) => {
      const mockBasket = getMockBasketWithPackages(mockPackageId, planType)
      expect(getHBBChevronVisibility(mockBasket, mockPackageId)).toBe(true)
    })
  })
})
