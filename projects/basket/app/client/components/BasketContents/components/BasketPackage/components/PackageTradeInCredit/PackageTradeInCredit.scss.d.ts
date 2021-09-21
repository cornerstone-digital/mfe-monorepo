export type Styles = {
  container: string
  content: string
  deviceName: string
  'fade-in': string
  'fade-out': string
  hideTopBorder: string
  'icon-column-wrapper': string
  'no-gutters': string
  'tradein-column-wrapper': string
  'vertical-gutters': string
}

export type ClassNames = keyof Styles

declare const styles: Styles

export default styles
