import styles from './PaymentIcons.scss'
import Image from '@web-core/components/atoms/Image'
import Paragraph from '@web-core/components/atoms/Paragraph'

export const PaymentIcons = () => (
  <div className={styles['secure-payment-icons']}>
    <Paragraph fontSize="sm">Pay Securely with</Paragraph>
    <Image
      src="/basket/assets/secure-payment-icons.svg"
      srcLg="/basket/assets/secure-payment-icons.svg"
      alt="VISA, Mastercard, VISA Electron, Maestro"
      width="260px"
    />
  </div>
)

export default PaymentIcons
