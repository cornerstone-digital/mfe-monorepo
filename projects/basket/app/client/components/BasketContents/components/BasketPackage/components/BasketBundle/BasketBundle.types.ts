import { Flags } from '@pages/BasketPage/BasketPage.types'

export interface BasketBundleProps {
  /** Bool used to show if the basket is an upgrade */
  isUpgrade: boolean
  /** Bool used to show business layout */
  isBusiness: boolean
  /** Contents of the bundle */
  bundle?: BasketV2.Bundle
  /** Denotes the type of plan  */
  planType?: BasketV2.ModelPackage['planType']
  phonePaired?: string
  /** Array of attached services  */
  services?: BasketV2.Service[]
  installationAddress?: BasketV2.InstallationAddress
  combiHandlers?: combiProps
  /** Check if Basket is in Review */
  reviewMode?: boolean
  packageId?: string
  onUpdateBasket: () => void
  pageError?: string
  flags?: Flags
  hardwares?: BasketV2.Hardware[]
  displayName?: string
  isWatch: boolean
  isHandset: boolean
  changePackageLink?: string
}

export interface combiProps {
  onRemove?: () => void
  onUndo?: () => void
}

export type BroadbandType = { commitmentMessage?: string; increaseMessage?: string; address?: string }
