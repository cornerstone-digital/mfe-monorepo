import generateChangePackageLink from './generateChangePackageLink'

describe('generateChangePackageLink()', () => {
  it('should return destination URL with query strings in the correct format', () => {
    const testData = {
      bundle: {
        packageLineId: 'test-product-line-id',
        skuId: 'test-change-plan-skuid',
        bundleClass: 'simo',
      },
      packageId: 'test-package-id',
      services: [
        {
          skuId: 'test-service-skuid',
        },
      ],
    }

    const { packageId, services } = testData
    const expectedURL = `/mobile/best-sim-only-deals?packageId=${packageId}&changePassSkuId=${services[0].skuId}`
    const result = generateChangePackageLink(testData)
    expect(result).toEqual(expectedURL)
  })

  it('should return destination URL with query strings when handset is eHandset', () => {
    const testData = {
      bundle: {},
      planType: 'EHANDSET',
      services: [],
      hardwares: [
        {
          productClass: 'eHandset',
          productSubClass: 'HANDSET',
          make: 'apple',
          model: 'iphone-12',
        },
      ],
    }

    const result = generateChangePackageLink(testData)
    expect(result).toContain('/mobile/phones/pay-monthly-contracts/apple/iphone-12')
  })

  it('should return destination URL with query strings when planType === bingo', () => {
    const testData = {
      bundle: {},
      planType: 'BINGO',
      services: [],
      hardwares: [
        {
          productClass: 'handset',
          make: 'apple',
          model: 'iphone-12',
        },
      ],
    }

    const result = generateChangePackageLink(testData)
    expect(result).toContain('/mobile/phones/pay-monthly-contracts/apple/iphone-12')
  })

  it('should return simo URL for simo', () => {
    const testData = {
      bundle: {
        bundleClass: 'simo',
      },
      services: [],
    }

    const result = generateChangePackageLink(testData)
    expect(result).toContain('/mobile/best-sim-only-deals')
  })

  it('should return destination URL when planType === broadband:ftth', () => {
    const testData = {
      bundle: {},
      planType: 'broadband:ftth',
      services: [],
    }

    const result = generateChangePackageLink(testData)
    expect(result).toContain('/broadband')
  })

  it('should return destination URL for planType === broadband:ftth and hardwares exists', () => {
    const testData = {
      bundle: {},
      planType: 'broadband:ftth',
      services: [],
      hardwares: [
        {
          productClass: 'DATA_DEVICE',
          make: 'baratheon',
          model: 'my-dongle',
        },
      ],
    }

    const result = generateChangePackageLink(testData)
    expect(result).toContain('/broadband/deals/select-plan')
  })

  it('should return destination URL for planType === broadband:ftth', () => {
    const testData = {
      bundle: {},
      planType: 'broadband:ftth',
      services: [],
    }

    const result = generateChangePackageLink(testData)
    expect(result).toContain('/broadband/deals/select-plan')
  })

  it('should return a comma separated list of extras if multiple are passed', () => {
    const testData = {
      bundle: {
        bundleClass: 'simo',
      },
      services: [
        {
          skuId: 'test-service-skuId1',
        },
        {
          skuId: 'test-service-skuId2',
        },
      ],
    }

    const { services } = testData
    const result = generateChangePackageLink(testData)
    const expectedURL = `/mobile/best-sim-only-deals?changePassSkuId=${services[0].skuId},${services[1].skuId}`
    expect(result).toEqual(expectedURL)
  })

  it('should return query string without any services if none are passed to it', () => {
    const testData = {
      packageId: 'test-package-id',
      services: [],
      bundle: {
        bundleClass: 'simo',
      },
    }

    const { packageId } = testData
    const result = generateChangePackageLink(testData)
    const expectedURL = `/mobile/best-sim-only-deals?packageId=${packageId}&changePassSkuId=`
    expect(result).toEqual(expectedURL)
  })

  it('should return the correct tablet URL for change', () => {
    const testData = {
      packageId: 'test-package-id',
      services: [],
      planType: 'DATA_DEVICE',
      hardwares: [
        {
          productClass: 'DATA_DEVICE',
          make: 'apple',
          model: 'ipad',
        },
      ],
    }

    const { packageId } = testData
    const result = generateChangePackageLink(testData)
    const expectedURL = `/mobile-broadband/pay-monthly-contracts/tablets/${testData.hardwares[0].make}/${testData.hardwares[0].model}?packageId=${packageId}&changePassSkuId=`
    expect(result).toEqual(expectedURL)
  })

  it('should return data-only-sim for data simo', () => {
    const testData = {
      bundle: {},
      planType: 'DATA_SIMO',
      services: [],
      hardwares: [
        {
          productClass: 'DATA_DEVICE',
          make: 'baratheon',
          model: 'joffrey',
        },
      ],
    }

    const result = generateChangePackageLink(testData)
    expect(result).toContain('/data-only-sim')
  })

  it('should return dongles URL when dongle is present in model', () => {
    const testData = {
      bundle: {},
      planType: 'DATA_DEVICE',
      services: [],
      hardwares: [
        {
          productClass: 'DATA_DEVICE',
          make: 'baratheon',
          model: 'my-dongle',
        },
      ],
    }

    const result = generateChangePackageLink(testData)
    expect(result).toContain('/mobile-broadband/pay-monthly-contracts/dongles/baratheon/my-dongle')
  })

  it('should return mobile wifi URL when make is vodafone and model does not contain dongle', () => {
    const testData = {
      bundle: {},
      planType: 'DATA_DEVICE',
      services: [],
      hardwares: [
        {
          productClass: 'DATA_DEVICE',
          make: 'vodafone',
          model: 'my-model',
        },
      ],
    }

    const result = generateChangePackageLink(testData)
    expect(result).toContain('/mobile-broadband/pay-monthly-contracts/mobile-wifi/vodafone/my-model')
  })

  it('should return tech debt PAYG link for Reinvent', () => {
    const skuId = 'change'
    const packageLineId = 'product333'
    const testData = {
      packageId: 'pack111',
      bundle: {
        paymentType: 'Prepaid',
        skuId,
        packageLineId,
      },
      planType: 'HANDSET',
      hardwares: [
        {
          productClass: 'HANDSET',
          make: 'apple',
          model: 'iphone-7',
        },
      ],
      services: [],
    }

    const result = generateChangePackageLink(testData)

    expect(result).toEqual(`/mobile/phones/pay-as-you-go/apple/iphone-7?packageId=${testData.packageId}&changePassSkuId=`)
  })

  it('should return business data only sim url based on accountCategory', () => {
    const testData = {
      accountCategory: 'business',
      bundle: {
        paymentType: 'Postpaid',
      },
      planType: 'DATA_SIMO',
      services: [],
    }

    const result = generateChangePackageLink(testData)

    expect(result).toEqual('/business/data-only-sim')
  })

  it('should return consumer data only sim url based on accountCategory', () => {
    const testData = {
      accountCategory: 'Consumer',
      bundle: {
        paymentType: 'Postpaid',
      },
      planType: 'DATA_SIMO',
      services: [],
    }

    const result = generateChangePackageLink(testData)

    expect(result).toEqual('/data-only-sim')
  })

  it('should return /smart-watches-and-wearables pointing to correct watch for watches', () => {
    const testData = {
      packageId: 'test-package-id',
      hardwares: [
        {
          displayName: 'watch',
          make: 'apple',
          model: 'watch-series5-40mm',
          productClass: 'eHandset',
          productSubClass: 'WATCH',
        },
      ],
    }

    const result = generateChangePackageLink(testData)
    expect(result).toContain(`/smart-watches-and-wearables/apple/watch-series5-40mm?packageId=${testData.packageId}`)
  })

  it('should return simo URL for bingo simo', () => {
    const testData = {
      packageId: 'test-package-id',
      services: [],
      bundle: {
        bundleClass: 'simo',
      },
      planType: 'bingo',
    }

    const result = generateChangePackageLink(testData)
    const expectedURL = `/mobile/best-sim-only-deals?packageId=${testData.packageId}&changePassSkuId=`
    expect(result).toEqual(expectedURL)
  })

  it('should return correct URL for red hybrid', () => {
    const testData = {
      packageId: 'test-package-id',
      services: [],
      bundle: {
        bundleClass: 'simo',
      },
      planType: 'RED_HYBRID_ONLINE',
    }

    const result = generateChangePackageLink(testData)
    expect(result).toEqual('/pay-as-you-go/flexi-sim')
  })
})
