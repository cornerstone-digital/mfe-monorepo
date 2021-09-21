import { hasWatch, hasHandset } from '@helpers/typeCheck'

const getHardwareContractTitle = (
  hardware: BasketV2.Hardware,
  contractLength?: string,
  isPairedWatch?: boolean,
  isSmallBusiness: boolean = false,
): string | undefined => {
  if (!contractLength) {
    return
  }

  if (hasWatch([hardware])) {
    return `${contractLength}-month Watch Plan`
  }

  if (isPairedWatch) {
    return
  }

  // no packages passed in hardwares context to use typeCheck.isBingo
  // TODO: pass isBingo prop into consuming component so make all evaluations of isBingo consistent
  if (!hardware?.priceDetails?.devicePaymentPlan) {
    return
  }

  if (!hasHandset([hardware])) {
    return
  }

  if (isSmallBusiness) {
    return `${contractLength}-month Plan`
  }

  return `${contractLength}-month Phone Plan`
}

export default getHardwareContractTitle
