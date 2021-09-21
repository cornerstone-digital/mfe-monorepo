import getTradeInParams from './getTradeInParams'

describe('getTradeInParams()', () => {
  let params: BasketV2.TradeInCredit = {
    quoteId: '234234-wfr-23',
    credit: {
      type: undefined,
      guaranteedPrice: 380.0,
      monthlyCredit: {
        monthlyPrice: 39,
        tenure: 10,
      },
    },
  }
  it('should return with empty name', () => {
    expect(getTradeInParams(params)).toEqual({
      quoteId: params.quoteId,
      tradeInAmount: 380,
      tradeInDevice: undefined,
      tradeInDuration: 10,
      tradeInType: '',
    })
  })

  it('should return expected for BACS', () => {
    if (params.credit) {
      params.credit.type = 'BACS'
    }
    expect(getTradeInParams(params)).toEqual({
      quoteId: params.quoteId,
      tradeInAmount: 380,
      tradeInDevice: undefined,
      tradeInDuration: 1,
      tradeInType: 'bacs',
    })
  })

  it('should return expected for monthly credit', () => {
    if (params.credit) {
      params.credit.type = 'MONTHLY_BILL_CREDIT'
    }
    expect(getTradeInParams(params)).toEqual({
      quoteId: params.quoteId,
      tradeInAmount: 39,
      tradeInDevice: undefined,
      tradeInDuration: 10,
      tradeInType: 'monthly credit',
    })
  })
})
