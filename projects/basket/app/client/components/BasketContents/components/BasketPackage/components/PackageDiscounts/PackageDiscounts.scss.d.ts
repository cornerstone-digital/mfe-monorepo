export type Styles = {
  container: string
  description: string
  'fade-in': string
  'fade-out': string
  header: string
  'icon-column-wrapper': string
  'item-body': string
  'no-gutters': string
  'visible-only-mobile': string
  withTradeIn: string
}

export type ClassNames = keyof Styles

declare const styles: Styles

export default styles
