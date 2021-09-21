import Request from '@vfuk/dalmatian/request'
import { CMSRawData } from '../../templates/mainTemplate/MainTemplate.types'
const api_url = '/api/digital/v1/content/asset'

const fetchCMSData = async <T>(assetName: string, cleanFn: (rawData: CMSRawData[] | any) => T): Promise<T> => {
  return new Promise((resolve, reject) => {
    new Request(api_url)
      .addQuery('assetType', 'Module_C')
      .addQuery('assetName', assetName)
      .get()
      .then(cleanFn)
      .then(resolve)
      .catch((err: any) => {
        console.warn('Error fetching data! ', err)
        reject()
      })
  })
}

export default fetchCMSData
