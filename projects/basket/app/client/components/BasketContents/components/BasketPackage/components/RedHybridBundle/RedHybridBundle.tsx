import { FC } from 'react'

import { Grid, GridColumn, GridRow } from '@vfuk/core-grid'
import Icon from '@web-core/components/atoms/Icon'
import Sandwich from '@web-core/components/atoms/Sandwich'
import getAllowanceByType from '@web-shop-core/helpers/getAllowanceByType'
import ItemHighlights from '@components/ItemHighlights'

import formatCurrency from '@web-core/helpers/formatCurrency'
import { isRedHybridServiceProduct, isSimTypePhysical } from '@helpers/typeCheck'

import { useStore } from '@store'

import { RedHybridBundleProps } from './RedHybridBundle.types'

import styles from './RedHybridBundle.scss'

const RedHybridBundle: FC<RedHybridBundleProps> = props => {
  const { basketStore } = useStore()

  const descriptionItems = basketStore?.pageContent?.vf_Modules?.messages?.content?.freedom_benefits?.subLinks || []

  const allowances = props.services?.find(isRedHybridServiceProduct)?.allowances
  const { value, uom } = getAllowanceByType(allowances, 'uk data')
  const formattedData = value ? `${value} ${uom} data` : ''

  const icon = props.hardwares?.some(isSimTypePhysical) ? 'sim' : 'cpu'

  const priceContainerClassName = icon === 'sim' ? styles['price-container-sim'] : styles['price-container']

  return (
    <Grid className={styles.grid}>
      <GridRow noGutters>
        <GridColumn col={1} className={icon === 'cpu' ? styles['cpu-column'] : ''}>
          <Icon name={icon} appearance="dark" size={5} />
        </GridColumn>
        <GridColumn col={11} className={priceContainerClassName}>
          <GridColumn col={6} className={styles['no-gutters']}>
            <Sandwich main={formatCurrency(props?.monthlyPrice, true)} suffix2={formattedData} suffix2Appearance="dark" />
          </GridColumn>
        </GridColumn>
      </GridRow>
      <GridRow>
        <GridColumn className={styles['benefits']}>
          <ItemHighlights items={descriptionItems} bullets />
        </GridColumn>
      </GridRow>
    </Grid>
  )
}

export default RedHybridBundle
