export type Styles = {
  'hardware-image': string
  'visible-only-md': string
  'no-gutters': string
  'visible-only-mobile': string
  'hardware-desc': string
}

export type ClassNames = keyof Styles

declare const styles: Styles

export default styles
