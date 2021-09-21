import { Fragment } from 'react'
import classnames from 'classnames'

import Section from '@web-core/components/atoms/Section'

import BasketItem from '@components/BasketItem'
import PackageFooter from '@components/PackageFooter'
import PackageDiscounts from './components/PackageDiscounts'
import PackageTradeInCredit from './components/PackageTradeInCredit'
import PackageItemList from './components/PackageItemList'

import {
  hasWatch,
  isBusiness as isBusinessType,
  isSimo,
  hasBasketAnyDiscount,
  isAccessoryPackage,
  isAccessory,
  isRedHybridPackage,
} from '@helpers/typeCheck'

import { BasketPackageProps, PackageWithHeaderStatus, BorderDetails } from './BasketPackage.types'

import styles from './BasketPackage.scss'
import getSimoPlanLink from '@helpers/getSimoPlanLink'

import getPackageWithHandset from './helpers/getPackageWithHandset'
import isBingoPackage from './helpers/isBingoPackage'
import getAllActivePackages from './helpers/getAllActivePackages'
import getPackagePrices from './helpers/getPackagePrices'
import getCombinedPackageTotals from './helpers/getCombinedPackageTotals'
import getPairedWatchSubTitle from './helpers/getPairedWatchSubTitle'
import getPairedWatchTitle from './helpers/getPairedWatchTitle'

import BasketPackageContext from './context'
import { useStore } from '@store/index'
import { observer } from 'mobx-react-lite'
import { flowResult } from 'mobx'
import getBasketPackageProps from './helpers/getBasketPackageProps/getBasketPackageProps'
import PackageHeader from './components/PackageHeader/PackageHeader'
import PackageAccessoryBody from './components/PackageAccessory/PackageAccessoryBody'
import PackageAccessoryHeader from './components/PackageAccessory/PackageAccessoryHeader'
import { BasketHardwareWithHeaderStatus } from '@pages/BasketPage/BasketPage.types'

