import { PackageWithHeaderStatus } from '../../BasketPackage.types'
import getPackagePrices from './getPackagePrices'

test('should return expected result', () => {
  const mockPackage: PackageWithHeaderStatus = {
    priceDetails: {
      oneOffPrice: { gross: '1' },
      monthlyPrice: { gross: '2' },
    },
  }
  const mockNetGrossType: keyof BasketV2.Price = 'gross'
  const mockWithDiscount: boolean = false

  const expectedOutput = {
    upfrontPrice: mockPackage.priceDetails?.oneOffPrice?.gross,
    monthlyPrice: mockPackage.priceDetails?.monthlyPrice?.gross,
  }

  expect(getPackagePrices(mockPackage, mockWithDiscount, mockNetGrossType)).toEqual(expectedOutput)
  expect(getPackagePrices(mockPackage, !mockWithDiscount, mockNetGrossType)).toEqual(expectedOutput)
})

test('should return expected result when withDiscount is true', () => {
  const mockPackage: PackageWithHeaderStatus = {
    priceDetails: {
      oneOffPrice: { gross: '10' },
      oneOffDiscountPrice: { gross: '1' },
      monthlyPrice: { gross: '20' },
      monthlyDiscountPrice: { gross: '2' },
    },
  }
  const mockNetGrossType: keyof BasketV2.Price = 'gross'
  const mockWithDiscount: boolean = true

  const expectedOutput = {
    upfrontPrice: mockPackage.priceDetails?.oneOffDiscountPrice?.gross,
    monthlyPrice: mockPackage.priceDetails?.monthlyDiscountPrice?.gross,
  }

  expect(getPackagePrices(mockPackage, mockWithDiscount, mockNetGrossType)).toEqual(expectedOutput)
})

test('should return expected result when withDiscount is false and we have all the price input params', () => {
  const mockPackage: PackageWithHeaderStatus = {
    priceDetails: {
      oneOffPrice: { gross: '1' },
      oneOffDiscountPrice: { gross: '10' },
      monthlyPrice: { gross: '2' },
      monthlyDiscountPrice: { gross: '20' },
    },
  }
  const mockNetGrossType: keyof BasketV2.Price = 'gross'
  const mockWithDiscount: boolean = false

  const expectedOutput = {
    upfrontPrice: mockPackage.priceDetails?.oneOffPrice?.gross,
    monthlyPrice: mockPackage.priceDetails?.monthlyPrice?.gross,
  }

  expect(getPackagePrices(mockPackage, mockWithDiscount, mockNetGrossType)).toEqual(expectedOutput)
})
