import styled from 'styled-components'

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: ${props => `${props.theme.spacing.fixed[2]}px`};
  span {
    margin-left: ${props => `${props.theme.spacing.fixed[2]}px`};
  }
`

export const IconBox = styled.div`
  border: 1px solid ${props => props.theme.color.monochrome5};
  width: 26px;
  height: 26px;
  flex-shrink: 0;
`

export const ColourBox = styled.div<{ bgColour: string }>`
  border: 1px solid ${props => props.theme.color.monochrome5};
  width: 26px;
  height: 26px;
  flex-shrink: 0;
  background-color: ${props => props.bgColour};
`

export const StorageColourContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: ${props => `${props.theme.spacing.fixed[3]}px`};
`
