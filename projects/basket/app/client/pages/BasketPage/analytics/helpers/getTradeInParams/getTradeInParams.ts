enum TradeInNames {
  MONTHLY_BILL_CREDIT = 'monthly credit',
  ONE_OFF_BILL_CREDIT = 'one off credit',
  BACS = 'bacs',
}

const getTradeInParams = (tradeInCredit: BasketV2.TradeInCredit) => {
  const tradeinType = tradeInCredit?.credit?.type

  return {
    quoteId: tradeInCredit?.quoteId,
    tradeInType: tradeinType ? TradeInNames[tradeinType] : '',
    tradeInDuration: tradeinType === 'BACS' || tradeinType === 'ONE_OFF_BILL_CREDIT' ? 1 : tradeInCredit?.credit?.monthlyCredit?.tenure,
    tradeInAmount:
      tradeinType === 'MONTHLY_BILL_CREDIT' ? tradeInCredit?.credit?.monthlyCredit?.monthlyPrice : tradeInCredit?.credit?.guaranteedPrice,
    tradeInDevice: tradeInCredit?.deviceName,
  }
}

export default getTradeInParams
