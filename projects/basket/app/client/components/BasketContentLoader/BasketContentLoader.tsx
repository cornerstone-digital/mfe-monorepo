import { Grid, GridColumn, GridRow } from '@vfuk/core-grid'
import ContentLoader from '@web-core/components/atoms/ContentLoader'

const BasketContentLoader = () => {
  return (
    <Grid>
      <GridRow noGutters>
        <ContentLoader />
      </GridRow>
      <GridRow noGutters marginBottom={2}>
        <GridColumn col={5} marginBottom={1} marginTop={1}>
          <ContentLoader height="inherit" />
        </GridColumn>
        <GridColumn col={2} offset={2} marginBottom={1} marginTop={1}>
          <ContentLoader />
        </GridColumn>
        <GridColumn col={2} offset={1} marginBottom={1} marginTop={1}>
          <ContentLoader />
        </GridColumn>
      </GridRow>
      <GridRow noGutters>
        <GridColumn col={5}>
          <ContentLoader />
        </GridColumn>
        <GridColumn col={5} offset={2}>
          <ContentLoader />
        </GridColumn>
      </GridRow>
      <GridRow noGutters>
        <GridColumn col={4}>
          <ContentLoader />
        </GridColumn>
        <GridColumn col={2} offset={6}>
          <ContentLoader />
        </GridColumn>
      </GridRow>
      <GridRow noGutters marginTop={2} marginBottom={2}>
        <ContentLoader height="35px" heightLg="50px" />
      </GridRow>
      <GridRow align="center">
        <GridColumn alignSelf="center">
          <ContentLoader height="80px" />
        </GridColumn>
        <GridColumn>
          <ContentLoader height="80px" />
        </GridColumn>
        <GridColumn alignSelf="center">
          <ContentLoader gutters="vertical" height="80px" />
        </GridColumn>
      </GridRow>
    </Grid>
  )
}

export default BasketContentLoader
