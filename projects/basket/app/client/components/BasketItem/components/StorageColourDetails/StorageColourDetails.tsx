import CapacityIcon from './CapacityIcon'
import ColourIcon from './ColourIcon'

import * as Styled from './StorageColourDetails.styled'

const StorageColourDetails = () => (
  <Styled.StorageColourContainer data-selector="storage-colour-details">
    <CapacityIcon />
    <ColourIcon />
  </Styled.StorageColourContainer>
)

export default StorageColourDetails
