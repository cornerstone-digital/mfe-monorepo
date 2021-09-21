import styled from 'styled-components'

export const Container = styled.div`
  overflow-x: auto;
`

export const Table = styled.table`
  padding: 0;
  margin-top: ${props => `${props.theme.spacing.fixed[2]}px`};
  font-weight: normal;
`

export const Thr = styled.tr`
  padding: 0;
  margin-bottom: ${props => `${props.theme.spacing.fixed[1]}px`};
  font-weight: bold !important;
  width: 100%;
  display: flex;
`

export const Tr = styled.tr`
  padding: ${props => `${props.theme.spacing.fixed[2]}px`} 0;
  font-weight: normal;
  font-size: ${props => props.theme.typography.heading[3].fontMobile};
  width: 100%;
  display: flex;
  background-color: ${props => (props.color === 'grey' ? props.theme.color.monochrome3 : 'transparent')};
`

export const Td = styled.td`
  padding: ${props => `0 ${props.theme.spacing.fixed[2]}px ${props.theme.spacing.fixed[1]}px`};
  font-weight: normal;
  font-size: ${props => props.theme.typography.paragraph[3].fontMobile};
  width: 100%;
`

export const Thd = styled.td`
  padding: ${props => `0 ${props.theme.spacing.fixed[2]}px ${props.theme.spacing.fixed[1]}px`};
  font-weight: bold;
  font-size: ${props => props.theme.typography.paragraph[3].fontMobile};
  width: 100%;
`

export const TdHeading = styled.h3`
  margin: 0;
  padding: 0;
  font-weight: bold;
  font-size: ${props => props.theme.typography.paragraph[3].fontMobile};
`
