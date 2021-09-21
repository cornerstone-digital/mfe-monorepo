import uniqBy from 'lodash/uniqBy'

import { IProxyWhitelistEntry } from '@vfuk/dalmatian'

import authWhitelist from './proxied/auth.whitelist'
import checkoutInfoWhitelist from './proxied/checkoutInfo.whitelist'
import contentWhitelist from './proxied/content.whitelist'
import customerWhitelist from './proxied/customer.whitelist'
import healthcheckWhitelist from './proxied/healthcheck.whitelist'
import inventoryWhitelist from './proxied/inventory.whitelist'
import portabiltyWhitelist from './proxied/portability.whitelist'
import basketWhitelistV2 from './proxied/basket.whitelist.v2'
import catalogueWhitelist from './proxied/catalogue.whitelist'

const cleanWhitelist = (whitelist: IProxyWhitelistEntry[]): IProxyWhitelistEntry[] => {
  return uniqBy(whitelist, (entry: IProxyWhitelistEntry) => entry.method + entry.endpoint)
}

export const whitelist = cleanWhitelist([
  ...authWhitelist,
  ...checkoutInfoWhitelist,
  ...contentWhitelist,
  ...customerWhitelist,
  ...healthcheckWhitelist,
  ...inventoryWhitelist,
  ...portabiltyWhitelist,
  ...basketWhitelistV2,
  ...catalogueWhitelist,
])
