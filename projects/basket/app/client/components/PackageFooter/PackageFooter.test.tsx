import { render } from '@testing-library/react'
import mockPageContent from '@shared/config/content/BasketPageContent.json'
import PackageFooter from './PackageFooter'

describe('<PackageFooter/>', () => {
  const basketPackages = [
    {
      bundle: {
        priceDetails: {
          merchandisingPromotions: {
            mpType: 'conditional_full_discount',
          },
        },
      },
    },
    {
      bundle: {
        priceDetails: {
          merchandisingPromotions: {
            mpType: 'multi_package_discount',
          },
        },
      },
    },
    {
      bundle: {
        priceDetails: {
          merchandisingPromotions: {
            mpType: 'limited_time',
          },
        },
      },
    },
  ]
  const pageContent: BasketPageContent.Basket = mockPageContent[0]?.basket as BasketPageContent.Basket

  it('should render limited_time messages', () => {
    const { getByText } = render(<PackageFooter package={basketPackages} pageContent={pageContent} />)
    expect(getByText('*Includes time-limited discounts. The price you pay will increase during your contract.'))
  })

  it('should not render "conditional full discount" message', () => {
    const { container } = render(<PackageFooter package={basketPackages[0]} pageContent={pageContent} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('should not render "multi package discount" message', () => {
    const { container } = render(<PackageFooter package={basketPackages[1]} pageContent={pageContent} />)
    expect(container).toBeEmptyDOMElement()
  })
})
