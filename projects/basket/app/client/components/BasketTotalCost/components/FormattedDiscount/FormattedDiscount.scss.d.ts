export type Styles = {
  discount: string
  'discount-upgrade': string
  'fade-in': string
  'fade-out': string
}

export type ClassNames = keyof Styles

declare const styles: Styles

export default styles
