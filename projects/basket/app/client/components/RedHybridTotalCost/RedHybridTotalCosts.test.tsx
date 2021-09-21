import { waitFor } from '@testing-library/react'
import * as store from '@store/storeContext/storeContext'

import renderWithProviders from '@helpers/renderWithProviders'

import RedHybridTotalCost from './RedHybridTotalCost'
import { RootStoreType } from '@store'

const mockStore = {
  basketStore: {
    basket: {
      packages: [
        {
          priceDetails: {
            monthlyPrice: {
              gross: '20',
            },
          },
        },
      ],
    },
  },
  pageUiStore: {},
} as RootStoreType

describe('<RedHybridTotalCost />', () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  it(`should render correctly`, async () => {
    jest.spyOn(store, 'useStore').mockImplementation(() => mockStore)

    const { getByText } = renderWithProviders(<RedHybridTotalCost />)
    await waitFor(() => {
      expect(getByText('Total Cost')).toBeInTheDocument()
      expect(getByText('(VAT included)')).toBeInTheDocument()
      expect(getByText('£20')).toBeInTheDocument()
    })
  })
})
