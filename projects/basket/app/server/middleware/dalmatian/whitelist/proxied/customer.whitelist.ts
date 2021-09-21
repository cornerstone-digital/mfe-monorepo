import { ProxyWhitelistEntry } from '../../../../types/global'
import { EndpointMethods } from '@vfuk/dalmatian'

const customerWhitelist: ProxyWhitelistEntry[] = [
  {
    method: EndpointMethods.GET,
    endpoint: '/customer/v2/username/*/checkAvailability',
    swagger: '/customer/v2/username/{userName}/checkAvailability',
  },
]

export default customerWhitelist
