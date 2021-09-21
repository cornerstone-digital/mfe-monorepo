export interface PackageDiscountsProps {
  modelPackage: BasketV2.ModelPackage | BasketV2.ModelPackage[]
  isBusiness?: boolean
  isUpgrade?: boolean

  hasTradeIn?: boolean
  pageContent?: BasketPageContent.Basket
  reviewMode?: boolean
}
