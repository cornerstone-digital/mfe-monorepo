export interface SwitchMyNetworkProps {
  basket: BasketV2.Basket
  packageId?: string
  portability?: BasketV2.Portability
  onUpdateBasket: () => Promise<void>
  reviewMode?: boolean
  pageError?: string
}
