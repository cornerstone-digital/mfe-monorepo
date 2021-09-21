import { useEffect, useRef, useContext, useState } from 'react'
import classnames from 'classnames'

import Heading from '@web-core/components/atoms/Heading'
import Paragraph from '@web-core/components/atoms/Paragraph'

import ChangeLink from './internal/ChangeLink'
import BasketContentsContext from '@components/BasketContents/context/BasketContentsContext'

import getHeaderStatusDetails from './helpers/getHeaderStatusDetails'
import DataSpeedButton from './internal/DataSpeedButton'
import getItemType from './helpers/getItemType'
import getABTestFeatureValue from '@helpers/getABTestFeatureValue'

import styles from './BasketItemHeader.scss'
import { BasketItemHeaderProps, HeaderClassNames, HeaderStatusType } from './BasketItemHeader.types'
import getSelectorFromTitle from './helpers/getSelectorFromHeaderTitle'

const BasketItemHeader = (props: BasketItemHeaderProps) => {
  const {
    headerStatus = 'present',
    isPackage = false,
    showChangeButton = true,
    onRemove,
    onUndo,
    isTotalCost,
    titleColor,
    isUpgrade,
    changePackageLink,
    title,
    subTitle,
    pageError,
    dataSpeed,
    packageId,
    actionDisabled,
  } = props

  const [isTransitioning, setIsTransitioning] = useState(false)
  const [savedHeaderStatus, setHeaderStatus] = useState<HeaderStatusType>(headerStatus)
  const { isReviewMode } = useContext(BasketContentsContext)

  let headerAnimateTimeout = useRef<NodeJS.Timeout>()

  const cleanTimeouts = () => {
    if (headerAnimateTimeout.current) {
      clearTimeout(headerAnimateTimeout.current)
    }
  }

  useEffect(() => {
    if (headerStatus !== savedHeaderStatus) {
      cleanTimeouts()
      setIsTransitioning(true)
      headerAnimateTimeout.current = setTimeout(() => {
        setIsTransitioning(false)
        setHeaderStatus(headerStatus)
      }, 300)
    }

    return () => {
      cleanTimeouts()
    }
  }, [headerStatus])

  const handleClick = () => {
    if (onRemove && onUndo && !isTransitioning && ['present', 'removed'].includes(savedHeaderStatus)) {
      if (savedHeaderStatus === 'present') {
        return onRemove && onRemove()
      }
      return onUndo && onUndo()
    }
  }
  const headerActionIsDisabled = ['removing', 'retrieving'].includes(savedHeaderStatus)
  const classNames: HeaderClassNames = {
    containerClassNames: classnames('item-header', {
      'is-hidden': isTransitioning,
      'total-cost': isTotalCost,
      [titleColor as string]: !!titleColor,
    }),
    actionButtonClassNames: classnames('action-button', { 'is-disabled': headerActionIsDisabled }),
    subTitleClassNames: classnames('sub-title', { 'is-upgraded': isUpgrade }),
  }

  const showAction = !!onRemove && !!onUndo && !actionDisabled
  const { containerClassNames, actionButtonClassNames, subTitleClassNames } = classNames

  const showChangeLink =
    showChangeButton &&
    (getABTestFeatureValue('changeLinkAB') || isPackage || showAction) &&
    changePackageLink &&
    savedHeaderStatus === 'present'
  const headerStatusDetails = getHeaderStatusDetails(title, subTitle, savedHeaderStatus, isPackage)
  const headerActionSelector = `basket-header-action-${getSelectorFromTitle(headerStatusDetails?.headerTitle || '')}`

  return (
    <div styleName={containerClassNames}>
      <div className={styles['item-title']}>
        <Heading level={5} size={isTotalCost ? 4 : 6} margin={0} fontWeight="bold">
          {headerStatusDetails?.headerTitle}
          {showChangeLink && !isReviewMode && (
            <ChangeLink
              packageId={packageId}
              pageError={pageError}
              changePackageLink={changePackageLink}
              itemType={getItemType(changePackageLink)}
            />
          )}
        </Heading>
        {dataSpeed?.key && <DataSpeedButton packageId={packageId} pageError={pageError} dataSpeed={dataSpeed} />}
        {headerStatusDetails?.headerSubTitle && (
          <Paragraph fontSize="xs" styleName={subTitleClassNames}>
            {headerStatusDetails.headerSubTitle}
          </Paragraph>
        )}
      </div>
      {showAction && !isReviewMode && (
        <button onClick={handleClick} styleName={actionButtonClassNames} data-selector={headerActionSelector}>
          <span className={styles['action-text']}>{headerStatusDetails?.headerAction}</span>
          {headerStatusDetails?.headerIcon}
        </button>
      )}
    </div>
  )
}
export default BasketItemHeader
