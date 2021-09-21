import { FC } from 'react'

import Paragraph from '@web-core/components/atoms/Paragraph'

import { PackageTradeInDetailProps } from './PackageTradeInDetail.types'
import formatAmount from '@helpers/formatAmount'

import styles from './PackageTradeInDetail.scss'

const PackageTradeInDetail: FC<PackageTradeInDetailProps> = props => {
  const creditType = props.tradeInCredit?.credit?.type
  const guaranteedPrice = formatAmount(props.tradeInCredit?.credit?.guaranteedPrice || 0)
  const monthlyCredit = props.tradeInCredit?.credit?.monthlyCredit

  let text = ''
  let subtext = ''

  if (creditType === 'BACS') {
    text = `£${guaranteedPrice} bank transfer`
  } else if (creditType === 'MONTHLY_BILL_CREDIT') {
    text = `£${monthlyCredit?.monthlyPrice} for ${monthlyCredit?.tenure} months`
    subtext = '(Applied instantly to your Airtime Plan bill)'
  } else if (creditType === 'ONE_OFF_BILL_CREDIT') {
    text = `£${guaranteedPrice} trade-in credit`
  }

  if (!text && !subtext) {
    return <></>
  }

  return (
    <Paragraph className={styles.subTitle} fontSize="md">
      <strong>{text}</strong>
      {subtext}
    </Paragraph>
  )
}

export default PackageTradeInDetail
