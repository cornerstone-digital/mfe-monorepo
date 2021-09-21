const getSimCardDisplayName = (hardwares?: BasketV2.Hardware[]) => {
  return hardwares?.find(hardware => hardware.productClass?.toLowerCase() === 'sim card')?.displayName
}

export default getSimCardDisplayName
