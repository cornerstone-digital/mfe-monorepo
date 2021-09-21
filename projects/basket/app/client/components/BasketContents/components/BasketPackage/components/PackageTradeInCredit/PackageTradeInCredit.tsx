import { FC } from 'react'
import classnames from 'classnames'

import { Grid, GridColumn, GridRow } from '@vfuk/core-grid'
import Paragraph from '@web-core/components/atoms/Paragraph'
import Icon from '@vfuk/core-icon'
import BasketItemHeader from '@components/BasketItemHeader'

import PackageTradeInModal from '../PackageTradeInModal'
import PackageTradeInDetail from '../PackageTradeInDetail'

import { PackageTradeInCreditProps } from './PackageTradeInCredit.types'

import styles from './PackageTradeInCredit.scss'

const PackageTradeInCredit: FC<PackageTradeInCreditProps> = props => {
  const getHeaderTitle = () => {
    const isStatusRemoved = props?.headerStatus && ['removing', 'retrieving', 'removed'].includes(props.headerStatus)
    return `${isStatusRemoved ? 'y' : 'Y'}our guaranteed trade-in`
  }

  const containerClasses = classnames(styles.container, {
    [styles.hideTopBorder]: Boolean(props.hideTopBorder),
  })

  return (
    <div className={containerClasses}>
      <Grid className={styles['no-gutters']}>
        <GridRow noGutters className={styles['vertical-gutters']}>
          <GridColumn>
            <BasketItemHeader title={getHeaderTitle()} headerStatus={props.headerStatus} onRemove={props.onRemove} onUndo={props.onUndo} />
          </GridColumn>
        </GridRow>
        {props?.headerStatus !== 'removed' && (
          <GridRow noGutters className={styles.content}>
            <GridColumn className={styles['icon-column-wrapper']} col={2} alignSelfMd="center">
              <Icon name="top-up" appearance="primary" size={5} />
            </GridColumn>
            <GridColumn col={10} colMd={8}>
              <Paragraph fontSize="xs" className={styles.deviceName}>
                {props.tradeInCredit.deviceName}
              </Paragraph>
              <PackageTradeInDetail tradeInCredit={props.tradeInCredit} />
            </GridColumn>
            <GridColumn className={styles['tradein-column-wrapper']} col={12} colMd={2}>
              <PackageTradeInModal
                packageId={props.packageId}
                uniqueCode={props.tradeInCredit.quoteId}
                expiryDate={props.tradeInCredit.expiryDateTime}
                deviceName={props.tradeInCredit.deviceName}
                pageContent={props.pageContent}
              />
            </GridColumn>
          </GridRow>
        )}
      </Grid>
    </div>
  )
}

export default PackageTradeInCredit
