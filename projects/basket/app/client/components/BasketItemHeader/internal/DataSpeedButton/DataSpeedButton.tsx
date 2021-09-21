import { useState } from 'react'
import AnalyticsUtil from '@utilities/Analytics'
import SpeedInfoModal from '@components/SpeedInfoModal'
import styles from './DataSpeedButton.scss'
import { DataSpeedButtonProps } from './DataSpeedButton.types'
import { useStore } from '@store'

const DataSpeedButton = (props: DataSpeedButtonProps) => {
  const [showSpeedModal, setShowSpeedModal] = useState(false)
  const { basketStore } = useStore()
  const { basket } = basketStore

  const handleDataSpeedClick = () => {
    const speedKey = props.dataSpeed?.key
    const speedAnalyticsEvents: { [index: string]: string } = {
      MAX_2_MBPS: 'basketPage.dataSpeed2Mbps',
      MAX_10_MBPS: 'basketPage.dataSpeed10Mbps',
      MAX_AVAILABLE: 'basketPage.dataSpeedFastest',
    }
    if (speedKey) {
      const analyticsEvent = speedAnalyticsEvents[speedKey]
      if (analyticsEvent) {
        AnalyticsUtil.trackLink(analyticsEvent, {
          newBasket: basket || {},
          packageId: props.packageId,
        })
      }
    }
    setShowSpeedModal(true)
  }

  const handleDataSpeedModalClose = () => {
    setShowSpeedModal(false)
  }

  return (
    <>
      <button data-selector="data-speed" className={styles['speed-button']} onClick={handleDataSpeedClick}>
        {props.dataSpeed?.message}
      </button>
      {showSpeedModal && <SpeedInfoModal onClose={handleDataSpeedModalClose} />}
    </>
  )
}

export default DataSpeedButton
