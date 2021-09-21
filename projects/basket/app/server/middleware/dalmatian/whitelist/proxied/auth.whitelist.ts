import { ProxyWhitelistEntry } from '../../../../types/global'
import { EndpointMethods } from '@vfuk/dalmatian'

const authWhitelist: ProxyWhitelistEntry[] = [
  {
    method: EndpointMethods.GET,
    endpoint: '/authorization/authorizationToken',
    swagger: '/authorization/authorizationToken',
  },
  {
    method: EndpointMethods.GET,
    endpoint: '/authorization/accessToken',
    swagger: '/authorization/accessToken',
  },
]

export default authWhitelist
