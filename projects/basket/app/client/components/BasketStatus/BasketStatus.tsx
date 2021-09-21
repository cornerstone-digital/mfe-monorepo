import { useEffect, useRef, useState } from 'react'

import Notification from '@web-core/components/molecules/Notification'
import Paragraph from '@web-core/components/atoms/Paragraph'
import { GridColumn, GridRow } from '@vfuk/core-grid'
import Button from '@web-core/components/atoms/Button'

import AnalyticsUtil from '@utilities/Analytics'

import generateChangePackageLink from '@helpers/generateChangePackageLink'
import getValidationButtonLink from './helpers/getValidationButtonLink'
import getErrorDetails from './helpers/getErrorDetails'

import { ValidationErrorCode, NOTIFICATIONS } from '@constants'

import { BasketStatusProps, BasketNotification, ContentMessage } from './BasketStatus.types'

import styles from './BasketStatus.scss'
import { useStore } from '@store'
import { observer } from 'mobx-react-lite'

const errorAnalyticsEvents: { [index: string]: string } = {
  [ValidationErrorCode.MAXIMUM_ALLOWED_LOANS]: 'basketPage.ctaErrMaxLoans',
  [ValidationErrorCode.MAXIMUM_CTNS_WITH_CONCURRENT_LOANS]: 'basketPage.ctaErrConcurrentLoans',
  [ValidationErrorCode.MAXIMUM_LOANS_FOR_CTN]: 'basketPage.ctaErrConcurrentLoans',
  [ValidationErrorCode.REPAYMENT_ISSUES]: 'basketPage.ctaErrRepaymentIssues',
  [ValidationErrorCode.MAXIMUM_LENDING_LIMIT]: 'basketPage.ctaErrMaxLendingLimit',
}

const BasketStatus = observer(({ worker }: BasketStatusProps): JSX.Element | null => {
  const {
    basketStore: { basket, pageError, error, notification = '', pageContent },
  } = useStore()

  const { vetOutcome, packages = [] } = basket
  const hashCode =
    error?.data?.errorCode === ValidationErrorCode.TRADEIN_QUOTE_EXP && packages?.some(p => p.tradeInCredit) ? '#strategictradein' : ''
  const changePackageUrl = packages?.length > 0 ? generateChangePackageLink(packages[0]) : ''
  const packageLength = packages.length
  const notificationCtaUrl = changePackageUrl && hashCode ? changePackageUrl + hashCode : changePackageUrl

  const [notificationDetails, setNotificationDetails] = useState<BasketNotification>({
    message: '',
    type: 'error',
    title: '',
    ctaUrl: '',
    ctaText: '',
  })

  const prevNotification = useRef<string>()

  const validationDetails = error?.data?.validationDetails
  const isMissingHandset =
    error?.data?.errorCode === 'VALIDATION_ERROR' &&
    validationDetails?.length &&
    validationDetails[0].errorCode === 'MissingHandsetForWatch'

  useEffect(() => {
    if (error?.data?.errorMessage === notificationDetails.message || notification === prevNotification.current) {
      return
    }
    if (notification === 'clear' || notification === '') {
      clearStatus()
    } else {
      updateStatus(getErrorDetails(notification, error, vetOutcome, packageLength))
    }
    prevNotification.current = notification
  }, [notification, vetOutcome, packageLength, error])

  const clearStatus = () => {
    setNotificationDetails({ message: '' })
  }

  const updateStatus = ({ title = NOTIFICATIONS.title, message = NOTIFICATIONS.message, type = NOTIFICATIONS.type }) => {
    const errorCode = error?.data?.errorCode || ''
    const errorCategory = errorCode === 'SYS_ERR_DEF' ? 'system' : 'business'
    const errorMessage = error?.data?.errorMessage || ''
    const errorNotification = { message, title, type, ctaText: '', ctaUrl: '' }
    const content = pageContent?.vf_Modules?.notifications?.content || {}
    const contentMessage: ContentMessage = content[errorCode as keyof BasketPageContent.HbbPortfolioRefreshContent]

    if (contentMessage) {
      errorNotification.title = contentMessage.header || NOTIFICATIONS.title
      errorNotification.message = contentMessage.bodyText || NOTIFICATIONS.message
      errorNotification.ctaText = contentMessage.acceptCTA || NOTIFICATIONS.ctaText
      errorNotification.ctaUrl = contentMessage.ctaURL || notificationCtaUrl || NOTIFICATIONS.ctaUrl
      errorNotification.type = contentMessage.type || NOTIFICATIONS.type
    }

    worker.postMessage({
      error: {
        error_code: errorCode,
        error_category: errorCategory,
        error_short_description: errorMessage,
      },
    })
    setNotificationDetails(errorNotification)
    console.warn(`${message} ${errorMessage || JSON.stringify(error)}`)
  }

  const handleButtonClick = () => {
    const errorCode: string = error?.data?.errorCode || ''
    const analyticsEvent = errorAnalyticsEvents[errorCode]

    if (errorCode && analyticsEvent) {
      AnalyticsUtil.trackLink(analyticsEvent, {
        newBasket: basket,
        pageError,
      })
    }

    const link = isMissingHandset ? getValidationButtonLink(validationDetails) : notificationDetails?.ctaUrl
    if (link) {
      window.location.assign(link)
    }
  }
  const { type: appearance, message: notificationMessage, title: notificationTitle = '', ctaText, ctaUrl } = notificationDetails
  const isButtonVisible = isMissingHandset || (ctaText && ctaUrl)

  if (!notificationMessage) return null

  return (
    <GridRow>
      <GridColumn offsetLg={2} colLg={8} className={styles.notification}>
        <div className={styles['container']}>
          <Notification title={notificationTitle} appearance={appearance}>
            <Paragraph marginTop={1} marginBottom={0}>
              {notificationMessage}
            </Paragraph>
            {isButtonVisible && (
              <Button onClick={handleButtonClick} isExternal={ctaText && ctaUrl ? true : undefined} selector="notification-cta-button">
                {isMissingHandset ? 'See compatible phones' : ctaText}
              </Button>
            )}
          </Notification>
        </div>
      </GridColumn>
    </GridRow>
  )
})

export default BasketStatus
