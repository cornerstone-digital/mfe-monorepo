import { isBroadband } from '@helpers/typeCheck'

const isSwitchMyNetworkHidden = (portability?: BasketV2.Portability, planType?: string, isUpgrade?: boolean, reviewMode?: boolean) => {
  const reviewModeSet = reviewMode && !portability?.msisdn && !portability?.validPortDate

  return isUpgrade || isBroadband(planType) || reviewModeSet
}

export default isSwitchMyNetworkHidden
