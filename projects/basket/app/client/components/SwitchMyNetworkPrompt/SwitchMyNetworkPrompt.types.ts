export interface SwitchMyNetworkPromptProps {
  isSwitched?: boolean
  basketId?: string
  packageId?: string
  reviewMode?: boolean
  onClick: () => void
  onUpdateBasket: () => Promise<void>
}

export interface SwitchMyNetworkPromptState {
  pacStacTitle: string
  pacStacBody: string
}
