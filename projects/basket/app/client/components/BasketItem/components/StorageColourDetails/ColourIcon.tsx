import { useContext } from 'react'
import BasketItemContext from '@components/BasketItem/context'

import * as Styled from './StorageColourDetails.styled'

const ColourIcon = () => {
  const { colourName, colourHexcode } = useContext(BasketItemContext)

  if (!colourHexcode || !colourName) {
    return null
  }

  return (
    <Styled.IconWrapper>
      <Styled.ColourBox data-testid="colour-box" bgColour={colourHexcode} />
      <span>{colourName}</span>
    </Styled.IconWrapper>
  )
}

export default ColourIcon
