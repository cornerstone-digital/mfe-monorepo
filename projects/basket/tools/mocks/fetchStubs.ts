import axios, { AxiosRequestConfig, Method } from 'axios'

import * as azdev from 'azure-devops-node-api'
import { VersionControlRecursionType } from 'azure-devops-node-api/interfaces/GitInterfaces'
import fs from 'fs'
const orgUrl: string = 'https://dev.azure.com/vfuk-digital'
const token: string = String(process.env.AZURE_DEVOPS_EXT_PAT)

if (!token.length) {
  console.log('No Azure Personal Access Token Found at', 'process.env.AZURE_DEVOPS_EXT_PAT')
  process.exit(1)
}

const fetchStubs = async () => {
  // let fileName: string = ''
  try {
    const authHandler = azdev.getPersonalAccessTokenHandler(token)
    const connection = new azdev.WebApi(orgUrl, authHandler)
    const gitApi = await connection.getGitApi()

    const stubs = await gitApi.getItems(
      'adb4ae2a-ab0a-4e09-afe6-e477177a2922',
      'Digital',
      '/mappings/basket',
      VersionControlRecursionType.Full,
    )

    const streamToString = (stream: NodeJS.ReadableStream): Promise<string> => {
      const chunks: Uint8Array[] = []
      return new Promise((resolve, reject) => {
        stream.on('data', chunk => chunks.push(chunk))
        stream.on('error', reject)
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
      })
    }

    const fetchStub = (request: { method: Method; urlPath: string; urlPathPattern: string }) => {
      const method = request.method.toLowerCase() === 'any' ? 'GET' : request.method
      if (request.urlPath || request.urlPathPattern) {
        const cleanedPath = (request.urlPath || request.urlPathPattern).replace('(/v2){0,1}', '/v2')
        const requestConfig: AxiosRequestConfig = {
          method,
          url: `https://dal.dx-dev1-blue.internal.vodafoneaws.co.uk${cleanedPath}`,
        }

        return new Promise((resolve, reject) => {
          axios
            .request(requestConfig)
            .then(response => resolve(response.data))
            .catch(reject)
        })
      } else {
        console.log(request)
        return Promise.resolve(undefined)
      }
    }

    stubs.forEach(async stub => {
      // console.log(stub)
      if (stub.objectId && stub.path && !stub.isFolder) {
        const mappingBuffer: NodeJS.ReadableStream = await gitApi.getBlobContent(
          'adb4ae2a-ab0a-4e09-afe6-e477177a2922',
          stub.objectId,
          'Digital',
          true,
        )
        const pathParts = stub.path.split('/')
        const folder = pathParts[pathParts.length - 2]
        const fileName = pathParts[pathParts.length - 1]

        if (fileName.startsWith('get')) {
          const filePath = `./src/shared/mocks/${folder}/${fileName}`
          try {
            const fileString = await streamToString(mappingBuffer)
            const fileJson = JSON.parse(fileString)
            const stubContent = await fetchStub(fileJson.request)

            if (stubContent) {
              fs.writeFileSync(filePath, JSON.stringify(stubContent, null, 2), {
                encoding: 'utf8',
                flag: 'w',
              })
            }
            console.log(`[GENERATED STUB] - ${fileName}`)
            // process.exit(1)
          } catch (error) {
            console.error('Error fetching stub', stub)
          }
          // if (mappingJson.request) {
          //   console.log(mappingJson.request && mappingJson.request.urlPath)
          // }
        }
      }
    })
  } catch (error) {
    console.log(error)
  }
}

fetchStubs()
