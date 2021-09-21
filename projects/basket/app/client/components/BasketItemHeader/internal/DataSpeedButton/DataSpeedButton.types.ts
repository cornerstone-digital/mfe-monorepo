import { DataSpeedStatus } from '@pages/BasketPage/BasketPage.types'

export interface DataSpeedButtonProps {
  /** relevant package ID */
  packageId?: string
  dataSpeed?: {
    key: DataSpeedStatus
    message?: string
  }

  pageError?: string
}
