import { isBroadband } from '@helpers/typeCheck'
import { BroadbandType } from '@components/BasketContents/components/BasketPackage/components/BasketBundle/BasketBundle.types'

export default function getBroadbandInfo(
  planType?: BasketV2.ModelPackage['planType'],
  pageContent?: BasketPageContent.Basket,
  address?: string,
): BroadbandType {
  let broadbandInfo: BroadbandType = {}

  if (isBroadband(planType)) {
    broadbandInfo.increaseMessage =
      pageContent?.vf_Modules?.hbb_portfolio_refresh?.content?.hbb_portfolio_refresh_outofcontract_price_rise?.bodyText || ''
  }

  if (address) {
    broadbandInfo.address = address
  }

  return broadbandInfo
}
