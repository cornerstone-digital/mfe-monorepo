import { getTradeInModalContent } from './getTradeInModalContent'

describe('getTradeInModalContent', () => {
  const content = {
    unique_code_label: 'Unique code',
    header_2: 'Your quote details',
    name: 'basket_tradeIn',
    header_1: "What's next?",
    textContent: [
      "Continue to checkout and we'll confirm a few details about how you're going to send us your device.",
      "We'll text you when we receive your device at our warehouse.",
      "Finally, you'll receive the amount in the way you've chosen. Monthly discounts will be applied straight away. Bank transfers and account credit will be transferred in 5-10 working days. Any left over credit will be added to your Vodafone account.",
    ],
    id: 1595435276395,
    device_label: 'Your trade-in device',
    title: 'Your trade-in ',
    friendlyName: 'basket_tradeIn',
    expiry_date_label: 'Expiry date',
    parents: [],
  }
  it('should return expected result', () => {
    expect(getTradeInModalContent(content)).toEqual({
      deviceLabel: 'Your trade-in device:',
      expiryDateLabel: 'Expiry date:',
      firstSectionHeader: "What's next?",
      listItems: [
        "Continue to checkout and we'll confirm a few details about how you're going to send us your device.",
        "We'll text you when we receive your device at our warehouse.",
        "Finally, you'll receive the amount in the way you've chosen. Monthly discounts will be applied straight away. Bank transfers and account credit will be transferred in 5-10 working days. Any left over credit will be added to your Vodafone account.",
      ],
      secondSectionHeader: 'Your quote details',
      title: 'Your trade-in ',
      uniqueCodeLabel: 'Unique code:',
    })
  })
})
