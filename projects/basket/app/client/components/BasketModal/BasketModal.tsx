import { useStore } from '@store'
import { observer } from 'mobx-react-lite'

import Modal from '@vfuk/core-modal'
import Heading from '@vfuk/core-heading'
import ContentWithIconList from '@web-shop-core/components/molecules/ContentWithIconList'
import TwoButtonModalTemplate from '@vfuk/core-two-button-modal-template'

import getContinueShoppingIcons from './helpers/getContinueShoppingIcons'

import styles from './BasketModal.scss'
import useBasketModalData from './hooks/useBasketModalData'

const BasketModal = observer(() => {
  const {
    basketStore,
    pageUiStore: { isModalVisible, hideModal, modalName },
  } = useStore()

  const {
    basket: { isBusiness },
    hasPayMonthlyPackage,
    isEmpty,
  } = basketStore

  const templateProps = useBasketModalData(modalName)

  return (
    <Modal srName={modalName} isOpen={isModalVisible} size={modalName === 'continueShopping' ? 3 : 2} onCloseCb={hideModal}>
      <div className={styles['modal-content']}>
        {modalName === 'continueShopping' ? (
          <>
            <Heading text="What are you shopping for?" justify="center" level={1} size={3} noMargin={true} />
            <ContentWithIconList icons={getContinueShoppingIcons(!isEmpty && !hasPayMonthlyPackage, isBusiness)} />
          </>
        ) : (
          <TwoButtonModalTemplate
            primaryButton={{
              appearance: 'secondary',
              text: 'Cancel',
              onClick: hideModal,
            }}
            {...templateProps}
          />
        )}
      </div>
    </Modal>
  )
})

export default BasketModal
