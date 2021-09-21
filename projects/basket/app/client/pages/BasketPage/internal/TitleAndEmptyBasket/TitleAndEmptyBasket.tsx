import classnames from 'classnames'
import { observer } from 'mobx-react-lite'
import { useStore } from '@store'

import Heading from '@web-core/components/atoms/Heading'
import Icon from '@web-core/components/atoms/Icon'
import { Grid, GridColumn, GridRow } from '@vfuk/core-grid'

import { hasBroadband } from '@helpers/typeCheck'

import getABTestFeatureValue from '@helpers/getABTestFeatureValue'

import styles from './TitleAndEmptyBasket.scss'

const TitleAndEmptyBasket = observer(() => {
  const {
    basketStore,
    pageUiStore: { toggleModal },
  } = useStore()
  const {
    basket: { isUpgradeOrder, isBusiness },
    hasSmartWatch,
    packages,
    bundleIdentifier,
  } = basketStore

  const emptyBasketInfo = JSON.stringify({
    link_name: 'basket summary:empty basket',
  })

  const wrapperClassNames = classnames(styles.grid, {
    'grid-ab': !isBusiness && getABTestFeatureValue('showDoubledTotalCost'),
  })

  return (
    <Grid className={wrapperClassNames}>
      <GridRow noGutters>
        <GridColumn col={10} offset={1} offsetMd={3} colMd={6} className={styles['justify-center']} alignSelf="end">
          <Heading level={2} size={3} justify="center" fontWeight="light" marginBottom={0}>
            {isUpgradeOrder ? 'Your upgrade order' : 'Your items'}
          </Heading>
        </GridColumn>
        <GridColumn col={1} colMd={3} className={styles['empty-button-column']}>
          <button
            data-info={emptyBasketInfo}
            onClick={() => toggleModal('emptyBasket')}
            className={styles['empty-basket']}
            data-selector="empty-basket-button"
          >
            <span className={styles['empty-basket-text']}> Empty basket </span>
            <Icon size={4} name="shopping-basket-remove" marginLeft={1} />
          </button>
        </GridColumn>
      </GridRow>
      {isUpgradeOrder && !hasSmartWatch && (
        <GridRow>
          <GridColumn className={styles['justify-center']}>
            <Heading level={3} size={4} justify="center" fontWeight="light" marginBottom={0}>
              For {hasBroadband(packages) && 'account'} number {bundleIdentifier}
            </Heading>
          </GridColumn>
        </GridRow>
      )}
    </Grid>
  )
})

export default TitleAndEmptyBasket
