/**
 * sanitiseNumber
 * @description Should handle input of things like: 1, 1.01. '1.01', '£1.01'.
 * Strip out the unneccesary and convert to number
 * @param num
 */
const sanitiseNumber = (num: number | string): number => Math.round(parseFloat((num || 0).toString().replace(/[^0-9.]+/g, '')) * 100) / 100

/**
 * formatAmount
 * @description Take an input that is numberesque (1, 1.01. '1.01', '£1.01'), and format
 * into a currency with whole number (with no significant digits), or to 2sd
 * @param num
 */
const formatAmount = (num: number | string): string => {
  const sanitisedNumber: number = sanitiseNumber(num)
  const outputNumber: string = sanitisedNumber % 1 === 0 ? `${sanitisedNumber}` : sanitisedNumber.toFixed(2)
  return `${outputNumber}`
}
export default formatAmount
