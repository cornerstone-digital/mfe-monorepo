export type Styles = {
  container: string
  'fade-in': string
  'fade-out': string
  notification: string
}

export type ClassNames = keyof Styles

declare const styles: Styles

export default styles
