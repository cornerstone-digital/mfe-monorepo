import formatCommitmentPeriod from '@helpers/formatCommitmentPeriod'
import { hasWatch } from '@helpers/typeCheck'
import { get } from 'lodash'
import { PackageWithHeaderStatus } from '../../BasketPackage.types'
import isBingoPackage from '../isBingoPackage'

const getPairedWatchSubTitle = (renderedPackage: PackageWithHeaderStatus): string => {
  const { hardwares } = renderedPackage
  const watchHardware = hardwares?.find(hardware => hasWatch([hardware]))
  const watchCommitmentPeriod = formatCommitmentPeriod(watchHardware?.contractOptions?.duration)
  const bundleCommitmentPeriod = get(renderedPackage, 'bundle.commitmentPeriod.value', '')
  let commitPeriod: string = ''

  if (isBingoPackage(renderedPackage)) {
    commitPeriod = `${watchCommitmentPeriod?.value}${watchCommitmentPeriod?.uom === 'days' ? '-day' : '-month'}`
  } else {
    commitPeriod = `${bundleCommitmentPeriod}-month`
  }

  return `${commitPeriod} Watch Plan`
}

export default getPairedWatchSubTitle
