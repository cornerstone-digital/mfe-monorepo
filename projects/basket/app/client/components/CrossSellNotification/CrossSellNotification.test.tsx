import { render, screen, waitFor } from '@testing-library/react'
import CrossSellNotification from './CrossSellNotification'
import mockBasketWithPriceProposal from '@basketMocks/basketWithPriceProposal.mock.json'
import BasketTransformer from '@shared/helpers/basketTransformer/BasketTransformer'
import * as storeHooks from '@store'

jest.mock('@store', () => ({
  useStore: jest.fn().mockImplementation(() => ({})),
}))

const mockBasket: BasketV2.Basket = BasketTransformer.transformBasket(mockBasketWithPriceProposal)
const mockPriceProposal: BasketV2.PriceProposal[] | undefined = mockBasket.priceProposal

interface CrossSellTestCase {
  type: string
  headingText: string
  paragraphText: string
  upgradeParams: {
    label: string
    link: string
  }
  img: string
  priceProposal?: BasketV2.PriceProposal[]
}

const crossSellLinks: CrossSellTestCase[] = [
  {
    type: 'broadband',
    headingText: 'Build your Vodafone Together deal',
    paragraphText: '&pound;3 off any Superfast Broadband when bought with any Non-Unlimited 18 month SIMO',
    upgradeParams: {
      label: 'Pro Broadband',
      link: '/broadband?continueShopping=true',
    },
    img: 'together-add-broadband-small.jpg',
    priceProposal: mockPriceProposal,
  },
  {
    type: 'simo',
    headingText: 'Build your Vodafone Together deal',
    paragraphText: '&pound;3 off any Superfast Broadband when bought with any Non-Unlimited 18 month SIMO',
    upgradeParams: {
      label: 'SIM Only',
      link: '/mobile/best-sim-only-deals?continueShopping=true&commitmentPeriod=24 Months',
    },
    img: 'together-add-sim-small.jpg',
    priceProposal: [
      {
        ...mockPriceProposal![0],
        productDetail: {
          category: 'SIMO_18',
        },
      },
    ],
  },
]

describe('<CrossSellNotification />', () => {
  crossSellLinks.forEach(crossSellLink => {
    describe(`${crossSellLink.type} cross sell`, () => {
      beforeEach(() => {
        const mockStore = { basketStore: { basket: { priceProposal: crossSellLink.priceProposal } } } as storeHooks.RootStoreType
        jest.spyOn(storeHooks, 'useStore').mockImplementationOnce(() => mockStore)
        render(<CrossSellNotification />)
      })
      it('should render', async () => {
        const h2: HTMLHeadingElement | null = document.querySelector('h2')
        const link: HTMLAnchorElement | null = document.querySelector('a')

        expect(h2!.textContent).toBe(crossSellLink.headingText)
        expect(link!.getAttribute('href')).toBe(crossSellLink.upgradeParams.link)
        expect(link!.textContent).toBe(`Add ${crossSellLink.upgradeParams.label}`)
        await waitFor(() => {
          expect(screen.getByText(crossSellLink.paragraphText)).toBeInTheDocument()
        })
      })

      it('should have PromotionNotification title', () => {
        const wrapperTitle = crossSellLink.paragraphText
        expect(screen.getByText(wrapperTitle)).toBeInTheDocument()
      })

      it('should have PromotionNotification button', () => {
        const buttonLabelText = crossSellLink.upgradeParams.label
        const wrapperButtonURL = crossSellLink.upgradeParams.link

        expect(screen.getByText(`Add ${buttonLabelText}`)).toBeInTheDocument()
        expect(screen.getByRole('button').closest('a')).toHaveAttribute('href', wrapperButtonURL)
      })

      it('should have PromotionNotification message', () => {
        const wrapperMsg = crossSellLink.paragraphText
        expect(screen.getByText(wrapperMsg)).toBeInTheDocument()
      })

      it('should have PromotionNotification image', () => {
        const imgPrefix = crossSellLink.img
        expect(screen.getByRole('img')).toBeInTheDocument()
        expect(screen.getByRole('img').getAttribute('src')).toContain(imgPrefix)
      })
    })
  })

  it('should not render when price proposal is not provided', () => {
    const mockStore = { basketStore: { basket: {} } } as storeHooks.RootStoreType
    jest.spyOn(storeHooks, 'useStore').mockImplementationOnce(() => mockStore)
    const { container } = render(<CrossSellNotification />)

    expect(container).toBeEmptyDOMElement()
  })

  it('should not render when combi upgrade type is not provided', () => {
    const mockStore = { basketStore: { basket: { priceProposal: [{}] } } } as storeHooks.RootStoreType
    jest.spyOn(storeHooks, 'useStore').mockImplementationOnce(() => mockStore)
    const { container } = render(<CrossSellNotification />)

    expect(container).toBeEmptyDOMElement()
  })

  it('should not render when upgrade journey', () => {
    const mockStore = {
      basketStore: { basket: { isUpgradeOrder: true, priceProposal: crossSellLinks[0].priceProposal } },
    } as storeHooks.RootStoreType
    jest.spyOn(storeHooks, 'useStore').mockImplementationOnce(() => mockStore)
    const { container } = render(<CrossSellNotification />)

    expect(container).toBeEmptyDOMElement()
  })

  it('should not render when business journey', () => {
    const mockStore = {
      basketStore: { basket: { isBusiness: true, priceProposal: crossSellLinks[0].priceProposal } },
    } as storeHooks.RootStoreType
    jest.spyOn(storeHooks, 'useStore').mockImplementationOnce(() => mockStore)
    const { container } = render(<CrossSellNotification />)

    expect(container).toBeEmptyDOMElement()
  })

  it('should not render when isBannehHidden is true', () => {
    const mockStore = {
      basketStore: { basket: { isBannerHidden: true, priceProposal: crossSellLinks[0].priceProposal } },
    } as storeHooks.RootStoreType
    jest.spyOn(storeHooks, 'useStore').mockImplementationOnce(() => mockStore)
    const { container } = render(<CrossSellNotification />)

    expect(container).toBeEmptyDOMElement()
  })
})
