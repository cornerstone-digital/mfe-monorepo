import { ProxyWhitelistEntry } from '../../../../types/global'
import { EndpointMethods } from '@vfuk/dalmatian'

const healthcheckWhitelist: ProxyWhitelistEntry[] = [
  {
    method: EndpointMethods.GET,
    endpoint: '/basket/actuator/health',
    swagger: '/basket/actuator/health',
  },
  {
    method: EndpointMethods.GET,
    endpoint: '/basket/actuator/vhealth',
    swagger: '/basket/actuator/health',
  },
]

export default healthcheckWhitelist
