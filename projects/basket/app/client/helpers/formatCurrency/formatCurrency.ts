import formatAmount from '@helpers/formatAmount'

/**
 * formatCurrency
 * @description Take an input that is numberesque (1, 1.01. '1.01', '£1.01'), and format
 * into a currency with whole number (with no significant digits), or to 2sd
 * @param num
 */
const formatCurrency = (num: number | string): string => {
  return `£${formatAmount(num)}`
}

export default formatCurrency
