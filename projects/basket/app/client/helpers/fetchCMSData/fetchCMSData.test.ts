import fetchCMSData from './fetchCMSData'
import Request from '@vfuk/dalmatian/request'

jest.mock('@vfuk/dalmatian/request')

Request.mockImplementation(() => {
  return {
    addQuery: jest.fn().mockImplementation(() => {
      return {
        addQuery: jest.fn().mockImplementation(() => {
          return {
            get: jest.fn().mockResolvedValue(rawData),
          }
        }),
      }
    }),
  }
})

interface CleanedMockData {
  data: {
    clean: string
  }
}

interface RawdMockData {
  data: {
    data2: {
      dataProp: string
    }
  }
}

const rawData: RawdMockData = {
  data: {
    data2: {
      dataProp: 'test-data',
    },
  },
}

const cleanData = (rawData: any): CleanedMockData => {
  return {
    data: {
      clean: rawData.data.data2.dataProp,
    },
  }
}

describe('fetchCMSData', () => {
  it('should dlean response data', async () => {
    const expectedOutput: CleanedMockData = {
      data: {
        clean: rawData.data.data2.dataProp,
      },
    }

    const outputData = await fetchCMSData<CleanedMockData>('test_asset', cleanData)
    expect(outputData).toEqual(expectedOutput)
  })
})
