import { useContext } from 'react'
import BasketItemContext from '@components/BasketItem/context'
import Image from '@web-core/components/atoms/Image'
import * as Styled from './StorageColourDetails.styled'

const CapacityIcon = () => {
  const { capacity } = useContext(BasketItemContext)

  if (!capacity) {
    return null
  }

  const capacityIconFileNames = ['1_GB', '1_TB', '2_GB', '4_GB', '8_GB', '16_GB', '32_GB', '64_GB', '128_GB', '256_GB', '512_GB']
  const capacityIcon = capacity.replace(' ', '_')

  if (!capacityIconFileNames.includes(capacityIcon)) {
    return null
  }

  return (
    <Styled.IconWrapper>
      <Styled.IconBox>
        <Image srcLg={`${WEBPACK_ASSET_PREFIX}/assets/capacity-icons/${capacityIcon}.svg`} alt={capacity} height="24px" width="24px" />
      </Styled.IconBox>
      <span>Storage</span>
    </Styled.IconWrapper>
  )
}

export default CapacityIcon
