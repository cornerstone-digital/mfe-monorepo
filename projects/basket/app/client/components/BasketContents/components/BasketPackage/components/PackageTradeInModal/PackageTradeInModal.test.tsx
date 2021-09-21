import { fireEvent } from '@testing-library/react'

import PackageTradeInModal from './PackageTradeInModal'
import AnalyticsUtil from '@utilities/Analytics'
import renderWithProviders from '@helpers/renderWithProviders'
import mockPageContent from '@shared/config/content/BasketPageContent.json'

jest.mock('@store', () => ({
  useStore: jest
    .fn()
    .mockImplementation(() => ({ basketStore: { basket: { packages: [{ packageId: 'package1' }, { packageId: 'package2' }] } } })),
}))

const pageContent: BasketPageContent.Basket = mockPageContent[0]?.basket as BasketPageContent.Basket

describe('PackageTradeInModal', () => {
  const mockProps = {
    packageId: 'package1',
    uniqueCode: '15670678-b46d-4cef-8d3a-2ce5b2516c63',
    deviceName: 'Apple iPhone11pro 256Gb black',
    expiryDate: '2022-05-20T09:09:48',
    pageContent,
  }
  it('should only display modal prompt', async () => {
    const { container, getByText } = renderWithProviders(<PackageTradeInModal {...mockProps} />)
    expect(getByText('See more')).toBeInTheDocument()
    expect(container.querySelector('dialog')).toBeNull()
  })

  it('should call udl event', async () => {
    const udlSpy = jest.spyOn(AnalyticsUtil, 'trackLink')
    const { container, getByText } = renderWithProviders(<PackageTradeInModal {...mockProps} />)
    const button = getByText('See more')
    expect(button).toBeInTheDocument()
    fireEvent.click(button)
    expect(container.querySelector('dialog')).toBeInTheDocument()
    expect(udlSpy).toHaveBeenCalledWith(
      'basketPage.seeMoreTradeinCta',
      expect.objectContaining({
        newBasket: { packages: [{ packageId: 'package1' }, { packageId: 'package2' }] },
        tradeInCredit: undefined,
      }),
    )
  })
})
