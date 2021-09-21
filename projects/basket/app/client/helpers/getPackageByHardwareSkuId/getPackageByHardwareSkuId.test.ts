import getPackageByHardwareSkuId from './getPackageByHardwareSkuId'

const packages: BasketV2.ModelPackage[] = [
  {
    packageId: '1',
    hardwares: [
      { name: 'Apple iPhone', productClass: 'handset', skuId: '1' },
      { name: 'Apple Airpods', productClass: 'accessories', skuId: '2' },
      { name: 'Apple Wireless charger', productClass: 'accessories', skuId: '3' },
    ],
  },
  {
    packageId: '2',
    hardwares: [
      { name: 'Apple iPhone', productClass: 'handset', skuId: '4' },
      { name: 'Apple Airpods', productClass: 'accessories', skuId: '5' },
      { name: 'Apple Wireless charger', productClass: 'accessories', skuId: '6' },
    ],
  },
]

describe('getPackageByHardwareSkuId', () => {
  it('returns correct package if packages are passed', () => {
    expect(getPackageByHardwareSkuId([], '1234')).toBeUndefined()
  })

  it('return a package correctly', () => {
    const result = getPackageByHardwareSkuId(packages, '1')

    expect(result?.packageId).toBe(packages[0].packageId)
    expect(result).toEqual(packages[0])
  })
})
