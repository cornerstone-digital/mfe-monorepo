import { BasketPackageService, Flags, HeaderStatusType, DataSpeedStatus } from '@pages/BasketPage/BasketPage.types'

export interface BasketItemProps {
  /** the title to show in the header */
  title: BasketPackageService['displayName'] | BasketPackageService['name']
  /** the sub title to show in the header */
  subTitle?: string
  /** the event to fire when clicking the remove action */
  onRemove?: () => void
  /** the event to fire when clicking the undo action */
  onUndo?: () => void
  /** the current state of the header */
  headerStatus?: HeaderStatusType
  /** icon to display */
  icon?: string
  /** appearance colour for the icon */
  iconAppearance?: string
  /** image to display */
  image?: string
  /** the description for the item */
  description?: React.ReactNode[]
  upfrontPrice?: string
  upfrontDiscountPrice?: string
  monthlyPrice?: string
  monthlyDiscountPrice?: string
  promo?: (string | undefined)[]
  isUpgrade?: boolean
  /** specify if this is a special total cost item */
  isTotalCost?: boolean
  /** specify if the icon is visible */
  iconIsVisible?: boolean
  /** specify if we want to show discount banner styling */
  isDiscountBanner?: boolean
  /** Bool used to show business layout */
  isBusiness?: boolean
  /** Bool used to show broadband layout */
  isBroadband?: boolean
  broadbandInfo?: {
    commitmentMessage?: string
    installationMessage?: string
    increaseMessage?: string
    address?: string
  }
  /** Only if part of a package */
  packageId?: string
  /** Number used to match Apple Watch with an existing line */
  phonePaired?: string
  /** hides the the basket item header */
  hideHeader?: boolean
  /** hide upront and monthly costs */
  hideCosts?: boolean
  /** Check if item is watch */
  isSmartWatch?: boolean
  /** Check if item is watch simo */
  isSmartWatchSimo?: boolean
  /** Check if item is handset */
  isHandset?: boolean
  /** Check if item is payg */
  isPayg?: boolean
  /** Check if item is Simo */
  isSimo?: boolean
  /** Bool used to specify the flexi banner */
  isFlexiBanner?: boolean
  isBundle?: boolean
  flags?: Flags
  dataSpeed?: {
    key: DataSpeedStatus
    message?: string
  }
  pageContent?: BasketPageContent.Basket
  changePackageLink?: string
  /** Sets justify-content on the container div of description
   * left: flex-start
   * right: flex-end
   */
  descriptionAlignment?: 'left' | 'center' | 'between' | 'right'
  colourName?: string
  colourHexcode?: string
  capacity?: string
  shortDisplayName?: string
  displayName?: string
  deviceSize?: string
}
