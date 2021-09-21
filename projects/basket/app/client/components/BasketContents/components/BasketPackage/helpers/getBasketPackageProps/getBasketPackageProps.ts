import generateChangePackageLink from '@helpers/generateChangePackageLink'
import { hasWatch } from '@helpers/typeCheck'
import BasketStore from '@store/BasketStore'
import { PackageWithHeaderStatus } from '../../BasketPackage.types'
import getBasketParams from '../getBasketParams'

const getBasketPackageProps = (
  item: PackageWithHeaderStatus,
  accountCategory: string,
  store: BasketStore,
  primaryPackageId?: string,
  watchPackageIds?: (string | undefined)[],
) => {
  const { headerStatus, packageId, hardwares } = item
  const _watchPackageIds = hasWatch(hardwares) ? [packageId] : watchPackageIds ? watchPackageIds : []
  const changePackageLink = generateChangePackageLink(item)

  const onRemove = () => {
    store.onRemovePackage(packageId)
  }

  const onUndo = () => {
    store.onUndoRemovePackage(primaryPackageId, getBasketParams(item, accountCategory, store.basketId), _watchPackageIds)
  }

  return {
    headerStatus,
    changePackageLink,
    onRemove,
    onUndo,
    packageId,
  }
}

export default getBasketPackageProps
