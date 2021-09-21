export type Styles = {
  'empty-basket': string
  'empty-basket-text': string
  'empty-button-column': string
  'fade-in': string
  'fade-out': string
  grid: string
  'grid-ab': string
  'justify-center': string
}

export type ClassNames = keyof Styles

declare const styles: Styles

export default styles
