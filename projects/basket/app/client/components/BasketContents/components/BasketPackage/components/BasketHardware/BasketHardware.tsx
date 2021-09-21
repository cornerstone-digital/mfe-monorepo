import { useState, useContext } from 'react'

// Core components
import { ThemedButton as Button } from '@web-core/components/atoms/Button'
import Icon from '@web-core/components/atoms/Icon'

// Local components
import BasketItem from '@components/BasketItem'
import DevicePaymentExample from './components/DevicePaymentExample'

// Helpers
import getHardwareAsset from '../../helpers/getHardwareAsset'
import getFallbackIcon from './helpers/getFallbackIcon'
import getAppliedPromos from '../../helpers/getAppliedPromos'
import getPrice from '@helpers/getPrice'
import { hasWatch, isBroadband, isHandset, isSimCard } from '@helpers/typeCheck'
import formatCurrency from '@web-shop-core/helpers/formatCurrency'

// consts / types / styles
import { BasketHardwareProps } from './BasketHardware.types'
import styles from './BasketHardware.scss'
import getHardwareContractTitle from '@helpers/getHardwareContractTitle'
import AnalyticsUtil from '@utilities/Analytics'
import { BasketItemProps } from '@components/BasketItem/BasketItem.types'
import { BASKET_CONSTS } from '@constants'
import matchesConstCI from '@helpers/matchesConstCI'
import getABTestFeatureValue from '@helpers/getABTestFeatureValue'
import BasketPackageContext from '../../context'
import { useStore } from '@store'

const BasketHardware = (props: BasketHardwareProps) => {
  const { isSmallBusiness, phonePaired, thisPackage } = useContext(BasketPackageContext)
  const packageModel = Array.isArray(thisPackage) ? thisPackage[0] : thisPackage
  const { bundle, packageId, planType } = packageModel || {}
  const { basket, flags } = useStore().basketStore
  const { isUpgradeOrder, isBusiness } = basket
  const { hardware, isPairedWatch, icon, changePackageLink } = props

  const { displayName: airtimeDescription, priceDetails: bundlePriceDetails, commitmentPeriod } = bundle || {}
  const bundleContractLength = commitmentPeriod?.value
  const airtimePriceRaw = getPrice(bundlePriceDetails?.monthlyPrice, isBusiness)
  const airtimeDiscountPriceRaw = getPrice(bundlePriceDetails?.monthlyDiscountPrice, isBusiness)
  const airtimePrice = formatCurrency(airtimeDiscountPriceRaw || airtimePriceRaw, true)
  const isSmartWatch = hasWatch([hardware])

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleClose = () => {
    setIsOpen(false)
  }

  const toggleModal = () => {
    const showModal = !isOpen
    setIsOpen(showModal)

    if (showModal) {
      const analyticsEvent = hasWatch([hardware]) ? 'basketPage.seeFinanceBreakdownWatch' : 'basketPage.seeFinanceBreakdownHandset'
      AnalyticsUtil.trackLink(analyticsEvent, {
        newBasket: basket,
        packageId,
      })
    }
  }

  const getFinanceButton = (): React.ReactNode => (
    <Button selector="finance-button" onClick={toggleModal} appearance="link" dangerouslyMergeStyles={styles} key="paymentDescBtn">
      <Icon name="info-circle-solid" size={1} appearance="info" />
      <span className={styles.text}>See finance breakdown</span>
    </Button>
  )

  const {
    displayName,
    shortDisplayName,
    colourName,
    colourHexcode,
    capacity,
    deviceSize,
    productClass,
    priceDetails,
    merchandisingMedia = [],
    contractOptions,
    productSubClass,
  } = hardware
  // Prioritise bingo prices
  const monthlyPriceObject = priceDetails?.devicePaymentPlan?.monthlyPrice || priceDetails?.monthlyPrice
  const upfrontPriceObject = priceDetails?.devicePaymentPlan?.upFrontPrice || priceDetails?.oneOffPrice
  const imageAsset = getHardwareAsset(productClass?.toLowerCase(), merchandisingMedia)
  const contractLength = contractOptions?.duration?.value || bundleContractLength
  const subTitle = getHardwareContractTitle(hardware, contractLength, isPairedWatch, isSmallBusiness)
  const isDiscountHardware = matchesConstCI(BASKET_CONSTS.PRODUCT_CLASS_DISCOUNT, productClass)

  const showFinanceBreakdown = priceDetails?.devicePaymentPlan && !isSmallBusiness
  const title = (getABTestFeatureValue('showStorageColourIcons') ? shortDisplayName : displayName) || ''

  const isHandsetOrSim = isHandset(hardware) || isSimCard(hardware)

  const basketItemProps: BasketItemProps = {
    title,
    subTitle: isSmallBusiness ? '' : subTitle,
    hideCosts: isSmallBusiness && isHandsetOrSim,
    iconAppearance: 'brand',
    description: showFinanceBreakdown ? [getFinanceButton()] : [''],
    descriptionAlignment: showFinanceBreakdown ? 'right' : 'left',
    image: imageAsset,
    upfrontPrice: getPrice(upfrontPriceObject, isBusiness),
    monthlyPrice: getPrice(monthlyPriceObject, isBusiness),
    promo: getAppliedPromos(merchandisingMedia),
    isUpgrade: isUpgradeOrder,
    isBusiness,
    isSmartWatch,
    hideHeader: isPairedWatch,
    icon,
    phonePaired,
    flags,
    changePackageLink: isDiscountHardware && !getABTestFeatureValue('changeLinkAB') ? undefined : changePackageLink,
    colourName,
    colourHexcode,
    capacity,
    deviceSize,
  }

  if (!imageAsset) {
    basketItemProps.icon = getFallbackIcon(productClass)
  }

  if (isUpgradeOrder || isSmartWatch) {
    basketItemProps.title = title
  }

  // TODO: can be removed when hbb refresh is active
  if (isBroadband(planType)) {
    basketItemProps.image = ''
    basketItemProps.icon = 'broadband-router'
  }

  return (
    <>
      <BasketItem {...basketItemProps} />
      {priceDetails?.devicePaymentPlan && (
        <DevicePaymentExample
          isOpen={isOpen}
          onRequestClose={handleClose}
          airtimeDescription={airtimeDescription}
          airtimePrice={airtimePrice}
          devicePaymentPlan={priceDetails.devicePaymentPlan}
          isBusiness={isBusiness}
          productClass={productClass}
          productSubClass={productSubClass}
        />
      )}
    </>
  )
}
export default BasketHardware
