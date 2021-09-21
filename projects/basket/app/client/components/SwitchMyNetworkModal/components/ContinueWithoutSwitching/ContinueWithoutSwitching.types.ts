export interface ContinueWithoutSwitchingProps {
  /** function called when continue button is clicked */
  onContinue?: (value?: boolean) => Promise<void>
  /** phone number the customer filled out */
  phoneNumber?: string
  /** date the customer selected for porting/termination */
  date?: string
  /** is late delivery */
  hasLateDelivery?: boolean
  /** is unknown or pre/backorder delivery */
  hasUnknownDelivery?: boolean
}
