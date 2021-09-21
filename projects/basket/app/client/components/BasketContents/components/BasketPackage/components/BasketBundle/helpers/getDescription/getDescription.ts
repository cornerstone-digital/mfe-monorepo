import { isBroadband } from '@helpers/typeCheck'
import formatAddress from '../formatAddress'
import getBroadbandInfo from '../getBroadbandInfo'

const getDescription = (
  bundle: BasketV2.Bundle,
  planType: BasketV2.ModelPackage['planType'],
  isUpgrade: boolean,
  bundleDescription: React.ReactNode[],
  pageContent?: BasketPageContent.Basket,
  installationAddress?: BasketV2.InstallationAddress,
  title?: string,
): React.ReactNode[] => {
  // Broadband specific
  const { value: commitmentPeriod } = bundle.commitmentPeriod || {}
  let description: React.ReactNode[] = []

  if (isBroadband(planType)) {
    const address = formatAddress(installationAddress)
    const broadbandInfo = getBroadbandInfo(planType, pageContent)
    if (commitmentPeriod) {
      const fieldsToCopy: (keyof BasketV2.Bundle)[] = ['wifiExpert', 'broadbandAntiVirus', 'includedCalls', 'noPriceRise']

      fieldsToCopy.forEach(field => {
        if (bundle[field]) description.push(bundle[field])
      })
    } else {
      if (broadbandInfo?.increaseMessage) {
        description.push(broadbandInfo.increaseMessage)
      }
      if (address && !isUpgrade) {
        description.push('Installation address:', address)
      }
    }
  } else {
    description = bundleDescription
    if (description[0] === title) {
      description.shift()
    }
  }

  return description
}

export default getDescription
