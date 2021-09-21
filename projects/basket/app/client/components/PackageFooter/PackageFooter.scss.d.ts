export type Styles = {
  'fade-in': string
  'fade-out': string
  wrapper: string
}

export type ClassNames = keyof Styles

declare const styles: Styles

export default styles
