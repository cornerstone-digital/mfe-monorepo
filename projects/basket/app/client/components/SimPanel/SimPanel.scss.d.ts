export type Styles = {
  'fade-in': string
  'fade-out': string
  'inline-link': string
  link: string
  'modal-prompt-md-container': string
  'modal-prompt-sm-container': string
  'no-gutters': string
}

export type ClassNames = keyof Styles

declare const styles: Styles

export default styles
