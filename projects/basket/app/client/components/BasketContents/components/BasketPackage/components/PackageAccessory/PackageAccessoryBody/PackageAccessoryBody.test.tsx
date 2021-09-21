import { render } from '@testing-library/react'
import PackageAccessoryBody from './PackageAccessoryBody'
import { TransformedBasket } from '@shared/helpers/basketTransformer/BasketTransformer'
import { BasketPackageProps, PackageWithHeaderStatus } from '../../../BasketPackage.types'

import accessoryBasketPackageMock from '../mocks/basket1.mock.json'

const accessoryBasketPackage: BasketPackageProps = TransformUtils.removeNulls(accessoryBasketPackageMock)

import pageContent from '@shared/config/content/BasketPageContent.json'
import TransformUtils from '@shared/helpers/transformUtils/transformUtils'

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

describe('PackageAccessoryBody', () => {
  it('should render null', () => {
    const primaryPackage = { ...(accessoryBasketPackage.thisPackage as PackageWithHeaderStatus) }
    primaryPackage.hardwares = []
    const { container } = render(
      <PackageAccessoryBody
        primaryPackage={primaryPackage}
        isBusiness={false}
        onRemoveAddOn={jest.fn() as never}
        onUndoRemoveAddOn={jest.fn() as never}
      />,
    )
    expect(container.firstChild).toBeNull()
  })

  it('should render for basic scenario', () => {
    const { getByText, queryAllByText, queryByText, asFragment } = render(
      <PackageAccessoryBody
        primaryPackage={accessoryBasketPackage.thisPackage as PackageWithHeaderStatus}
        isBusiness={false}
        onRemoveAddOn={jest.fn() as never}
        onUndoRemoveAddOn={jest.fn() as never}
      />,
    )

    expect(getByText('XQISIT Wireless Charger 10W Black')).toBeInTheDocument()
    expect(queryAllByText('Remove')).toHaveLength(3)
    expect(queryByText('undefined-month Airtime Plan')).not.toBeInTheDocument()
    expect(queryByText('Joining us from another network')).not.toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })
})
