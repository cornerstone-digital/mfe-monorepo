import { PackageRemoveUndoParams } from '@pages/BasketPage/BasketPage.types'

export type OnUndoRemovePackage = (
  packageId: BasketV2.ModelPackage['packageId'],
  basketParams: PackageRemoveUndoParams,
  watchPackageIds: (string | undefined)[],
) => Promise<void>

export type OnRemovePackage = (packageId: BasketV2.ModelPackage['packageId']) => Promise<void>
