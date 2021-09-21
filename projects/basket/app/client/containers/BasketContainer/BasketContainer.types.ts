import { BasketContentsProps } from '@components/BasketContents/BasketContents.types'

export interface BasketContainerProps extends BasketContentsProps {
  basketId?: BasketV2.Basket['basketId']
  basket?: BasketV2.Basket
  reviewMode?: boolean
}
