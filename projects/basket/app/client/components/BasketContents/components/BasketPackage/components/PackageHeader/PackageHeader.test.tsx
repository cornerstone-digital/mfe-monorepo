import { render } from '@testing-library/react'
import PackageHeader from './PackageHeader'
import { TransformedBasket } from '@shared/helpers/basketTransformer/BasketTransformer'

import pageContent from '@shared/config/content/BasketPageContent.json'

const basketPageContent: BasketPageContent.Basket = pageContent[0]?.basket as BasketPageContent.Basket

function mockStore(basket: Partial<TransformedBasket> = {}): any {
  return {
    basketStore: {
      basket: {
        basketId: '123',
        ...basket,
      },
      pageContent: basketPageContent,
    },
  }
}

jest.mock('@store', () => ({
  useStore: jest.fn().mockImplementation(() => mockStore()),
}))

describe('PackageHeader', () => {
  it('should render with default values', () => {
    const { getByText, asFragment } = render(<PackageHeader primaryPackage={{}} renderedPackage={{}} title={'test-title'} />)

    expect(getByText('test-title')).toBeInTheDocument()
    expect(getByText('Remove')).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })
})
