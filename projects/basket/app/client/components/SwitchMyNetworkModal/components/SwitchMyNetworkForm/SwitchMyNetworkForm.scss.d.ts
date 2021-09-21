export type Styles = {
  button: string
  'fade-in': string
  'fade-out': string
  form: string
  'form-buttons': string
  input: string
  'validation-button': string
}

export type ClassNames = keyof Styles

declare const styles: Styles

export default styles
