export interface SwitchMyNetworkModalProps {
  /** basket for analytics */
  basket: BasketV2.Basket
  /** the ID of the package the switch my network applies to */
  packageId?: string
  /** the date of delivery, which can be used in the copy if needed */
  deliveryDate?: string
  /** alters content to show scenario when delivery is after port-in/termination date */
  hasLateDelivery?: boolean
  /** alters content to show scenario when delivery is unknown due to backorder or other */
  hasUnknownDelivery?: boolean
  /** function to call when organism is finished with (e.g. to close modal) */
  onExit: () => void

  /** the portability info filled out by the user from the basket */
  portability: BasketV2.Portability
  /** whether the SwitchMyNetwork modal is open */
  isOpen?: boolean
  onUpdateBasket: () => Promise<void>
  pageError?: string
  reviewMode?: boolean
}
