export interface PackageFooterProps {
  package: BasketV2.ModelPackage | BasketV2.ModelPackage[]
  pageContent?: BasketPageContent.Basket
}

export interface PackageFooterState {
  messages?: string[]
}
