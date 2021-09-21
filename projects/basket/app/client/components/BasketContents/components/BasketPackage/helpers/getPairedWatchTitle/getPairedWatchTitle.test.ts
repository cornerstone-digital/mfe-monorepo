import * as getABTestFeatureValue from '@helpers/getABTestFeatureValue/getABTestFeatureValue'
import { PackageWithHeaderStatus } from '../../BasketPackage.types'
import getPairedWatchTitle from './getPairedWatchTitle'

describe('getPairedWatchTitle()', () => {
  afterAll(() => {
    jest.restoreAllMocks()
  })
  test('should return hardware displayName value', () => {
    const mockPackage: PackageWithHeaderStatus = {
      hardwares: [
        {
          displayName: 'test-name',
        },
      ],
    }
    expect(getPairedWatchTitle(mockPackage)).toBe('test-name')
  })

  test('should return empty string when there is no hardware displayName prop', () => {
    const mockPackage: PackageWithHeaderStatus = {
      hardwares: [{}],
    }
    expect(getPairedWatchTitle(mockPackage)).toBe('')
  })

  test('AB test should return short display name', () => {
    jest.spyOn(getABTestFeatureValue, 'default').mockReturnValueOnce(true)
    const mockPackage: PackageWithHeaderStatus = {
      hardwares: [
        {
          displayName: 'test-name',
          shortDisplayName: 'test',
        },
      ],
    }
    expect(getPairedWatchTitle(mockPackage)).toBe('test')
  })
})
