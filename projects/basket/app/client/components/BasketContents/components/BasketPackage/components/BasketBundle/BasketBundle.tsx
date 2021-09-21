import { FC, useContext } from 'react'

import BasketItem from '@components/BasketItem'

import containsText from '@web-shop-core/helpers/containsText'
import getBundleContractTitle from '@helpers/getBundleContractTitle'
import getPrice from '@helpers/getPrice'
import { isBroadband, isPayg, isSimo } from '@helpers/typeCheck'
import getABTestFeatureValue from '@helpers/getABTestFeatureValue'
import getBundleDescription from '../../helpers/getBundleDescription'
import getIcon from './helpers/getIcon'
import getDescription from './helpers/getDescription'
import getBroadbandInfo from './helpers/getBroadbandInfo'
import formatAddress from './helpers/formatAddress'
import getBundlePackageLink from './helpers/getBundlePackageLink'

import BasketPackageContext from '../../context'
import { useStore } from '@store'

import { BasketBundleProps } from './BasketBundle.types'
import { DataSpeedStatus } from '@pages/BasketPage/BasketPage.types'

const BasketBundle: FC<BasketBundleProps> = props => {
  const {
    isUpgrade,
    isBusiness,
    bundle = {},
    planType,
    installationAddress,
    combiHandlers,
    displayName,
    phonePaired,
    packageId,
    isWatch,
    flags,
    isHandset,
    changePackageLink,
  } = props

  const { basketStore } = useStore()
  const { pageContent } = basketStore

  const { isSmallBusiness } = useContext(BasketPackageContext)
  const isOneNumberRenameEnabled = isBusiness && Boolean(flags?.bingo_onenumberrename)

  const speed = bundle.speed as keyof BasketPageContent.HbbPortfolioRefreshContent
  // @ts-expect-error
  const dataSpeedMessage = (pageContent?.vf_Modules?.messages?.content || {})[speed]?.bodyText

  const icon = getIcon(planType, displayName)
  const monthlyPrice = getPrice(bundle.priceDetails?.monthlyPrice, isBusiness)

  const isPaygBundle = isPayg(bundle)
  const title = isPaygBundle ? 'Pay as you go SIM' : bundle.displayName
  const bundleDescription: React.ReactNode[] = displayName && !isUpgrade ? [displayName] : []

  const isWatchPlanUpgrade = containsText(planType, 'watch_simo')

  if (!isPaygBundle) {
    const cmsMessages = pageContent?.vf_Modules?.messages
    bundleDescription.push(...getBundleDescription(bundle, cmsMessages, isOneNumberRenameEnabled))
  }

  const subTitle = getBundleContractTitle(planType, bundle, isWatch, isSmallBusiness)

  const description = getDescription(bundle, planType, isUpgrade, bundleDescription, pageContent, installationAddress, title)

  const address = isBroadband(planType) && bundle.commitmentPeriod?.value && !isUpgrade ? formatAddress(installationAddress) : ''
  const broadbandInfo = getBroadbandInfo(planType, pageContent, address)

  const packageLink = getABTestFeatureValue('changeLinkAB')
    ? getBundlePackageLink(planType, isWatch, bundle, changePackageLink)
    : changePackageLink

  return (
    <BasketItem
      title={title}
      subTitle={subTitle}
      hideCosts={isSmallBusiness && isHandset}
      icon={icon}
      dataSpeed={{
        key: bundle.speed as DataSpeedStatus,
        message: dataSpeedMessage,
      }}
      iconAppearance="dark"
      // the API doesn't currently return a value for bundle upfront but the UI should show 0
      upfrontPrice="0"
      packageId={packageId}
      monthlyPrice={monthlyPrice}
      description={description}
      isUpgrade={isUpgrade}
      isBusiness={isBusiness}
      isBroadband={isBroadband(planType)}
      broadbandInfo={broadbandInfo}
      {...combiHandlers}
      isBundle
      flags={flags}
      phonePaired={phonePaired}
      isSmartWatchSimo={isWatchPlanUpgrade}
      isSmartWatch={isWatch}
      pageContent={pageContent}
      isHandset={isHandset}
      isPayg={isPayg(bundle)}
      isSimo={isSimo(bundle)}
      changePackageLink={packageLink}
    />
  )
}

export default BasketBundle
