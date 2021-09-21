import getPackageWithHandset from './getPackageWithHandset'
import { PackageWithHeaderStatus } from '../../BasketPackage.types'

test('should return handset package', () => {
  const mockPackages: PackageWithHeaderStatus[] = [
    {
      hardwares: [
        {
          productClass: 'Insurance',
        },
      ],
    },
    {
      hardwares: [
        {
          productClass: 'HANDSET',
        },
      ],
    },
  ]

  expect(getPackageWithHandset(mockPackages).hardwares![0].productClass).toEqual(mockPackages[1].hardwares![0].productClass)
})

test('should return the first package if there is no handset package', () => {
  const mockPackages: PackageWithHeaderStatus[] = [
    {
      hardwares: [
        {
          productClass: 'Insurance',
        },
      ],
    },
    {
      hardwares: [
        {
          productClass: 'SIM Card',
        },
      ],
    },
  ]

  expect(getPackageWithHandset(mockPackages).hardwares![0].productClass).toEqual(mockPackages[0].hardwares![0].productClass)
})
