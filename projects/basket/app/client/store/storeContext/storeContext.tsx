import { createContext, FC, useContext } from 'react'
import { RootStoreType } from '@store/RootStore'

interface StoreProviderProps {
  store: RootStoreType
}

/**
 *  Initiate empty context, but tell TS that it will never actually be undefined when used,
 *  to avoid non-null assetions throughout the code.
 */
const StoreContext = createContext<RootStoreType>(undefined!)

export const StoreProvider: FC<StoreProviderProps> = ({ children, store }) => (
  <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
)

export const useStore = (): RootStoreType => {
  return useContext(StoreContext)
}
