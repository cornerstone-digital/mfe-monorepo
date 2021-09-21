export type Styles = {
  blue: string
  brand: string
  'fade-in': string
  'fade-out': string
}

export type ClassNames = keyof Styles

declare const styles: Styles

export default styles
