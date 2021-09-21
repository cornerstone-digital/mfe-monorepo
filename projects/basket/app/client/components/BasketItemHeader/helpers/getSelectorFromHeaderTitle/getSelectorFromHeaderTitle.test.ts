import getSelectorFromTitle from './getSelectorFromHeaderTitle'

describe('getSelectorFromTitle', () => {
  it('should return expected value', () => {
    expect(getSelectorFromTitle('.-_test TEST')).toBe('test-test')
  })
})
