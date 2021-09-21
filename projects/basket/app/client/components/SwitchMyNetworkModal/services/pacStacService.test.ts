import Request from '@vfuk/dalmatian/request'

jest.mock('@vfuk/dalmatian/request', () =>
  jest.fn().mockReturnValue({
    addHeader: jest.fn().mockReturnValue({
      get: jest.fn().mockReturnValue({
        then: jest.fn().mockReturnValue({
          catch: jest.fn().mockReturnValue({}),
        }),
      }),
    }),
  }),
)

const apiURL = '/api/digital/v1'
const serviceURL = `${apiURL}/portability/authcode/validate`

import pacStacService from './pacStacService'

describe('pacStacService()', () => {
  it('should work expected', () => {
    const code = '23234'
    const phoneNumber = '0782342342'
    pacStacService.validate(code, phoneNumber)
    expect(Request).toHaveBeenCalledWith(`${serviceURL}?code=${code}&msisdn=${phoneNumber}`)
  })
})
