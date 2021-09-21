import { BasketParams, PackageWithHeaderStatus } from '../../BasketPackage.types'
import getBasketParams from './getBasketParams'

const mockDefaultPackageParams: PackageWithHeaderStatus = {
  packageId: 'test-id',
  bundle: { skuId: 'test-sku-id' },
  packageType: 'SIMO',
}

const mockDefaultAccountCategory = 'test-category'
const mockDefaultBasketId = 'test-basket-id'

const expectedDefaultParams: BasketParams = {
  basketId: mockDefaultBasketId,
  packageId: mockDefaultPackageParams.packageId,
  bundleId: mockDefaultPackageParams.bundle?.skuId,
  packageType: mockDefaultPackageParams.packageType,
  accountCategory: mockDefaultAccountCategory,
  isUpgrade: false,
  contractOptions: undefined,
  deviceId: undefined,
}

test('should return expected value when basic scenario goes on', () => {
  const mockInputPackages: PackageWithHeaderStatus = { ...mockDefaultPackageParams }

  expect(getBasketParams(mockInputPackages, mockDefaultAccountCategory, mockDefaultBasketId)).toEqual(expectedDefaultParams)
})

test('should retrun expected values when there is a hardware with non "sim card" or non "accessories" productClass', () => {
  const mockInputPackages: PackageWithHeaderStatus = {
    ...mockDefaultPackageParams,
    hardwares: [
      {
        productClass: 'Handset',
        skuId: 'test-sku-id',
        contractOptions: {
          upFrontPrice: 1.5,
        },
      },
    ],
  }

  const mockExpectedValues: BasketParams = {
    ...expectedDefaultParams,
    deviceId: 'test-sku-id',
    contractOptions: mockInputPackages.hardwares![0].contractOptions,
  }

  expect(getBasketParams(mockInputPackages, mockDefaultAccountCategory, mockDefaultBasketId)).toEqual(mockExpectedValues)
})

test('should retrun expected values when there is a hardware with "sim card" or "accessories" productClass', () => {
  const mockInputPackages: PackageWithHeaderStatus = {
    ...mockDefaultPackageParams,
    hardwares: [
      {
        productClass: 'SIM card',
      },
      {
        productClass: 'Accessories',
      },
    ],
  }

  expect(getBasketParams(mockInputPackages, mockDefaultAccountCategory, mockDefaultBasketId)).toEqual(expectedDefaultParams)
})

test('should retrun expected values when having active services', () => {
  const mockInputPackages: PackageWithHeaderStatus = {
    ...mockDefaultPackageParams,
    services: [
      {
        skuId: 'test-sku-id',
      },
    ],
  }

  const mockExpectedValues: BasketParams = {
    ...expectedDefaultParams,
    extrasId: ['test-sku-id'],
  }

  expect(getBasketParams(mockInputPackages, mockDefaultAccountCategory, mockDefaultBasketId)).toEqual(mockExpectedValues)
})

test('should retrun expected values when having service without skulId', () => {
  const mockInputPackages: PackageWithHeaderStatus = {
    ...mockDefaultPackageParams,
    services: [
      {
        description: '',
      },
    ],
  }

  expect(getBasketParams(mockInputPackages, mockDefaultAccountCategory, mockDefaultBasketId)).toEqual(expectedDefaultParams)
})
