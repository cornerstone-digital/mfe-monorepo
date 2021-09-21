import { BasketModalIcon } from '@components/BasketModal/BasketModal.types'
import getBroadbandPackageLink from '@helpers/getBroadbandPackageLink'

export default function getContinueShoppingIcons(isPayAsYouGo?: boolean, isBusiness?: boolean): BasketModalIcon[] {
  const hrefPrefix = isBusiness ? '/business' : ''
  const paymPrefix = isBusiness ? '/business/business-mobile-phones' : '/mobile/phones'
  const broadbandLink = getBroadbandPackageLink(isBusiness)

  return [
    {
      children: 'SIM only',
      href:
        hrefPrefix === '/business'
          ? '/business/business-sim-only?continueShopping=true'
          : '/mobile/best-sim-only-deals?continueShopping=true',
      name: 'sim',
      selector: 'sim-only-button',
      isExternal: true,
    },
    {
      children: 'Phones',
      href: isPayAsYouGo
        ? `${hrefPrefix}/mobile/phones/pay-as-you-go?continueShopping=true`
        : `${paymPrefix}/pay-monthly-contracts?continueShopping=true`,
      name: 'mobile',
      selector: 'handset-button',
      isExternal: true,
    },
    {
      children: 'Broadband',
      href: `${broadbandLink}?continueShopping=true`,
      name: 'broadband-or-wifi',
      selector: 'broadband-selector',
      isExternal: true,
    },
    {
      children: 'Data only SIM',
      href: `${hrefPrefix}/data-only-sim?continueShopping=true`,
      name: 'data',
      selector: 'data-only-sim-button',
      isExternal: true,
    },
    {
      children: 'Tablets',
      href: `${hrefPrefix}/mobile-broadband/tablets?continueShopping=true`,
      name: 'tablet',
      selector: 'data-device-button',
      isExternal: true,
    },
    {
      children: 'Mobile Wi-Fi',
      href: `${hrefPrefix}/mobile-broadband/dongles-and-mobile-wifi?continueShopping=true`,
      name: 'multiscreen',
      selector: 'data-wifi-button',
      isExternal: true,
    },
    {
      children: 'Smartwatches',
      href: `${hrefPrefix}/smart-watches-and-wearables?continueShopping=true`,
      name: 'fitness-tracker',
      selector: 'data-smartwatch-button',
      isExternal: true,
    },
    {
      children: 'Accessories',
      href: `${hrefPrefix}/mobile/accessories?continueShopping=true`,
      name: 'accessories',
      selector: 'data-accessories-button',
      isExternal: true,
    },
  ]
}
