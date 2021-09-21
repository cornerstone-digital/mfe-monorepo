import { useState } from 'react'
import { observer } from 'mobx-react-lite'

import Heading from '@vfuk/core-heading'
import { Grid, GridColumn, GridRow } from '@vfuk/core-grid'
import Modal from '@vfuk/core-modal'
import Icon from '@vfuk/core-icon'
import Toggle from '@vfuk/core-toggle'
import TwoButtonModalTemplate from '@vfuk/core-two-button-modal-template'

import basketService from '@web-shop-core/services/basketService'

import { SwitchMyNetworkPromptProps } from './SwitchMyNetworkPrompt.types'

import styles from './SwitchMyNetworkPrompt.scss'
import { useStore } from '@store'

const SwitchMyNetworkPrompt = observer((props: SwitchMyNetworkPromptProps) => {
  const [showModal, setShowModal] = useState(false)
  const {
    basketStore: { pageContent },
  } = useStore()

  const pacStacTitle = pageContent?.vf_Modules?.basket_pac_stac_content?.heading || ''

  const handleModalCancel = () => {
    setShowModal(false)
  }

  const handleModalConfirm = async () => {
    try {
      await basketService.removePortabilityInfo(props.basketId, props.packageId)

      if (props.onUpdateBasket) {
        await props.onUpdateBasket()
      }
    } finally {
      setShowModal(false)
    }
  }

  const handleToggleChange = () => {
    if (props.isSwitched) {
      return setShowModal(true)
    }
    props.onClick()
  }

  return (
    <>
      <Grid className={styles['no-gutters']}>
        <GridRow noGutters>
          <GridColumn col={props.reviewMode ? 11 : 10} colMd={props.reviewMode ? 12 : 11} alignSelf="center">
            <div className={styles['header-wrapper']}>
              <div className={styles['header-with-icon']}>
                <Icon name="setup" size={3} />
                <Heading justify="left" level={2} size={1} weight={4} text={props.isSwitched ? 'Thank you for switching!' : pacStacTitle} />
              </div>
              {props.isSwitched && <div>Your information is saved.</div>}
            </div>
          </GridColumn>
          {!props.reviewMode && (
            <GridColumn className={styles['vertical-gutters']} col={2} colMd={1}>
              <Toggle
                id="switch-network-toggle"
                name="switch-network-toggle"
                showIcons={false}
                isActive={Boolean(props.isSwitched)}
                onChange={handleToggleChange}
              />
            </GridColumn>
          )}
        </GridRow>
      </Grid>
      <Modal srName="test-modal" isOpen={showModal} size={2} onCloseCb={handleModalCancel}>
        <TwoButtonModalTemplate
          headingText="Are you sure?"
          text="By switching this toggle off your information for switching network will be lost."
          primaryButton={{
            appearance: 'secondary',
            text: 'Cancel',
            onClick: handleModalCancel,
          }}
          secondaryButton={{
            appearance: 'primary',
            text: 'Confirm',
            onClick: handleModalConfirm,
          }}
        />
      </Modal>
    </>
  )
})

export default SwitchMyNetworkPrompt
