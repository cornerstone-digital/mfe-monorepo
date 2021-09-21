import BasketExtra from './BasketExtra'
import mockExtra1 from './mocks/extra1.mock.json'
import mockExtra2 from './mocks/extra2.mock.json'
import transformUtils from '@shared/helpers/transformUtils/transformUtils'
import { MockBasketExtraData } from '@components/BasketContents/components/BasketPackage/components/BasketExtra/BasketExtras.types'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as getBundleDescription from '../../helpers/getBundleDescription'
import { mockStore } from '@tools/mocks/storeMock'

const handlers = {
  onRemoveAddOn: jest.fn(),
  onUndoRemoveAddOn: jest.fn(),
}

jest.mock('../../helpers/getBundleDescription', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue([]),
}))

jest.mock('@store', () => ({
  useStore: jest.fn().mockImplementation(() => mockStore({})),
}))

const mockExtraOne: MockBasketExtraData = { ...transformUtils.removeNulls(mockExtra1) }
const mockExtraTwo: MockBasketExtraData = { ...transformUtils.removeNulls(mockExtra2) }

describe('<BasketExtra />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const propsMock1 = {
    ...handlers,
    ...mockExtraOne,
    bundleType: '',
    isBusiness: false,
  }
  const propsMock2 = {
    ...handlers,
    ...mockExtraTwo,
    isBusiness: false,
    bundleType: '',
  }
  describe('renders', () => {
    it('mock1 correctly', () => {
      const { asFragment } = render(<BasketExtra {...propsMock1} />)
      expect(asFragment()).toMatchSnapshot()
    })
    it('mock2 correctly', () => {
      const { asFragment } = render(<BasketExtra {...propsMock2} />)
      expect(asFragment()).toMatchSnapshot()
    })
  })

  it('should not render if flexi upgrade', () => {
    const props = {
      ...propsMock1,
      planType: 'BROADBAND:FTTH',
      service: {
        ...propsMock1.service,
        productClass: 'fee',
        name: 'fee for flexi-upgrade',
      },
    }
    const { container } = render(<BasketExtra {...props} />)
    expect(container.textContent).toBe('')
  })

  it('should render description if provided', () => {
    const props = {
      ...propsMock1,
      service: {
        ...propsMock1.service,
        displayDescription: 'test description',
      },
    }
    const { getAllByText } = render(<BasketExtra {...props} />)
    expect(getAllByText(props.service.displayDescription)).toHaveLength(2)
  })

  it('should render description from allowances if provided in service', () => {
    const mockDescription = 'mock description'
    jest.spyOn(getBundleDescription, 'default').mockReturnValueOnce([mockDescription])
    const { getAllByText } = render(<BasketExtra {...propsMock1} />)
    expect(getAllByText(mockDescription)).toHaveLength(2)
  })

  it('should show undo button if package add on is undoable', () => {
    const { getByText } = render(<BasketExtra {...propsMock1} />)
    const undoButton = getByText('Undo').closest('button') as HTMLButtonElement
    expect(undoButton).toBeInTheDocument()

    userEvent.click(undoButton)
    expect(handlers.onUndoRemoveAddOn).toBeCalledWith(propsMock1.packageId, propsMock1.service.skuId, 'SERVICE')
  })

  it("should not show undo button is not present if it's a broadband plan", () => {
    const props = {
      ...propsMock1,
      planType: 'BROADBAND:FTTH',
    }
    const { queryByText } = render(<BasketExtra {...props} />)
    const undoButton = queryByText('Undo')
    expect(undoButton).not.toBeInTheDocument()
  })

  it("should not show remove button is not present if it's a simo basic plan", () => {
    const props = {
      ...propsMock1,
      planType: 'SIMO',
      bundleType: 'Basic',
    }
    const { queryByText } = render(<BasketExtra {...props} />)
    const removeButton = queryByText('Remove')
    expect(removeButton).not.toBeInTheDocument()
  })

  it('should show remove button if package add on is removable', () => {
    const { getByText } = render(<BasketExtra {...propsMock2} />)
    const removeButton = getByText('Remove').closest('button') as HTMLButtonElement
    expect(removeButton).toBeInTheDocument()

    userEvent.click(removeButton)
    expect(handlers.onRemoveAddOn).toBeCalledWith(propsMock2.packageId, propsMock2.service.packageLineId, propsMock2.service.skuId)
  })
})
