import BasketItemHeader from '@components/BasketItemHeader'
import getABTestFeatureValue from '@helpers/getABTestFeatureValue'
import { useStore } from '@store'
import classnames from 'classnames'
import getBasketPackageProps from '../../helpers/getBasketPackageProps/getBasketPackageProps'
import { PackageHeaderProps } from './PackageHeader.types'
import { PackageProps } from '../../BasketPackage.types'

import './PackageHeader.scss'

const PackageHeader = (props: PackageHeaderProps) => {
  const {
    renderedPackage,
    primaryPackage,
    isPairedWatch = false,
    title = '',
    subTitle = '',
    showPackageHeaderUnderline = false,
    actionDisabled,
  } = props

  const { basketStore } = useStore()
  const { basket, pageError } = basketStore
  const { isReviewMode, isUpgradeOrder = false } = basket

  const packageId = Array.isArray(renderedPackage) ? '' : renderedPackage?.packageId || ''
  const accountCategory: string = primaryPackage?.accountCategory || ''
  const packageProps: PackageProps = Array.isArray(renderedPackage)
    ? {}
    : getBasketPackageProps(renderedPackage, accountCategory, basketStore, primaryPackage.packageId)
  const { onRemove, onUndo, headerStatus, changePackageLink } = packageProps
  const headerClassNames = classnames('package-header', {
    'package-header-underline': showPackageHeaderUnderline,
    'package-header-overline': isPairedWatch,
  })

  const isChangeButtonVisible = getABTestFeatureValue('changeLinkAB')
    ? !isReviewMode && isPairedWatch && !Array.isArray(renderedPackage)
    : !isReviewMode

  return (
    <div styleName={headerClassNames}>
      <BasketItemHeader
        title={title}
        subTitle={subTitle}
        headerStatus={headerStatus}
        showChangeButton={isChangeButtonVisible}
        changePackageLink={changePackageLink}
        onRemove={onRemove}
        onUndo={onUndo}
        isPackage={true}
        packageId={packageId}
        pageError={pageError}
        reviewMode={isReviewMode}
        isUpgrade={isUpgradeOrder}
        actionDisabled={actionDisabled}
      />
    </div>
  )
}

export default PackageHeader
