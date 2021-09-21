import enzyme from 'enzyme'
import { waitFor } from '@testing-library/react'

import pageContent from '@shared/config/content/BasketPageContent.json'

import * as store from '@store/storeContext/storeContext'

import renderWithProviders from '@helpers/renderWithProviders'

import RedHybridBundle from './RedHybridBundle'

const basketPageContent = pageContent[0].basket as BasketPageContent.Basket

describe('<RedHybridBundle />', () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  const props = {
    monthlyPrice: 12,
    services: [
      {
        productClass: 'Hybrid Bundles',
        allowances: [
          {
            type: 'UK DATA',
            value: '5',
            uom: 'GB',
          },
        ],
      },
    ],
    hardwares: [{ simType: 'PHYSICAL' }],
  } as any

  const mockStore = {
    basketStore: {
      pageContent: basketPageContent,
    },
  } as any

  it('renders correctly', async () => {
    jest.spyOn(store, 'useStore').mockImplementationOnce(() => mockStore)

    const { getByText } = renderWithProviders(<RedHybridBundle {...props} />)

    await waitFor(() => {
      expect(getByText('£12')).toBeInTheDocument()
      expect(getByText('5 GB data')).toBeInTheDocument()
      expect(getByText('With unlimited calls and texts')).toBeInTheDocument()
      expect(getByText('30-day subscription')).toBeInTheDocument()
      expect(getByText('VeryMe Rewards')).toBeInTheDocument()
    })
  })

  it('should not render descriptions', async () => {
    const mockStoreWithoutContent = {
      basketStore: {
        pageContent: {},
      },
    } as any

    jest.spyOn(store, 'useStore').mockImplementationOnce(() => mockStoreWithoutContent)
    const { queryByText } = renderWithProviders(<RedHybridBundle {...props} />)

    await waitFor(() => {
      expect(queryByText('£12')).toBeInTheDocument()
      expect(queryByText('5 GB data')).toBeInTheDocument()
      expect(queryByText('With unlimited calls and texts')).not.toBeInTheDocument()
      expect(queryByText('30-day subscription')).not.toBeInTheDocument()
      expect(queryByText('VeryMe Rewards')).not.toBeInTheDocument()
    })
  })

  it('should not render data', async () => {
    const mockStoreWithoutContent = {
      basketStore: {
        pageContent: {},
      },
    } as any

    jest.spyOn(store, 'useStore').mockImplementationOnce(() => mockStoreWithoutContent)

    const propsWithoutServices = {
      ...props,
      services: [],
    } as any

    const { queryByText } = renderWithProviders(<RedHybridBundle {...propsWithoutServices} />)

    await waitFor(() => {
      expect(queryByText('5 GB data')).not.toBeInTheDocument()
    })
  })

  it('should render correctly for e-sim with cpu icon', () => {
    jest.spyOn(store, 'useStore').mockImplementationOnce(() => mockStore)
    const esimProps = {
      ...props,
      hardwares: [{ simType: 'HYBRID' }],
    } as any

    const wrapper = enzyme.shallow(<RedHybridBundle {...esimProps} />)
    const iconElement = wrapper.find('Icon')
    expect(iconElement.length).toEqual(1)
    expect(iconElement.prop('name')).toBe('cpu')
  })
})
