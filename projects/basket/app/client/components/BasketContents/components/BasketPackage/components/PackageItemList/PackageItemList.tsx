import { useContext } from 'react'
import { BASKET_CONSTS } from '@constants'

import ListGroup from '@web-core/components/molecules/ListGroup'

import BasketItemHeader from '@components/BasketItemHeader'
import SimPanel from '@components/SimPanel'
import BasketAccessory from '@components/BasketAccessory'

import BasketBundle from '../BasketBundle'
import RedHybridBundle from '../RedHybridBundle'

import BasketHardware from '../BasketHardware'
import BasketExtra from '../BasketExtra'
import BasketIncludedItems from '../BasketIncludedItems'

import matchesConstCI from '@helpers/matchesConstCI'
import {
  isSimCard,
  hasWatch,
  hasHandset,
  isBroadband,
  isSimo,
  isSimTypeHybrid,
  isSimTypeEsim,
  isRedHybridPackage,
  hasSimTypePhysical,
} from '@helpers/typeCheck'
import filterHardware from '@helpers/filterHardware'
import generateChangePackageLink from '@helpers/generateChangePackageLink'

import { PackageItemListProps, CombiProps } from './PackageItemList.types'
import getBingoFooterMessage from './helpers/getBingoFooterMessage'
import getNonSimHardware from '@helpers/getNonSimHardware'
import BasketFooter from '../BasketFooter'
import getCombinedServices from './helpers/getCombinedServices'
import SwitchMyNetwork from '@components/SwitchMyNetwork'
import isHiddenService from '../BasketExtra/helpers/isHiddenService'
import getSimCardDisplayName from './helpers/getSimCardDisplayName'
import isSwitchMyNetworkHidden from './helpers/isSwitchMyNetworkHidden'
import getABTestFeatureValue from '@helpers/getABTestFeatureValue'
import BasketPackageContext from '../../context'
import { useStore } from '@store'
import getPrice from '@helpers/getPrice'

