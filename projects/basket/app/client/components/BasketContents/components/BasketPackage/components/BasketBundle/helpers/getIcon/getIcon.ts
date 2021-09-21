import { isBroadband } from '@helpers/typeCheck'

export default function getIcon(planType?: string, displayName?: string) {
  if (isBroadband(planType)) {
    return 'broadband-or-wifi'
  } else if (planType?.toLowerCase() === 'watch_simo') {
    return 'SIM-upgrade'
  } else {
    return displayName?.toLowerCase() === 'esim' ? 'cpu' : 'sim'
  }
}
