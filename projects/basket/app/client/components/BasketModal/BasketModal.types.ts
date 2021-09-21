import { TwoButtonModalTemplateProps } from '@vfuk/core-two-button-modal-template/dist/TwoButtonModalTemplate.types'

export interface BasketModalProps {
  handleEmptyBasket?: () => void
  onVoucherConfirm?: () => void
  hideModal?: () => void
  onCombiConfirm?: () => void
  confirmRemovePackage?: () => void
  isBusiness?: boolean
  isPayAsYouGo?: boolean
}

export interface BasketModalIcon {
  children: string
  href: string
  name: string
  selector: string
  isExternal: boolean
}

export type BasketModalData = Omit<TwoButtonModalTemplateProps, 'primaryButton'>

export interface BasketModalDataList {
  [key: string]: BasketModalData
}
