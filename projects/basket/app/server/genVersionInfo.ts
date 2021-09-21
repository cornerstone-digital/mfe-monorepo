import fs from 'fs'

import shell from 'shelljs'

const path = './src/server/.version.json'
const getShell = (string: string) => shell.exec(string).slice(0, -1)

try {
  const branchName: string = getShell('git rev-parse --abbrev-ref HEAD')
  const lastTag: string = getShell('git describe --tags')
  const branchHash: string = getShell('git rev-parse --short HEAD')
  const packageVersion: string = require('../../package.json').version

  const version = {
    branchName,
    lastTag,
    branchHash,
    packageVersion,
  }

  fs.writeFileSync(path, JSON.stringify(version, null, 2), {
    encoding: 'utf8',
    flag: 'w',
  })
} catch (err) {
  console.log('Error: ', err)
}
