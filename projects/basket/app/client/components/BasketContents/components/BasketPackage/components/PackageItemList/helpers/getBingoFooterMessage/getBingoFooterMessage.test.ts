import getBingoFooterMessage from './getBingoFooterMessage'

describe('getBingoFooterMessage', () => {
  const mockWatchHardware = { productClass: 'EHANDSET', productSubClass: 'WATCH' }
  const mockHandsetHardware = { productClass: 'EHANDSET' }
  const mockBroadbandHardware = { productClass: 'BROADBAND:FTTH' }

  it.each`
    content                               | modelPackage                                                                      | expected
    ${'{param} test'}                     | ${{ hardwares: [mockWatchHardware] }}                                             | ${'Watch Plan test'}
    ${'{param} test'}                     | ${{ hardwares: [mockHandsetHardware] }}                                           | ${'Phone Plan test'}
    ${'{param} test'}                     | ${[{ hardwares: [mockHandsetHardware] }, { hardwares: [mockBroadbandHardware] }]} | ${'Phone Plan test'}
    ${'{param} test'}                     | ${[{ hardwares: [mockWatchHardware] }, { hardwares: [mockBroadbandHardware] }]}   | ${'Phone Plan test'}
    ${'Content without value to replace'} | ${{ hardwares: [mockHandsetHardware] }}                                           | ${'Content without value to replace'}
  `(`should return $expected if proper values provided`, ({ content, modelPackage, expected }) => {
    expect(getBingoFooterMessage(content, modelPackage)).toBe(expected)
  })
})
