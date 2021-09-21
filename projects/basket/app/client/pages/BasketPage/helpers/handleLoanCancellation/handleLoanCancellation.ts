interface CancellationInfoType {
  numberOfLoans: number
  loanDeclinedType: string
}

const handleLoanCancellation = (content?: BasketPageContent.HbbPortfolioRefreshContent) => {
  const sessionStorageItemName = 'loanCancellationInfo'
  const loanCancellationInfo = sessionStorage.getItem(sessionStorageItemName)
  if (loanCancellationInfo) {
    sessionStorage.removeItem(sessionStorageItemName)
    let errorContent: BasketPageContent.BasketEsimDeviceUpgrade | undefined

    const cancellationInfo: CancellationInfoType = JSON.parse(loanCancellationInfo)
    const { loanDeclinedType, numberOfLoans } = cancellationInfo || {}
    const messageContent = content
    const multipleLoans = numberOfLoans > 1

    switch (loanDeclinedType) {
      case 'phone':
        errorContent = multipleLoans
          ? messageContent?.LOAN_DECLINE_CHECKOUT_HANDSET_WATCH
          : messageContent?.LOAN_DECLINE_CHECKOUT_HANDSET_ONLY
        break
      case 'watch':
        errorContent = multipleLoans
          ? messageContent?.LOAN_DECLINE_CHECKOUT_WATCH_HANDSET
          : messageContent?.LOAN_DECLINE_CHECKOUT_WATCH_ONLY
        break
    }
    throw { data: { errorCode: errorContent?.name } }
  }
}

export default handleLoanCancellation
