import PackageTradeInDetail from './PackageTradeInDetail'

describe('PackageTradeInDetail', () => {
  const tradeInCredit: BasketV2.TradeInCredit = {
    quoteId: '15670678-b46d-4cef-8d3a-2ce5b2516c63',
    deviceId: '16096626-c46d-4caa-8dxx-2ce5b2516455',
    deviceName: 'Apple iPhone11pro 256Gb black',
    installedId: undefined,
    grade: {
      condition: 'working',
      level: undefined,
    },
    diagnostic: true,
    expiryDateTime: '2022-05-20T09:09:48',
    credit: {
      type: 'BACS',
      upToPrice: undefined,
      guaranteedPrice: 380.0,
      monthlyCredit: undefined,
      creditProductId: 94568,
    },
  }

  it('should not render for unknown credit type', async () => {
    const credit: BasketV2.TradeInCredit = {
      ...tradeInCredit,
      credit: { ...tradeInCredit.credit, type: undefined },
    }
    const wrapper = shallow(<PackageTradeInDetail tradeInCredit={credit} />)
    expect(wrapper.find('Paragraph')).toHaveLength(0)
  })

  it('should render for BACS', async () => {
    const wrapper = shallow(<PackageTradeInDetail tradeInCredit={tradeInCredit} />)
    expect(wrapper.find('Paragraph')).toHaveLength(1)
    expect(wrapper.find('Paragraph').html()).toContain(`<strong>£380 bank transfer</strong>`)
  })

  it('should render for MONTHLY_BILL_CREDIT', async () => {
    const credit: BasketV2.TradeInCredit = {
      ...tradeInCredit,
      credit: { ...tradeInCredit.credit, type: 'MONTHLY_BILL_CREDIT', monthlyCredit: { monthlyPrice: 39, tenure: 10 } },
    }
    const wrapper = shallow(<PackageTradeInDetail tradeInCredit={credit} />)
    expect(wrapper.find('Paragraph')).toHaveLength(1)
    expect(wrapper.find('Paragraph').html()).toContain(`<strong>£39 for 10 months</strong>(Applied instantly to your Airtime Plan bill)`)
  })

  it('should render for ONE_OFF_BILL_CREDIT', async () => {
    const credit: BasketV2.TradeInCredit = {
      ...tradeInCredit,
      credit: {
        ...tradeInCredit.credit,
        type: 'ONE_OFF_BILL_CREDIT',
        guaranteedPrice: 380.0,
        monthlyCredit: undefined,
      },
    }
    const wrapper = shallow(<PackageTradeInDetail tradeInCredit={credit} />)
    expect(wrapper.find('Paragraph')).toHaveLength(1)
    expect(wrapper.find('Paragraph').html()).toContain(`credit</strong></p>`)
  })
})
