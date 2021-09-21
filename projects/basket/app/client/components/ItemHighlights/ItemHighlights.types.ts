import { ItemHighlightsListProps } from '../ItemHighlightsList/ItemHighlightsList.types'

export interface ItemHighlightsProps {
  items: ItemHighlightsListProps['items']
  bullets?: boolean
  children?: JSX.Element
  color?: 'brand' | 'blue'
}
