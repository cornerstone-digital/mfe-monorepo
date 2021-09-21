import { createRootStore } from './'

jest.mock('@store/configureMobx', () => ({
  configureMobx: jest.fn().mockImplementation(() => {}),
}))

describe('RootStore', () => {
  it('should have basket store', () => {
    const rootStore = createRootStore()
    expect(rootStore.basketStore).toBeDefined()
  })
})
