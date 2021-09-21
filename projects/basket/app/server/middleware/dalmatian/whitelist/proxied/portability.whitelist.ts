import { ProxyWhitelistEntry } from '../../../../types/global'
import { EndpointMethods } from '@vfuk/dalmatian'

const portabilityWhitelist: ProxyWhitelistEntry[] = [
  {
    method: EndpointMethods.GET,
    endpoint: '/portability/authcode/validate',
    swagger: '/portability/authcode/validate',
  },
]

export default portabilityWhitelist
