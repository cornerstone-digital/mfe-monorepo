import containsText from '@web-shop-core/helpers/containsText'

import BasketItem from '@components/BasketItem'

import getPrice from '@helpers/getPrice'
import getBundleDescription from '../../helpers/getBundleDescription'

import { BasketExtraProps } from './BasketExtras.types'
import { isBroadband, isFixedLineService, isInsuranceService } from '@helpers/typeCheck'
import { ServiceValues } from '../PackageItemList/PackageItemList.types'
import isHiddenService from './helpers/isHiddenService'
import getPicture from './helpers/getPicture'

const BasketExtra = (props: BasketExtraProps) => {
  const { service, onUndoRemoveAddOn, onRemoveAddOn, isBusiness, flags, planType, bundleType, packageId } = props
  const {
    skuId,
    displayName,
    priceDetails,
    name,
    displayDescription,
    headerStatus,
    description,
    productClass,
    packageLineId,
  }: ServiceValues = service

  const onUndo = () => {
    if (onUndoRemoveAddOn) {
      onUndoRemoveAddOn(packageId, skuId, 'SERVICE')
    }
  }

  const onRemove = () => {
    if (onRemoveAddOn) {
      onRemoveAddOn(packageId, packageLineId, skuId)
    }
  }

  const monthlyPrice = getPrice(priceDetails?.monthlyPrice, isBusiness)
  const upfrontPrice = getPrice(priceDetails?.oneOffPrice, isBusiness)
  const descriptionFromAllowances: React.ReactNode[] = getBundleDescription(service)
  const isEngineer: boolean = containsText([name, displayDescription, description], ['engineer', 'installation'])
  const isInsurance = isInsuranceService(service)
  const itemTitle: ServiceValues['displayName'] | ServiceValues['name'] = displayName || name
  let itemDescription: React.ReactNode[] = []
  if (displayDescription) itemDescription = [displayDescription]

  if (descriptionFromAllowances && descriptionFromAllowances.length) {
    itemDescription = descriptionFromAllowances
  }

  const isHBB = isBroadband(planType)
  const combinedName: string = (name || '' + displayName || '').toLowerCase()
  const isPaygAddon: boolean = combinedName.includes('big value bundle') || combinedName.includes('topup')
  const isBasicSimo: boolean = !!(planType?.toLowerCase() === 'simo' && bundleType?.toLowerCase().includes('basic'))
  const isBoltOn: boolean = productClass?.toLowerCase() === 'mbb traffic bolt-ons'
  const hasOnRemove = !isBasicSimo && !isPaygAddon && !isBoltOn && !isHBB && onRemoveAddOn
  const hasOnUndo = !isHBB && onUndoRemoveAddOn

  const basketItemProps = {
    key: skuId,
    title: itemTitle,
    description: itemDescription,
    iconAppearance: 'dark',
    onUndo: hasOnUndo ? onUndo : undefined,
    onRemove: hasOnRemove ? onRemove : undefined,
    upfrontPrice,
    monthlyPrice,
    headerStatus,
    isBusiness: isInsurance ? false : isBusiness,
    ...getPicture(isEngineer, isFixedLineService(service), isHBB, isInsurance, name),
    flags,
  }

  if (isHiddenService(service, isBusiness)) return null

  return <BasketItem {...basketItemProps} />
}

export default BasketExtra
