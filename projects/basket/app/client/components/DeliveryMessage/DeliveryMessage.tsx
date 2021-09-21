import styles from './DeliveryMessage.scss'
import Icon from '@vfuk/core-icon'
import { Grid, GridColumn, GridRow } from '@vfuk/core-grid'

const DeliveryMessage = () => {
  return (
    <Grid>
      <GridRow className={styles['message-container']}>
        <GridColumn className={styles['message-icon']}>
          <Icon name="delivery" />
        </GridColumn>
        <GridColumn className={styles['home-delivery']}>
          <p className={styles.header}>
            <strong>Free home delivery tomorrow</strong>
          </p>
          <p className="text">if ordered before 10pm today (excludes Northern Ireland)</p>
        </GridColumn>
      </GridRow>
    </Grid>
  )
}

export default DeliveryMessage
