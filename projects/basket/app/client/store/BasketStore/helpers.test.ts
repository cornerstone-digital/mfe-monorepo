import { getActivePackages } from './helpers'

describe('BasketStore => helpers', () => {
  describe('getActivePackages()', () => {
    it('should return empty array', () => {
      expect(getActivePackages()).toEqual([])
      expect(getActivePackages([])).toEqual([])
    })

    it('should return packages', () => {
      const packages = [
        {
          packageId: '1',
          headerStatus: 'present',
        },
        {
          packageId: '2',
          headerStatus: 'removed',
        },
        {
          packageId: '3',
        },
      ]
      const expected = packages.filter(p => p.headerStatus !== 'removed')
      expect(getActivePackages(packages)).toEqual(expected)
    })
  })
})
