import mockPageContent from '@shared/config/content/BasketPageContent.json'

import SimPanelModal from './SimPanelModal'
import renderWithProviders from '@helpers/renderWithProviders'

const pageContent: BasketPageContent.Basket = mockPageContent[0]?.basket as BasketPageContent.Basket

const onExitMock = jest.fn()

describe('<SimPanelModal />', () => {
  it(`renders without exploding`, () => {
    renderWithProviders(<SimPanelModal onExit={onExitMock} isOpen={false} pageContent={pageContent} />)
  })
})
