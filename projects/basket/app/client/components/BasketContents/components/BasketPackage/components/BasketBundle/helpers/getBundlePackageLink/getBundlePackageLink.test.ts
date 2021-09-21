import getBundlePackageLink from './getBundlePackageLink'

describe('getBundlePackageLink', () => {
  it.each`
    planType            | isWatch  | bundle                            | append
    ${'HANDSET'}        | ${false} | ${{ bundleClass: 'WATCH_SIMO' }}  | ${false}
    ${'HANDSET'}        | ${false} | ${{ bundleClass: 'DATA_SIMO' }}   | ${false}
    ${'HANDSET'}        | ${false} | ${{ bundleClass: 'DATA_DEVICE' }} | ${false}
    ${'HANDSET'}        | ${false} | ${{ bundleClass: 'SIMO' }}        | ${false}
    ${'HANDSET'}        | ${false} | ${{ bundleClass: 'AIRTIME' }}     | ${true}
    ${'HANDSET'}        | ${true}  | ${{ bundleClass: 'AIRTIME' }}     | ${false}
    ${'BROADBAND:FTTH'} | ${false} | ${{ bundleClass: 'AIRTIME' }}     | ${false}
  `('should return with proper link', ({ planType, isWatch, bundle, append }) => {
    const mockLink = 'test-link'
    const expectedOutput = append ? `${mockLink}#plans` : mockLink
    expect(getBundlePackageLink(planType, isWatch, bundle, mockLink)).toBe(expectedOutput)
  })
})
