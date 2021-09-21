import { useState } from 'react'

import Notification from '@web-core/components/molecules/Notification'
import Button from '@web-core/components/atoms/Button'
import Link from '@web-core/components/atoms/Link'
import Paragraph from '@web-core/components/atoms/Paragraph'

import { ContinueWithoutSwitchingProps } from './ContinueWithoutSwitching.types'

import styles from './ContinueWithoutSwitching.scss'

const ContinueWithoutSwitching = (props: ContinueWithoutSwitchingProps) => {
  const { date = 'your delivery', hasLateDelivery, onContinue, phoneNumber } = props

  const [removing, setRemoving] = useState<boolean>()
  const [errorMessage, setErrorMessage] = useState<string>()

  const correctPortingSentence = hasLateDelivery
    ? `The date you've chosen to move to Vodafone is before your device's delivery date — please choose a later one.`
    : `As you've chosen a device or product that's on pre-order or a back order, it may take us longer than requested to bring you over to us.`
  const message = hasLateDelivery
    ? `Choose a date after ${date}.`
    : `You can easily switch to Vodafone's network later, via the website using switch my network.`

  const handleContinue = async () => {
    let errorMsg = ''
    setRemoving(true)

    try {
      if (onContinue) {
        await onContinue(true)
      }
    } catch (e) {
      console.warn('Failed to remove details from basket.')
      errorMsg = `Uh-oh, something went wrong when trying to remove your code. Once you've completed your order, please contact us.`
    }
    setErrorMessage(errorMsg)
    setRemoving(false)
  }

  return (
    <>
      <Paragraph marginBottom={2}>{correctPortingSentence}</Paragraph>
      {hasLateDelivery && (
        <Paragraph marginBottom={2} fontWeight="bold">
          You can change your network service to Vodafone later, via the website.
        </Paragraph>
      )}

      {errorMessage && <Notification appearance="error" marginHorizontal={2} marginBottom={2} title={errorMessage} />}
      <div className={`${styles['info-wrapper']} bg-light2 padding-3`}>
        <div className={styles['mobile-number']}>
          <Paragraph fontWeight="bold" marginBottom={1}>
            Mobile number
          </Paragraph>
          <Paragraph>{phoneNumber}</Paragraph>
        </div>
        <div className={styles['info']}>
          <Paragraph>{message}</Paragraph>
        </div>
      </div>
      <div className={styles['actions-wrapper']}>
        <Button onClick={handleContinue} loading={removing}>
          Continue Without Switching
        </Button>
        {hasLateDelivery && (
          <div>
            <Paragraph marginBottom={0}> Return to basket: </Paragraph>
            <Link externalHref="/basket"> Choose a new transfer date</Link>
          </div>
        )}
      </div>
      {errorMessage && (
        <Button appearance="tertiary" onClick={onContinue} marginLeft={2}>
          Continue Anyway
        </Button>
      )}
    </>
  )
}

export default ContinueWithoutSwitching
