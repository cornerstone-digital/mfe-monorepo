export interface SwitchMyNetworkFormProps {
  /** basket for analytics */
  basket: BasketV2.Basket
  /** saves PAC/STAC code to the basket */
  onSave: (data: BasketV2.Portability) => Promise<void>
  /** removes PAC/STAC code from the basket */
  onRemove: () => Promise<void>
  /** function to execute when finished with form (e.g. to close modal) */
  onExit: () => void
  /** portability info */
  portability: BasketV2.Portability
  packageId?: string
  reviewMode?: boolean
}

export interface FormReducerState {
  code: string
  phoneNumber: string
  date: string
}

export interface FormReducerAction {
  type: string
  data: string
}
export type CodeType = 'PAC' | 'STAC'
