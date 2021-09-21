import formatCommitmentPeriod from '@helpers/formatCommitmentPeriod'
import { isBroadband, isWatchSimo, isPayg, isDataDevice, isDataSimo } from '@helpers/typeCheck'

const getBundleContractTitle = (
  planType?: string,
  bundle?: BasketV2.Bundle,
  isWatch: boolean = false,
  isSmallBusiness: boolean = false,
): string | undefined => {
  if (isPayg(bundle)) {
    return
  }
  const formattedCommitmentPeriod = formatCommitmentPeriod(bundle?.commitmentPeriod)
  const commitmentPeriod = `${formattedCommitmentPeriod?.value}${formattedCommitmentPeriod?.uom === 'days' ? '-day' : '-month'}`

  if (isBroadband(planType)) {
    return `${commitmentPeriod} Broadband Plan`
  }

  if (isWatchSimo(bundle)) {
    return `${commitmentPeriod} Connectivity Plan`
  }

  if (isDataDevice(bundle)) {
    return `${commitmentPeriod} Device Plan`
  }

  if (isDataSimo(bundle)) {
    return `${commitmentPeriod} Data Plan`
  }

  if (isSmallBusiness && !isWatch) {
    return `${commitmentPeriod} Plan`
  }

  return isWatch ? `${commitmentPeriod} Connectivity Plan` : `${commitmentPeriod} Airtime Plan`
}

export default getBundleContractTitle