const BasketPackage = observer((props: BasketPackageProps) => {
  const { thisPackage, showBorder, matchedWatchPackages = [], index, showPackageHeaderUnderline, phonePaired } = props
  const allActivePackages = getAllActivePackages(thisPackage, matchedWatchPackages)
  const { basketStore } = useStore()
  const { pageContent, basket, pageError, flags } = basketStore
  const { isUpgradeOrder = false, isReviewMode, isSmallBusiness: isSmallBusinessStore = false, packages } = basket

  const checkOnlyAccessoryPackageLeftOnBasket = (activePackage: PackageWithHeaderStatus) => {
    return (
      isAccessoryPackage(activePackage) &&
      !packages?.filter((item: PackageWithHeaderStatus) => item.packageId !== activePackage.packageId && item.headerStatus !== 'removed')
        .length &&
      activePackage?.hardwares &&
      activePackage.hardwares.filter((h: BasketHardwareWithHeaderStatus) => h.headerStatus !== 'removed').length < 2
    )
  }

  const primaryPackage: PackageWithHeaderStatus = Array.isArray(thisPackage) ? getPackageWithHandset(thisPackage) : thisPackage

  const onUpdateBasket = flowResult((...args: Parameters<typeof basketStore.updateBasket>) => basketStore.updateBasket(...args))
  const onRemoveAddOn = flowResult(
    checkOnlyAccessoryPackageLeftOnBasket(primaryPackage)
      ? (...args: Parameters<typeof basketStore.onRemovePackage>) => basketStore.onRemovePackage(...args)
      : (...args: Parameters<typeof basketStore.onRemoveAddOn>) => basketStore.onRemoveAddOn(...args),
  )

  const onUndoRemoveAddOn = flowResult((...args: Parameters<typeof basketStore.onUndoRemoveAddOn>) =>
    basketStore.onUndoRemoveAddOn(...args),
  )
  const updateStatus = flowResult((...args: Parameters<typeof basketStore.updateStatus>) => basketStore.updateStatus(...args))

  // All active packages that could be included in the 'logical package'. E.G. Handset/SIMO + BB + Watches

  const isBusiness: boolean = isBusinessType(primaryPackage?.accountCategory)
  const isSmallBusiness: boolean = primaryPackage?.accountSubCategory === 'smallBusiness' || isSmallBusinessStore
  const netGrossType: keyof BasketV2.Price = isBusiness ? 'net' : 'gross'
  const accountCategory: string = primaryPackage?.accountCategory || ''
  const primaryPackageId: string | undefined = primaryPackage?.packageId

  const borderColor = isUpgradeOrder ? 'marketingTurquoise' : 'none'
  const borderDetails: BorderDetails = showBorder ? { borderAppearance: borderColor, borderShadow: true } : {}

  const watchPackageIds: PackageWithHeaderStatus['packageId'][] = matchedWatchPackages.map(({ packageId }) => packageId)

  const getPackageProps = (packageWithHeaderStatus: PackageWithHeaderStatus) => {
    return getBasketPackageProps(packageWithHeaderStatus, accountCategory, basketStore, primaryPackageId, watchPackageIds)
  }

  const renderPackageBody = (
    renderedPackage: PackageWithHeaderStatus | PackageWithHeaderStatus[],
    isPairedWatch: boolean,
  ): JSX.Element | JSX.Element[] => {
    const flagsWithBingo = {
      ...flags,
      isBingoEnabled: isBingoPackage(renderedPackage),
    }

    let packageProps = {}
    let combiProps
    let packageTotals

    if (Array.isArray(renderedPackage)) {
      combiProps = renderedPackage.map((combiPackage: PackageWithHeaderStatus) => getPackageProps(combiPackage))
      packageTotals = getCombinedPackageTotals(renderedPackage, false, netGrossType)
    } else {
      packageProps = getPackageProps(renderedPackage)
      packageTotals = getPackagePrices(renderedPackage, false, netGrossType)
    }

    return isAccessoryPackage(primaryPackage) ? (
      <PackageAccessoryBody
        primaryPackage={primaryPackage}
        isBusiness={isBusiness}
        onRemoveAddOn={onRemoveAddOn}
        onUndoRemoveAddOn={onUndoRemoveAddOn}
      />
    ) : (
      <PackageItemList
        onUpdateBasket={onUpdateBasket}
        modelPackage={renderedPackage}
        combiProps={combiProps}
        reviewMode={isReviewMode}
        isBusiness={isBusiness}
        phonePaired={phonePaired}
        hasWatchPackage={!!matchedWatchPackages.length}
        isPairedWatch={isPairedWatch}
        pageError={pageError}
        pageContent={pageContent}
        flags={flagsWithBingo}
        updateStatus={updateStatus}
        onRemoveAddOn={onRemoveAddOn}
        onUndoRemoveAddOn={onUndoRemoveAddOn}
        isUpgrade={isUpgradeOrder}
        {...packageTotals}
        {...packageProps}
      />
    )
  }

  const renderDiscounts = (hasTradeIn: boolean): JSX.Element => {
    return (
      <Fragment key={`${primaryPackageId}-discounts`}>
        <PackageDiscounts
          modelPackage={allActivePackages}
          isBusiness={isBusiness}
          isUpgrade={isUpgradeOrder}
          pageContent={pageContent}
          reviewMode={isReviewMode}
          hasTradeIn={hasTradeIn}
        />
      </Fragment>
    )
  }

  const renderTradeIn = (hasAnyDiscount: boolean): JSX.Element => {
    const tradeInCredit = allActivePackages.find(p => p.tradeInCredit)?.tradeInCredit
    const currentPackage = Array.isArray(thisPackage) ? getPackageWithHandset(thisPackage) : thisPackage

    const handleRemovePackageTradeIn = () => {
      basketStore.onRemovePackageTradeIn(currentPackage.packageId)
    }

    const handleUndoRemovePackageTradeIn = () => {
      basketStore.onUndoRemovePackageTradeIn(currentPackage.packageId)
    }

    return (
      <Fragment key={`${primaryPackageId}-tradeInCredit`}>
        {tradeInCredit && currentPackage?.packageId && (
          <PackageTradeInCredit
            packageId={currentPackage.packageId}
            pageContent={pageContent}
            tradeInCredit={tradeInCredit}
            headerStatus={currentPackage.tradeInHeaderStatus}
            hideTopBorder={hasAnyDiscount && currentPackage.tradeInHeaderStatus !== 'removed'}
            onRemove={handleRemovePackageTradeIn}
            onUndo={handleUndoRemovePackageTradeIn}
          />
        )}
      </Fragment>
    )
  }

  const renderPackageTotal = (): JSX.Element => {
    const { upfrontPrice, monthlyPrice } = getCombinedPackageTotals(allActivePackages, true, netGrossType)

    return (
      <div key={`${primaryPackageId}-totals`} className={styles['container']}>
        <BasketItem upfrontPrice={upfrontPrice} monthlyPrice={monthlyPrice} title={'Package Total'} isBusiness={isBusiness} isTotalCost />
      </div>
    )
  }

  const renderPackageHeader = (
    renderedPackage: PackageWithHeaderStatus | PackageWithHeaderStatus[],
    isPairedWatch: boolean,
  ): JSX.Element => {
    let [title, subTitle] =
      isPairedWatch && !Array.isArray(renderedPackage)
        ? [getPairedWatchTitle(renderedPackage), getPairedWatchSubTitle(renderedPackage)]
        : [`Package ${index + 1}`]

    if (isRedHybridPackage(thisPackage as BasketV2.ModelPackage)) {
      title = 'Flexi Plan'
      subTitle = ''
    }

    return isAccessoryPackage(primaryPackage) ? (
      <PackageAccessoryHeader />
    ) : (
      <PackageHeader
        renderedPackage={renderedPackage}
        primaryPackage={primaryPackage}
        isPairedWatch={isPairedWatch}
        title={title}
        subTitle={subTitle}
        showPackageHeaderUnderline={showPackageHeaderUnderline}
      />
    )
  }

  const renderJourneyLinkField = () => {
    const mainPackages = Array.isArray(thisPackage) ? thisPackage : [thisPackage]
    const simoPackage = mainPackages.find(pkg => isSimo(pkg.bundle))

    if (simoPackage && isUpgradeOrder) {
      return <input type="hidden" id="journeyId" value={getSimoPlanLink(simoPackage)} />
    }
    return null
  }

  const hasActivePackage = (p: PackageWithHeaderStatus | PackageWithHeaderStatus[]): boolean => {
    if (Array.isArray(p)) {
      return !!p.filter(hasActivePackage).length
    }

    return isAccessory(p) || p?.headerStatus !== 'removed'
  }

  const renderAllPackages = (): JSX.Element[] => {
    // Different to allActivePackages because this passes through combi packages as and array for rendering
    const packagesToRender: (PackageWithHeaderStatus | PackageWithHeaderStatus[])[] = [thisPackage, ...matchedWatchPackages]
    const maxIndex = packagesToRender.length - 1
    const activePackageCount = packagesToRender.filter(hasActivePackage).length
    const hasAnyDiscount = hasBasketAnyDiscount(allActivePackages)
    const hasTradeIn = allActivePackages.some(p => !!p.tradeInCredit)
    const isCombinedPackage = allActivePackages.length > 1
    const showPackageTotal = hasAnyDiscount || isCombinedPackage
    return packagesToRender.map((singlePackage: PackageWithHeaderStatus | PackageWithHeaderStatus[], pIndex: number) => {
      const isRemoved = !hasActivePackage(singlePackage)
      const packageHasWatch = !Array.isArray(singlePackage) && hasWatch(singlePackage?.hardwares)
      const isNotAccessoryPackage = !isAccessoryPackage(singlePackage as BasketV2.ModelPackage)
      // classnames for the full body when there are no visible packages remaining.
      // !! If there are no packages remaining within the 'logical package' then we also remove the discounts and package total
      const bodyClassNames = classnames('package-body', {
        'package-body-closed': isRemoved && !activePackageCount && isNotAccessoryPackage,
      })
      // classnames specifically for the package, excluding discounts and total.
      // !! This is so that we can animate the package removal without affecting the discounts and package total
      const packageBodyClassNames = classnames('package-body', {
        'package-body-closed': isRemoved && isNotAccessoryPackage,
      })

      return (
        <BasketPackageContext.Provider key={pIndex} value={{ ...props, isSmallBusiness }}>
          {renderPackageHeader(singlePackage, packageHasWatch)}
          <div styleName={bodyClassNames}>
            <div styleName={packageBodyClassNames}>{renderPackageBody(singlePackage, packageHasWatch)}</div>
            <If condition={pIndex === maxIndex}>
              <If condition={hasAnyDiscount}>{renderDiscounts(hasTradeIn)}</If>
              <If condition={hasTradeIn}>{renderTradeIn(hasAnyDiscount)}</If>
              <If condition={!isSmallBusiness && showPackageTotal}>{renderPackageTotal()}</If>
            </If>
            <PackageFooter package={singlePackage} pageContent={pageContent} />
          </div>
        </BasketPackageContext.Provider>
      )
    })
  }

  return (
    <Section marginVertical={2} {...borderDetails}>
      {renderJourneyLinkField()}
      {renderAllPackages()}
    </Section>
  )
})

BasketPackage.displayName = 'BasketPackage'

export default BasketPackage