const PackageItemList = (props: PackageItemListProps) => {
  const {
    isUpgrade,
    isBusiness,
    phonePaired,
    isPairedWatch,
    flags,
    onRemoveAddOn,
    onUndoRemoveAddOn,
    packageId,
    onUpdateBasket,
    modelPackage,
    reviewMode,
    pageError,
    combiProps,
    upfrontPrice,
    monthlyPrice,
    pageContent,
    hasWatchPackage,
    updateStatus,
  } = props

  const { basket } = useStore().basketStore
  const { isSmallBusiness } = useContext(BasketPackageContext)
  const isCombi = Array.isArray(modelPackage)
  const modelPackages = Array.isArray(modelPackage) ? modelPackage : [modelPackage]
  const bingoFooterMessage = getBingoFooterMessage(
    pageContent?.vf_Modules?.messages?.content?.basket_bingo_subtotal_footer?.bodyText,
    modelPackage,
  )
  const totalCostTitle = isPairedWatch ? 'Watch total' : hasWatchPackage && !isCombi ? 'Phone total' : 'Subtotal'
  const hasAnyHandsetOrWatch = modelPackages.some(pkg => hasHandset(pkg.hardwares) || hasWatch(pkg.hardwares))
  const hasRedHybridPackage = modelPackages.some(pkg => isRedHybridPackage(pkg))

  const renderSimPanel = (packageItem: BasketV2.ModelPackage, planType: string, isWatch?: boolean) => {
    if (!planType) {
      return null
    }

    const { packageId: modelPackageId = '', hardwares = [], bundle } = packageItem
    const nonSimHardware = getNonSimHardware(hardwares)
    const simCardDisplayName = getSimCardDisplayName(hardwares)
    const isEsimCompatible = isSimTypeHybrid(nonSimHardware) || isSimTypeEsim(nonSimHardware) || isSimo(bundle)
    const isCompatiblePlan = hasHandset(hardwares) || isSimo(bundle)
    const isWatchPlanUpgrade = matchesConstCI(BASKET_CONSTS.PLAN_TYPE_WATCH_SIMO, planType)
    const isPhysicalSimReview = reviewMode && !matchesConstCI(BASKET_CONSTS.BUNDLE_DISPLAY_NAME_ESIM, simCardDisplayName)

    // Only displays the SimPanel for relevant handset & simo plans
    if (isRedHybridPackage(packageItem) || !isEsimCompatible || !isCompatiblePlan || isWatch || isPhysicalSimReview || isWatchPlanUpgrade) {
      return null
    }

    return (
      <SimPanel
        simType={nonSimHardware?.simType}
        isUpgrade={isUpgrade}
        isSimo={isSimo(bundle)}
        pageContent={pageContent}
        reviewMode={reviewMode}
        packageId={modelPackageId}
        onChange={onUpdateBasket}
        selectedSimName={simCardDisplayName}
        updateStatus={updateStatus}
        basket={basket}
        pageError={pageError}
      />
    )
  }

  const getPackageContents = (item: BasketV2.ModelPackage, combiHandlers?: CombiProps) => {
    const { bundle = {}, packageId: packageIdFromItem = '', services = [], planType = '', hardwares: originalHardware = [] } = item
    const { portability, displayName } = bundle
    const { filteredHardware, filteredAccessories } = filterHardware(originalHardware, isBroadband(planType))
    const isWatch = hasWatch(filteredHardware)
    const isHandset = hasHandset(filteredHardware)
    const combinedServices = hasRedHybridPackage ? [] : getCombinedServices(planType, bundle, services)
    const hasVisibleService = combinedServices.some(combinedService => !isHiddenService(combinedService, isBusiness))

    // display addon header for accessories AND services
    const displayAddonHeader = !isCombi && (!!filteredAccessories.length || hasVisibleService)

    const hardwares = originalHardware.filter(hardware => !isSimCard(hardware))
    const footerCopy = pageContent?.vf_Modules?.basket_router_delivery_information?.subTitle
    const changePackageLink = generateChangePackageLink({ ...item, services: combinedServices })

    const renderIncludedForHBB = isBroadband(planType) && hardwares.length > 0

    const addSwitchMyNetwork =
      (!hasRedHybridPackage && !(isSwitchMyNetworkHidden(portability, planType, isUpgrade, reviewMode) || isWatch)) ||
      (hasRedHybridPackage && !hasSimTypePhysical(item?.hardwares))

    const addBundle = !hasRedHybridPackage && !!bundle?.skuId

    return [
      ...filteredHardware.map((hardware, i) => {
        if (!(isBroadband(planType) || isSimCard(hardware))) {
          return (
            <BasketHardware
              key={i}
              {...{
                hardware,
                isPairedWatch,
              }}
              changePackageLink={getABTestFeatureValue('changeLinkAB') ? changePackageLink : undefined}
            />
          )
        }
      }),
      addBundle ? (
        <BasketBundle
          combiHandlers={combiHandlers}
          onUpdateBasket={onUpdateBasket}
          packageId={packageId}
          isUpgrade={isUpgrade}
          isBusiness={isBusiness}
          reviewMode={reviewMode}
          pageError={pageError}
          phonePaired={phonePaired}
          flags={flags}
          {...item}
          // Used to toggle bundle icon/text for esim
          displayName={getSimCardDisplayName(originalHardware)}
          isWatch={isWatch}
          isHandset={isHandset}
          changePackageLink={changePackageLink}
        />
      ) : null,
      hasRedHybridPackage ? (
        <RedHybridBundle
          packageId={packageId}
          monthlyPrice={getPrice(item?.priceDetails?.monthlyPrice, false)}
          reviewMode={reviewMode}
          services={item.services}
          hardwares={item.hardwares}
        />
      ) : null,
      renderIncludedForHBB ? (
        <BasketIncludedItems title={`Included with ${displayName}`} hardwares={hardwares} footer={footerCopy} />
      ) : null,
      renderSimPanel(item, planType.toLowerCase(), isWatch),
      addSwitchMyNetwork ? (
        <SwitchMyNetwork
          portability={portability}
          basket={basket}
          packageId={packageId}
          pageError={pageError}
          reviewMode={reviewMode}
          onUpdateBasket={onUpdateBasket}
        />
      ) : null,
      displayAddonHeader ? <BasketItemHeader title="Add Ons" /> : null,
      ...combinedServices.map((service, index) => (
        <BasketExtra
          key={index}
          service={service}
          packageId={packageIdFromItem}
          planType={planType}
          bundleType={bundle.bundleType}
          onUndoRemoveAddOn={onUndoRemoveAddOn}
          onRemoveAddOn={onRemoveAddOn}
          isBusiness={isBusiness}
          flags={flags}
        />
      )),
      ...filteredAccessories.map(accessory => {
        if (accessory)
          return (
            <BasketAccessory
              key={accessory.packageLineId}
              accessory={accessory}
              packageId={packageId}
              isBusiness={isBusiness}
              onRemoveAddOn={onRemoveAddOn}
              onUndoRemoveAddOn={onUndoRemoveAddOn}
            />
          )
      }),
    ]
  }

  const content = modelPackages.reduce((acc: (JSX.Element | null | undefined)[], combiPackage, i) => {
    const packageContent = getPackageContents(combiPackage, Array.isArray(modelPackage) ? (combiProps || [])[i] : undefined)
    if (packageContent) {
      acc.push(...packageContent)
    }
    return acc
  }, [])

  if (!hasRedHybridPackage) {
    content.push(
      <BasketFooter
        key="BasketFooter"
        isBingoMessageVisible={!isUpgrade && hasAnyHandsetOrWatch}
        isSmallBusiness={isSmallBusiness}
        bingoFooterMessage={bingoFooterMessage}
        isBusiness={isBusiness}
        monthlyPrice={monthlyPrice}
        upfrontPrice={upfrontPrice}
        totalCostTitle={totalCostTitle}
      />,
    )
  }

  return <ListGroup items={content} type="article" />
}

export default PackageItemList
