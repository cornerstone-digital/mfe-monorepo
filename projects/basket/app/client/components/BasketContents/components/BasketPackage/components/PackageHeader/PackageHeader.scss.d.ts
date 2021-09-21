export type Styles = {
  'fade-in': string
  'fade-out': string
  'package-header': string
  'package-header-overline': string
  'package-header-underline': string
}

export type ClassNames = keyof Styles

declare const styles: Styles

export default styles
