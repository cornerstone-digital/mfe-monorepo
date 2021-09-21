export interface ChangeLinkProps {
  /** basket for analytics */
  basket?: BasketV2.Basket
  /** include the change link */
  changePackageLink?: string
  /** relevant package ID */
  packageId?: string
  /** review mode */
  reviewMode?: boolean

  /** for analytics */
  pageError?: string

  itemType?: string
}
