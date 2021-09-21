import filterHardware from './filterHardware'

const originalHardware = [
  { name: 'Apple iPhone', productClass: 'handset' },
  { name: 'Apple Airpods', productClass: 'accessories' },
  undefined,
  { name: 'Apple Wireless charger', productClass: 'accessories' },
] as BasketV2.Hardware[]

describe('filterHardware', () => {
  it('correctly splits hardware and accessories', () => {
    const { filteredHardware, filteredAccessories } = filterHardware(originalHardware)

    expect(filteredHardware.length).toBe(1)
    expect(filteredAccessories.length).toBe(2)
  })

  it('returns empty arrays if no hardware is provided', () => {
    const { filteredHardware, filteredAccessories } = filterHardware()

    expect(filteredHardware.length).toBe(0)
    expect(filteredAccessories.length).toBe(0)
  })

  it('ignores items marked as an accessory if they are part of broadband pakage', () => {
    const { filteredHardware, filteredAccessories } = filterHardware(originalHardware, true)

    expect(filteredHardware.length).toBe(1)
    expect(filteredAccessories.length).toBe(0)
  })

  it('ignores the hardware if falsy', () => {
    const { filteredHardware, filteredAccessories } = filterHardware(originalHardware)
    expect([...filteredAccessories, ...filteredHardware].length).toBe(3)
  })
})
