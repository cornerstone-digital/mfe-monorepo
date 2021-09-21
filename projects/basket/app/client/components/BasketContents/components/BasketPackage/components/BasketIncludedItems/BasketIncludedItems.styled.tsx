import styled from 'styled-components'

import Image from '@web-core/components/atoms/Image'

import { GridColumn } from '@vfuk/core-grid'
export const HeaderGridColumn = styled(GridColumn)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0;
`

export const ImageStyled = styled(Image)`
  min-width: 32px;
  max-width: 64px;
`
