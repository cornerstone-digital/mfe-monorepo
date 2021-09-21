import { ProxyWhitelistEntry } from '../../../../types/global'
import { EndpointMethods } from '@vfuk/dalmatian'

const inventoryWhitelist: ProxyWhitelistEntry[] = [
  {
    method: EndpointMethods.GET,
    endpoint: '/inventory/getstoreandstockinfo/',
    swagger: '/inventory/getstoreandstockinfo/',
  },
  {
    method: EndpointMethods.GET,
    endpoint: '/inventory/product/deliveryMethods',
    swagger: '/inventory/product/deliveryMethods',
  },
  {
    method: EndpointMethods.GET,
    endpoint: '/inventory/product/getDeliveryMethods',
    swagger: '/inventory/product/getDeliveryMethods',
  },
  {
    method: EndpointMethods.GET,
    endpoint: '/inventory/stockInfo',
    swagger: '/inventory/stockInfo',
  },
  {
    method: EndpointMethods.GET,
    endpoint: '/inventory/storeStock',
    swagger: '/inventory/storeStock',
  },
]

export default inventoryWhitelist
