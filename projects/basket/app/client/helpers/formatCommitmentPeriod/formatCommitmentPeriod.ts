const formatCommitmentPeriod = (commitmentPeriod?: BasketV2.CommitmentPeriod): BasketV2.CommitmentPeriod | undefined => {
  if (!commitmentPeriod) {
    return
  }

  const uom = commitmentPeriod.uom?.toLowerCase()
  const period = parseInt(commitmentPeriod.value || '0')

  if (uom === 'days') {
    return { uom, value: period.toString() }
  }

  if (uom?.includes('month') && period === 1) {
    return { uom: 'days', value: '30' }
  }

  if (uom?.includes('month') && period > 1) {
    return { uom: 'month', value: period.toString() }
  }

  if (uom === 'years') {
    return { uom: 'month', value: (period * 12).toString() }
  }
}

export default formatCommitmentPeriod
