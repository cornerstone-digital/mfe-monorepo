import Section from '@web-core/components/atoms/Section'
import Modal from '@vfuk/core-modal'
import Heading from '@web-core/components/atoms/Heading'
import RawHtmlWrapper from '@vfuk/core-raw-html-wrapper'

import CompatibleDeviceDropdown from './CompatibleDeviceDropdown'
import { SimPanelModalProps } from './SimPanelModal.types'
import styles from './SimPanelModal.scss'

const SimPanelModal = (props: SimPanelModalProps) => {
  const { isOpen, onExit, pageContent } = props
  const modalHeader = pageContent?.vf_Modules?.basket_esim_modal?.heading || ''
  const modalBody = pageContent?.vf_Modules?.basket_esim_modal?.mainCopy || ''
  const compatibleDeviceContent = pageContent?.vf_Modules?.popular_esim_devices
  const compatibilityTitle = pageContent?.vf_Modules?.popular_esim_devices?.title

  return (
    <Modal isOpen={isOpen} onCloseCb={onExit} srName={modalHeader} size={3}>
      <>
        <Heading level={3} size={3} justify="center">
          {modalHeader}
        </Heading>
        <Section paddingHorizontal={4} paddingVertical={2}>
          <RawHtmlWrapper markup={modalBody} />
        </Section>
        <Section paddingHorizontal={4} paddingTop={2} paddingBottom={4} appearance="light2">
          <h4 className={styles['compatibility-title']}>{compatibilityTitle}</h4>
          <If condition={!!compatibleDeviceContent}>
            <CompatibleDeviceDropdown content={compatibleDeviceContent} />
          </If>
        </Section>
      </>
    </Modal>
  )
}

export default SimPanelModal
