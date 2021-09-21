import Request from '@vfuk/dalmatian/request'

const apiURL = '/api/digital/v1'
const serviceURL = `${apiURL}/portability/authcode/validate`

/**
 * request body
 *
 * @param {String} code
 * @param {String} phoneNumber
 */

const validate = (code: string, phoneNumber: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    new Request(`${serviceURL}?code=${code}&msisdn=${phoneNumber}`)
      .addHeader('Accept', 'application/json')
      .get()
      .then(resolve)
      .catch(reject)
  })
}

export default { validate }
