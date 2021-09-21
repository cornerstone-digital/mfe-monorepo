import getSimoPlanLink from './getSimoPlanLink'

const simoPkg = {
  bundle: {
    bundleClass: 'SIMO',
    skuId: '111222',
  },
}

const nonSimoPkg = {
  bundle: {
    bundleClass: 'HANDSET',
    skuId: '111222',
  },
}

describe('getSimoPlanLink', () => {
  test('for a SIMO package it returns a URL that contains the skuId', () => {
    const result = getSimoPlanLink(simoPkg)
    expect(result).toEqual('https://www.vodafone.co.uk/mobile/best-sim-only-deals?planId=111222&login=true')
  })

  test('for a non SIMO package it returns an empty URL', () => {
    const result = getSimoPlanLink(nonSimoPkg)
    expect(result).toEqual('')
  })
})
