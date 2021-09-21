import { PackageWithHeaderStatus } from '../../BasketPackage.types'
import isBingoPackage from './isBingoPackage'

test('should be true when planType is "BINGO"', () => {
  const mockPackages: PackageWithHeaderStatus = { planType: 'BINGO' }

  expect(isBingoPackage(mockPackages)).toBe(true)
})

test('should be false when planType is non "BINGO"', () => {
  const mockPackages: PackageWithHeaderStatus = { planType: 'SIMO' }

  expect(isBingoPackage(mockPackages)).toBe(false)
})

test('should be false when planType is "BINGO" but its an array of packages and no handset with bingo', () => {
  const mockPackages: PackageWithHeaderStatus[] = [{ planType: 'BINGO' }, { planType: 'BINGO' }]

  expect(isBingoPackage(mockPackages)).toBe(false)
})

test('should be true when planType is "BINGO" and its an array of packages and the bingo is handset', () => {
  const mockPackages: PackageWithHeaderStatus[] = [{ planType: 'BINGO', hardwares: [{ productClass: 'HANDSET' }] }, { planType: 'SIMO' }]

  expect(isBingoPackage(mockPackages)).toBe(true)
})

test('should be false when planType is "BINGO" and its an array of packages and the bingo is non handset', () => {
  const mockPackages: PackageWithHeaderStatus[] = [
    { planType: 'BINGO', hardwares: [{ productClass: 'SIMO' }] },
    { planType: 'SIMO', hardwares: [{ productClass: 'SIM Card' }] },
  ]

  expect(isBingoPackage(mockPackages)).toBe(false)
})
