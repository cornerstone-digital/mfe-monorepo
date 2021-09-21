import AnalyticsUtil from '@utilities/Analytics'
import styles from './ChangeLink.scss'
import { ChangeLinkProps } from './ChangeLink.types'

import { useStore } from '@store'

const ChangeLink = ({ itemType, packageId, pageError, reviewMode, changePackageLink }: ChangeLinkProps) => {
  const { basketStore } = useStore()
  const { basket } = basketStore
  const goToChangePackage = () => {
    if (!reviewMode) {
      AnalyticsUtil.trackLink('basketPage.changePackageCta', {
        newBasket: basket,
        packageId,
        pageError,
        itemType,
      })
    }
    window.location.href = changePackageLink || ''
  }

  const dataSelector = itemType ? `change-${itemType}` : 'change-package'

  return (
    <button onClick={goToChangePackage} className={styles['change-button']} data-selector={dataSelector}>
      Change
    </button>
  )
}

export default ChangeLink
