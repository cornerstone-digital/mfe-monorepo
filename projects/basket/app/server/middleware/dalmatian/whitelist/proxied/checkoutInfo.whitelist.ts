import { ProxyWhitelistEntry } from '../../../../types/global'
import { EndpointMethods } from '@vfuk/dalmatian'

const checkoutInfoWhitelist: ProxyWhitelistEntry[] = [
  {
    method: EndpointMethods.GET,
    endpoint: '/checkoutInfo/v2/*/deliveryMethods/*',
    swagger: '/checkoutInfo/v2/{checkoutId}/deliveryMethods/{postCode}',
  },
  {
    method: EndpointMethods.GET,
    endpoint: '/checkoutInfo/v2/*/storeStock/*',
    swagger: '/checkoutInfo/v2/{checkoutId}/storeStock/{postCode}',
  },
  {
    method: EndpointMethods.PUT,
    endpoint: '/checkoutInfo/v2/*/personalDetails',
    swagger: '/checkoutInfo/v2/{checkoutId}/personalDetails',
  },
  {
    method: EndpointMethods.PUT,
    endpoint: '/checkoutInfo/v2/*/bankPayment',
    swagger: '/checkoutInfo/v2/{checkoutId}/bankPayment',
  },
  {
    method: EndpointMethods.PUT,
    endpoint: '/checkoutInfo/v2/*/deliveryOptions',
    swagger: '/checkoutInfo/v2/{checkoutId}/deliveryOptions',
  },
  {
    method: EndpointMethods.PUT,
    endpoint: '/checkoutInfo/v2/*/affordabilityDetails',
    swagger: '/checkoutInfo/v2/{checkoutId}/affordabilityDetails',
  },
  {
    method: EndpointMethods.POST,
    endpoint: '/checkoutInfo/v2/*/payment/*/initiateCardPayment',
    swagger: '/checkoutInfo/v2/{checkoutId}/payment/{paymentId}/initiateCardPayment',
  },
  {
    method: EndpointMethods.POST,
    endpoint: '/checkoutInfo/v2/*/payment/*',
    swagger: '/checkoutInfo/v2/{checkoutId}/payment/{paymentId}',
  },
  {
    method: EndpointMethods.POST,
    endpoint: '/checkoutInfo/v2/*',
    swagger: '/checkoutInfo/v2/{checkoutId}',
  },
  {
    method: EndpointMethods.POST,
    endpoint: '/checkoutInfo/v2/',
    swagger: '/checkoutInfo/v2/',
  },
  {
    method: EndpointMethods.POST,
    endpoint: '/checkoutInfo/v2/*/submitOrder',
    swagger: '/checkoutInfo/v2/{checkoutId}/submitOrder',
  },
  {
    method: EndpointMethods.GET,
    endpoint: '/checkoutInfo/v2/*/',
    swagger: '/checkoutInfo/v2/{checkoutId}/',
  },
  {
    method: EndpointMethods.GET,
    endpoint: '/checkoutInfo/v2/*/orderState',
    swagger: '/checkoutInfo/v2/{checkoutId}/orderState',
  },
  {
    method: EndpointMethods.PUT,
    endpoint: '/checkoutInfo/v2/*/billCapping',
    swagger: '/checkoutInfo/v2/{checkoutId}/billCapping',
  },
  {
    method: EndpointMethods.GET,
    endpoint: '/checkoutInfo/v2/*/personalDetails/schema',
    swagger: '/checkoutInfo/v2/{checkoutId}/personalDetails/schema',
  },
  {
    method: EndpointMethods.GET,
    endpoint: '/checkoutInfo/v2/*/bankPayment/schema',
    swagger: '/checkoutInfo/v2/{checkoutId}/bankPayment/schema',
  },
  {
    method: EndpointMethods.GET,
    endpoint: '/checkoutInfo/v2/*/deliveryOptions/schema',
    swagger: '/checkoutInfo/v2/{checkoutId}/deliveryOptions/schema',
  },
  {
    method: EndpointMethods.GET,
    endpoint: '/checkoutInfo/v2/*/affordabilityDetails/schema',
    swagger: '/checkoutInfo/v2/{checkoutId}/affordabilityDetails/schema',
  },
]

export default checkoutInfoWhitelist
