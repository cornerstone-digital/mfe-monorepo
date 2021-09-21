export interface DevicePaymentExampleProps {
  isOpen?: boolean
  onRequestClose: () => void
  airtimeDescription?: string
  airtimePrice?: string
  devicePaymentPlan: BasketV2.DevicePaymentPlan
  isBusiness?: boolean
  productClass?: BasketV2.Hardware['productClass']
  productSubClass?: BasketV2.Hardware['productSubClass']
}

export interface DevicePaymentExampleCmsContentData {
  bodyText?: string
  name?: string
  id?: number
  friendlyName?: string
  parents?: any[]
}

export interface DeviceCosts {
  upFrontPrice: string
  monthlyPrice: string
  totalHandsetPrice: string
  totalHandsetCredit: string
  interestRate: string
  aprRepresentative: string
  creditor: string
  duration?: string
}
