import { FC, useContext } from 'react'
import classnames from 'classnames/bind'

import { Grid, GridColumn, GridRow } from '@vfuk/core-grid'
import Icon from '@web-core/components/atoms/Icon'
import Image from '@web-core/components/atoms/Image'

import BasketItemHeader from '@components/BasketItemHeader'

import SmartWatchDetails from './components/SmartWatchDetails'

import { BasketItemProps } from './BasketItem.types'
import BasketItemDescription from './components/BasketItemDescription/BasketItemDescription'
import BasketItemCosts from './components/BasketItemCosts'
import BasketItemContext from './context'
import getABTestFeatureValue from '@helpers/getABTestFeatureValue'

import styles from './BasketItem.scss'
import StorageColourDetails from './components/StorageColourDetails'
import MatchMedia from '@vfuk/core-match-media'
import BasketPackageContext from '@components/BasketContents/components/BasketPackage/context'

const cx = classnames.bind(styles as any)

const BasketItem: FC<BasketItemProps> = props => {
  const {
    isUpgrade = false,
    headerStatus = 'present',
    iconIsVisible = true,
    hideHeader = false,
    hideCosts = false,
    title,
    packageId,
    subTitle,
    dataSpeed,
    icon,
    iconAppearance,
    image,
    isBundle,
    description,
    onRemove,
    onUndo,
    isTotalCost,
    isSmartWatch,
    isSmartWatchSimo,
    changePackageLink,
    phonePaired,
    descriptionAlignment = 'left',
  } = props

  const isRemoved = headerStatus === 'removed'
  const itemBodyClassNames = cx('item-body-wrap', {
    removed: isRemoved,
  })

  const { isSmallBusiness } = useContext(BasketPackageContext)

  const descriptionClasses = cx(styles[`justify-${descriptionAlignment}`], styles['desc-column-large'])

  const bodyRowClass = hideHeader ? '' : styles['item-body']
  const showSmartWatchDetails = (isSmartWatch || isSmartWatchSimo) && isBundle
  const showDescription = description && (isSmartWatch || (!isSmartWatch && !isSmartWatchSimo))

  return (
    <BasketItemContext.Provider value={props}>
      <Grid className={styles['no-gutters']}>
        {!hideHeader && (
          <GridRow noGutters>
            <GridColumn col={isTotalCost ? 4 : 12} colMd={isTotalCost ? 7 : 12} colLg={isTotalCost ? 6 : 12} className={styles.header}>
              <BasketItemHeader
                title={title}
                subTitle={subTitle}
                dataSpeed={dataSpeed}
                headerStatus={headerStatus}
                showChangeButton={getABTestFeatureValue('changeLinkAB') || undefined}
                packageId={packageId}
                onRemove={onRemove}
                onUndo={onUndo}
                isTotalCost={isTotalCost}
                isUpgrade={isUpgrade}
                changePackageLink={changePackageLink}
              />
            </GridColumn>
            {isTotalCost && (
              <GridColumn col={8} colMd={5} colLg={6}>
                <Grid className={styles['no-gutters']}>
                  <GridRow noGutters>
                    <BasketItemCosts />
                  </GridRow>
                </Grid>
              </GridColumn>
            )}
          </GridRow>
        )}
        {!isTotalCost && (
          <div className={itemBodyClassNames} aria-hidden={isRemoved}>
            <GridRow noGutters className={bodyRowClass}>
              <GridColumn className={styles['icon-column-wrapper']} col={4} colMd={2} colLg={2}>
                {iconIsVisible && (
                  <>
                    {icon && <Icon name={icon} appearance={iconAppearance} size={5} />}
                    {image && <Image src={image} srcLg={image} width="auto" alt={title} className={styles['product-image']} />}
                  </>
                )}
              </GridColumn>
              <GridColumn className={descriptionClasses} col={12} colMd={5} colLg={4}>
                {showDescription && <BasketItemDescription />}
                {showSmartWatchDetails && <SmartWatchDetails phonePaired={phonePaired} />}
              </GridColumn>

              {!isTotalCost && !hideCosts && (
                <GridColumn col={8} colMd={5} colLg={6}>
                  <Grid className={styles['no-gutters']}>
                    <GridRow noGutters>
                      <BasketItemCosts />
                    </GridRow>
                  </Grid>
                </GridColumn>
              )}

              {isSmallBusiness && !isSmartWatch && getABTestFeatureValue('showStorageColourIcons') && (
                <MatchMedia breakpoint="sm">
                  <GridColumn col={8} colMd={5} colLg={6}>
                    <Grid className={styles['no-gutters']}>
                      <GridRow noGutters>
                        <StorageColourDetails />
                      </GridRow>
                    </Grid>
                  </GridColumn>
                </MatchMedia>
              )}
            </GridRow>
            {showDescription && (
              <GridRow className={styles['desc-column-small']} noGutters>
                <GridColumn>
                  <BasketItemDescription />
                </GridColumn>
              </GridRow>
            )}
            {showSmartWatchDetails && (
              <GridRow className={styles['desc-column-small']} noGutters>
                <GridColumn>
                  <SmartWatchDetails phonePaired={phonePaired} />
                </GridColumn>
              </GridRow>
            )}
          </div>
        )}
      </Grid>
    </BasketItemContext.Provider>
  )
}
export default BasketItem
