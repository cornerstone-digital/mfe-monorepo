import cleanHeaderData from './cleanHeaderData'

jest.mock('@web-cms-core/core/organisms/CMSConsumerMegaNav/helpers/CMSMapper', () => ({
  formatCMSData: jest.fn().mockImplementation(item => item),
}))
describe('cleanHeaderData', () => {
  it('should return expected result when input is undefined', () => {
    expect(cleanHeaderData(undefined)).toEqual(null)
  })

  it('should return expected result when input is an object', () => {
    expect(cleanHeaderData({ test: 'test' })).toEqual({ test: 'test' })
  })
})
