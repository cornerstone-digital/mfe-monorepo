import { createContext } from 'react'

export interface CostRowContextProps {
  showDiscount?: boolean
  isUpgrade?: boolean
  isTotalDiscountRow?: boolean
  showDiscountAsterix?: boolean
  showTotal?: boolean
}

const CostRowContext = createContext<CostRowContextProps>({})

export default CostRowContext
