import BasketTransformer from '@shared/helpers/basketTransformer/BasketTransformer'

import BasketBundle from './BasketBundle'

import basketBundleMock1 from './mocks/basketBundle1.mock.json'
import basketBundleMock2 from './mocks/basketBundle2.mock.json'
import basketBundleMock3 from './mocks/basketBundle3.mock.json'
import basketBundleMock4 from './mocks/basketBundle4.mock.json'

import pageContent from '@shared/config/content/BasketPageContent.json'

import getBundleDescription from '../../helpers/getBundleDescription'
import { BasketBundleProps } from './BasketBundle.types'
import { render } from '@testing-library/react'
import { mockStore } from '@tools/mocks/storeMock'
import * as storeHooks from '@store'

jest.mock('../../helpers/getBundleDescription', () => jest.fn().mockReturnValue([]))

jest.mock('@store', () => ({
  useStore: jest.fn().mockImplementation(() => mockStore({})),
}))

const mockBundlePropsPartial: BasketBundleProps = {
  isUpgrade: false,
  isBusiness: false,
  bundle: {},
  services: [],
  installationAddress: {},
  combiHandlers: {},
  reviewMode: false,
  packageId: '',
  onUpdateBasket: () => ({}),
  pageError: '',
  displayName: '3 in 1 SIM',
  isWatch: false,
  isHandset: false,
}

const transformBasket = BasketTransformer.transformBasket(basketBundleMock1)
const transformBroadbandBasket = BasketTransformer.transformBasket(basketBundleMock2)
const transformWatchUpgradeBasket = BasketTransformer.transformBasket(basketBundleMock3)
const transformHbbRefreshBasket = BasketTransformer.transformBasket(basketBundleMock4)

const mockBundleProps1: BasketBundleProps = {
  ...mockBundlePropsPartial,
  ...transformBasket?.packages![0],
}
const mockBundleProps2: BasketBundleProps = {
  ...mockBundlePropsPartial,
  ...transformBroadbandBasket?.packages![0],
}
const mockBundleProps3: BasketBundleProps = {
  ...mockBundlePropsPartial,
  ...transformWatchUpgradeBasket?.packages![0],
}

const mockBundleProps4: BasketBundleProps = {
  ...mockBundlePropsPartial,
  ...transformHbbRefreshBasket?.packages![0],
}

const basketPageContent = pageContent[0].basket as BasketPageContent.Basket

describe('<BasketBundle />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('renders correctly for handset', () => {
    jest.spyOn(storeHooks, 'useStore').mockImplementation(() => mockStore({ ...transformBasket }))

    const wrapper = shallow(<BasketBundle {...mockBundleProps1} isHandset />)
    expect(snapshot(wrapper)).toMatchSnapshot()
  })

  it('renders broadband correctly when not upgrade', () => {
    jest.spyOn(storeHooks, 'useStore').mockImplementation(() => mockStore({ ...transformBroadbandBasket }, { ...basketPageContent }))

    const { getByText } = render(<BasketBundle {...mockBundleProps2} />)
    expect(getByText('Vodafone Gigafast Broadband 100')).toBeInTheDocument()
  })

  it('renders watch simo plan correctly as upgrade', () => {
    jest.spyOn(storeHooks, 'useStore').mockImplementation(() => mockStore({ ...transformWatchUpgradeBasket }))

    const { getByText } = render(<BasketBundle {...mockBundleProps3} isUpgrade />)
    expect(getByText('30-day Connectivity Plan')).toBeInTheDocument()
  })

  it('renders basket item without data speed', () => {
    jest.spyOn(storeHooks, 'useStore').mockImplementation(() => mockStore({ ...transformWatchUpgradeBasket }))

    const props = { ...mockBundleProps3, bundle: { ...mockBundleProps3.bundle, speed: undefined } }
    const { queryByText } = render(<BasketBundle {...props} />)

    expect(queryByText('Speed: ')).not.toBeInTheDocument()
  })

  it('renders basket item with data speed', () => {
    jest.spyOn(storeHooks, 'useStore').mockImplementation(() => mockStore({ ...transformWatchUpgradeBasket }, { ...basketPageContent }))

    const props = { ...mockBundleProps3, bundle: { ...mockBundleProps3.bundle, speed: 'MAX_AVAILABLE' } }
    const { getByText } = render(<BasketBundle {...props} />)

    expect(getByText('Speed: fastest available')).toBeInTheDocument()
  })

  it('renders getBundleDescription with second arg as messages', () => {
    jest.spyOn(storeHooks, 'useStore').mockImplementation(() => mockStore({ ...transformBasket }, { ...basketPageContent }))

    render(<BasketBundle {...mockBundleProps1} />)

    const { pageContent } = storeHooks.useStore().basketStore

    expect((getBundleDescription as jest.Mock).mock.calls[0][1]).toBe(pageContent.vf_Modules?.messages)
  })

  describe('HBB Refresh', () => {
    beforeAll(() => {
      jest.spyOn(storeHooks, 'useStore').mockImplementation(() => mockStore({ ...transformHbbRefreshBasket }))
    })

    afterAll(() => {
      jest.clearAllMocks()
    })

    it('renders HBB Refresh bundle description correctly', () => {
      const { getAllByText } = render(<BasketBundle {...mockBundleProps4} />)

      expect(getAllByText('Dedicated WIFI experts')).toHaveLength(2)
      expect(getAllByText('12 Months Free Norton 360 Premium')).toHaveLength(2)
      expect(getAllByText('Unlimited Anytime calls to UK landlines & mobiles')).toHaveLength(2)
      expect(getAllByText('No price rises while in contract')).toHaveLength(2)
    })

    it('shows installation address for HBB refresh', () => {
      const { getAllByText } = render(<BasketBundle {...mockBundleProps4} />)

      expect(getAllByText('Installation address:')).toHaveLength(2)
      expect(getAllByText('98 Braywick Road, Maidenhead, SL6 1DJ')).toHaveLength(2)
    })

    it('does not show installation address for HBB refresh upgrades', () => {
      const { queryByText } = render(<BasketBundle {...mockBundleProps4} isUpgrade />)

      expect(queryByText('Installation address:')).not.toBeInTheDocument()
      expect(queryByText('98 Braywick Road, Maidenhead, SL6 1DJ')).not.toBeInTheDocument()
    })
  })
})
