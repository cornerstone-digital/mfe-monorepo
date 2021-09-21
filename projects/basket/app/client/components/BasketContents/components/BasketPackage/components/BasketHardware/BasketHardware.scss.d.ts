export type Styles = {
  'fade-in': string
  'fade-out': string
  link: string
  text: string
}

export type ClassNames = keyof Styles

declare const styles: Styles

export default styles
