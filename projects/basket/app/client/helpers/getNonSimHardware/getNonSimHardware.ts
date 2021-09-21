// This gets the hardware item used to ascertain the sim type, but which shouldn't be from the hardware SIM itself
// i.e. grab it from the handset, or tablet etc.

import { isSimCard } from '@helpers/typeCheck'
import { BasketHardwareWithHeaderStatus } from '@pages/BasketPage/BasketPage.types'

// TODO: Fix this nagative selector to be explicit about the hardware types(s) it should pluck out
const getNonSimHardware = (hardwares: BasketHardwareWithHeaderStatus[]) => {
  return hardwares.find(h => !isSimCard(h))
}

export default getNonSimHardware
