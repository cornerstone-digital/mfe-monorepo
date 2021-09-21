import getHardwareAsset from './getHardwareAsset'

test(`should return correct asset value if hardware productClass === 'accessories'`, () => {
  const productClass = 'accessories'
  const merchandisingMedia = [
    {
      id: 'imageURLs.full.hero',
      value: 'http://www.testvalue.co.uk/asset/hero',
    },
    {
      id: 'imageURLs.thumbs.front',
      value: 'http://www.testvalue.co.uk/asset/front',
    },
  ]
  const result = getHardwareAsset(productClass, merchandisingMedia)
  expect(result).toEqual('http://www.testvalue.co.uk/asset/front')
})

test(`should return correct asset value if hardware productClass === 'handset'`, () => {
  const productClass = 'handset'
  const merchandisingMedia = [
    {
      id: 'imageURLs.full.hero',
      value: 'http://www.testvalue.co.uk/asset/hero',
    },
    {
      id: 'imageURLs.thumbs.front',
      value: 'http://www.testvalue.co.uk/asset/front',
    },
  ]
  const result = getHardwareAsset(productClass, merchandisingMedia)
  expect(result).toEqual('http://www.testvalue.co.uk/asset/front')
})

test(`should return correct asset value if hardware productClass === 'fixed broadband equipment 2019'`, () => {
  const productClass = 'fixed broadband equipment 2019'
  const merchandisingMedia = [
    {
      id: 'imageURLs.full.hero',
      value: 'http://www.testvalue.co.uk/asset/hero',
    },
    {
      id: 'imageURLs.thumbs.front',
      value: 'http://www.testvalue.co.uk/asset/front',
    },
  ]
  const result = getHardwareAsset(productClass, merchandisingMedia)
  expect(result).toEqual('http://www.testvalue.co.uk/asset/front')
})

test(`should return undefined if image Id is not given`, () => {
  const productClass = 'accessories'
  const merchandisingMedia = [
    {
      id: '',
      value: 'http://www.testvalue.co.uk/asset/hero',
    },
    {
      id: '',
      value: 'http://www.testvalue.co.uk/asset/front',
    },
  ]
  const result = getHardwareAsset(productClass, merchandisingMedia)
  expect(result).toEqual(undefined)
})

test(`should return empty string if image value is not given`, () => {
  const productClass = 'accessories'
  const merchandisingMedia = [
    {
      id: 'imageUrls.full.hero',
      value: '',
    },
    {
      id: 'imageURLs.thumbs.front',
      value: '',
    },
  ]
  const result = getHardwareAsset(productClass, merchandisingMedia)
  expect(result).toEqual('')
})

test(`should return undefined if productClass is undefined`, () => {
  const productClass = undefined
  const merchandisingMedia = [
    {
      id: 'imageUrls.full.hero',
      value: 'http://www.testvalue.co.uk/asset/hero',
    },
    {
      id: 'imageURLs.thumbs.front',
      value: 'http://www.testvalue.co.uk/asset/front',
    },
  ]
  const result = getHardwareAsset(productClass, merchandisingMedia)
  expect(result).toEqual(undefined)
})

test(`should return undefined if merchandisingMedia is undefined`, () => {
  const productClass = 'accessories'
  const merchandisingMedia: BasketV2.MediaLink[] = []
  const result = getHardwareAsset(productClass, merchandisingMedia)
  expect(result).toEqual(undefined)
})

test(`should return undefined if productClass and merchandisingMedia are undefined`, () => {
  const productClass = undefined
  const merchandisingMedia: BasketV2.MediaLink[] = []
  const result = getHardwareAsset(productClass, merchandisingMedia)
  expect(result).toEqual(undefined)
})
