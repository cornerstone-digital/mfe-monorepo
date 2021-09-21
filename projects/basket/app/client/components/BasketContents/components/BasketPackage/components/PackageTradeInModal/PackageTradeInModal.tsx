import React, { useState } from 'react'
import format from 'date-fns/format'

import ListGroup from '@vfuk/core-list-group'
import ListItem from '@vfuk/core-list-item'
import Heading from '@vfuk/core-heading'
import Spacing from '@vfuk/core-spacing'
import ValueWithLabel from '@vfuk/core-value-with-label'
import Paragraph from '@web-core/components/atoms/Paragraph'

import Modal from '@vfuk/core-modal'
import ModalPrompt from '@components/ModalPrompt'

import { PackageTradeInModalProps } from './PackageTradeInModal.types'

import { getTradeInModalContent } from '../../helpers/getTradeInModalContent'
import AnalyticsUtil from '@utilities/Analytics'
import { useStore } from '@store'
import { observer } from 'mobx-react-lite'

import styles from './PackageTradeInModal.scss'

const PackageTradeInModal: React.FC<PackageTradeInModalProps> = observer(props => {
  const { pageContent, packageId, uniqueCode, expiryDate, deviceName } = props
  const {
    basketStore: { basket },
  } = useStore()
  const content = getTradeInModalContent(pageContent?.vf_Modules?.basket_tradeIn)

  const [openModal, setOpenModal] = useState(false)

  const handleSeeMoreClick = () => {
    const packageItem = basket?.packages?.find(item => item.packageId === packageId)
    AnalyticsUtil.trackLink('basketPage.seeMoreTradeinCta', {
      newBasket: basket,
      packageId: packageId,
      tradeInCredit: packageItem?.tradeInCredit,
    })
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  return (
    <>
      <ModalPrompt onClick={handleSeeMoreClick} text="See more" dataSelector="see-more-trade-in" />
      {openModal && (
        <Modal srName={content.title} isOpen size={3} onCloseCb={handleCloseModal}>
          <>
            <Heading text={content.title} justify="center" noMargin={true} />
            <Spacing spacingLevel={{ bottom: 5, top: 7 }}>
              <Heading size={2} weight={4} text={content.firstSectionHeader} />
              <ListGroup listStyle="default" className={styles['break-spaces']}>
                {content.listItems.slice(0, 3).map((item: string, index: number) => (
                  <ListItem listStyle="default" key={index}>
                    {index === 2 && content.listItems[index + 1] ? `${item} ${content.listItems[index + 1]}` : item}
                  </ListItem>
                ))}
              </ListGroup>
              {content.listItems[4] && (
                <Paragraph marginTop={1} fontSize="xs">
                  {content.listItems[4]}
                </Paragraph>
              )}
            </Spacing>
            <Heading size={2} weight={4} text={content.secondSectionHeader} />
            <ValueWithLabel width="wrap" verticalAlign="center" label={content.uniqueCodeLabel}>
              {uniqueCode}
            </ValueWithLabel>
            <ValueWithLabel width="wrap" verticalAlign="center" label={content.expiryDateLabel}>
              {expiryDate && format(new Date(expiryDate), 'do LLLL yyyy')}
            </ValueWithLabel>
            <ValueWithLabel width="wrap" verticalAlign="center" label={content?.deviceLabel}>
              {deviceName}
            </ValueWithLabel>
          </>
        </Modal>
      )}
    </>
  )
})

export default PackageTradeInModal
