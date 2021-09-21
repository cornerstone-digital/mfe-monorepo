export type Styles = {
  'fade-in': string
  'fade-out': string
  'header-with-icon': string
  'header-wrapper': string
  'no-gutters': string
  'vertical-gutters': string
}

export type ClassNames = keyof Styles

declare const styles: Styles

export default styles
