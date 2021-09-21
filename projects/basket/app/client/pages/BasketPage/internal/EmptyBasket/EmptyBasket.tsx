import { useStore } from '@store'

import Container from '@web-core/components/atoms/Container'
import Heading from '@web-core/components/atoms/Heading'
import Button from '@web-core/components/atoms/Button'

import styles from '@pages/BasketPage/BasketPage.scss'

const EmptyBasket = () => {
  const { pageUiStore } = useStore()

  return (
    <Container gutters="none">
      <Heading level={1} size={3} justify="center" marginTop={5} marginBottom={4} appearance="mid">
        Your basket is empty
      </Heading>
      <div className={styles.buttons}>
        <Button
          marginTop={0}
          marginBottom={8}
          onClick={() => pageUiStore.toggleModal('continueShopping')}
          selector="continue-shopping-button"
        >
          Continue shopping
        </Button>
      </div>
    </Container>
  )
}

export default EmptyBasket
