import SizeIcon from './SizeIcon'
import ColourIcon from '../StorageColourDetails/ColourIcon'

import * as Styled from '../StorageColourDetails/StorageColourDetails.styled'

const SizeColourDetails = () => (
  <Styled.StorageColourContainer data-selector="size-colour-details">
    <SizeIcon />
    <ColourIcon />
  </Styled.StorageColourContainer>
)

export default SizeColourDetails
