export type Styles = {
  'basket-item-totals': string
  'cost-row': string
  'fade-in': string
  'fade-out': string
  header: string
  'monthly-column': string
  'price-row': string
  'upfront-cost-cell-column': string
}

export type ClassNames = keyof Styles

declare const styles: Styles

export default styles
