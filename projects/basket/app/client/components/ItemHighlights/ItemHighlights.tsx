import { FC } from 'react'

import Icon from '@web-core/components/atoms/Icon'

import ItemHighlightsList from '../ItemHighlightsList'
import { ItemHighlightsProps } from './ItemHighlights.types'

const ItemHighlights: FC<ItemHighlightsProps> = props => (
  <div data-selector={props.bullets ? 'bullets' : 'no-bullets'}>
    <ItemHighlightsList
      items={props.items}
      color={props.color}
      bulletElement={props.bullets ? <Icon size={1} name="circle-tick" appearance="success" inverse marginRight={1} /> : undefined}
    />
    {props.children}
  </div>
)

export default ItemHighlights
