import { createContext } from 'react'
import { BasketItemProps } from '../BasketItem.types'

export type BasketItemContextProps = Partial<BasketItemProps>

const BasketItemContext = createContext<BasketItemContextProps>({})

export default BasketItemContext
