import { PackageWithHeaderStatus } from '../../BasketPackage.types'
import getAllActivePackages from './getAllActivePackages'

test('should return packages for basic scenario', () => {
  const mockPackage: PackageWithHeaderStatus[] = [{ headerStatus: 'present' }, { headerStatus: 'present' }]
  const mockWatchPackage: PackageWithHeaderStatus[] = [{ headerStatus: 'present' }]

  expect(getAllActivePackages(mockPackage, mockWatchPackage)).toEqual([...mockPackage, ...mockWatchPackage])
})

test('should return packages for basic scenario when single package input', () => {
  const mockPackage: PackageWithHeaderStatus = { headerStatus: 'present' }
  const mockWatchPackage: PackageWithHeaderStatus[] = []

  expect(getAllActivePackages(mockPackage, mockWatchPackage)).toEqual([mockPackage, ...mockWatchPackage])
})

test('should return active packages when header status removed', () => {
  const mockPackage: PackageWithHeaderStatus[] = [{ headerStatus: 'removed' }, { headerStatus: 'removed' }]
  const mockWatchPackage: PackageWithHeaderStatus[] = [{ headerStatus: 'removed' }]

  expect(getAllActivePackages(mockPackage, mockWatchPackage)).toEqual([])
})
