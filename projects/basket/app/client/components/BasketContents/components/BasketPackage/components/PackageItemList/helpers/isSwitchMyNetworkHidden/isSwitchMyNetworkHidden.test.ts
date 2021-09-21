import isSwitchMyNetworkHidden from './isSwitchMyNetworkHidden'

describe('isSwitchMyNetworkHidden', () => {
  it.each`
    portabilitySet | planType            | isUpgrade | reviewMode | expected
    ${true}        | ${'BROADBAND:FTTH'} | ${true}   | ${true}    | ${true}
    ${true}        | ${'BROADBAND:FTTH'} | ${true}   | ${false}   | ${true}
    ${true}        | ${'BROADBAND:FTTH'} | ${false}  | ${true}    | ${true}
    ${true}        | ${'BROADBAND:FTTH'} | ${false}  | ${false}   | ${true}
    ${true}        | ${'HANDSET'}        | ${true}   | ${true}    | ${true}
    ${true}        | ${'HANDSET'}        | ${true}   | ${false}   | ${true}
    ${true}        | ${'HANDSET'}        | ${false}  | ${true}    | ${false}
    ${true}        | ${'HANDSET'}        | ${false}  | ${false}   | ${false}
    ${false}       | ${'BROADBAND:FTTH'} | ${true}   | ${true}    | ${true}
    ${false}       | ${'BROADBAND:FTTH'} | ${true}   | ${false}   | ${true}
    ${false}       | ${'BROADBAND:FTTH'} | ${false}  | ${true}    | ${true}
    ${false}       | ${'BROADBAND:FTTH'} | ${false}  | ${false}   | ${true}
    ${false}       | ${'HANDSET'}        | ${true}   | ${true}    | ${true}
    ${false}       | ${'HANDSET'}        | ${true}   | ${false}   | ${true}
    ${false}       | ${'HANDSET'}        | ${false}  | ${true}    | ${true}
    ${false}       | ${'HANDSET'}        | ${false}  | ${false}   | ${false}
  `(`should return $expected if proper values provided`, ({ portabilitySet, planType, isUpgrade, reviewMode, expected }) => {
    const portabilityData = portabilitySet ? { msisdn: '07195729387', validPortDate: '2021-06-14T00:00:00.000Z' } : {}
    expect(isSwitchMyNetworkHidden(portabilityData, planType, isUpgrade, reviewMode)).toBe(expected)
  })
})
