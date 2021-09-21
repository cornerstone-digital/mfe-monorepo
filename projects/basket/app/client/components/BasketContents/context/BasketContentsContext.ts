import { createContext } from 'react'
import { TransformedBasket } from '@shared/helpers/basketTransformer/BasketTransformer'

export type BasketContentsContextProps = Pick<TransformedBasket, 'isReviewMode'>

const BasketContentsContext = createContext<BasketContentsContextProps>({})

export default BasketContentsContext
