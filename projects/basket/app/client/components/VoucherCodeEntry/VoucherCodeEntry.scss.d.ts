export type Styles = {
  'applied-voucher': string
  'fade-in': string
  'fade-out': string
  'remove-voucher': string
  'submit-container': string
  'text-container': string
  voucher: string
}

export type ClassNames = keyof Styles

declare const styles: Styles

export default styles
