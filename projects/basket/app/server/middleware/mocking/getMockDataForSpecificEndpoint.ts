import { Request } from 'express'
import path from 'path'
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'

const fixturesPath = path.resolve(String(process.env.MOCK_FIXTURES_PATH))

export const getMockDataForSpecificEndpoint = (req: Request) => {
  const map = {
    createNewPackage: {
      url: `/basket/api/basket/v2/basket/${req.params[0]}/package`,
      path: `basket/${req.cookies['basketPostMock']}`,
      mapper: (contentMock: any) => {
        const pckg = contentMock?.packages.find((item: any) => item?.bundle?.skuId === req.body?.bundle?.skuId)
        return { ...pckg, packageId: uuidv4() }
      },
    },
  }

  const mocker = Object.values(map).find(endpoint => endpoint.url === req.url)
  if (mocker) {
    try {
      const contentMock = JSON.parse(fs.readFileSync(`${fixturesPath}/${mocker.path}`, { encoding: 'utf8' }))
      if (mocker.mapper) {
        return mocker.mapper(contentMock)
      }
      return contentMock
    } catch (err) {
      console.log(err)
    }
  }

  return {}
}
