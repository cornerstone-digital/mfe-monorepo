export type Styles = {
  basket: string
  'btns-wrapper': string
  buttons: string
  duplicatefadeOutIn: string
  'entertainment-section': string
  'entertainment-sub': string
  'entertainment-sub-logos': string
  'entertainment-sub-title': string
  'fade-in': string
  'fade-out': string
  fadeOutIn: string
  grid: string
  loader: string
  'package-body': string
  'package-body-closed': string
  'package-header': string
  'package-remove': string
  'package-title': string
  'remove-package-text': string
  'wrapper-closed': string
  'wrapper-open': string
}

export type ClassNames = keyof Styles

declare const styles: Styles

export default styles
