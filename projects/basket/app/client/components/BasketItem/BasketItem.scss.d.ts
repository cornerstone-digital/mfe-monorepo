export type Styles = {
  'basket-item-totals': string
  column: string
  'desc-column-large': string
  'desc-column-small': string
  'fade-in': string
  'fade-out': string
  header: string
  'header-only': string
  'icon-column-wrapper': string
  'info-link': string
  'item-body': string
  'item-body-wrap': string
  'justify-between': string
  'justify-center': string
  'justify-left': string
  'justify-right': string
  'no-gutters': string
  'product-image': string
  removed: string
  [key: string]: string
}

export type ClassNames = keyof Styles

declare const styles: Styles

export default styles
