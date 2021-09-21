import getPrice from '@helpers/getPrice'
import getHardwareAsset from '@components/BasketContents/components/BasketPackage/helpers/getHardwareAsset'

import BasketItem from '@components/BasketItem'

import { BasketAccessoryProps } from './BasketAccessory.types'

const BasketAccessory = (props: BasketAccessoryProps): JSX.Element => {
  const { accessory, isBusiness, onRemoveAddOn, onUndoRemoveAddOn, packageId } = props
  const { displayName, priceDetails, packageLineId, merchandisingMedia, skuId, headerStatus } = accessory
  const monthly = getPrice(priceDetails?.monthlyPrice, isBusiness)
  const upFront = getPrice(priceDetails?.oneOffPrice, isBusiness)
  const image = getHardwareAsset('accessories', merchandisingMedia)

  const onRemove = onRemoveAddOn ? () => onRemoveAddOn(packageId, packageLineId, skuId) : undefined
  const onUndo = onUndoRemoveAddOn ? () => onUndoRemoveAddOn(packageId, skuId, 'HARDWARE') : undefined

  return (
    <BasketItem
      key={packageLineId}
      title={displayName}
      upfrontPrice={upFront}
      monthlyPrice={monthly}
      image={image}
      onRemove={onRemove}
      onUndo={onUndo}
      headerStatus={headerStatus}
      isBusiness={isBusiness}
    />
  )
}

export default BasketAccessory
