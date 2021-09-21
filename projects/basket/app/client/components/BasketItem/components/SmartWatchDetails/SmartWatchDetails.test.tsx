import { render } from '@testing-library/react'

import SmartWatchDetails from './SmartWatchDetails'

import mockPageContent from '@shared/config/content/BasketPageContent.json'
import { mockStore } from '@tools/mocks/storeMock'
import * as storeHooks from '@store'

const pageContent: BasketPageContent.Basket = mockPageContent[0]?.basket as BasketPageContent.Basket
const connectivityText = pageContent?.vf_Modules?.messages?.content?.connectivity_plan?.bodyText || ''
const associatedNumberText = pageContent?.vf_Modules?.messages?.content?.number_associated_watch?.bodyText || ''
const chosenToConnectText = pageContent?.vf_Modules?.messages?.content?.chosen_connect?.bodyText || ''

jest.mock('@store', () => ({
  useStore: jest.fn().mockImplementation(() => mockStore({})),
}))

describe('<SmartWatchDetails />', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('renders connectivity text from using the pageContent', () => {
    jest.spyOn(storeHooks, 'useStore').mockImplementation(() => mockStore({}, pageContent))
    const { getByText, queryByText } = render(<SmartWatchDetails />)

    expect(getByText(connectivityText)).toBeInTheDocument()
    expect(queryByText(associatedNumberText)).not.toBeInTheDocument()
    expect(queryByText(chosenToConnectText)).not.toBeInTheDocument()
  })

  it('renders as expected when phonePaired is supplied', () => {
    jest.spyOn(storeHooks, 'useStore').mockImplementation(() => mockStore({}, pageContent))
    const mockPhoneNumber = '12345'
    const { getByText } = render(<SmartWatchDetails phonePaired={mockPhoneNumber} />)

    expect(getByText(connectivityText)).toBeInTheDocument()
    expect(getByText(associatedNumberText)).toBeInTheDocument()
    expect(getByText(mockPhoneNumber)).toBeInTheDocument()
    expect(getByText(chosenToConnectText)).toBeInTheDocument()
  })
})
