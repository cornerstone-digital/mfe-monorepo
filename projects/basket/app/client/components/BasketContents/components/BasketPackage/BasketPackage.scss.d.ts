export type Styles = {
  container: string
  'fade-in': string
  'fade-out': string
  'package-body': string
  'package-body-closed': string
  'package-header': string
  'package-header-overline': string
  'package-header-underline': string
}

export type ClassNames = keyof Styles

declare const styles: Styles

export default styles
