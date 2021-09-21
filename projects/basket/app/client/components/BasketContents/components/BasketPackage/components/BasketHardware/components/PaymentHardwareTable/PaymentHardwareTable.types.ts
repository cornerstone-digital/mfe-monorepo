import { DeviceCosts } from '../DevicePaymentExample/DevicePaymentExample.types'

export interface PaymentHardwareTableProps {
  bingoContent: BasketPageContent.HbbPortfolioRefreshContent
  containerClassName: string
  deviceCosts: DeviceCosts
  hardwareName: 'Phone' | 'Watch'
  priceKey: 'net' | 'gross'
  postValueLabel?: string
}
