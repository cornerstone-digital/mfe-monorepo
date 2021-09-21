import { FC } from 'react'
import classNames from 'classnames'
import styled from 'styled-components'

import List from '@web-core/components/atoms/List'

import { ItemHighlightsListProps } from './ItemHighlightsList.types'

import styles from './ItemHighlightsList.scss'

const ItemHighlightsList: FC<ItemHighlightsListProps> = props => {
  if (!props.items?.length) {
    return null
  }

  const textClasses = classNames({
    [styles.brand]: props.color === 'brand',
    [styles.blue]: props.color === 'blue',
  })

  return (
    <List
      hideDecorators
      padding={0}
      margin={0}
      items={props.items.map((item, index) => ({
        id: `${index + 1}`,
        content: (
          <ItemHighlightsListItemContainer>
            {props?.bulletElement && <ItemHighlightsListItemBullet>{props.bulletElement}</ItemHighlightsListItemBullet>}
            <span className={textClasses}>{item}</span>
          </ItemHighlightsListItemContainer>
        ),
      }))}
    ></List>
  )
}

export default ItemHighlightsList

const ItemHighlightsListItemContainer = styled.div`
  display: flex;
  margin-bottom: 4px;
`
const ItemHighlightsListItemBullet = styled.div`
  padding-top: 2px;
`
