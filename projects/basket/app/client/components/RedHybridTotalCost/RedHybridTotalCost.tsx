import { observer } from 'mobx-react-lite'

import BlockContainer from '@web-core/components/molecules/BlockContainer'
import { Grid, GridColumn, GridRow } from '@vfuk/core-grid'

import Heading from '@web-core/components/atoms/Heading'
import Sandwich from '@web-core/components/atoms/Sandwich'

import { useStore } from '@store'

import formatCurrency from '@web-core/helpers/formatCurrency'

import styles from './RedHybridTotalCost.scss'

const RedHybridTotalCost = observer(() => {
  const { basketStore } = useStore()

  const totalPrice = basketStore.basket.packages?.reduce((acc, item: BasketV2.ModelPackage) => {
    return acc + Number.parseFloat(item?.priceDetails?.monthlyPrice?.gross || '0')
  }, 0)

  // todo: will be starting to develop in PI23
  // const totalDiscountPrice = 0

  return (
    <BlockContainer marginVertical={2} guttering="none" borderAppearance="shadow">
      <Grid>
        {/* <GridRow className={styles['discount-container']}>
          <GridColumn col={9}>
            <Heading level={5} size={4} marginBottom={0}>
              Total discount
            </Heading>
          </GridColumn>
          <GridColumn col={3}>
            <Sandwich main={`-${formatCurrency(totalDiscountPrice, true)}`} suffix2Appearance="dark" />
          </GridColumn>
        </GridRow> */}
        <GridRow className={styles.row}>
          <GridColumn col={9} className={styles['label-container']}>
            <Heading level={4} size={4} marginBottom={0} fontWeight="bold">
              Total Cost
            </Heading>
            <span>(VAT included)</span>
          </GridColumn>
          <GridColumn col={3}>
            <Sandwich main={formatCurrency(totalPrice, true)} suffix2Appearance="dark" />
          </GridColumn>
        </GridRow>
      </Grid>
    </BlockContainer>
  )
})

export default RedHybridTotalCost
