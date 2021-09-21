const getPackageByHardwareSkuId = (
  packages: BasketV2.ModelPackage[] | undefined,
  hardwareSkuId: string,
): BasketV2.ModelPackage | undefined => {
  if (!packages?.length) {
    return
  }

  return packages?.find(packageItem => packageItem.hardwares?.some(hardware => hardware.skuId === hardwareSkuId))
}

export default getPackageByHardwareSkuId
