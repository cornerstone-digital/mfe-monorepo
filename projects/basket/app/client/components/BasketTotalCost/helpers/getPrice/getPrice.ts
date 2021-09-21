const getMonthlyPrice = (
  price: BasketV2.PackagePriceDetails['monthlyPrice'],
  discountPrice?: BasketV2.PackagePriceDetails['monthlyDiscountPrice'],
): {
  gross?: BasketV2.Price['gross']
  net?: BasketV2.Price['net']
  vat?: BasketV2.Price['vat']
} => {
  return (discountPrice?.net ? discountPrice : price) || {}
}

export default getMonthlyPrice
