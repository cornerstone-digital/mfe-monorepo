import formatCommitmentPeriod from './formatCommitmentPeriod'

describe('formatCommitmentPeriod()', () => {
  it('should return undefined', () => {
    expect(formatCommitmentPeriod({})).toBeUndefined()
  })

  it('should work as expected for days', () => {
    expect(formatCommitmentPeriod({ value: '30', uom: 'Days' })).toEqual({ value: '30', uom: 'days' })
    expect(formatCommitmentPeriod({ value: '20', uom: 'days' })).toEqual({ value: '20', uom: 'days' })
  })

  it('should work as expected for month', () => {
    expect(formatCommitmentPeriod({ value: '1', uom: 'month' })).toEqual({ value: '30', uom: 'days' })
    expect(formatCommitmentPeriod({ value: '10', uom: 'month' })).toEqual({ value: '10', uom: 'month' })
  })

  it('should work as expected for months', () => {
    expect(formatCommitmentPeriod({ value: '1', uom: 'months' })).toEqual({ value: '30', uom: 'days' })
    expect(formatCommitmentPeriod({ value: '10', uom: 'months' })).toEqual({ value: '10', uom: 'month' })
  })

  it('should work as expected for years', () => {
    expect(formatCommitmentPeriod({ value: '1', uom: 'years' })).toEqual({ value: '12', uom: 'month' })
    expect(formatCommitmentPeriod({ value: '2', uom: 'years' })).toEqual({ value: '24', uom: 'month' })
  })
})
