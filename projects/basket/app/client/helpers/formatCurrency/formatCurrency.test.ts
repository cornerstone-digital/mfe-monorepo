import formatCurrency from './formatCurrency'

it('formats the currency as expected', () => {
  expect(formatCurrency('1')).toEqual('£1')
  expect(formatCurrency('.43234324243')).toEqual('£0.43')
  expect(formatCurrency('.999999999')).toEqual('£1')
  expect(formatCurrency('£1.4')).toEqual('£1.40')
  expect(formatCurrency(10.2 * 100)).toEqual('£1020')
})
