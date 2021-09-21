export type Styles = {
  'btns-wrapper': string
  'entertainment-section': string
  'entertainment-sub': string
  'entertainment-sub-logos': string
  'entertainment-sub-title': string
  'fade-in': string
  'fade-out': string
  notification: string
  'package-body': string
  'package-body-closed': string
  'package-header': string
  'package-header-underline': string
}

export type ClassNames = keyof Styles

declare const styles: Styles

export default styles
