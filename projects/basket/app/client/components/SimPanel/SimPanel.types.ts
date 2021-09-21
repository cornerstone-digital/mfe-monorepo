import { BasketStatusError } from '@pages/BasketPage/BasketPage.types'

export interface SimPanelProps {
  simType?: BasketV2.Hardware['simType']
  isUpgrade: boolean
  isSimo: boolean
  pageContent?: BasketPageContent.Basket
  reviewMode?: boolean
  packageId: string
  onChange: (clearBasket: boolean, showSpinner: boolean) => Promise<void>
  selectedSimName?: string
  updateStatus: (notification: string, error?: BasketStatusError, basket?: BasketV2.Basket) => void
  basket?: BasketV2.Basket
  pageError?: string
}

export interface SimPanelState {
  eSimModalOpen: boolean
}

export enum ContentTypes {
  SIMO = 'basket_esim_info_compatible',
  SIMO_UPGRADE = 'basket_esim_simo_upgrade',
  DEVICE = 'basket_esim_info',
  DEVICE_UPGRADE = 'basket_esim_device_upgrade',
}

export enum SelectedSim {
  SIM = 'SIM',
  ESIM = 'ESIM',
}
