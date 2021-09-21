import { BasketPackageService } from '@pages/BasketPage/BasketPage.types'
import getCombinedServices from './getCombinedServices'

describe('getCombinedServices', () => {
  test('should return with empty array by default', () => {
    expect(getCombinedServices('', {}, [])).toEqual([])
  })

  test('should return with services if provided', () => {
    const mockServices: BasketPackageService[] = [
      {
        productClass: 'ESIM',
      },
    ]
    expect(getCombinedServices('', {}, mockServices)).toEqual(mockServices)
  })

  test("should exclude 'Super Wi-Fi' service from return value", () => {
    const mockServices: BasketPackageService[] = [
      {
        productClass: 'ESIM',
      },
      {
        productClass: 'Super Wi-Fi',
      },
    ]
    expect(getCombinedServices('', {}, mockServices)).toHaveLength(1)
  })

  test("should not exclude 'Bundle Data add-on' for other service from return value", () => {
    const mockServices: BasketPackageService[] = [
      {
        productClass: 'ESIM',
      },
      {
        productClass: 'Bonus Data Bundle',
      },
    ]
    const mockBundle = {
      bundleClass: 'HBB',
      bundleType: 'Something else',
    }
    expect(getCombinedServices('', mockBundle, mockServices)).toHaveLength(2)
  })

  test("should exclude 'Bundle Data add-on' for Basic SIMO service from return value", () => {
    const mockServices: BasketPackageService[] = [
      {
        productClass: 'ESIM',
      },
      {
        productClass: 'Bonus Data Bundle',
      },
    ]
    const mockBundle = {
      bundleClass: 'SIMO',
      bundleType: 'Basics Plan',
    }
    expect(getCombinedServices('', mockBundle, mockServices)).toHaveLength(1)
  })

  test("should return with bundledService products excluding 'Fixed line' service", () => {
    const mockBundle: BasketV2.Bundle = {
      bundledServiceProducts: [
        {
          description: 'Fixed Line Service',
          productClass: 'Fixed Line',
        },
        {
          description: 'Landline Port In',
          productClass: 'Fixed Port In',
        },
      ],
    }
    expect(getCombinedServices('BROADBAND:FTTH', mockBundle, [])).toEqual([
      {
        description: 'Landline Port In',
        productClass: 'Fixed Port In',
        isExtra: true,
      },
    ])
  })
})
