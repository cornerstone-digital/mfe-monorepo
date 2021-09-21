import { isAccessory } from '@helpers/typeCheck'

interface FilteredTypes {
  filteredHardware: BasketV2.Hardware[]
  filteredAccessories: BasketV2.Hardware[]
}

const filterHardware = (originalHardware: BasketV2.Hardware[] = [], isBroadband: boolean = false): FilteredTypes => {
  let filteredHardware: BasketV2.Hardware[] = []
  let filteredAccessories: BasketV2.Hardware[] = []

  originalHardware.forEach(hardware => {
    if (!hardware) {
      return
    }
    if (!isAccessory(hardware)) {
      return filteredHardware.push(hardware)
    }
    if (!isBroadband) {
      filteredAccessories.push(hardware)
    }
  })

  return {
    filteredHardware,
    filteredAccessories,
  }
}

export default filterHardware
