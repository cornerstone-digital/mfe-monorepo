import { render } from '@testing-library/react'
import BasketContainer from './BasketContainer'
import * as storeHooks from '@store'

jest.mock('@store', () => {
  const MockStoreProvider: React.FC = ({ children }) => <div id="store-provider">{children}</div>
  return {
    createRootStore: jest.fn(),
    StoreProvider: MockStoreProvider,
  }
})

jest.mock('@vfuk/core-overlay-controller', () => {
  const MockOverlayProvider: React.FC = ({ children }) => <div id="overlay-provider">{children}</div>
  return {
    OverlayProvider: MockOverlayProvider,
  }
})

jest.mock('@pages/BasketPage/internal/Basket', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => <span></span>),
}))

describe('BasketContainer', () => {
  it('should call createRootStore if reviewMode is true', () => {
    const mockFn = jest.spyOn(storeHooks, 'createRootStore')
    const { container } = render(<BasketContainer reviewMode />)
    expect(mockFn).toHaveBeenCalled()
    expect(container.querySelector('#store-provider')).toBeInTheDocument()
    expect(container.querySelector('#overlay-provider')).toBeInTheDocument()
  })

  it('should call createRootStore if reviewMode is false', () => {
    const mockFn = jest.spyOn(storeHooks, 'createRootStore')
    const { container } = render(<BasketContainer />)
    expect(mockFn).toHaveBeenCalled()
    expect(container.querySelectorAll('#store-provider')).toHaveLength(0)
    expect(container.querySelectorAll('#overlay-provider')).toHaveLength(0)
  })
})
