import BasketAccessory from '@components/BasketAccessory'
import { isAccessory } from '@helpers/typeCheck'
import ListGroup from '@web-core/components/molecules/ListGroup'
import { PackageAccessoryBodyProps } from './PackageAccessoryBody.types'

const PackageAccessoryBody = (props: PackageAccessoryBodyProps) => {
  const { primaryPackage, isBusiness, onRemoveAddOn, onUndoRemoveAddOn } = props

  const filteredAccessories = primaryPackage.hardwares?.filter(item => isAccessory(item))
  if (!filteredAccessories?.length) {
    return null
  }

  return (
    <ListGroup
      items={filteredAccessories.map(accessory => {
        if (accessory)
          return (
            <BasketAccessory
              key={accessory.packageLineId}
              accessory={accessory}
              packageId={primaryPackage.packageId}
              isBusiness={isBusiness}
              onRemoveAddOn={onRemoveAddOn}
              onUndoRemoveAddOn={onUndoRemoveAddOn}
            />
          )
      })}
    />
  )
}

export default PackageAccessoryBody
