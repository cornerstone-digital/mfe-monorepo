import { useState } from 'react'

import ItemHighlights from '@components/ItemHighlights'
import Modal from '@vfuk/core-modal'
import ModalPrompt from '@components/ModalPrompt'
import Heading from '@web-core/components/atoms/Heading'

import { BenefitsModalProps } from './BenefitsModal.types'

const BenefitsModal: React.FC<BenefitsModalProps> = props => {
  const [openModal, setOpenModal] = useState(false)

  const handleClick = () => {
    setOpenModal(true)
    if (props.onClick) {
      props.onClick()
    }
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  return (
    <>
      <ModalPrompt onClick={handleClick} text="See all benefits" dataSelector="see-all-benefits" />
      {openModal && (
        <Modal isOpen srName="Plan benefits" onCloseCb={handleCloseModal} size={2}>
          <>
            <Heading text="Plan benefits" level={1} size={3} noMargin={true} />
            <ItemHighlights items={props.items} bullets={props?.bullets} />
          </>
        </Modal>
      )}
    </>
  )
}

export default BenefitsModal
