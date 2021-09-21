// Core components
import { Grid, GridColumn, GridRow } from '@vfuk/core-grid'
import Paragraph from '@web-core/components/atoms/Paragraph'

// Local components
import BasketItemHeader from '@components/BasketItemHeader'
import ItemHighlights from '@components/ItemHighlights'

// Helpers
import getHardwareAsset from '../../helpers/getHardwareAsset'

// consts / types
import { BasketIncludedItemsProps } from './BasketIncludedItems.types'

import { HeaderGridColumn, ImageStyled } from './BasketIncludedItems.styled'

import styles from './BasketIncludedItems.scss'

const BasketIncludedItems = ({ title, hardwares, footer }: BasketIncludedItemsProps) => {
  const orderedHardwares = hardwares
    .map(hardware => {
      return {
        order: hardware?.displayOrder || 0,
        name: hardware?.displayName || '',
        image: getHardwareAsset('handset', hardware?.merchandisingMedia),
      }
    })
    .sort((a, b) => a.order - b.order)

  const isOneHardwareOnly = orderedHardwares.length === 1

  const hardwareDescriptions = (
    <ItemHighlights items={orderedHardwares.map(h => h.name)} bullets>
      <If condition={Boolean(footer)}>
        <Paragraph marginTop={1}>{footer}</Paragraph>
      </If>
    </ItemHighlights>
  )

  return (
    <>
      <Grid className={styles['no-gutters']}>
        <GridRow noGutters>
          <HeaderGridColumn col={12} colMd={12} colLg={12}>
            <BasketItemHeader title={title} />
          </HeaderGridColumn>
        </GridRow>

        <GridRow noGutters marginTop={1}>
          <GridColumn alignSelf="center" col={12} colMd={isOneHardwareOnly ? 12 : 7} colLg={isOneHardwareOnly ? 12 : 6}>
            <Grid className={styles['no-gutters']}>
              <GridRow noGutters marginTop={1} marginBottom={2}>
                {orderedHardwares.map((h, index) => (
                  <GridColumn col={isOneHardwareOnly ? 2 : 3} key={`${index}-${h.image}`} className={styles['hardware-image']}>
                    <ImageStyled src={h.image} srcLg={h.image} alt={h.image} />
                  </GridColumn>
                ))}
                <If condition={isOneHardwareOnly}>
                  <GridColumn className={styles['visible-only-md']} alignSelf="start" colMd={5} colLg={4}>
                    {hardwareDescriptions}
                  </GridColumn>
                </If>
              </GridRow>
            </Grid>
          </GridColumn>
        </GridRow>
        <GridRow noGutters className={isOneHardwareOnly ? styles['visible-only-mobile'] : ''}>
          <GridColumn offsetMd={2} col={12} colMd={5} colLg={4} className={styles['hardware-desc']}>
            {hardwareDescriptions}
          </GridColumn>
        </GridRow>
      </Grid>
    </>
  )
}

export default BasketIncludedItems
