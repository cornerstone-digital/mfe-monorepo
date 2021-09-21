import { HeaderStatusType } from '@pages/BasketPage/BasketPage.types'

export interface PackageTradeInCreditProps {
  packageId: string
  tradeInCredit: BasketV2.TradeInCredit
  pageContent?: BasketPageContent.Basket
  headerStatus?: HeaderStatusType

  hideTopBorder?: boolean

  onRemove?: () => void
  onUndo?: () => void
}
