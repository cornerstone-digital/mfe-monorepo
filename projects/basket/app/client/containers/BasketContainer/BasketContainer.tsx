import React, { Fragment } from 'react'

import { createRootStore, StoreProvider } from '@store'

import Basket from '@pages/BasketPage/internal/Basket'
import { BasketContainerProps } from './BasketContainer.types'
import { useCallback } from 'react'
import { OverlayProvider } from '@vfuk/core-overlay-controller'

const CheckoutWrapper: React.FC = ({ children }) => {
  return (
    <StoreProvider store={createRootStore()}>
      <OverlayProvider>{children}</OverlayProvider>
    </StoreProvider>
  )
}

const BasketContainer = (props: BasketContainerProps) => {
  const { reviewMode = false } = props

  const createWrapper = useCallback(() => {
    return reviewMode ? CheckoutWrapper : Fragment
  }, [reviewMode])
  const Wrapper = createWrapper()

  return (
    <Wrapper>
      <Basket {...props} />
    </Wrapper>
  )
}

export default BasketContainer
