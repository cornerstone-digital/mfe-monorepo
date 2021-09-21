export type Styles = {
  grid: string
  'price-container': string
  'cpu-column': string
  'price-container-sim': string
  benefits: string
  'no-gutters': string
}

export type ClassNames = keyof Styles

declare const styles: Styles

export default styles
