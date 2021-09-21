import { PackageWithHeaderStatus } from '../../BasketPackage.types'
import getPairedWatchSubTitle from './getPairedWatchSubTitle'

test('should return expected value for basic scenario', () => {
  const mockPackages: PackageWithHeaderStatus = {
    planType: '',
    bundle: {
      commitmentPeriod: {
        value: '1',
      },
    },
  }

  expect(getPairedWatchSubTitle(mockPackages)).toBe('1-month Watch Plan')
})

test('should return expected value for bingo package with watch handset', () => {
  const mockPackages: PackageWithHeaderStatus = {
    planType: 'BINGO',
    hardwares: [
      {
        productClass: 'ehandset',
        productSubClass: 'watch',
        contractOptions: {
          duration: {
            uom: 'DAYS',
            value: '7',
          },
        },
      },
    ],
    bundle: {
      commitmentPeriod: {
        value: '1',
      },
    },
  }

  expect(getPairedWatchSubTitle(mockPackages)).toBe('7-day Watch Plan')
})
