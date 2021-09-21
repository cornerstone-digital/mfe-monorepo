export type Styles = {
  'fade-in': string
  'fade-out': string
  subTitle: string
}

export type ClassNames = keyof Styles

declare const styles: Styles

export default styles
