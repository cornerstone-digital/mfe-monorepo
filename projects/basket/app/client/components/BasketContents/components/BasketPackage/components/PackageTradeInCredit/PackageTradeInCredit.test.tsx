import PackageTradeInCredit from './PackageTradeInCredit'
import renderWithProviders from '@helpers/renderWithProviders'

jest.mock('@store', () => ({
  useStore: jest.fn().mockImplementation(() => ({ basketStore: { basket: {} } })),
}))

const bacsType: BasketV2.Credit['type'] = 'BACS'
const monthlyType: BasketV2.Credit['type'] = 'MONTHLY_BILL_CREDIT'
const oneOffType: BasketV2.Credit['type'] = 'ONE_OFF_BILL_CREDIT'

const createTradeInObject = (type: BasketV2.Credit['type']) => ({
  deviceName: 'Some Flashy Device',
  credit: {
    type,
    guaranteedPrice: 380,
    monthlyCredit: {
      monthlyPrice: 39,
      tenure: 10,
    },
    creditProductId: 94568,
  },
})

describe('PackageTradeInCredit', () => {
  it('contains the right text for BACS', () => {
    const { getByText } = renderWithProviders(<PackageTradeInCredit packageId="23234234" tradeInCredit={createTradeInObject(bacsType)} />)
    expect(getByText('See more')).toBeInTheDocument()
    expect(getByText('£380 bank transfer')).toBeInTheDocument()
  })

  it('renders always two decimals', () => {
    const tradeInObject = createTradeInObject(bacsType)
    tradeInObject.credit.guaranteedPrice = 380.4
    const { getByText } = renderWithProviders(<PackageTradeInCredit packageId="23234234" tradeInCredit={tradeInObject} />)
    expect(getByText('See more')).toBeInTheDocument()
    expect(getByText('£380.40 bank transfer')).toBeInTheDocument()
  })

  it('contains the right text for Monthly', () => {
    const { getByText } = renderWithProviders(
      <PackageTradeInCredit packageId="23234234" tradeInCredit={createTradeInObject(monthlyType)} />,
    )
    expect(getByText('See more')).toBeInTheDocument()
    expect(getByText('£39 for 10 months')).toBeInTheDocument()
  })

  it('contains the right text for One Off', () => {
    const { getByText } = renderWithProviders(<PackageTradeInCredit packageId="23234234" tradeInCredit={createTradeInObject(oneOffType)} />)
    expect(getByText('See more')).toBeInTheDocument()
    expect(getByText('£380 trade-in credit')).toBeInTheDocument()
  })

  it('contains the right header title', () => {
    const { getByText } = renderWithProviders(<PackageTradeInCredit packageId="23234234" tradeInCredit={createTradeInObject(oneOffType)} />)
    expect(getByText('Your guaranteed trade-in')).toBeInTheDocument()
  })

  it('contains the right header title when removal in progress', () => {
    const { getByText } = renderWithProviders(
      <PackageTradeInCredit headerStatus="removing" packageId="23234234" tradeInCredit={createTradeInObject(oneOffType)} />,
    )
    expect(getByText('Removing your guaranteed trade-in')).toBeInTheDocument()
  })
})
