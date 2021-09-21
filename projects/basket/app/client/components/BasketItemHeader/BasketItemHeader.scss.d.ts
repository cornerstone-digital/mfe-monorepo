export type Styles = {
  'action-button': string
  'action-text': string
  blue: string
  brand: string
  'fade-in': string
  'fade-out': string
  'is-disabled': string
  'is-hidden': string
  'is-upgraded': string
  'item-header': string
  'item-title': string
  'sub-title': string
  'total-cost': string
}

export type ClassNames = keyof Styles

declare const styles: Styles

export default styles
