const getPrice = (price?: BasketV2.Price, isBusiness: boolean = false): string => {
  const netGrossKey = isBusiness ? 'net' : 'gross'

  return price?.[netGrossKey] || '0'
}

export default getPrice
