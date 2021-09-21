import getAppliedPromos from './getAppliedPromos'

test('it returns array of values when media is all valid', () => {
  const result = getAppliedPromos([{ id: 'data_allowance.merchandisingPromo', type: 'TEXT', value: '100GB free data' }])
  expect(result).toEqual(['100GB free data'])
})

test('it should replace &pound; with £', () => {
  const result = getAppliedPromos([{ id: 'data_allowance.merchandisingPromo', type: 'TEXT', value: '&pound;10 off' }], false)
  expect(result).toEqual(['£10 off'])
})

test('it returns array of values when media is all valid but includes securenet', () => {
  const result = getAppliedPromos([
    { id: 'data_allowance.merchandisingPromo', type: 'TEXT', value: '100GB free data' },
    { id: 'securenet.merchandisingPromotions.merchandisingPromotion.label', type: 'TEXT', value: '100GB free data' },
    { id: 'tradein.merchandisingPromo', type: 'TEXT', value: 'Free trade in' },
  ])
  expect(result).toEqual(['100GB free data', 'Free trade in'])
})

test('it returns array of values wwithout duplicates', () => {
  const result = getAppliedPromos([
    { id: 'data_allowance.merchandisingPromo', type: 'TEXT', value: '1GB free data' },
    { id: 'tradein.merchandisingPromo', type: 'TEXT', value: 'Free trade in' },
    { id: 'tradein.merchandisingPromo', type: 'TEXT', value: 'Free trade in' },
  ])
  expect(result).toEqual(['1GB free data', 'Free trade in'])
})

test('it returns an empty array when there is no type in media item', () => {
  const result = getAppliedPromos([{ id: 'test.merchandisingPromotions.url', value: 'bla' }])
  expect(result).toEqual([])
})

test('it returns an empty array when the merch is not type TEXT', () => {
  const result = getAppliedPromos([{ id: 'imageURLs.merchandisingPromotions.url', type: 'URL', value: 'bla' }])
  expect(result).toEqual([])
})

test('it returns an empty array when the merch has no id', () => {
  const result = getAppliedPromos([{ type: 'text', value: 'bla' }])
  expect(result).toEqual([])
})

test('it returns an empty array when only given securenet', () => {
  const result = getAppliedPromos([{ id: 'securenet.merchandisingPromotions.merchandisingPromotion.label', type: 'text', value: 'bla' }])
  expect(result).toEqual([])
})

test('it returns an empty array when given nothing', () => {
  const result = getAppliedPromos()
  expect(result).toEqual([])
})
