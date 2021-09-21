import isDeliveryAvailable from './isDeliveryAvailable'
import { BASKET_CONSTS } from '@constants'

jest.mock('@helpers/getABTestFeatureValue', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue(true),
}))

describe('isDeliveryAvailable', () => {
  it.each`
    planType                                  | bundleClass                             | paymentType                              | productClass                               | expectedOutput
    ${''}                                     | ${''}                                   | ${BASKET_CONSTS.BUNDLE_PAYMENT_TYPE_PRE} | ${BASKET_CONSTS.PRODUCT_CLASS_DATA_DEVICE} | ${true}
    ${''}                                     | ${''}                                   | ${BASKET_CONSTS.PAYMENT_POSTPAID}        | ${BASKET_CONSTS.PRODUCT_CLASS_DATA_DEVICE} | ${true}
    ${''}                                     | ${''}                                   | ${BASKET_CONSTS.PAYMENT_POSTPAID}        | ${''}                                      | ${true}
    ${''}                                     | ${''}                                   | ${BASKET_CONSTS.BUNDLE_PAYMENT_TYPE_PRE} | ${''}                                      | ${true}
    ${''}                                     | ${''}                                   | ${''}                                    | ${''}                                      | ${false}
    ${BASKET_CONSTS.PLAN_TYPE_BROADBAND_FTTH} | ${''}                                   | ${''}                                    | ${BASKET_CONSTS.PRODUCT_CLASS_DATA_DEVICE} | ${false}
    ${BASKET_CONSTS.PLAN_TYPE_BROADBAND_FTTH} | ${BASKET_CONSTS.BUNDLE_CLASS_DATA_SIMO} | ${''}                                    | ${BASKET_CONSTS.PRODUCT_CLASS_DATA_DEVICE} | ${false}
    ${BASKET_CONSTS.PLAN_TYPE_BROADBAND_FTTH} | ${BASKET_CONSTS.BUNDLE_CLASS_DATA_SIMO} | ${BASKET_CONSTS.PAYMENT_POSTPAID}        | ${BASKET_CONSTS.PRODUCT_CLASS_DATA_DEVICE} | ${false}
    ${''}                                     | ${BASKET_CONSTS.BUNDLE_CLASS_DATA_SIMO} | ${BASKET_CONSTS.PAYMENT_POSTPAID}        | ${BASKET_CONSTS.PRODUCT_CLASS_DATA_DEVICE} | ${false}
    ${''}                                     | ${BASKET_CONSTS.BUNDLE_CLASS_SIMO}      | ${BASKET_CONSTS.PAYMENT_POSTPAID}        | ${BASKET_CONSTS.PRODUCT_CLASS_DATA_DEVICE} | ${false}
  `('should return expected output', ({ planType, bundleClass, paymentType, productClass, expectedOutput }) => {
    const mockPackages: BasketV2.ModelPackage[] = [
      {
        planType,
        bundle: {
          bundleClass,
          paymentType,
        },
        hardwares: [{ productClass }],
      },
    ]
    expect(isDeliveryAvailable(mockPackages)).toBe(expectedOutput)
  })
})
