export interface BasketFooterProps {
  monthlyPrice?: number | string
  upfrontPrice?: number | string
  totalCostTitle?: 'Watch total' | 'Phone total' | 'Subtotal'
  isBusiness?: boolean
  isSmallBusiness?: boolean
  bingoFooterMessage?: string
  isBingoMessageVisible?: boolean
}
