import { ProxyWhitelistEntry } from '../../../../types/global'
import { EndpointMethods } from '@vfuk/dalmatian'

const basketWhitelist: ProxyWhitelistEntry[] = [
  {
    method: EndpointMethods.GET,
    endpoint: '/basket/v2/basket/*',
    swagger: '/basket/v2/basket/{basketId}',
  },
  {
    method: EndpointMethods.GET,
    endpoint: '/basket/v2/basket',
    swagger: '/basket/v2/basket',
  },
  {
    method: EndpointMethods.POST,
    endpoint: '/basket/v2/basket',
    swagger: '/basket/v2/basket',
  },
  {
    method: EndpointMethods.POST,
    endpoint: '/basket/v2/basket/*/validate',
    swagger: '/basket/v2/basket/{basketId}/validate',
  },
  {
    method: EndpointMethods.PUT,
    endpoint: '/basket/v2/basket/*/package/*',
    swagger: '/basket/v2/basket/{basketId}/package/{packageId}',
  },
  {
    method: EndpointMethods.POST,
    endpoint: '/basket/v2/basket/*/package',
    swagger: '/basket/v2/basket/{basketId}/package',
  },
  {
    method: EndpointMethods.DELETE,
    endpoint: '/basket/v2/basket/*/package/*',
    swagger: '/basket/v2/basket/{basketId}/package/{packageId}',
  },
  {
    method: EndpointMethods.PATCH,
    endpoint: '/basket/v2/basket/package/*',
    swagger: '/basket/v2/basket/package/{packageId}',
  },
  {
    method: EndpointMethods.POST,
    endpoint: '/basket/v2/basket/*/package/*/product',
    swagger: '/basket/v2/basket/{basketId}/package/{packageId}/product',
  },
  {
    method: EndpointMethods.DELETE,
    endpoint: '/basket/v2/basket/*/package/*/productLine/*',
    swagger: '/basket/v2/basket/{basketId}/package/{packageId}/productLine/{productLineId}',
  },
  {
    method: EndpointMethods.POST,
    endpoint: '/basket/v2/basket/*/empty',
    swagger: '/basket/v2/basket/{basketId}/empty',
  },
  {
    method: EndpointMethods.PUT,
    endpoint: '/basket/v2/basket/*',
    swagger: '/basket/v2/basket/{basketId}',
  },
  {
    method: EndpointMethods.POST,
    endpoint: '/basket/v2/basket/*/voucher/*',
    swagger: '/basket/v2/basket/{basketId}/voucher/{voucherCode}',
  },
  {
    method: EndpointMethods.PUT,
    endpoint: '/basket/v2/basket/*/voucher/*',
    swagger: '/basket/v2/basket/{basketId}/voucher/{voucherCode}',
  },
  {
    method: EndpointMethods.DELETE,
    endpoint: '/basket/v2/basket/*/voucher/*',
    swagger: '/basket/v2/basket/{basketId}/voucher/{voucherCodde}',
  },
  {
    method: EndpointMethods.PUT,
    endpoint: '/basket/v2/basket/*/package/*/bundle/portability',
    swagger: '/basket/v2/basket/{basketId}/package/{packageId}/bundle/portability',
  },
  {
    method: EndpointMethods.DELETE,
    endpoint: '/basket/v2/basket/*/package/*/bundle/portability',
    swagger: '/basket/v2/basket/{basketId}/package/{packageId}/bundle/portability',
  },
]

export default basketWhitelist
