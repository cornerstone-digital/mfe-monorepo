import formatAmount from './formatAmount'

it('formatAmount formats the currency as expected', () => {
  expect(formatAmount('1')).toEqual('1')
  expect(formatAmount('.43234324243')).toEqual('0.43')
  expect(formatAmount('.999999999')).toEqual('1')
  expect(formatAmount('£1.4')).toEqual('1.40')
  expect(formatAmount(10.2 * 100)).toEqual('1020')
})
