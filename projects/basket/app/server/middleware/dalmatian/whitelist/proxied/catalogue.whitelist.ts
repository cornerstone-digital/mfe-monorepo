import { ProxyWhitelistEntry } from '../../../../types/global'
import { EndpointMethods } from '@vfuk/dalmatian'

const catalogueWhitelist: ProxyWhitelistEntry[] = [
  {
    method: EndpointMethods.GET,
    endpoint: '/devices/catalogue/deviceTile/*',
    swagger: '/devices/catalogue/deviceTile/*',
  },
]

export default catalogueWhitelist
