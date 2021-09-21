import { observer } from 'mobx-react-lite'
import { render } from '@testing-library/react'
import { RootStoreType, StoreProvider, useStore, createRootStore } from '@store'

jest.mock('@store/configureMobx', () => ({
  configureMobx: jest.fn().mockImplementation(() => {}),
}))

describe('storeContext', () => {
  describe('StoreProvider', () => {
    let componentStore: RootStoreType | undefined = undefined
    const ConnectedComponent = observer(() => {
      componentStore = useStore()
      return <p>{componentStore.basketStore.basketId}</p>
    })

    it('should provide root store', () => {
      const store = createRootStore()
      render(
        <StoreProvider store={store}>
          <ConnectedComponent />
        </StoreProvider>,
      )
      expect(componentStore).toBe(store)
    })
  })
})
