import { DataSpeedStatus } from '@pages/BasketPage/BasketPage.types'

export type HeaderStatusType = 'present' | 'removing' | 'removed' | 'retrieving'

export interface BasketItemHeaderProps {
  /** the title to show in the header */
  title?: string
  /** the color of title to show in the header */
  titleColor?: 'brand' | 'blue'
  /** the sub title to show in the header */
  subTitle?: string
  /** the event to fire when clicking the remove action */
  onRemove?: () => void
  /** the event to fire when clicking the undo action */
  onUndo?: () => void
  /** the current state of the header */
  headerStatus?: HeaderStatusType
  /** specify whether this is a package */
  isPackage?: boolean
  /** specify whether this is an upgrade */
  isUpgrade?: boolean
  /** include the change link */
  changePackageLink?: string
  /** specify if this is a special total cost item header */
  isTotalCost?: boolean
  /** Whether to show or remove the change button, defaults to true */
  showChangeButton?: boolean

  /** relevant package ID */
  packageId?: string
  /** for analytics */
  pageError?: string
  /** review mode */
  reviewMode?: boolean
  actionDisabled?: boolean
  dataSpeed?: {
    key: DataSpeedStatus
    message?: string
  }
}

export type HeaderStatus = {
  headerTitle?: string
  headerSubTitle?: string
  headerAction: string
  headerIcon: JSX.Element
}

export interface HeaderStatuses {
  present: HeaderStatus
  removing: HeaderStatus
  removed: HeaderStatus
  retrieving: HeaderStatus
}

export interface HeaderClassNames {
  containerClassNames: string
  actionButtonClassNames: string
  subTitleClassNames: string
}
