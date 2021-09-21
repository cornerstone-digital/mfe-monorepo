import { render } from '@testing-library/react'

import FlexiUpgradeItem from './FlexiUpgradeItem'
import mockBasket from '@components/BasketContents/mocks/basket.mock.json'
import flexiBasket from '@components/BasketContents/mocks/flexi.basket.mock.json'

import { sanitizeJson } from '@shared/helpers/transformUtils/transformUtils'
import mockPageContent from '@shared/config/content/BasketPageContent.json'
import * as storeHooks from '@store'

const flexiBasketProps = sanitizeJson(flexiBasket)
const mockBasketProps = sanitizeJson(mockBasket)

const pageContent: BasketPageContent.Basket = mockPageContent[0]?.basket as BasketPageContent.Basket

jest.mock('@store', () => ({
  useStore: jest.fn().mockReturnValue(() => {}),
}))

describe('FlexiUpgradeItem', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should render the flexi upgrade basket item', async () => {
    const mockStore = {
      basketStore: { basket: { packages: flexiBasketProps.packages }, pageContent },
    } as any
    jest.spyOn(storeHooks, 'useStore').mockReturnValue(mockStore)
    const { getByText } = render(<FlexiUpgradeItem />)
    expect(await getByText('£102.70')).toBeInTheDocument()
    expect(await getByText('£0')).toBeInTheDocument()
    expect(global.window.VFUK.basketData.fuf?.monthly).toBe('0')
    expect(global.window.VFUK.basketData.fuf?.upfront).toBe('102.70')
  })

  it('should not render if not a flexi package', async () => {
    const mockStore = {
      basketStore: { basket: { packages: mockBasketProps.packages }, pageContent },
    } as any
    jest.spyOn(storeHooks, 'useStore').mockReturnValue(mockStore)
    const { container } = render(<FlexiUpgradeItem />)
    expect(global.window.VFUK.basketData.fuf).toEqual({})
    expect(container.querySelectorAll('div')).toHaveLength(0)
  })
})
