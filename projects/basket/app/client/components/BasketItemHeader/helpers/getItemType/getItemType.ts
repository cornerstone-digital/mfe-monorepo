const getItemType = (changeLink?: string) => {
  if (!changeLink) {
    return ''
  }
  if (changeLink.includes('/mobile/phones/')) {
    if (changeLink.includes('#plans')) {
      return 'airtime'
    }
    return 'handset'
  }
  if (changeLink.includes('/smart-watches-and-wearables/')) {
    return 'smart-watch'
  }
  if (changeLink.includes('/data-only-sim')) {
    return 'data-only-sim'
  }
  if (changeLink.includes('sim-only-deals')) {
    if (changeLink.includes('basics')) {
      return 'sim-only-basics'
    }
    return 'sim-only'
  }
  if (changeLink.includes('mobile-broadband/pay-monthly-contracts')) {
    return 'data-device'
  }
  if (changeLink.includes('broadband')) {
    return 'broadband'
  }
}

export default getItemType
