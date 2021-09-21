import { createContext } from 'react'
import { BasketPackageProps } from '../BasketPackage.types'

export type BasketPackageContextProps = Partial<BasketPackageProps> & { isSmallBusiness?: boolean }

const BasketPackageContext = createContext<BasketPackageContextProps>({})

export default BasketPackageContext
