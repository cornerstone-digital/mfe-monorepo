import { useEffect } from 'react'
import Heading from '@web-core/components/atoms/Heading'
import Paragraph from '@web-core/components/atoms/Paragraph'
import Modal from '@vfuk/core-modal'
import { DevicePaymentExampleProps } from './DevicePaymentExample.types'
import styles from './DevicePaymentExample.scss'
import { isHandset } from '@helpers/typeCheck'
import PaymentTotalTable from '../PaymentTotalTable'
import PaymentHardwareTable from '../PaymentHardwareTable'
import PaymentAirtimeTable from '../PaymentAirtimeTable'
import getFinancialBreakdown from './helpers/getFinancialBreakdown'
import { useStore } from '@store'

const DevicePaymentExample = (props: DevicePaymentExampleProps) => {
  const {
    airtimePrice,
    airtimeDescription,
    devicePaymentPlan,
    isOpen = false,
    isBusiness,
    onRequestClose,
    productClass,
    productSubClass,
  } = props
  const { basketStore } = useStore()
  const priceKey = isBusiness ? 'net' : 'gross'
  const financialBreakdown = getFinancialBreakdown(devicePaymentPlan, airtimePrice, priceKey)

  const bingoContent = basketStore.pageContent.vf_Modules?.messages?.content || {}
  const title = bingoContent.basket_label_modal_header?.bodyText || ''
  const postValueLabel = isBusiness ? '(ex VAT)' : undefined
  const hardwareProps: BasketV2.Hardware = {
    productClass: productClass,
    productSubClass: productSubClass,
  }

  useEffect(() => {
    if (!window.VFUK.basketData) window.VFUK.basketData = { financialInfo: [] }

    if (window.VFUK.basketData.financialInfo) {
      window.VFUK.basketData.financialInfo.push({
        fb_apr: financialBreakdown.deviceCosts.aprRepresentative,
        fb_creditor: financialBreakdown.deviceCosts.creditor,
        fb_interest_rate: financialBreakdown.deviceCosts.interestRate,
        fb_interest_type: 'fixed',
        fb_length_contract: financialBreakdown.deviceCosts.duration,
        fb_phone_cost: financialBreakdown.deviceCosts.totalHandsetPrice,
        fb_total_credit_amount: financialBreakdown.deviceCosts.totalHandsetCredit,
      })
    }

    return () => {
      window.VFUK.basketData.financialInfo = []
    }
  }, [])

  return (
    <Modal isOpen={isOpen} srName={title} onCloseCb={onRequestClose} size={3}>
      <>
        <Heading level={3} size={3} justify="center">
          {title}
        </Heading>
        <Heading level={4} size={4} justify="center">
          {financialBreakdown.total.duration}-month contract
        </Heading>
        <PaymentHardwareTable
          bingoContent={bingoContent}
          containerClassName={styles['breakdown-table']}
          deviceCosts={financialBreakdown.deviceCosts}
          hardwareName={isHandset(hardwareProps) ? 'Phone' : 'Watch'}
          priceKey={priceKey}
          postValueLabel={postValueLabel}
        />
        <PaymentAirtimeTable
          airtimePrice={financialBreakdown.airtimeCosts.monthlyCost}
          airtimeDescription={airtimeDescription}
          bingoContent={bingoContent}
          containerClassName={styles['breakdown-table']}
          hardwareName={isHandset(hardwareProps) ? 'Airtime' : 'Connectivity'}
          postValueLabel={postValueLabel}
        />
        <PaymentTotalTable
          bingoContent={bingoContent}
          containerClassName={styles['breakdown-table']}
          upfrontCost={financialBreakdown.total.upfrontCost}
          monthlyTotal={financialBreakdown.total.monthlyTotal}
          postValueLabel={postValueLabel}
        />
        <Paragraph>{bingoContent?.basket_label_modal_footer?.bodyText}</Paragraph>
      </>
    </Modal>
  )
}

export default DevicePaymentExample
