import getFallbackIcon from './getFallbackIcon'

test(`should return 'mobile' icon if a hardwares product class is handset`, () => {
  const hardware = 'Handset'
  const result = getFallbackIcon(hardware)
  expect(result).toEqual('mobile')
})

test(`should return 'sim' icon if a hardwares product class is Sim card`, () => {
  const hardware = 'Sim card'
  const result = getFallbackIcon(hardware)
  expect(result).toEqual('sim')
})

test(`should return 'broadband-or-wifi' icon if a hardwares product class is broadband:ftth`, () => {
  const hardware = 'broadband:ftth'
  const result = getFallbackIcon(hardware)
  expect(result).toEqual('broadband-or-wifi')
})

// test(`should return 'broadband-or-wifi' icon if a hardwares product class is broadband:fttg`, () => {
//   const hardware = { productClass: 'broadband:fttg' }
//   const result = getFallbackIcon(hardware)
//   expect(result).toEqual('broadband-or-wifi')
// })

test('should return photos icon if a hardwares product class is not given', () => {
  const hardware = ''
  const result = getFallbackIcon(hardware)
  expect(result).toEqual('photos')
})

test('should return photos icon if a hardwares product class is not defined in lookup table', () => {
  const hardware = 'tv'
  const result = getFallbackIcon(hardware)
  expect(result).toEqual('photos')
})
