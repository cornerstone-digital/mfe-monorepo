interface TradeInModalContent {
  title: string
  firstSectionHeader: string
  secondSectionHeader: string
  listItems: string[]
  uniqueCodeLabel: string
  expiryDateLabel: string
  deviceLabel: string
}

export const getTradeInModalContent = (content?: BasketPageContent.BasketTradeIn): TradeInModalContent => {
  return {
    title: content?.title || '',
    firstSectionHeader: content?.header_1 || '',
    secondSectionHeader: content?.header_2 || '',
    listItems: content?.textContent || [],
    uniqueCodeLabel: `${content?.unique_code_label || ''}:`,
    expiryDateLabel: `${content?.expiry_date_label || ''}:`,
    deviceLabel: `${content?.device_label || ''}:`,
  }
}
