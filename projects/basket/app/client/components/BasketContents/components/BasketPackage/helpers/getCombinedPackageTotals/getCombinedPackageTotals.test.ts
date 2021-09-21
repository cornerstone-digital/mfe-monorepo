import { PackageWithHeaderStatus } from '../../BasketPackage.types'
import getCombinedPackageTotals from './getCombinedPackageTotals'

test('should return expected value for basic scenario', () => {
  const mockPackages: PackageWithHeaderStatus[] = []
  const mockWithDiscount = false
  const mockNetGrossType: keyof BasketV2.Price = 'gross'

  const expectedOutput = {
    upfrontPrice: '0',
    monthlyPrice: '0',
  }

  expect(getCombinedPackageTotals(mockPackages, mockWithDiscount, mockNetGrossType)).toEqual(expectedOutput)
})

test('should return expected value when there are packages with priceDetails', () => {
  const mockPackages: PackageWithHeaderStatus[] = [
    {
      priceDetails: {
        monthlyPrice: { gross: '10' },
        oneOffPrice: { gross: '20' },
      },
    },
    {
      priceDetails: {
        monthlyPrice: { gross: '30' },
        oneOffPrice: { gross: '40' },
      },
    },
  ]
  const mockWithDiscount = false
  const mockNetGrossType: keyof BasketV2.Price = 'gross'

  const expectedOutput = {
    upfrontPrice: '60',
    monthlyPrice: '40',
  }

  expect(getCombinedPackageTotals(mockPackages, mockWithDiscount, mockNetGrossType)).toEqual(expectedOutput)
})
