export interface BasketStatusProps {
  worker: { postMessage: (obj: object) => void }
}
export interface BasketNotification {
  message: string
  type?: string
  title?: string
  ctaUrl?: string
  ctaText?: string
}
export type ContentMessage = Partial<BasketPageContent.HbbPortfolioRefresh & BasketPageContent.BasketEsimDeviceUpgrade> | undefined
