import getSimCardDisplayName from './getSimCardDisplayName'

describe('getSimCardDisplayName', () => {
  test("should return with displayName if has 'sim card' hardware", () => {
    const mockHardwares: BasketV2.Hardware[] = [
      {
        productClass: 'sim card',
        displayName: 'test name',
      },
      {
        productClass: 'test class',
        displayName: 'test name 2',
      },
    ]

    expect(getSimCardDisplayName(mockHardwares)).toBe('test name')
  })

  test("should return nothing if does not have 'sim card' hardware", () => {
    const mockHardwares: BasketV2.Hardware[] = [
      {
        displayName: 'test name',
      },
      {
        productClass: 'test class',
        displayName: 'test name 2',
      },
    ]

    expect(getSimCardDisplayName(mockHardwares)).toBe(undefined)
  })
})
