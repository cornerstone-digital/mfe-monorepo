import Container from '@web-core/components/atoms/Container'
import BlockContainer from '@web-core/components/molecules/BlockContainer'
import { Grid, GridColumn, GridRow } from '@vfuk/core-grid'
import Heading from '@web-core/components/atoms/Heading'
import Paragraph from '@web-core/components/atoms/Paragraph'
import Icon from '@web-core/components/atoms/Icon'

import { DeliveryOptionsProps } from './DeliveryOptions.types'

import styles from './DeliveryOptions.scss'

const renderColumn = (icon: string, title: string, content: JSX.Element) => {
  return (
    <GridColumn className={styles.column}>
      <div>
        <div className={styles['header']}>
          <Icon name={icon} marginRight={2} size={3} />
          <Heading size={5} level={5} fontWeight="bold">
            {title}
          </Heading>
        </div>
        {content}
      </div>
    </GridColumn>
  )
}

const DeliveryOptions = ({ hasCollection, hasPremiumDelivery, hasStandardDelivery }: DeliveryOptionsProps) => {
  return (
    <BlockContainer
      heading={{
        text: 'Delivery options',
        size: 5,
        level: 5,
        marginVertical: 1,
        fontWeight: 'extra-bold',
      }}
      collapse={{ collapsable: true, label: 'Hide' }}
      guttering="none"
      marginTop={2}
    >
      <Container gutters="horizontal">
        <Heading size={5} level={5} marginVertical={1} fontWeight="bold">
          Free standard delivery or collection
        </Heading>
        <Paragraph>You can have your order sent to any address in the UK or collect it from a Vodafone store near you.</Paragraph>
      </Container>
      <Grid>
        <GridRow marginTop={4}>
          {hasCollection && renderColumn('store', 'Click and collect', <Paragraph>Collect from your local Vodafone store.</Paragraph>)}
          {hasStandardDelivery &&
            renderColumn(
              'delivery',
              'Standard delivery',
              <Paragraph>
                Order <strong>before 10pm </strong> for free next day delivery.
              </Paragraph>,
            )}
          {hasPremiumDelivery &&
            renderColumn(
              'express-delivery',
              'Premium delivery',
              <Paragraph>Get next working day delivery and choose a time slot that suits.</Paragraph>,
            )}
        </GridRow>
      </Grid>
      <Container>
        <Paragraph>Please choose your delivery option when you reach the checkout.</Paragraph>
      </Container>
    </BlockContainer>
  )
}

DeliveryOptions.defaultProps = {
  hasCollection: false,
  hasPremiumDelivery: false,
  hasStandardDelivery: false,
}

export default DeliveryOptions
