import { useContext } from 'react'
import BasketItemContext from '@components/BasketItem/context'
import Image from '@web-core/components/atoms/Image'
import * as Styled from '../StorageColourDetails/StorageColourDetails.styled'

const SizeIcon = () => {
  const { deviceSize } = useContext(BasketItemContext)

  if (!deviceSize) {
    return null
  }

  const sizeIconFileNames = ['40mm', '42mm', '44mm', '46mm']

  if (!sizeIconFileNames.includes(deviceSize)) {
    return null
  }

  return (
    <Styled.IconWrapper>
      <Styled.IconBox>
        <Image srcLg={`${WEBPACK_ASSET_PREFIX}/assets/watch-size-icons/${deviceSize}.svg`} alt={deviceSize} height="24px" width="24px" />
      </Styled.IconBox>
      <span>Size</span>
    </Styled.IconWrapper>
  )
}

export default SizeIcon
