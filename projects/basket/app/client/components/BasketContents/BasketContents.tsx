import Section from '@web-core/components/atoms/Section'
import BasketItem from '@components/BasketItem'
import FlexiUpgradeItem from './components/FlexiUpgradeItem'
import BasketPackage from './components/BasketPackage'

import { hasWatch, hasHandset } from '@helpers/typeCheck'
import sortByObjectProperty from '@helpers/sortByObjectProperty'
import { useStore } from '@store'

import { DiscountType } from '@constants'
import { BasketContentsProps, CombiPackageType } from './BasketContents.types'
import BasketContentsContext from './context/BasketContentsContext'

import './BasketContents.scss'
import { observer } from 'mobx-react-lite'

function sortBySequence<T extends object>(a: T, b: T) {
  return sortByObjectProperty('sequence' as keyof T, a, b)
}

const BasketContents = observer((props: BasketContentsProps) => {
  const { showPackageHeaderUnderline = true, showBorder = true } = props
  const { basketStore } = useStore()
  const { basket } = basketStore
  const { packages = [], activeBundles, combiPackageIds = [], deliveryInfo = {}, isReviewMode } = basket

  let uniqueSectionIndex = 0
  const isBusiness = packages[0]?.accountCategory?.toLocaleLowerCase() === 'business'
  const deliveryCost = (deliveryInfo?.price && deliveryInfo?.price[isBusiness ? 'net' : 'gross']) || '0'

  function transformCombiPackageData() {
    const combiPackages: CombiPackageType[] = []
    let remainingPackages = [...packages]
    if (combiPackageIds && combiPackageIds.length) {
      combiPackageIds.forEach(combiPackageId => {
        const includedPackages = remainingPackages.filter(remainingPackage => combiPackageId === remainingPackage.combiPackageId)
        if (includedPackages.length > 1) {
          includedPackages.sort(sortBySequence)
          combiPackages.push([...includedPackages])
          remainingPackages = remainingPackages.filter(remainingPackage => combiPackageId !== remainingPackage.combiPackageId)
        }
      })
    }
    return { combiPackages, remainingPackages }
  }

  function techDebtForceLionheartDiscountIntoQualifier(inputPackages: BasketV2.ModelPackage[]) {
    // if you are a BB customer and buying a 'qualifying line' it means
    // the discount applies to BB on your account and not the item in your basket
    // this tech debt forces the discount to be inside the qualifying line
    // in your basket so it shows to the customer.
    const existingCustomerPlans = activeBundles || []
    const existingPlansGettingLionheart = existingCustomerPlans.filter(bundle => {
      return bundle?.bundlePrice?.merchandisingPromotions?.mpType?.toLowerCase() === DiscountType.MULTI_PACKAGE_DISCOUNT || false
    })

    return inputPackages.map(item => {
      const matchingDiscount = existingPlansGettingLionheart.find(({ bundlePrice }) => {
        const { bundleId } = bundlePrice?.merchandisingPromotions?.qualifier || {}
        return bundleId === item.bundle?.skuId
      })

      if (matchingDiscount && item.bundle?.priceDetails) {
        item.bundle.priceDetails.merchandisingPromotions = matchingDiscount?.bundlePrice?.merchandisingPromotions
      }

      return item
    })
  }

  function pairedWatchPackages(packageId?: string, allPackages?: BasketV2.ModelPackage[]) {
    if (packageId && allPackages) {
      return allPackages.filter(({ packageLinkIdentifier = '' }) => {
        return packageLinkIdentifier === packageId
      })
    }
  }

  function renderPackage(thisPackage: CombiPackageType, allPackages: BasketV2.ModelPackage[]): JSX.Element | void {
    if (Array.isArray(thisPackage) || !thisPackage.packageLinkIdentifier) {
      let packageId
      let phonePaired

      if (Array.isArray(thisPackage)) {
        const handsetPackage = thisPackage.find(({ hardwares }) => hasHandset(hardwares))
        packageId = handsetPackage?.packageId
        const watchPackage = thisPackage.find(({ hardwares }) => hasWatch(hardwares))
        phonePaired = watchPackage?.primaryDeviceIdentifier
      } else {
        packageId = thisPackage.packageId
        phonePaired = thisPackage.primaryDeviceIdentifier
      }
      const matchedWatchPackages = pairedWatchPackages(packageId, allPackages)

      return (
        <BasketPackage
          key={uniqueSectionIndex}
          index={uniqueSectionIndex++}
          thisPackage={thisPackage}
          phonePaired={phonePaired}
          matchedWatchPackages={matchedWatchPackages}
          showBorder={showBorder}
          showPackageHeaderUnderline={showPackageHeaderUnderline}
        />
      )
    }
  }
  const { remainingPackages: remainingPkgs, combiPackages: combiPkgs } = transformCombiPackageData()
  const deliveryType = deliveryInfo?.deliveryType || ''
  const techDebtPackages = techDebtForceLionheartDiscountIntoQualifier(remainingPkgs)

  return (
    <BasketContentsContext.Provider value={{ isReviewMode }}>
      {combiPkgs.map(thisPackage => renderPackage(thisPackage, remainingPkgs))}
      {techDebtPackages.map(thisPackage => renderPackage(thisPackage, techDebtPackages))}
      <FlexiUpgradeItem />
      {deliveryType && deliveryType.toLowerCase() === 'premium' && (
        <Section borderShadow padding={2} marginBottom={2}>
          <BasketItem title="Premium delivery" icon="express-delivery" upfrontPrice={deliveryCost} isBusiness={isBusiness} />
        </Section>
      )}
    </BasketContentsContext.Provider>
  )
})

export default BasketContents
